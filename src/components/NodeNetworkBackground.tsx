"use client"; // App Router – client component

import { useEffect, useRef } from "react";

export default function NodeNetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = window.innerWidth;
    let H = window.innerHeight;
    let DPR = Math.min(window.devicePixelRatio || 1, 2); // cap at 2x for perf

    let particles: Particle[] = [];
    let mouse = { x: W / 2, y: H / 2, active: false };
    let raf: number;
    let alive = true;

    const isMobile = W < 980;
    const PARTICLE_COUNT = isMobile ? 120 : 280;
    const MAX_CONNECTION_DIST = isMobile ? 120 : 180;
    const LINE_OPACITY = 0.12; // subtle
    const NODE_RADIUS = isMobile ? 1.4 : 2.2;

    type Particle = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      baseAlpha: number;
    };

    const rnd = (min: number, max: number) => Math.random() * (max - min) + min;

    const initParticles = () => {
      particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: rnd(0, W),
        y: rnd(0, H),
        vx: rnd(-0.4, 0.4),
        vy: rnd(-0.4, 0.4),
        baseAlpha: rnd(0.4, 0.8),
      }));
    };

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      DPR = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = W * DPR;
      canvas.height = H * DPR;
      ctx.scale(DPR, DPR);

      initParticles(); // re-seed on resize
    };

    const draw = () => {
      if (!alive) return;

      ctx.fillStyle = "rgba(10, 15, 30, 0.08)"; // gentle trail fade (dark bg assumed)
      ctx.fillRect(0, 0, W, H);

      // Update & draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Gentle bounce + mouse attraction
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 220) {
            p.vx += dx * 0.0008;
            p.vy += dy * 0.0008;
          }
        }

        // Bounds wrap (infinite feel, no hard edges)
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;

        // Draw node
        ctx.beginPath();
        ctx.arc(p.x, p.y, NODE_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100, 220, 255, ${p.baseAlpha * 0.9})`; // cyan tech glow
        ctx.fill();
      });

      // Connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);

          if (dist < MAX_CONNECTION_DIST) {
            const opacity = (1 - dist / MAX_CONNECTION_DIST) * LINE_OPACITY;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(120, 220, 255, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
        mouse.active = true;
      }
    };

    const onMouseLeave = () => {
      mouse.active = false;
    };

    // Init
    resize();
    draw();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseout", onMouseLeave);
    window.addEventListener("touchmove", onTouchMove);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseout", onMouseLeave);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}