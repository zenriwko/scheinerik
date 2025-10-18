import { useEffect } from "react";

export default function StarsBackground() {
  useEffect(() => {
    const DPR = Math.min(2, window.devicePixelRatio || 1);
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

    // Grab canvases AFTER mount
    const farCanvas  = document.getElementById("stars-far")  as HTMLCanvasElement | null;
    const midCanvas  = document.getElementById("stars-mid")  as HTMLCanvasElement | null;
    const nearCanvas = document.getElementById("stars-near") as HTMLCanvasElement | null;
    const cometsCanvas = document.getElementById("comets")   as HTMLCanvasElement | null;

    if (!farCanvas || !midCanvas || !nearCanvas || !cometsCanvas) return;
    const cctx = cometsCanvas.getContext("2d");
    if (!cctx) return;

    // Three parallax layers
    const LAYERS = [
      { canvas: farCanvas,  count: 260, size: [0.4, 1.2] as [number, number], parallax: 0.18, tw: [0.0015, 0.0035] as [number, number] },
      { canvas: midCanvas,  count: 220, size: [0.6, 1.8] as [number, number], parallax: 0.30, tw: [0.0020, 0.0045] as [number, number] },
      { canvas: nearCanvas, count: 180, size: [0.8, 2.2] as [number, number], parallax: 0.45, tw: [0.0025, 0.0060] as [number, number] },
    ] as const;

    // Config
    const SCROLL_EASE = 0.12;   // smoothing for scroll parallax
    const SCROLL_MULT = 0.20;   // how much stars drift on scroll
    const COMET_PARALLAX = 0.35;

    let W = window.innerWidth;
    let H = window.innerHeight;

    // mouse & scroll inputs
    let mx = 0.5, my = 0.5;
    let scrollTarget = window.scrollY;
    let scrollPos = scrollTarget;

    // loop state
    let last = 0;
    let raf = 0;
    let alive = true;

    type Star = { x:number; y:number; r:number; a:number; tw:number; b:number };
    type Layer = {
      canvas: HTMLCanvasElement;
      count: number;
      size: [number, number];
      parallax: number;
      tw: [number, number];
      ctx?: CanvasRenderingContext2D;
      stars?: Star[];
    };

    const rnd = (a: number, b: number) => Math.random() * (b - a) + a;

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;

      [cometsCanvas, ...LAYERS.map(l => l.canvas)].forEach(c => {
        c.width = Math.max(1, Math.floor(W * DPR));
        c.height = Math.max(1, Math.floor(H * DPR));
        const ctx = c.getContext("2d")!;
        ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      });

      // re-seed stars
      LAYERS.forEach((l: Layer) => {
        l.ctx = l.canvas.getContext("2d")!;
        l.stars = Array.from({ length: l.count }, () => ({
          x: rnd(0, W),
          y: rnd(0, H),
          r: rnd(...l.size),
          a: rnd(0, Math.PI * 2),
          tw: rnd(...l.tw),
          b: rnd(0.25, 0.7),
        }));
      });

      comets.length = 0;
    };

    // --- Comets ---
    type Comet = { x:number; y:number; vx:number; vy:number; life:number; len:number };
    const comets: Comet[] = [];

    const spawnComet = () => {
      const speed = rnd(3, 6);
      const spread = Math.PI / 8;
      const side = Math.floor(Math.random() * 3);
      let x=0, y=0, vx=0, vy=0;

      if (side === 0) { // left
        x = -100; y = rnd(0, H * 0.6);
        const a = rnd(-spread, spread) + Math.PI / 6;
        vx = Math.cos(a) * speed; vy = Math.sin(a) * speed;
      } else if (side === 1) { // top
        x = rnd(0, W * 0.8); y = -100;
        const a = rnd(-spread, spread) + Math.PI / 2.8;
        vx = Math.cos(a) * speed; vy = Math.sin(a) * speed;
      } else { // right
        x = W + 100; y = rnd(0, H * 0.6);
        const a = rnd(-spread, spread) + (Math.PI - Math.PI / 6);
        vx = Math.cos(a) * speed; vy = Math.sin(a) * speed;
      }

      comets.push({ x, y, vx, vy, life: 1, len: rnd(120, 220) });
    };

    const drawComets = (dt: number, oy: number) => {
      cctx.clearRect(0, 0, W, H);

      for (let i = comets.length - 1; i >= 0; i--) {
        const c = comets[i];

        // update world position (no scroll offset here)
        c.x += c.vx; c.y += c.vy; c.life -= dt * 0.00035;

        // apply scroll parallax only to draw position
        const x = c.x;
        const y = c.y + oy * COMET_PARALLAX;

        const lx = x - c.vx * c.len;
        const ly = y - c.vy * c.len;

        const grad = cctx.createLinearGradient(x, y, lx, ly);
        grad.addColorStop(0, `rgba(255,255,255,${0.9 * c.life})`);
        grad.addColorStop(0.3, `rgba(180,200,255,${0.4 * c.life})`);
        grad.addColorStop(1, "rgba(255,255,255,0)");

        cctx.beginPath();
        cctx.moveTo(x, y);
        cctx.lineTo(lx, ly);
        cctx.lineWidth = 2.5;
        cctx.strokeStyle = grad;
        cctx.stroke();

        const head = cctx.createRadialGradient(x, y, 0, x, y, 10);
        head.addColorStop(0, `rgba(255,255,255,${0.9 * c.life})`);
        head.addColorStop(0.5, `rgba(200,220,255,${0.4 * c.life})`);
        head.addColorStop(1, "rgba(255,255,255,0)");

        cctx.beginPath();
        cctx.arc(x, y, 5, 0, Math.PI * 2);
        cctx.fillStyle = head;
        cctx.fill();

        // cull using world coords
        if (c.life <= 0 || c.x < -300 || c.x > W + 300 || c.y > H + 300) {
          comets.splice(i, 1);
        }
      }
    };

    // inputs
    const onMouse = (e: MouseEvent) => {
      mx = e.clientX / W;
      my = e.clientY / H;
    };
    const onScroll = () => {
      scrollTarget = window.scrollY;
    };

    const render = (t: number) => {
      if (!alive) return;
      const dt = t - last || 16;
      last = t;

      // scroll smoothing
      scrollPos += (scrollTarget - scrollPos) * SCROLL_EASE;
      const scrollOffsetY = reduce ? 0 : -scrollPos * SCROLL_MULT;

      // draw stars
      LAYERS.forEach((l: Layer) => {
        const ctx = l.ctx!;
        const stars = l.stars!;
        ctx.clearRect(0, 0, W, H);

        for (const s of stars) {
          if (!reduce) {
            s.a += s.tw * dt;
            if (s.a > Math.PI * 2) s.a -= Math.PI * 2;
          }
          const alpha = reduce ? s.b : s.b * (0.55 + 0.45 * Math.sin(s.a));

          const px = s.x + (mx - 0.5) * 60 * l.parallax;
          const py = s.y
            + (my - 0.5) * 20 * l.parallax
            + scrollOffsetY * l.parallax;

          // wrap vertically so it appears endless
          const wy = ((py % H) + H) % H;

          ctx.beginPath();
          ctx.arc(px, wy, s.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${alpha})`;
          ctx.fill();
        }
      });

      if (!reduce) {
        if (Math.random() < 0.00075) spawnComet();
        drawComets(dt, scrollOffsetY);
      }

      raf = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resize, { passive: true });

    resize();
    raf = requestAnimationFrame(render);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // DOM order: far → mid → near → comets → (optional) trails
  return (
    <div id="bg" aria-hidden="true">
      <canvas id="stars-far" />
      <canvas id="stars-mid" />
      <canvas id="stars-near" />
      <canvas id="comets" />
      <canvas id="trail-canvas" />
    </div>
  );
}