// components/NodeNetworkBackground.tsx
// FIXED: Level 1 Black Hole now auto-absorbs instantly (no hold needed)
// Level 2 = Ultimate Black Hole (full website slow suck + shake + explosion + reload)

'use client';

import React, { useRef, useEffect, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  targetRadius: number;
  color: string;
  level: number;           // 0 = normal, 1 = black hole, 2 = ultimate
}

interface SpawnRipple {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  color: string;
  speed: number;
}

const NodeNetworkBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const ripplesRef = useRef<SpawnRipple[]>([]);
  const mouseRef = useRef({ x: -10000, y: -10000, isActive: false });
  const isHoldingRef = useRef(false);
  const blackHoleActiveRef = useRef(false);
  const blackHoleStrengthRef = useRef(0);
  const lastMergeTimeRef = useRef(0);
  const ultimateTimerRef = useRef<NodeJS.Timeout | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const CONFIG = {
    PARTICLE_COUNT_BASE: 320,
    MAX_PARTICLES: 1400,
    MIN_DENSITY_FACTOR: 0.80,
    REGEN_PER_FRAME_MAX: 3,
    CONNECTION_DISTANCE: 100,
    CONNECTION_OPACITY_MAX: 0.035,
    CONNECTION_COLOR_BASE: 'rgba(108, 99, 255, ',
    CONNECTION_LINE_WIDTH: 0.45,
    REPULSION_RADIUS: 195,
    REPULSION_STRENGTH: 0.215,
    DAMPING: 0.961,
    RANDOM_WANDER: 0.041,
    GLOW_BLUR: 10,
    NEW_PARTICLE_POP_RADIUS: 4.2,
    RIPPLE_SPEED: 2.1,
    RIPPLE_FADE: 0.032,
    MERGE_THRESHOLD: 2,
    BASE_MERGE_RADIUS: 15,
    MAX_LEVEL: 2,
    BLACK_HOLE_PULL_RADIUS: 9999,
    BLACK_HOLE_GROW_SPEED: 0.012,
    BLACK_HOLE_MAX_STRENGTH: 2.4,
    ENERGY_PULSE_DURATION: 1000,
    AUTO_ABSORB_RADIUS_LEVEL1: 140,      // ← Increased for better visibility
    ULTIMATE_SUCK_DURATION: 15000,
  };

  const levelColors = [
    '#FF7A18',     // 0 Normal
    '#AA0000',     // 1 Black Hole
    '#000000',     // 2 Ultimate Black Hole
  ];

  const getTargetParticleCount = (width: number, height: number): number => {
    const area = width * height;
    if (width < 640) return Math.min(110, Math.floor(CONFIG.PARTICLE_COUNT_BASE * 0.34));
    if (width < 1024) return Math.min(180, Math.floor(CONFIG.PARTICLE_COUNT_BASE * 0.56));
    return Math.min(CONFIG.MAX_PARTICLES, Math.floor(area / 8500));
  };

  const createParticle = (x: number, y: number, isSpawned = false, level = 0): Particle => {
    const isUltimate = level === 2;
    const targetRadius = level === 0 ? Math.random() * 1.1 + 0.75 : level === 1 ? 11 : 46;

    const initialRadius = isSpawned || level > 0 
      ? targetRadius * (level === 0 ? 4.2 : level === 1 ? 5.5 : 11) 
      : targetRadius;

    return {
      x, y,
      vx: isSpawned || level > 0 ? (Math.random() - 0.5) * (isUltimate ? 0.06 : 0.85 - level * 0.1) : (Math.random() - 0.5) * 0.6,
      vy: isSpawned || level > 0 ? (Math.random() - 0.5) * (isUltimate ? 0.06 : 0.85 - level * 0.1) : (Math.random() - 0.5) * 0.6,
      radius: initialRadius,
      targetRadius,
      color: levelColors[level],
      level,
    };
  };

  const createInitialParticles = (count: number, w: number, h: number): Particle[] => {
    return Array.from({ length: count }, () => createParticle(Math.random() * w, Math.random() * h));
  };

  const hexToRgba = (hex: string, alpha: number): string => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(3)})`;
  };

  const regenerateParticles = (particles: Particle[], width: number, height: number) => {
    const target = getTargetParticleCount(width, height);
    const current = particles.length;
    if (current >= target * CONFIG.MIN_DENSITY_FACTOR) return;

    const needed = Math.min(Math.ceil(target * CONFIG.MIN_DENSITY_FACTOR - current), CONFIG.REGEN_PER_FRAME_MAX);

    for (let i = 0; i < needed; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const p = createParticle(x, y, true, 0);

      const cx = width / 2, cy = height / 2;
      const dx = cx - x, dy = cy - y;
      const dist = Math.hypot(dx, dy) || 1;
      p.vx += (dx / dist) * 0.28;
      p.vy += (dy / dist) * 0.28;

      particlesRef.current.push(p);
    }
  };

  const findDotsNearMouse = (particles: Particle[], mx: number, my: number, radius: number, level: number): Particle[] => {
    return particles.filter((p) => p.level === level && (p.x - mx) ** 2 + (p.y - my) ** 2 < radius * radius);
  };

  // Auto-absorb for Level 1 Black Hole (no hold needed)
  const autoAbsorbByLevel1 = () => {
    const particles = particlesRef.current;
    const blackHoles = particles.filter(p => p.level === 1);

    blackHoles.forEach(bh => {
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        if (p.level === 1) continue;

        const dx = p.x - bh.x;
        const dy = p.y - bh.y;
        if (dx * dx + dy * dy < CONFIG.AUTO_ABSORB_RADIUS_LEVEL1 ** 2) {
          // Visual feedback
          ripplesRef.current.push({ x: bh.x, y: bh.y, radius: 28, alpha: 0.75, color: '#FF4400', speed: 3.5 });
          particles.splice(i, 1);
          bh.targetRadius = Math.min(bh.targetRadius + 1.5, 55);
        }
      }
    });
  };

  const tryMergeNearMouse = () => {
    if (!isHoldingRef.current) return;
    const particles = particlesRef.current;
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;
    if (mx < 0 || my < 0) return;

    const maxLevel = particles.reduce((max, p) => Math.max(max, p.level), 0);
    const effectiveRadius = maxLevel >= 1 ? 20 * maxLevel : CONFIG.BASE_MERGE_RADIUS;

    for (let lvl = 1; lvl >= 0; lvl--) {
      const nearby = findDotsNearMouse(particles, mx, my, effectiveRadius, lvl);
      if (nearby.length >= CONFIG.MERGE_THRESHOLD) {
        const cluster = nearby.slice(0, CONFIG.MERGE_THRESHOLD);
        const sumX = cluster.reduce((s, p) => s + p.x, 0);
        const sumY = cluster.reduce((s, p) => s + p.y, 0);
        const centerX = sumX / cluster.length;
        const centerY = sumY / cluster.length;

        const toRemove = new Set(cluster);
        particlesRef.current = particles.filter((p) => !toRemove.has(p));

        const nextLevel = lvl + 1;
        const special = createParticle(centerX, centerY, false, nextLevel);
        particlesRef.current.push(special);

        const baseRadius = nextLevel === 2 ? 110 : 28;
        ripplesRef.current.push({ x: centerX, y: centerY, radius: baseRadius * 0.3, alpha: 0.95, color: special.color, speed: 3.8 });
        ripplesRef.current.push({ x: centerX, y: centerY, radius: baseRadius * 0.65, alpha: 0.75, color: special.color, speed: 2.9 });
        ripplesRef.current.push({ x: centerX, y: centerY, radius: baseRadius,     alpha: 0.55, color: special.color, speed: 2.2 });

        lastMergeTimeRef.current = Date.now();

        if (nextLevel === 2) {
          blackHoleActiveRef.current = true;
          blackHoleStrengthRef.current = 0;
          document.body.classList.add('ultimate-black-hole', 'ultimate-black-hole-shake');

          if (ultimateTimerRef.current) clearTimeout(ultimateTimerRef.current);
          ultimateTimerRef.current = setTimeout(() => {
            const cx = canvasRef.current!.width / (window.devicePixelRatio || 1) / 2;
            const cy = canvasRef.current!.height / (window.devicePixelRatio || 1) / 2;
            for (let i = 0; i < 30; i++) {
              ripplesRef.current.push({
                x: cx + (Math.random() - 0.5) * 700,
                y: cy + (Math.random() - 0.5) * 700,
                radius: 120 + Math.random() * 280,
                alpha: 0.95,
                color: '#FFAA00',
                speed: 8 + Math.random() * 7,
              });
            }
            document.body.classList.remove('ultimate-black-hole', 'ultimate-black-hole-shake');
            window.location.reload();
          }, CONFIG.ULTIMATE_SUCK_DURATION);
        }

        return;
      }
    }
  };

  const applyBlackHole = (particles: Particle[], width: number, height: number) => {
    if (!blackHoleActiveRef.current) return;

    blackHoleStrengthRef.current = Math.min(
      blackHoleStrengthRef.current + CONFIG.BLACK_HOLE_GROW_SPEED,
      CONFIG.BLACK_HOLE_MAX_STRENGTH
    );

    const cx = width / 2;
    const cy = height / 2;

    particles.forEach((p) => {
      const dx = cx - p.x;
      const dy = cy - p.y;
      const distSq = dx * dx + dy * dy;
      const dist = Math.sqrt(distSq);

      if (dist > 4) {
        const force = blackHoleStrengthRef.current * 1.95;
        p.vx += (dx / dist) * force;
        p.vy += (dy / dist) * force;
      }
    });
  };

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const ctx = canvas.getContext('2d');
    if (ctx) ctx.scale(dpr, dpr);
  }, []);

  const getCanvasCoords = (clientX: number, clientY: number): { x: number; y: number } => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: clientX, y: clientY };
    const rect = canvas.getBoundingClientRect();
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const updateParticles = (particles: Particle[], width: number, height: number) => {
    const mouse = mouseRef.current;
    const forceSign = isHoldingRef.current ? -1 : 1;

    particles.forEach((p) => {
      p.vx += (Math.random() - 0.5) * CONFIG.RANDOM_WANDER;
      p.vy += (Math.random() - 0.5) * CONFIG.RANDOM_WANDER;

      if (mouse.isActive) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < CONFIG.REPULSION_RADIUS ** 2 && distSq > 4) {
          const dist = Math.sqrt(distSq);
          const force = (CONFIG.REPULSION_RADIUS - dist) / CONFIG.REPULSION_RADIUS;
          p.vx += (dx / dist) * force * CONFIG.REPULSION_STRENGTH * forceSign;
          p.vy += (dy / dist) * force * CONFIG.REPULSION_STRENGTH * forceSign;
        }
      }

      const damping = p.level === 2 ? 0.82 : p.level === 1 ? 0.88 : CONFIG.DAMPING;
      p.vx *= damping;
      p.vy *= damping;

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x += width;
      if (p.x > width) p.x -= width;
      if (p.y < 0) p.y += height;
      if (p.y > height) p.y -= height;

      if (p.radius > p.targetRadius) {
        p.radius = p.radius * 0.88 + p.targetRadius * 0.12;
      }
    });

    applyBlackHole(particles, width, height);
  };

  const drawConnections = (ctx: CanvasRenderingContext2D, particles: Particle[]) => {
    const isEnergyPulse = Date.now() - lastMergeTimeRef.current < CONFIG.ENERGY_PULSE_DURATION;
    ctx.lineWidth = isEnergyPulse ? 1.35 : CONFIG.CONNECTION_LINE_WIDTH;

    for (let i = 0; i < particles.length; i++) {
      const p1 = particles[i];
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        if (p1.level !== p2.level) continue;

        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.hypot(dx, dy);

        if (dist < CONFIG.CONNECTION_DISTANCE) {
          let opacity = (1 - dist / CONFIG.CONNECTION_DISTANCE) ** 1.6 * CONFIG.CONNECTION_OPACITY_MAX;
          if (isEnergyPulse) opacity = Math.min(opacity * 2.8, 0.65);

          ctx.strokeStyle = `${CONFIG.CONNECTION_COLOR_BASE}${opacity.toFixed(4)})`;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }
  };

  const drawParticles = (ctx: CanvasRenderingContext2D, particles: Particle[]) => {
    const isEnergyPulse = Date.now() - lastMergeTimeRef.current < CONFIG.ENERGY_PULSE_DURATION;

    particles.forEach((p) => {
      const isBlackHole = p.level >= 1;
      const baseGlow = isBlackHole ? 170 : CONFIG.GLOW_BLUR;
      const glow = isEnergyPulse ? baseGlow * 1.6 : baseGlow;

      ctx.save();
      ctx.shadowColor = p.color;
      ctx.shadowBlur = glow;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.shadowBlur = isBlackHole ? 48 : 4;
      ctx.fillStyle = isBlackHole ? 'rgba(0,0,0,0.98)' : 'rgba(255,255,255,0.88)';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius * (isBlackHole ? 0.88 : 0.48), 0, Math.PI * 2);
      ctx.fill();

      if (isBlackHole) {
        ctx.shadowBlur = 130;
        ctx.strokeStyle = p.level === 2 ? 'rgba(255,60,60,0.65)' : 'rgba(255, 180, 80, 0.55)';
        ctx.lineWidth = 32;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 2.6, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.restore();
    });
  };

  const drawRipples = (ctx: CanvasRenderingContext2D) => {
    ctx.lineWidth = 2.2;
    for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
      const r = ripplesRef.current[i];
      r.radius += r.speed;
      r.alpha -= CONFIG.RIPPLE_FADE * (r.speed / 2.1);

      if (r.alpha <= 0.01) {
        ripplesRef.current.splice(i, 1);
        continue;
      }

      ctx.strokeStyle = hexToRgba(r.color, r.alpha);
      ctx.beginPath();
      ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
      ctx.stroke();
    }
  };

  const handlePointerMove = useCallback((e: PointerEvent) => {
    const { x, y } = getCanvasCoords(e.clientX, e.clientY);
    mouseRef.current.x = x;
    mouseRef.current.y = y;
    mouseRef.current.isActive = true;
  }, []);

  const handlePointerDown = useCallback((e: PointerEvent) => {
    const { x, y } = getCanvasCoords(e.clientX, e.clientY);
    mouseRef.current.x = x;
    mouseRef.current.y = y;
    mouseRef.current.isActive = true;
    isHoldingRef.current = true;
  }, []);

  const handlePointerUp = useCallback((e: PointerEvent) => {
    isHoldingRef.current = false;

    if (particlesRef.current.length >= CONFIG.MAX_PARTICLES) return;

    const { x, y } = getCanvasCoords(e.clientX, e.clientY);

    const newParticle = createParticle(x, y, true, 0);
    particlesRef.current.push(newParticle);

    ripplesRef.current.push({
      x, y, radius: 8, alpha: 0.72, color: newParticle.color, speed: 2.1,
    });
  }, []);

  const handlePointerOut = useCallback(() => {
    mouseRef.current.isActive = false;
    isHoldingRef.current = false;
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width / (window.devicePixelRatio || 1);
    const height = canvas.height / (window.devicePixelRatio || 1);

    ctx.clearRect(0, 0, width, height);

    const particles = particlesRef.current;

    updateParticles(particles, width, height);
    regenerateParticles(particles, width, height);
    autoAbsorbByLevel1();           // ← Fixed & now working

    if (isHoldingRef.current) {
      tryMergeNearMouse();
    }

    drawConnections(ctx, particles);
    drawParticles(ctx, particles);
    drawRipples(ctx);

    animationFrameRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    resizeCanvas();
    const initialCount = getTargetParticleCount(window.innerWidth, window.innerHeight);
    particlesRef.current = createInitialParticles(initialCount, window.innerWidth, window.innerHeight);

    let resizeRaf: number | null = null;
    const handleResize = () => {
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(resizeCanvas);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });
    window.addEventListener('pointerout', handlePointerOut);
    window.addEventListener('resize', handleResize);

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      if (ultimateTimerRef.current) clearTimeout(ultimateTimerRef.current);

      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointerout', handlePointerOut);
      window.removeEventListener('resize', handleResize);
      document.body.classList.remove('ultimate-black-hole', 'ultimate-black-hole-shake');
    };
  }, [resizeCanvas, animate, handlePointerMove, handlePointerDown, handlePointerUp, handlePointerOut]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ background: '#050505' }}
      aria-hidden="true"
    />
  );
};

export default NodeNetworkBackground;