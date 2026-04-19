'use client';

import React, { useRef, useEffect } from 'react';

const BG_COLOR = '#0a0f1c';

const NodeNetworkBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({
    fireflies: [] as Array<{
      x: number; y: number;
      vx: number; vy: number;
      size: number; life: number;
      speed: number; phase: number;
    }>,
    mouse: { x: 0, y: 0, active: false },
    w: 0,
    h: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false, willReadFrequently: false });
    if (!ctx) return;

    const s = stateRef.current;
    let animId: number;

    const isMobile = () => window.innerWidth < 768;

    const resize = () => {
      // Use visualViewport when available — fixes iOS Safari dynamic address bar
      const vv = window.visualViewport;
      s.w = vv ? vv.width  : window.innerWidth;
      s.h = vv ? vv.height : window.innerHeight;
      canvas.width  = s.w;
      canvas.height = s.h;
    };

    // Fewer particles on mobile — keeps animation smooth
    const targetCount = () => {
      const base = Math.round((s.h / 100) * 14) + 6;
      return isMobile() ? Math.round(base * 0.45) : base;
    };

    const spawn = (x?: number, y?: number) => ({
      x:     x  ?? Math.random() * s.w,
      y:     y  ?? Math.random() * s.h,
      vx:    (Math.random() - 0.5) * 0.4,
      vy:    (Math.random() - 0.5) * 0.4,
      size:  Math.random() * 1.1 + 0.7,
      life:  Math.random() * 0.6 + 0.9,
      speed: Math.random() * 0.006 + 0.003,
      phase: Math.random() * Math.PI * 2,
    });

    const init = () => {
      resize();
      const n = targetCount();
      s.fireflies = Array.from({ length: n }, () => spawn());
    };

    const draw = () => {
      const { w, h, fireflies, mouse } = s;

      // Solid fill instead of clearRect — avoids transparent canvas on mobile
      ctx.fillStyle = BG_COLOR;
      ctx.fillRect(0, 0, w, h);

      ctx.shadowColor = 'rgba(20, 184, 166, 0.6)';
      ctx.shadowBlur  = 5;

      const now = Date.now();

      for (let i = fireflies.length - 1; i >= 0; i--) {
        const f = fireflies[i];

        f.vx += (Math.random() - 0.5) * 0.07;
        f.vy += (Math.random() - 0.5) * 0.07;
        f.vx *= 0.97;
        f.vy *= 0.97;
        f.x  += f.vx;
        f.y  += f.vy;

        if (mouse.active) {
          const dx   = f.x - mouse.x;
          const dy   = f.y - mouse.y;
          const dist = Math.hypot(dx, dy) || 1;
          if (dist < 220) {
            const force = ((220 - dist) / 220) * 0.1;
            f.vx += (dx / dist) * force;
            f.vy += (dy / dist) * force;
          }
        }

        if (f.x < 0)   f.x = w;
        if (f.x > w)   f.x = 0;
        if (f.y < 0)   f.y = h;
        if (f.y > h)   f.y = 0;

        f.life -= 0.001;
        if (f.life <= 0) { fireflies[i] = spawn(); continue; }

        const twinkle = Math.sin(now * f.speed + f.phase) * 0.12 + 0.88;
        const alpha   = Math.min(f.life * twinkle, 1);

        ctx.globalAlpha = alpha;
        ctx.fillStyle   = '#14b8a6';
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      ctx.shadowBlur  = 0;

      animId = requestAnimationFrame(draw);
    };

    // Desktop: mouse
    const onMove  = (e: MouseEvent) => { s.mouse.x = e.clientX; s.mouse.y = e.clientY; s.mouse.active = true; };
    const onLeave = () => { s.mouse.active = false; };

    // Mobile: touch — use first touch point for repulsion
    const onTouch = (e: TouchEvent) => {
      if (e.touches.length === 0) { s.mouse.active = false; return; }
      const t = e.touches[0];
      s.mouse.x = t.clientX;
      s.mouse.y = t.clientY;
      s.mouse.active = true;
    };
    const onTouchEnd = () => { s.mouse.active = false; };

    // Pause when tab hidden — saves battery
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animId);
      } else {
        draw();
      }
    };

    // Re-init on visualViewport resize (iOS address bar show/hide)
    const vv = window.visualViewport;
    const onVVResize = () => { resize(); };

    init();
    draw();

    window.addEventListener('resize', init);
    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    window.addEventListener('touchmove', onTouch, { passive: true });
    window.addEventListener('touchend', onTouchEnd);
    document.addEventListener('visibilitychange', onVisibility);
    vv?.addEventListener('resize', onVVResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', init);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('touchmove', onTouch);
      window.removeEventListener('touchend', onTouchEnd);
      document.removeEventListener('visibilitychange', onVisibility);
      vv?.removeEventListener('resize', onVVResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none' }}
      aria-hidden="true"
    />
  );
};

export default NodeNetworkBackground;
