'use client';

import React, { useRef, useEffect } from 'react';

const NodeNetworkBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const firefliesRef = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    life: number;
    speed: number;
    phase: number;
  }>>([]);

  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const scrollYRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let w = 0, h = 0;
    let animationFrame: number;

    // ~22 fireflies per 100vh
    const getTargetCount = () => Math.floor((h / 100) * 22) + 8;

    const resize = () => {
      w = window.innerWidth;
      h = Math.max(
        window.innerHeight,
        document.documentElement.scrollHeight
      );
      canvas.width = w;
      canvas.height = h;
    };

    const spawnFirefly = (x?: number, y?: number) => ({
      x: x ?? Math.random() * w,
      y: y ?? Math.random() * h,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      size: Math.random() * 1.05 + 0.85,
      life: Math.random() * 0.6 + 0.9,        // 3× longer life
      speed: Math.random() * 0.007 + 0.004,   // very slow shimmer
      phase: Math.random() * Math.PI * 2,
    });

    const init = () => {
      resize();
      firefliesRef.current = [];
      const target = getTargetCount();
      for (let i = 0; i < target; i++) {
        firefliesRef.current.push(spawnFirefly());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, w, h);

      const fireflies = firefliesRef.current;
      const mouse = mouseRef.current;
      const scrollY = scrollYRef.current;

      for (let i = fireflies.length - 1; i >= 0; i--) {
        const f = fireflies[i];

        f.x += f.vx;
        f.y += f.vy;

        f.vx += (Math.random() - 0.5) * 0.08;
        f.vy += (Math.random() - 0.5) * 0.08;

        f.vx *= 0.965;
        f.vy *= 0.965;

        // Very gentle mouse push (2× weaker)
        if (mouse.active) {
          const dx = f.x - mouse.x;
          const dy = f.y - (mouse.y + scrollY);
          const dist = Math.hypot(dx, dy) || 1;
          if (dist < 260) {
            const force = (260 - dist) / 260 * 0.14;   // 2× less aggressive
            f.vx += (dx / dist) * force;
            f.vy += (dy / dist) * force;
          }
        }

        // Wrap
        if (f.x < 0) f.x = w;
        if (f.x > w) f.x = 0;
        if (f.y < 0) f.y = h;
        if (f.y > h) f.y = 0;

        // 3× longer life
        f.life -= 0.001;
        if (f.life <= 0) {
          fireflies[i] = spawnFirefly();
          continue;
        }

        // Very subtle shimmer
        const twinkle = Math.sin(Date.now() * f.speed + f.phase) * 0.15 + 0.85;
        const alpha = f.life * twinkle;

        ctx.save();
        ctx.shadowColor = '#14b8a6';
        ctx.shadowBlur = 4 + twinkle * 2.5;
        ctx.fillStyle = `rgba(20, 184, 166, ${alpha})`;
        ctx.beginPath();
        ctx.arc(f.x, f.y - scrollY, f.size, 0, Math.PI * 2); // offset by scroll
        ctx.fill();
        ctx.restore();
      }

      animationFrame = requestAnimationFrame(animate);
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const onScroll = () => {
      scrollYRef.current = window.scrollY;
    };

    const onMouseLeave = () => mouseRef.current.active = false;

    // Init
    init();
    animate();

    window.addEventListener('resize', init);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', init);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ background: 'var(--bg)' }}
      aria-hidden="true"
    />
  );
};

export default NodeNetworkBackground;