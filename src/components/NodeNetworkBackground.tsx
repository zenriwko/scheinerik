// components/NodeNetworkBackground.tsx
// EPIC FINAL: Levels 0-11 + Level 11 grows huge (14s) → shrinks to ~5px (last 1s) → MASSIVE BIG BANG explosion + reload + site zoom-out

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
  level: number;
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
  const ultimateStartTimeRef = useRef(0);
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
    RIPPLE_FADE: 0.032,
    MERGE_THRESHOLD: 2,
    BASE_MERGE_RADIUS: 15,
    MAX_LEVEL: 11,
    ULTIMATE_SUCK_DURATION: 15000,
    ULTIMATE_GROW_END: 14000,
    ULTIMATE_MAX_RADIUS: 520,
    ULTIMATE_SHRINK_TO: 5,
  };

  const levelColors = ['#FF3300','#FFD700','#00FF7F','#00F0FF','#FF00FF','#FF2A00','#BFFF00','#8A00FF','#FF0099','#00FFEE','#AA0000','#000000'];

  const getTargetParticleCount = (width: number, height: number): number => {
    const area = width * height;
    if (width < 640) return Math.min(110, Math.floor(CONFIG.PARTICLE_COUNT_BASE * 0.34));
    if (width < 1024) return Math.min(180, Math.floor(CONFIG.PARTICLE_COUNT_BASE * 0.56));
    return Math.min(CONFIG.MAX_PARTICLES, Math.floor(area / 8500));
  };

  const createParticle = (x: number, y: number, isSpawned = false, level = 0): Particle => {
    const targetRadius = level === 0 ? Math.random() * 1.1 + 0.75 : level < 11 ? 2.4 + level * 1.18 : 46;
    const initialRadius = isSpawned || level > 0 ? targetRadius * (level === 0 ? 4.2 : level < 11 ? 6.8 + level * 0.75 : 18) : targetRadius;
    return { x, y, vx: (Math.random() - 0.5) * (level === 11 ? 0.06 : 0.85 - level * 0.07), vy: (Math.random() - 0.5) * (level === 11 ? 0.06 : 0.85 - level * 0.07), radius: initialRadius, targetRadius, color: levelColors[level], level };
  };

  const createInitialParticles = (count: number, w: number, h: number): Particle[] => Array.from({ length: count }, () => createParticle(Math.random() * w, Math.random() * h));

  const hexToRgba = (hex: string, alpha: number): string => {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return `rgba(${r},${g},${b},${alpha.toFixed(3)})`;
  };

  const regenerateParticles = (particles: Particle[], width: number, height: number) => {
    const target = getTargetParticleCount(width, height);
    const current = particles.length;
    if (current >= target * CONFIG.MIN_DENSITY_FACTOR) return;
    const needed = Math.min(Math.ceil(target * CONFIG.MIN_DENSITY_FACTOR - current), CONFIG.REGEN_PER_FRAME_MAX);
    for (let i = 0; i < needed; i++) {
      const x = Math.random() * width, y = Math.random() * height;
      const p = createParticle(x, y, true, 0);
      const cx = width / 2, cy = height / 2;
      const dist = Math.hypot(cx - x, cy - y) || 1;
      p.vx += (cx - x) / dist * 0.28; p.vy += (cy - y) / dist * 0.28;
      particlesRef.current.push(p);
    }
  };

  const findDotsNearMouse = (particles: Particle[], mx: number, my: number, radius: number, level: number): Particle[] =>
    particles.filter(p => p.level === level && (p.x - mx)**2 + (p.y - my)**2 < radius * radius);

  const autoAbsorbByLevel10 = () => {
    const particles = particlesRef.current;
    const level10s = particles.filter(p => p.level === 10);
    level10s.forEach(bh => {
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        if (p.level === 10) continue;
        const dx = p.x - bh.x, dy = p.y - bh.y;
        if (dx*dx + dy*dy < 85**2) {
          ripplesRef.current.push({ x: bh.x, y: bh.y, radius: 18, alpha: 0.65, color: '#FF4400', speed: 2.8 });
          particles.splice(i, 1);
          bh.targetRadius = Math.min(bh.targetRadius + 0.8, 48);
        }
      }
    });
  };

  const autoAbsorbByUltimate = () => {
    if (!blackHoleActiveRef.current) return;
    const ubh = particlesRef.current.find(p => p.level === 11);
    if (!ubh) return;
    const absorbRadius = ubh.radius * 1.85 + 140;
    for (let i = particlesRef.current.length - 1; i >= 0; i--) {
      const p = particlesRef.current[i];
      if (p.level === 11) continue;
      const dx = p.x - ubh.x, dy = p.y - ubh.y;
      if (dx*dx + dy*dy < absorbRadius**2) {
        ripplesRef.current.push({ x: ubh.x, y: ubh.y, radius: 48, alpha: 0.92, color: '#FF2200', speed: 7.5 });
        particlesRef.current.splice(i, 1);
        ubh.targetRadius = Math.min(ubh.targetRadius + 2.4, CONFIG.ULTIMATE_MAX_RADIUS);
      }
    }
  };

  const growUltimateBlackHole = () => {
    if (!blackHoleActiveRef.current) return;
    const ubh = particlesRef.current.find(p => p.level === 11);
    if (!ubh) return;
    const elapsed = Date.now() - ultimateStartTimeRef.current;
    if (elapsed < CONFIG.ULTIMATE_GROW_END) {
      const prog = elapsed / CONFIG.ULTIMATE_GROW_END;
      ubh.targetRadius = 92 + (CONFIG.ULTIMATE_MAX_RADIUS - 92) * prog;
    } else {
      const sprog = Math.min((elapsed - CONFIG.ULTIMATE_GROW_END) / (CONFIG.ULTIMATE_SUCK_DURATION - CONFIG.ULTIMATE_GROW_END), 1);
      ubh.targetRadius = CONFIG.ULTIMATE_MAX_RADIUS + (CONFIG.ULTIMATE_SHRINK_TO - CONFIG.ULTIMATE_MAX_RADIUS) * sprog;
    }
  };

  const applyUltimateSuck = (particles: Particle[]) => {
    if (!blackHoleActiveRef.current) return;
    const ubh = particles.find(p => p.level === 11);
    if (!ubh) return;
    blackHoleStrengthRef.current = Math.min(blackHoleStrengthRef.current + 0.0038, 1.65);
    const cx = ubh.x, cy = ubh.y;
    particles.forEach(p => {
      if (p.level === 11) return;
      const dx = cx - p.x, dy = cy - p.y;
      const dist = Math.hypot(dx, dy);
      if (dist > 6) {
        const force = blackHoleStrengthRef.current * 1.9 * (1 + ubh.radius / 120);
        p.vx += (dx / dist) * force;
        p.vy += (dy / dist) * force;
      }
    });
  };

  const tryMergeNearMouse = () => {
    if (!isHoldingRef.current) return;
    const particles = particlesRef.current;
    const mx = mouseRef.current.x, my = mouseRef.current.y;
    if (mx < 0 || my < 0) return;
    const maxLevel = particles.reduce((m, p) => Math.max(m, p.level), 0);
    const effectiveRadius = maxLevel >= 1 ? 19 * maxLevel : CONFIG.BASE_MERGE_RADIUS;
    for (let lvl = CONFIG.MAX_LEVEL - 1; lvl >= 0; lvl--) {
      const nearby = findDotsNearMouse(particles, mx, my, effectiveRadius, lvl);
      if (nearby.length >= CONFIG.MERGE_THRESHOLD) {
        const cluster = nearby.slice(0, CONFIG.MERGE_THRESHOLD);
        const cx = cluster.reduce((s, p) => s + p.x, 0) / cluster.length;
        const cy = cluster.reduce((s, p) => s + p.y, 0) / cluster.length;
        const toRemove = new Set(cluster);
        particlesRef.current = particles.filter(p => !toRemove.has(p));
        const nextLevel = lvl + 1;
        const special = createParticle(cx, cy, false, nextLevel);
        particlesRef.current.push(special);
        const base = nextLevel === 11 ? 165 : 18 + nextLevel * 7;
        ripplesRef.current.push({ x: cx, y: cy, radius: base * 0.3, alpha: 0.95, color: special.color, speed: 4.1 });
        ripplesRef.current.push({ x: cx, y: cy, radius: base * 0.65, alpha: 0.78, color: special.color, speed: 3.2 });
        ripplesRef.current.push({ x: cx, y: cy, radius: base, alpha: 0.55, color: special.color, speed: 2.4 });
        lastMergeTimeRef.current = Date.now();
        if (nextLevel === 11) {
          blackHoleActiveRef.current = true;
          blackHoleStrengthRef.current = 0;
          ultimateStartTimeRef.current = Date.now();
          document.body.classList.add('ultimate-black-hole', 'ultimate-black-hole-shake');
          const html = document.documentElement;
          html.style.transition = 'transform 14.5s cubic-bezier(0.23,1,0.32,1)';
          html.style.transformOrigin = 'center';
          html.style.transform = 'scale(0.54)';
          if (ultimateTimerRef.current) clearTimeout(ultimateTimerRef.current);
          ultimateTimerRef.current = setTimeout(() => {
            const dpr = window.devicePixelRatio || 1;
            let cx = (canvasRef.current?.width || 0) / dpr / 2;
            let cy = (canvasRef.current?.height || 0) / dpr / 2;
            const ubh = particlesRef.current.find(p => p.level === 11);
            if (ubh) { cx = ubh.x; cy = ubh.y; }
            const html = document.documentElement;
            html.style.transition = 'transform 0.5s';
            html.style.transform = 'scale(1)';
            // MASSIVE BIG BANG
            for (let i = 0; i < 92; i++) {
              const ox = (Math.random() - 0.5) * 1150;
              const oy = (Math.random() - 0.5) * 1150;
              const rad = 110 + Math.random() * 590;
              const sp = 11 + Math.random() * 26;
              const cols = ['#FFFFFF','#FFEE99','#FFCC44','#FF6622','#FF1111'];
              ripplesRef.current.push({ x: cx + ox, y: cy + oy, radius: rad * 0.07, alpha: 0.97, color: cols[Math.floor(Math.random()*cols.length)], speed: sp });
            }
            for (let i = 0; i < 14; i++) {
              ripplesRef.current.push({ x: cx, y: cy, radius: 30 + i * 68, alpha: 0.8 - i * 0.05, color: i < 5 ? '#FFFFFF' : '#FFEE66', speed: 26 + i * 4.5 });
            }
            document.body.classList.remove('ultimate-black-hole', 'ultimate-black-hole-shake');
            window.location.reload();
          }, CONFIG.ULTIMATE_SUCK_DURATION);
        }
        return;
      }
    }
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
    particles.forEach(p => {
      p.vx += (Math.random() - 0.5) * CONFIG.RANDOM_WANDER;
      p.vy += (Math.random() - 0.5) * CONFIG.RANDOM_WANDER;
      if (mouse.isActive) {
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < CONFIG.REPULSION_RADIUS ** 2 && distSq > 4) {
          const dist = Math.sqrt(distSq);
          const force = (CONFIG.REPULSION_RADIUS - dist) / CONFIG.REPULSION_RADIUS;
          p.vx += (dx / dist) * force * CONFIG.REPULSION_STRENGTH * forceSign;
          p.vy += (dy / dist) * force * CONFIG.REPULSION_STRENGTH * forceSign;
        }
      }
      const damping = p.level === 11 ? 0.81 : p.level > 5 ? 0.89 : CONFIG.DAMPING;
      p.vx *= damping; p.vy *= damping;
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x += width; if (p.x > width) p.x -= width;
      if (p.y < 0) p.y += height; if (p.y > height) p.y -= height;
      p.radius = p.radius * 0.88 + p.targetRadius * 0.12;
    });
  };

  const drawConnections = (ctx: CanvasRenderingContext2D, particles: Particle[]) => {
    const pulse = Date.now() - lastMergeTimeRef.current < 1000;
    ctx.lineWidth = pulse ? 1.4 : CONFIG.CONNECTION_LINE_WIDTH;
    for (let i = 0; i < particles.length; i++) {
      const p1 = particles[i];
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        if (p1.level !== p2.level) continue;
        const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
        if (dist < CONFIG.CONNECTION_DISTANCE) {
          let op = (1 - dist / CONFIG.CONNECTION_DISTANCE) ** 1.6 * CONFIG.CONNECTION_OPACITY_MAX;
          if (pulse) op = Math.min(op * 3.1, 0.68);
          ctx.strokeStyle = `${CONFIG.CONNECTION_COLOR_BASE}${op.toFixed(4)})`;
          ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
        }
      }
    }
  };

  const drawParticles = (ctx: CanvasRenderingContext2D, particles: Particle[]) => {
    const pulse = Date.now() - lastMergeTimeRef.current < 1000;
    particles.forEach(p => {
      const isBH = p.level >= 10;
      const glow = pulse ? (isBH ? 310 : 22) : (isBH ? 185 : p.level > 0 ? 32 + p.level * 3 : 10);
      ctx.save();
      ctx.shadowColor = p.color;
      ctx.shadowBlur = glow;
      ctx.fillStyle = p.color;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2); ctx.fill();
      ctx.shadowBlur = isBH ? 52 : 5;
      ctx.fillStyle = isBH ? 'rgba(0,0,0,0.98)' : 'rgba(255,255,255,0.88)';
      ctx.beginPath(); ctx.arc(p.x, p.y, p.radius * (isBH ? 0.87 : 0.5), 0, Math.PI * 2); ctx.fill();
      if (isBH) {
        ctx.shadowBlur = 145;
        ctx.strokeStyle = p.level === 11 ? 'rgba(255,70,70,0.7)' : 'rgba(255,190,70,0.6)';
        ctx.lineWidth = 34;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.radius * 2.7, 0, Math.PI * 2); ctx.stroke();
      }
      ctx.restore();
    });
  };

  const drawRipples = (ctx: CanvasRenderingContext2D) => {
    ctx.lineWidth = 2.3;
    for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
      const r = ripplesRef.current[i];
      r.radius += r.speed;
      r.alpha -= CONFIG.RIPPLE_FADE * (r.speed / 2.1);
      if (r.alpha <= 0.008) { ripplesRef.current.splice(i, 1); continue; }
      ctx.strokeStyle = hexToRgba(r.color, r.alpha);
      ctx.beginPath(); ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2); ctx.stroke();
    }
  };

  const handlePointerMove = useCallback((e: PointerEvent) => {
    const { x, y } = getCanvasCoords(e.clientX, e.clientY);
    mouseRef.current.x = x; mouseRef.current.y = y; mouseRef.current.isActive = true;
  }, []);

  const handlePointerDown = useCallback((e: PointerEvent) => {
    const { x, y } = getCanvasCoords(e.clientX, e.clientY);
    mouseRef.current.x = x; mouseRef.current.y = y; mouseRef.current.isActive = true;
    isHoldingRef.current = true;
  }, []);

  const handlePointerUp = useCallback((e: PointerEvent) => {
    isHoldingRef.current = false;
    if (particlesRef.current.length >= CONFIG.MAX_PARTICLES) return;
    const { x, y } = getCanvasCoords(e.clientX, e.clientY);
    const np = createParticle(x, y, true, 0);
    particlesRef.current.push(np);
    ripplesRef.current.push({ x, y, radius: 9, alpha: 0.75, color: np.color, speed: 2.3 });
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
    growUltimateBlackHole();
    autoAbsorbByUltimate();
    applyUltimateSuck(particles);
    if (isHoldingRef.current) {
      autoAbsorbByLevel10();
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
      const html = document.documentElement;
      html.style.transition = '';
      html.style.transform = '';
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