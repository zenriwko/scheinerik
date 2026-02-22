import { useEffect } from "react";

export default function StarsBackground() {
  useEffect(() => {
    const reduce =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

    const farCanvas = document.getElementById("stars-far") as HTMLCanvasElement | null;
    const midCanvas = document.getElementById("stars-mid") as HTMLCanvasElement | null;
    const nearCanvas = document.getElementById("stars-near") as HTMLCanvasElement | null;
    const cometsCanvas = document.getElementById("comets") as HTMLCanvasElement | null;

    if (!farCanvas || !midCanvas || !nearCanvas || !cometsCanvas) return;

    const cometCtx = cometsCanvas.getContext("2d");
    if (!cometCtx) return;

    let W = window.innerWidth;
    let H = window.innerHeight;
    let isMobile = W < 980;
    let DPR = Math.min(isMobile ? 1 : 2, window.devicePixelRatio || 1);

    let mx = 0.5;
    let scrollPos = window.scrollY;
    let last = 0;
    let raf = 0;
    let alive = true;

    const SCROLL_EASE = 0.10;
    const SCROLL_MULT = isMobile ? 0.08 : 0.18;

    type Star = {
      x: number;
      y: number;
      r: number;
      a: number;
      tw: number;
      b: number;
      color: [number, number, number];
    };

    type Layer = {
      canvas: HTMLCanvasElement;
      ctx: CanvasRenderingContext2D;
      countDesktop: number;
      countMobile: number;
      sizeDesktop: [number, number];
      sizeMobile: [number, number];
      parallaxDesktop: number;
      parallaxMobile: number;
      twDesktop: [number, number];
      twMobile: [number, number];
      stars: Star[];
    };

    const rnd = (a: number, b: number) => Math.random() * (b - a) + a;

    const LAYERS: Layer[] = [
      {
        canvas: farCanvas,
        ctx: farCanvas.getContext("2d")!,
        countDesktop: 600,
        countMobile: 400,
        sizeDesktop: [0.30, 0.80],
        sizeMobile: [0.30, 0.80],
        parallaxDesktop: 0.18,
        parallaxMobile: 0.06,
        twDesktop: [0.008, 0.0020],
        twMobile: [0.0008, 0.0020],
        stars: [],
      },
      {
        canvas: midCanvas,
        ctx: midCanvas.getContext("2d")!,
        countDesktop: 450,
        countMobile: 350,
        sizeDesktop: [0.45, 1.15],
        sizeMobile: [0.45, 1.15],
        parallaxDesktop: 0.30,
        parallaxMobile: 0.10,
        twDesktop: [0.0010, 0.0025],
        twMobile: [0.0010, 0.0025],
        stars: [],
      },
      {
        canvas: nearCanvas,
        ctx: nearCanvas.getContext("2d")!,
        countDesktop: 300,
        countMobile: 250,
        sizeDesktop: [0.60, 1.45],
        sizeMobile: [0.60, 1.45],
        parallaxDesktop: 0.45,
        parallaxMobile: 0.16,
        twDesktop: [0.0012, 0.0030],
        twMobile: [0.0012, 0.0030],
        stars: [],
      },
    ];

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      isMobile = W < 980;
      DPR = Math.min(isMobile ? 1 : 2, window.devicePixelRatio || 1);

      [farCanvas, midCanvas, nearCanvas, cometsCanvas].forEach((c) => {
        c.width = Math.floor(W * DPR);
        c.height = Math.floor(H * DPR);
        const ctx = c.getContext("2d")!;
        ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      });

      LAYERS.forEach((layer) => {
        const count = isMobile ? layer.countMobile : layer.countDesktop;
        const size = isMobile ? layer.sizeMobile : layer.sizeDesktop;
        const tw = isMobile ? layer.twMobile : layer.twDesktop;

        layer.stars = Array.from({ length: count }, () => ({
          x: rnd(0, W),
          y: rnd(0, H),
          r: rnd(...size),
          a: rnd(0, Math.PI * 2),
          tw: rnd(...tw),
          b: rnd(0.2, 0.55),
          color: randomStarColor(),
        }));
      });
    };

    const render = (t: number) => {
      if (!alive) return;

      const dt = t - last || 16;
      last = t;

      scrollPos += (window.scrollY - scrollPos) * SCROLL_EASE;
      const scrollOffsetY = reduce ? 0 : -scrollPos * SCROLL_MULT;

      LAYERS.forEach((layer) => {
        const ctx = layer.ctx;
        ctx.clearRect(0, 0, W, H);

        const parallax = isMobile
          ? layer.parallaxMobile
          : layer.parallaxDesktop;

        for (const s of layer.stars) {
          if (!reduce) {
            s.a += s.tw * dt;
            if (s.a > Math.PI * 2) s.a -= Math.PI * 2;
          }

          const alpha = s.b * (0.6 + 0.4 * Math.sin(s.a));

          const px = isMobile
            ? s.x
            : s.x + (mx - 0.5) * 60 * parallax;

          const py = s.y + scrollOffsetY * parallax;
          const wy = ((py % H) + H) % H;

          ctx.beginPath();
          ctx.arc(px, wy, s.r, 0, Math.PI * 2);
          const [r, g, b] = s.color;
          ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
          ctx.fill();
        }
      });

      if (isMobile) {
        setTimeout(() => {
          raf = requestAnimationFrame(render);
        }, 32);
      } else {
        raf = requestAnimationFrame(render);
      }
    };

    const onMouse = (e: MouseEvent) => {
      if (isMobile) return;
      mx = e.clientX / W;
    };


    const randomStarColor = (): [number, number, number] => {
      const p = Math.random();

      if (p < 0.15) {
        // Blue stars (hot)
        return [170 + rnd(0, 40), 200 + rnd(0, 40), 255];
      } else if (p < 0.75) {
        // White / neutral
        const v = 230 + rnd(0, 25);
        return [v, v, 255];
      } else if (p < 0.92) {
        // Warm yellow
        return [255, 220 + rnd(0, 20), 170 + rnd(0, 20)];
      } else {
        // Red giants (rare)
        return [255, 160 + rnd(0, 20), 150 + rnd(0, 20)];
      }
    };


    resize();
    raf = requestAnimationFrame(render);

    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("mousemove", onMouse, { passive: true });

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