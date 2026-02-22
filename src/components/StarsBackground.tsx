import { useEffect } from "react";

export default function StarsBackground() {
  useEffect(() => {
    const farCanvas = document.getElementById("stars-far") as HTMLCanvasElement;
    const midCanvas = document.getElementById("stars-mid") as HTMLCanvasElement;
    const nearCanvas = document.getElementById("stars-near") as HTMLCanvasElement;
    const cometsCanvas = document.getElementById("comets") as HTMLCanvasElement;

    if (!farCanvas || !midCanvas || !nearCanvas || !cometsCanvas) return;

    const cometCtx = cometsCanvas.getContext("2d")!;
    let W = window.innerWidth;
    let H = document.documentElement.clientHeight;
    let isMobile = W < 980;
    let DPR = Math.min(isMobile ? 1 : 2, window.devicePixelRatio || 1);

    let mx = 0.5;
    let scrollPos = window.scrollY;
    let last = 0;
    let raf = 0;
    let alive = true;

    const SCROLL_EASE = 0.08;
    const SCROLL_MULT = isMobile ? 0.06 : 0.18;

    const rnd = (a: number, b: number) => Math.random() * (b - a) + a;

    // ---------------- STAR SYSTEM ----------------

    type Star = {
      x: number;
      y: number;
      r: number;
      a: number;
      tw: number;
      base: number;
      color: [number, number, number];
    };

    type Layer = {
      canvas: HTMLCanvasElement;
      ctx: CanvasRenderingContext2D;
      baseCount: number;
      size: [number, number];
      parallax: number;
      tw: [number, number];
      stars: Star[];
    };

    const randomStarColor = (): [number, number, number] => {
      const p = Math.random();
      if (p < 0.15) return [180, 210, 255];
      if (p < 0.75) return [255, 255, 255];
      if (p < 0.92) return [255, 230, 180];
      return [255, 170, 160];
    };

    let quality = 1; // starts full
    const QUALITY_REDUCTION = 0.6; // reduce to 60% if FPS drops

    const LAYERS: Layer[] = [
      {
        canvas: farCanvas,
        ctx: farCanvas.getContext("2d")!,
        baseCount: isMobile ? 200 : 500,
        size: [0.3, 0.9],
        parallax: 0.15,
        tw: [0.001, 0.003],
        stars: [],
      },
      {
        canvas: midCanvas,
        ctx: midCanvas.getContext("2d")!,
        baseCount: isMobile ? 155 : 400,
        size: [0.5, 1.3],
        parallax: 0.3,
        tw: [0.002, 0.004],
        stars: [],
      },
      {
        canvas: nearCanvas,
        ctx: nearCanvas.getContext("2d")!,
        baseCount: isMobile ? 90 : 300,
        size: [0.7, 1.7],
        parallax: 0.45,
        tw: [0.003, 0.006],
        stars: [],
      },
    ];

    const seedStars = () => {
      LAYERS.forEach((layer) => {
        const count = Math.floor(layer.baseCount * quality);
        layer.stars = Array.from({ length: count }, () => ({
          x: rnd(0, W),
          y: rnd(0, H),
          r: rnd(...layer.size),
          a: rnd(0, Math.PI * 2),
          tw: rnd(...layer.tw),
          base: rnd(0.3, 0.7),
          color: randomStarColor(),
        }));
      });
    };

    const resize = () => {
      W = window.innerWidth;
      H = document.documentElement.clientHeight;
      isMobile = W < 980;
      DPR = Math.min(isMobile ? 1 : 2, window.devicePixelRatio || 1);

      [farCanvas, midCanvas, nearCanvas, cometsCanvas].forEach((c) => {
        c.width = W * DPR;
        c.height = H * DPR;
        const ctx = c.getContext("2d")!;
        ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      });

      seedStars();
    };

    // ---------------- COMETS (ALWAYS WORK) ----------------

    type Comet = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      born: number;
      duration: number;
      len: number;
    };

    const comets: Comet[] = [];

    const spawnComet = () => {
      const speed = isMobile ? rnd(1, 3) : rnd(3, 4.5);
      const side = Math.floor(Math.random() * 4);

      let x = 0, y = 0, vx = 0, vy = 0;

      switch (side) {
        case 0: x = rnd(0, W); y = 0; vx = rnd(-1, 1) * speed; vy = rnd(0.8, 1.2) * speed; break;
        case 1: x = W; y = rnd(0, H); vx = -rnd(0.8, 1.2) * speed; vy = rnd(-1, 1) * speed; break;
        case 2: x = rnd(0, W); y = H; vx = rnd(-1, 1) * speed; vy = -rnd(0.8, 1.2) * speed; break;
        case 3: x = 0; y = rnd(0, H); vx = rnd(0.8, 1.2) * speed; vy = rnd(-1, 1) * speed; break;
      }

      comets.push({
        x,
        y,
        vx,
        vy,
        born: performance.now(),
        duration: isMobile ? 2200 : 2600,
        len: isMobile ? 90 : 220,
      });
    };

    const drawComets = (scrollOffsetY: number) => {
      cometCtx.clearRect(0, 0, W, H);
      const now = performance.now();

      for (let i = comets.length - 1; i >= 0; i--) {
        const c = comets[i];
        const life = 1 - (now - c.born) / c.duration;
        if (life <= 0) { comets.splice(i, 1); continue; }

        c.x += c.vx;
        c.y += c.vy;

        const x = c.x;
        const y = c.y + scrollOffsetY * 0.3;

        const grad = cometCtx.createLinearGradient(
          x,
          y,
          x - c.vx * c.len * life,
          y - c.vy * c.len * life
        );

        grad.addColorStop(0, `rgba(255,255,255,${life})`);
        grad.addColorStop(1, `rgba(255,255,255,0)`);

        cometCtx.lineWidth = isMobile ? 1.5 : 2.8;
        cometCtx.beginPath();
        cometCtx.moveTo(x, y);
        cometCtx.lineTo(
          x - c.vx * c.len * life,
          y - c.vy * c.len * life
        );
        cometCtx.strokeStyle = grad;
        cometCtx.stroke();
      }
    };

    // ---------------- FPS MONITOR ----------------

    let frameCount = 0;
    let fpsStart = performance.now();

    const render = (t: number) => {
      if (!alive) return;

      const dt = t - last || 16;
      last = t;

      frameCount++;
      if (t - fpsStart >= 2000) {
        const fps = frameCount / 2;
        frameCount = 0;
        fpsStart = t;

        if (fps < 60 && quality === 1) {
          quality = QUALITY_REDUCTION;
          seedStars();
        }
      }

      scrollPos += (window.scrollY - scrollPos) * SCROLL_EASE;
      const scrollOffsetY = -scrollPos * SCROLL_MULT;

      LAYERS.forEach((layer) => {
        const ctx = layer.ctx;
        ctx.clearRect(0, 0, W, H);

        for (const s of layer.stars) {
          s.a += s.tw * dt;
          if (s.a > Math.PI * 2) s.a -= Math.PI * 2;

          const alpha = s.base * (0.6 + 0.4 * Math.sin(s.a));
          const px = isMobile ? s.x : s.x + (mx - 0.5) * 60 * layer.parallax;
          const py = s.y + scrollOffsetY * layer.parallax;
          const wy = ((py % H) + H) % H;

          ctx.beginPath();
          ctx.arc(px, wy, s.r, 0, Math.PI * 2);

          const [r, g, b] = s.color;
          ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
          ctx.fill();
        }
      });

      if (Math.random() < (isMobile ? 0.0003 : 0.0003)) spawnComet();
      drawComets(scrollOffsetY);

      raf = requestAnimationFrame(render);
    };

    const onMouse = (e: MouseEvent) => {
      if (isMobile) return;
      mx = e.clientX / W;
    };

    resize();
    raf = requestAnimationFrame(render);

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouse);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <div id="bg" aria-hidden="true">
      <canvas id="stars-far" />
      <canvas id="stars-mid" />
      <canvas id="stars-near" />
      <canvas id="comets" />
    </div>
  );
}