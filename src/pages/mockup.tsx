import { useRef, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import {
  Download, ImageDown, Loader2, Monitor, Laptop, Tablet, Smartphone, TriangleAlert, RotateCcw,
  Maximize2, Globe, Link2, Palette, Zap, ShieldCheck, Users, LayoutGrid, SlidersHorizontal,
} from 'lucide-react';
import SEO from '@/components/%SEO/SEO';
import JsonLd from '@/components/%SEO/JsonLd';
import {
  buildMockupComposite,
  fitLayoutToCanvas,
  canvasHeightFor,
  CANVAS_W,
  DEVICE_SIZE,
  DEFAULT_LAYOUT,
  DEFAULT_ORDER,
  BACKGROUND_STYLES,
  DEVICE_STYLES,
  type DeviceKey,
  type DeviceLayout,
  type AspectRatioKey,
  type BackgroundStyle,
  type DeviceStyle,
  type Tint,
  type CompositeShots,
} from '@/lib/mockupComposite';
import styles from './mockup.module.css';

type Screenshots = CompositeShots;
type Position = { xPct: number; yPct: number; widthPct: number };
type Positions = Record<DeviceKey, Position>;

const DEVICES: { key: DeviceKey; Icon: typeof Monitor; label: string; dims: string }[] = [
  { key: 'desktop', Icon: Monitor, label: 'Desktop', dims: '1920 × 1080' },
  { key: 'laptop', Icon: Laptop, label: 'Laptop', dims: '1366 × 768' },
  { key: 'tablet', Icon: Tablet, label: 'Tablet', dims: '768 × 1024' },
  { key: 'phone', Icon: Smartphone, label: 'Phone', dims: '375 × 812' },
];

const ASPECT_OPTIONS: AspectRatioKey[] = ['16:9', '4:3', '1:1'];
const MIN_WIDTH_PCT = 6;
const MAX_WIDTH_PCT = 92;

// Real capture viewport sizes — must stay in sync with VIEWPORTS in
// functions/api/mockup.ts. Used to render the live-preview iframes at their
// actual device width (so the site's own responsive breakpoints kick in
// correctly) before scaling the whole thing down to fit a card.
const REAL_DEVICE_SIZE: Record<DeviceKey, { w: number; h: number }> = {
  desktop: { w: 1920, h: 1080 },
  laptop: { w: 1366, h: 768 },
  tablet: { w: 768, h: 1024 },
  phone: { w: 375, h: 812 },
};
const LIVE_PREVIEW_TARGET_W = 300;

const BACKGROUND_LABELS: Record<BackgroundStyle, string> = {
  gradient: 'Gradient',
  dots: 'Dot grid',
  spotlight: 'Spotlight',
  flat: 'Flat',
  transparent: 'Transparent',
};

const DEVICE_STYLE_LABELS: Record<DeviceStyle, string> = {
  browser: 'Browser chrome',
  modern: 'Modern',
};

const DEFAULT_TINT_COLOR = '#14b8a6';
const DEFAULT_TINT_OPACITY = 35;

// Long-form SEO/content sections rendered below the tool. Kept as plain data
// + a shared class-naming scheme (seo*) so this whole block, and its CSS in
// mockup.module.css, can be copy-pasted as a starting template for future
// /tools pages rather than rebuilt from scratch each time.
const TOOL_STEPS = [
  {
    Icon: Link2,
    title: 'Paste a URL',
    text: 'Enter any public website address. No account, install, or browser extension required. The capture runs entirely on the server.',
  },
  {
    Icon: Monitor,
    title: 'Capture four viewports',
    text: 'The tool loads the page in a real browser at four standard breakpoints, desktop, laptop, tablet, and phone, and takes a full screenshot of each.',
  },
  {
    Icon: Palette,
    title: 'Arrange and style',
    text: 'Drag each device into place, resize it, pick a background style, and choose a device frame. Add a color tint to match a brand palette if you want.',
  },
  {
    Icon: Download,
    title: 'Download',
    text: 'Export the four screenshots individually, or download the arranged composite as one PNG, with a transparent background if you plan to drop it into another design.',
  },
];

const TOOL_BENEFITS = [
  {
    Icon: Zap,
    title: 'Save time',
    text: 'Skip manually resizing a browser window four times, taking screenshots, and framing each one in Photoshop. What used to take twenty minutes takes about thirty seconds.',
  },
  {
    Icon: Monitor,
    title: 'Look professional',
    text: 'A framed, multi-device mockup reads as finished work in a portfolio or case study. A plain, uncropped screenshot does not.',
  },
  {
    Icon: Smartphone,
    title: 'Prove responsive design',
    text: 'Showing a site at four widths side by side is the fastest way to demonstrate that a layout actually adapts, not just resizes.',
  },
  {
    Icon: ShieldCheck,
    title: 'No signup, no watermark',
    text: 'The tool is free to use, does not require an account, and never stamps a logo over your screenshots.',
  },
  {
    Icon: LayoutGrid,
    title: 'Flexible output shapes',
    text: 'Export the combined mockup as 16:9 for a landing page hero, 4:3 for a slide deck, or 1:1 for a social post, without redoing the arrangement each time.',
  },
];

const TOOL_AUDIENCE = [
  { title: 'Freelance developers and agencies', text: 'Portfolio pieces and client handoffs that need to look finished, not like a raw screenshot folder.' },
  { title: 'Indie hackers and SaaS founders', text: 'A quick, polished visual for a launch post, a Product Hunt listing, or a landing page hero.' },
  { title: 'Marketers and content teams', text: 'Blog post headers, case studies, and social previews that show a real product instead of a stock photo.' },
  { title: 'Students and bootcamp grads', text: 'Portfolio projects that look like professional work without opening a design tool.' },
  { title: 'QA and design teams', text: 'A fast visual check across breakpoints without opening dev tools and resizing a window by hand.' },
];

const TOOL_FAQ = [
  {
    q: 'Is this mockup generator free?',
    a: "Yes. There's no signup, no watermark, and no limit beyond a fair-use rate limit that stops any single visitor from hammering the capture service for everyone else.",
  },
  {
    q: 'What resolutions does it capture?',
    a: 'Four fixed breakpoints: desktop at 1920×1080, laptop at 1366×768, tablet at 768×1024 (portrait), and phone at 375×812 (portrait). These match the most common device categories used in portfolios and marketing pages.',
  },
  {
    q: 'Will it work on any website?',
    a: "Most public sites work without any changes. A small number of sites block automated browsers or set headers that prevent embedding. If capture fails, the built-in live preview mode loads the real site directly in an iframe as a fallback.",
  },
  {
    q: 'Does it capture JavaScript-rendered content?',
    a: 'Yes. The tool uses a real browser to render each page before capturing it, so single-page apps, lazy-loaded images, and client-side frameworks show up correctly, not just the raw HTML.',
  },
  {
    q: 'Can I download a transparent background?',
    a: 'Yes. Choose the transparent background style before downloading the combined image, and the exported PNG keeps a real alpha channel, so it drops cleanly onto any other background.',
  },
  {
    q: 'Can I change how the devices look?',
    a: 'Yes. Switch between a classic browser-chrome frame or a modern borderless frame, and use the device tint control to recolor the modern frame to match a brand color.',
  },
  {
    q: 'Do I need to install anything?',
    a: "No. Everything runs in the browser and on the server. There's nothing to install and nothing to configure beyond typing a URL.",
  },
  {
    q: 'Can I use the mockups for commercial work?',
    a: 'Yes. The screenshots and composite images you generate are yours to use in client work, marketing, and portfolios. Only capture sites you have permission to screenshot.',
  },
];

function hexToHsl(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h /= 6;
  }
  return [h * 360, s * 100, l * 100];
}

function hslToHex(h: number, s: number, l: number): string {
  const hh = h / 360;
  const ss = s / 100;
  const ll = l / 100;
  let r: number;
  let g: number;
  let b: number;
  if (ss === 0) {
    r = g = b = ll;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      let tt = t;
      if (tt < 0) tt += 1;
      if (tt > 1) tt -= 1;
      if (tt < 1 / 6) return p + (q - p) * 6 * tt;
      if (tt < 1 / 2) return q;
      if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6;
      return p;
    };
    const q = ll < 0.5 ? ll * (1 + ss) : ll + ss - ll * ss;
    const p = 2 * ll - q;
    r = hue2rgb(p, q, hh + 1 / 3);
    g = hue2rgb(p, q, hh);
    b = hue2rgb(p, q, hh - 1 / 3);
  }
  const toHex = (x: number) => Math.round(x * 255).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function mixHex(hexA: string, hexB: string, t: number): string {
  const a = [1, 3, 5].map((i) => parseInt(hexA.slice(i, i + 2), 16));
  const b = [1, 3, 5].map((i) => parseInt(hexB.slice(i, i + 2), 16));
  const mixed = a.map((v, i) => Math.round(v + (b[i] - v) * t));
  return `#${mixed.map((v) => v.toString(16).padStart(2, '0')).join('')}`;
}

// Replicates CSS `mix-blend-mode: color` (and the canvas 'color' composite
// mode used for the same tint in the export): takes the tint's hue +
// saturation, keeps the base color's own lightness, then mixes that back
// with the original base by `opacity` to simulate a semi-transparent layer.
function blendColorMode(baseHex: string, tintHex: string, opacity: number): string {
  const [, , baseL] = hexToHsl(baseHex);
  const [tintH, tintS] = hexToHsl(tintHex);
  const blended = hslToHex(tintH, tintS, baseL);
  return mixHex(baseHex, blended, opacity);
}

type DeviceTintVars = {
  '--tint-frame'?: string;
  '--tint-chrome'?: string;
  '--tint-dot'?: string;
  '--tint-stand'?: string;
  '--tint-highlight'?: string;
  '--tint-cam'?: string;
  '--tint-glass'?: string;
};

function relativeLuminance(hex: string): number {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function deviceTintVars(tintColor: string | null, opacity: number, style: DeviceStyle): DeviceTintVars | undefined {
  if (!tintColor) return undefined;
  if (style === 'modern') {
    // Modern devices are one flat body color: mix the black default toward
    // the picked tint color by plain RGB interpolation (opacity = mix
    // strength), matching drawDeviceModern()'s canvas math — a
    // hue-preserving blend against a near-black base (used below for the
    // browser style) would barely change color no matter what's picked.
    const bodyColor = mixHex('#000000', tintColor, opacity);
    const isLight = relativeLuminance(bodyColor) > 0.5;
    return {
      '--tint-frame': bodyColor,
      '--tint-cam': isLight ? '#8a8a8a' : '#3a3a3a',
      '--tint-glass': isLight
        ? 'linear-gradient(135deg, transparent 45%, rgba(0, 0, 0, 0.08) 100%)'
        : 'linear-gradient(135deg, transparent 45%, rgba(255, 255, 255, 0.14) 100%)',
    };
  }
  return {
    '--tint-frame': blendColorMode('#1a1a1a', tintColor, opacity),
    '--tint-chrome': blendColorMode('#26262a', tintColor, opacity),
    '--tint-dot': blendColorMode('#4b4b52', tintColor, opacity),
    '--tint-stand': blendColorMode('#2c2c30', tintColor, opacity),
    '--tint-highlight': blendColorMode('#3a3a40', tintColor, opacity),
  };
}

function layoutToPositions(layout: DeviceLayout, canvasH: number): Positions {
  return Object.fromEntries(
    (Object.keys(layout) as DeviceKey[]).map((key) => [
      key,
      {
        xPct: (layout[key].x / CANVAS_W) * 100,
        yPct: (layout[key].y / canvasH) * 100,
        widthPct: (layout[key].w / CANVAS_W) * 100,
      },
    ])
  ) as Positions;
}

function positionsToLayout(positions: Positions, canvasH: number): DeviceLayout {
  return Object.fromEntries(
    (Object.keys(positions) as DeviceKey[]).map((key) => {
      const w = (positions[key].widthPct / 100) * CANVAS_W;
      const nativeRatio = DEVICE_SIZE[key].h / DEVICE_SIZE[key].w;
      return [
        key,
        {
          x: (positions[key].xPct / 100) * CANVAS_W,
          y: (positions[key].yPct / 100) * canvasH,
          w,
          h: w * nativeRatio,
        },
      ];
    })
  ) as DeviceLayout;
}

// 16:9 is the resolution REFERENCE_LAYOUT was hand-tuned at — use it exactly
// rather than round-tripping it through fitLayoutToCanvas, which would
// recenter it slightly (see mockupComposite.ts).
function layoutForRatio(ratio: AspectRatioKey, canvasH: number): DeviceLayout {
  return ratio === '16:9' ? DEFAULT_LAYOUT : fitLayoutToCanvas(CANVAS_W, canvasH);
}

function normalizeUrl(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return trimmed;
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

function siteSlug(input: string): string {
  try {
    return new URL(normalizeUrl(input)).hostname.replace(/^www\./, '');
  } catch {
    return 'mockup';
  }
}

function TintControl({
  label,
  color,
  opacity,
  onColorChange,
  onOpacityChange,
}: {
  label: string;
  color: string | null;
  opacity: number;
  onColorChange: (color: string | null) => void;
  onOpacityChange: (opacity: number) => void;
}) {
  return (
    <div className={styles.styleGroup}>
      <span className={styles.styleLabel}>{label}</span>
      <div className={styles.tintControls}>
        <button
          type="button"
          className={`${styles.tintBtn} ${!color ? styles.tintBtnActive : ''}`}
          onClick={() => onColorChange(null)}
          aria-pressed={!color}
        >
          Transparent
        </button>
        <label className={`${styles.tintBtn} ${color ? styles.tintBtnActive : ''}`}>
          <input
            type="color"
            value={color ?? DEFAULT_TINT_COLOR}
            onChange={(e) => onColorChange(e.target.value)}
            className={styles.colorInput}
            aria-label={`${label} color (hex)`}
          />
          Custom color
        </label>
        {color && (
          <input
            type="range"
            min={5}
            max={90}
            value={opacity}
            onChange={(e) => onOpacityChange(Number(e.target.value))}
            className={styles.opacitySlider}
            aria-label={`${label} opacity`}
            title={`${opacity}% opacity`}
          />
        )}
      </div>
    </div>
  );
}

function DraggableDevice({
  deviceKey,
  Icon,
  label,
  image,
  isLoading,
  position,
  zIndex,
  stageRef,
  tintColor,
  tintOpacity,
  deviceStyle,
  onDragStart,
  onCommit,
  onResize,
  onResetOne,
}: {
  deviceKey: DeviceKey;
  Icon: typeof Monitor;
  label: string;
  image: string | null;
  isLoading: boolean;
  position: Position;
  zIndex: number;
  stageRef: React.RefObject<HTMLDivElement | null>;
  tintColor: string | null;
  tintOpacity: number;
  deviceStyle: DeviceStyle;
  onDragStart: (key: DeviceKey) => void;
  onCommit: (key: DeviceKey, dxPct: number, dyPct: number) => void;
  onResize: (key: DeviceKey, widthPct: number) => void;
  onResetOne: (key: DeviceKey) => void;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const resizeStart = useRef<{ x: number; widthPct: number } | null>(null);

  const handleDragEnd = () => {
    const stage = stageRef.current;
    if (stage) {
      const rect = stage.getBoundingClientRect();
      onCommit(deviceKey, (x.get() / rect.width) * 100, (y.get() / rect.height) * 100);
    }
    x.set(0);
    y.set(0);
  };

  const handleResizeStart = (e: React.PointerEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    onDragStart(deviceKey);
    e.currentTarget.setPointerCapture(e.pointerId);
    resizeStart.current = { x: e.clientX, widthPct: position.widthPct };
  };

  const handleResizeMove = (e: React.PointerEvent<HTMLSpanElement>) => {
    if (!resizeStart.current) return;
    const stage = stageRef.current;
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    const dxPct = ((e.clientX - resizeStart.current.x) / rect.width) * 100;
    onResize(deviceKey, resizeStart.current.widthPct + dxPct);
  };

  const handleResizeEnd = (e: React.PointerEvent<HTMLSpanElement>) => {
    e.currentTarget.releasePointerCapture(e.pointerId);
    resizeStart.current = null;
  };

  const widthPx = Math.round((position.widthPct / 100) * CANVAS_W);
  const heightPx = Math.round(widthPx * (DEVICE_SIZE[deviceKey].h / DEVICE_SIZE[deviceKey].w));

  const screenContent = image ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={image} alt={`${label} screenshot`} draggable={false} />
  ) : isLoading ? (
    <div className={styles.screenLoading}>
      <Loader2 size={Math.max(16, 28 * (position.widthPct / 30))} className={styles.spin} />
    </div>
  ) : null;

  return (
    <motion.div
      className={styles.draggable}
      style={{
        width: `${position.widthPct}%`,
        left: `${position.xPct}%`,
        top: `${position.yPct}%`,
        zIndex,
        x,
        y,
        ...deviceTintVars(tintColor, tintOpacity / 100, deviceStyle),
      }}
      drag
      dragConstraints={stageRef}
      dragElastic={0}
      dragMomentum={false}
      onDragStart={() => onDragStart(deviceKey)}
      onDragEnd={handleDragEnd}
      onDoubleClick={() => onResetOne(deviceKey)}
      role="button"
      tabIndex={0}
      aria-label={`${label}, drag to reposition, double-click to reset`}
    >
      <div className={styles.frameWrap}>
        <span className={styles.posLabel}>
          {Math.round(position.xPct)}%, {Math.round(position.yPct)}%
        </span>
        {deviceStyle === 'modern' ? (
          <div className={`${styles.frameModern} ${styles[`${deviceKey}Modern`]}`}>
            <div className={styles.screenModern}>{screenContent}</div>
            {deviceKey === 'phone' && (
              <>
                <div className={styles.pillNotch} />
                <div className={`${styles.phoneBtn} ${styles.phoneBtnMute}`} />
                <div className={`${styles.phoneBtn} ${styles.phoneBtnVolUp}`} />
                <div className={`${styles.phoneBtn} ${styles.phoneBtnVolDown}`} />
                <div className={`${styles.phoneBtn} ${styles.phoneBtnPower}`} />
              </>
            )}
            {deviceKey === 'tablet' && <div className={styles.cameraDot} />}
            {deviceKey === 'laptop' && <div className={styles.laptopNotch} />}
            {/* Glass highlight renders after decorations (matches canvas draw
                order), then base/stand render after it — those don't get the
                highlight or tint treatment, same as the canvas export. */}
            <div className={styles.glassHighlight} />
            {deviceKey === 'laptop' && <div className={styles.laptopBaseModern} />}
            {deviceKey === 'desktop' && (
              <>
                <div className={styles.desktopNeck} />
                <div className={styles.desktopFoot} />
              </>
            )}
          </div>
        ) : (
          <div className={`${styles.frame} ${styles[deviceKey]}`}>
            {deviceKey === 'phone' && <div className={styles.notch} />}
            {(deviceKey === 'desktop' || deviceKey === 'laptop') && (
              <div className={styles.chrome}>
                <span />
                <span />
                <span />
              </div>
            )}
            <div className={styles.screen}>{screenContent}</div>
            {deviceKey === 'laptop' && <div className={styles.laptopBase} />}
            {(deviceKey === 'tablet' || deviceKey === 'phone') && <div className={styles.homeIndicator} />}
          </div>
        )}
        <button
          type="button"
          className={styles.resetHandle}
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            onResetOne(deviceKey);
          }}
          aria-label={`Reset ${label} to default position and size`}
          title="Reset this device"
        >
          <RotateCcw size={10} />
        </button>
        <span
          className={styles.resizeHandle}
          onPointerDown={handleResizeStart}
          onPointerMove={handleResizeMove}
          onPointerUp={handleResizeEnd}
          role="slider"
          aria-label={`Resize ${label}`}
          aria-valuemin={MIN_WIDTH_PCT}
          aria-valuemax={MAX_WIDTH_PCT}
          aria-valuenow={Math.round(position.widthPct)}
        >
          <Maximize2 size={10} />
        </span>
      </div>
      <span className={styles.dragLabel}>
        <Icon size={12} />
        {label} · {widthPx}×{heightPx}
      </span>
    </motion.div>
  );
}

export default function MockupPage() {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [results, setResults] = useState<Screenshots | null>(null);
  const [submittedUrl, setSubmittedUrl] = useState('');
  const [livePreview, setLivePreview] = useState(false);
  const [liveUrl, setLiveUrl] = useState('');
  const [isComposing, setIsComposing] = useState(false);
  const [compositeError, setCompositeError] = useState('');
  const [aspectRatio, setAspectRatio] = useState<AspectRatioKey>('16:9');
  const [positions, setPositions] = useState<Positions>(() => layoutToPositions(DEFAULT_LAYOUT, canvasHeightFor('16:9')));
  const [order, setOrder] = useState<DeviceKey[]>(DEFAULT_ORDER);
  const [backgroundStyle, setBackgroundStyle] = useState<BackgroundStyle>('gradient');
  const [backgroundTintColor, setBackgroundTintColor] = useState<string | null>(null);
  const [backgroundTintOpacity, setBackgroundTintOpacity] = useState(DEFAULT_TINT_OPACITY);
  const [deviceTintColor, setDeviceTintColor] = useState<string | null>(null);
  const [deviceTintOpacity, setDeviceTintOpacity] = useState(DEFAULT_TINT_OPACITY);
  const [deviceStyle, setDeviceStyle] = useState<DeviceStyle>('browser');
  const stageRef = useRef<HTMLDivElement>(null);

  const canvasH = canvasHeightFor(aspectRatio);

  const resetForRatio = (ratio: AspectRatioKey) => {
    const h = canvasHeightFor(ratio);
    setPositions(layoutToPositions(layoutForRatio(ratio, h), h));
    setOrder(DEFAULT_ORDER);
  };

  const onSelectAspectRatio = (ratio: AspectRatioKey) => {
    setAspectRatio(ratio);
    resetForRatio(ratio);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!url.trim()) return;

    const target = normalizeUrl(url);

    if (livePreview) {
      // No capture call at all — just point the iframes at the real site.
      // This is the point of live preview: it works even when the
      // screenshot API is down, rate-limited, or the target blocks
      // headless-browser capture outright.
      setLiveUrl(target);
      setSubmittedUrl(target);
      return;
    }

    if (status === 'loading') return;
    setStatus('loading');
    setErrorMessage('');
    setResults(null);
    setCompositeError('');
    resetForRatio(aspectRatio);

    try {
      const res = await fetch('/api/mockup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: target }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus('error');
        setErrorMessage(data.error ?? 'Something went wrong generating that mockup.');
        return;
      }

      setResults(data.screenshots ?? {});
      setSubmittedUrl(target);
      setStatus('success');
    } catch {
      setStatus('error');
      setErrorMessage('Could not reach the mockup service. Check your connection and try again.');
    }
  };

  const downloadOne = (key: DeviceKey, image: string) => {
    const a = document.createElement('a');
    a.href = image;
    a.download = `${siteSlug(submittedUrl)}-${key}.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const downloadAll = () => {
    if (!results) return;
    DEVICES.forEach(({ key }, i) => {
      const shot = results[key];
      if (!shot) return;
      window.setTimeout(() => downloadOne(key, shot.image), i * 250);
    });
  };

  const bringToFront = (key: DeviceKey) => {
    setOrder((prev) => [...prev.filter((k) => k !== key), key]);
  };

  const commitDrag = (key: DeviceKey, dxPct: number, dyPct: number) => {
    setPositions((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        xPct: Math.min(100, Math.max(0, prev[key].xPct + dxPct)),
        yPct: Math.min(100, Math.max(0, prev[key].yPct + dyPct)),
      },
    }));
  };

  const resizeDevice = (key: DeviceKey, widthPct: number) => {
    setPositions((prev) => ({
      ...prev,
      [key]: { ...prev[key], widthPct: Math.min(MAX_WIDTH_PCT, Math.max(MIN_WIDTH_PCT, widthPct)) },
    }));
  };

  const resetOneDevice = (key: DeviceKey) => {
    const defaults = layoutToPositions(layoutForRatio(aspectRatio, canvasH), canvasH);
    setPositions((prev) => ({ ...prev, [key]: defaults[key] }));
  };

  const resetArrangement = () => resetForRatio(aspectRatio);

  const downloadComposite = async () => {
    if (!results || isComposing) return;
    setIsComposing(true);
    setCompositeError('');
    try {
      const layout = positionsToLayout(positions, canvasH);
      const backgroundTint: Tint | undefined = backgroundTintColor
        ? { color: backgroundTintColor, opacity: backgroundTintOpacity / 100 }
        : undefined;
      const deviceTint: Tint | undefined = deviceTintColor
        ? { color: deviceTintColor, opacity: deviceTintOpacity / 100 }
        : undefined;
      const image = await buildMockupComposite(
        results, layout, order, canvasH, backgroundStyle, backgroundTint, deviceTint, deviceStyle
      );
      const a = document.createElement('a');
      a.href = image;
      a.download = `${siteSlug(submittedUrl)}-mockup.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch {
      setCompositeError('Could not build the combined image. Try downloading the screenshots individually instead.');
    } finally {
      setIsComposing(false);
    }
  };

  return (
    <>
      <SEO
        title="Free Website Mockup Generator"
        description="Paste any URL to generate real desktop, laptop, tablet, and phone screenshots, framed and ready to download. A free mockup tool, no signup required."
        path="/mockup"
      />

      <section className={styles.hero}>
        <div className={styles.container}>
          <span className={styles.kicker}>Free tool</span>

          <h1>
            Website <span className={styles.gradient}>Mockup Generator</span>
          </h1>
          <p className={styles.lead}>
            Paste a URL and get real screenshots of that site across desktop, laptop, tablet, and phone, ready to drop into a portfolio, pitch deck, or client preview.
          </p>

          <motion.form
            className={styles.form}
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <input
              type="text"
              inputMode="url"
              placeholder="example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={status === 'loading'}
              className={styles.input}
              aria-label="Website URL"
            />
            <button type="submit" className="button" disabled={status === 'loading' || !url.trim()}>
              {status === 'loading' ? (
                <>
                  <Loader2 size={20} className={styles.spin} />
                  Generating...
                </>
              ) : livePreview ? (
                'Load live preview'
              ) : (
                'Generate mockup'
              )}
            </button>
          </motion.form>

          <button
            type="button"
            className={`${styles.liveToggle} ${livePreview ? styles.liveToggleActive : ''}`}
            onClick={() => setLivePreview((v) => !v)}
            aria-pressed={livePreview}
          >
            <Globe size={14} />
            Live preview instead of screenshots
          </button>

          {livePreview && (
            <p className={styles.hint}>
              Loads the real site directly in each viewport, no capture needed. It works even if screenshot generation
              fails. Some sites block embedding and will show blank below. Nothing in this mode can be downloaded or
              arranged.
            </p>
          )}

          {!livePreview && status === 'loading' && (
            <p className={styles.hint}>Capturing 4 screenshots. This usually takes 10–20 seconds, longer for slower sites.</p>
          )}

          {!livePreview && status === 'error' && (
            <div className={styles.errorBox} role="alert">
              <TriangleAlert size={20} />
              <span>{errorMessage}</span>
            </div>
          )}
        </div>
      </section>

      {!livePreview && status !== 'error' && (
        <section className={styles.combined}>
          <div className={styles.container}>
            <div className={styles.combinedHeader}>
              <span className={styles.kicker}>All devices, one image</span>
              {submittedUrl ? (
                <h2>{submittedUrl.replace(/^https?:\/\//, '')}</h2>
              ) : (
                <h2>Arrange your devices</h2>
              )}
              <p className={styles.arrangeHint}>
                {status === 'idle'
                  ? 'Drag devices to preview an arrangement, then generate a mockup to fill them in.'
                  : 'Drag devices to rearrange them, drag the corner handle to resize, double-click to reset one device.'}
              </p>
            </div>

            <details className={styles.customizePanel}>
              <summary>
                <SlidersHorizontal size={16} />
                Customize appearance
              </summary>

              <div className={styles.ratioPicker} role="group" aria-label="Combined image shape">
                <span className={styles.ratioLabel}>Image shape:</span>
                {ASPECT_OPTIONS.map((ratio) => (
                  <button
                    key={ratio}
                    type="button"
                    className={`${styles.ratioBtn} ${aspectRatio === ratio ? styles.ratioBtnActive : ''}`}
                    onClick={() => onSelectAspectRatio(ratio)}
                    aria-pressed={aspectRatio === ratio}
                  >
                    {ratio}
                  </button>
                ))}
              </div>

              <div className={styles.styleControls}>
                <div className={styles.styleGroup}>
                  <span className={styles.styleLabel}>Device style</span>
                  <div className={styles.swatchRow}>
                    {DEVICE_STYLES.map((ds) => (
                      <button
                        key={ds}
                        type="button"
                        className={`${styles.deviceStyleBtn} ${deviceStyle === ds ? styles.deviceStyleBtnActive : ''}`}
                        onClick={() => setDeviceStyle(ds)}
                        aria-pressed={deviceStyle === ds}
                      >
                        {DEVICE_STYLE_LABELS[ds]}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={styles.styleGroup}>
                  <span className={styles.styleLabel}>Background</span>
                  <div className={styles.swatchRow}>
                    {BACKGROUND_STYLES.map((bg) => (
                      <button
                        key={bg}
                        type="button"
                        className={`${styles.bgSwatch} ${styles[`bgSwatch_${bg}`]} ${backgroundStyle === bg ? styles.swatchActive : ''}`}
                        onClick={() => setBackgroundStyle(bg)}
                        aria-pressed={backgroundStyle === bg}
                        title={BACKGROUND_LABELS[bg]}
                      />
                    ))}
                  </div>
                </div>

                {backgroundStyle !== 'transparent' && (
                  <TintControl
                    label="Background tint"
                    color={backgroundTintColor}
                    opacity={backgroundTintOpacity}
                    onColorChange={setBackgroundTintColor}
                    onOpacityChange={setBackgroundTintOpacity}
                  />
                )}

                <TintControl
                  label="Device tint"
                  color={deviceTintColor}
                  opacity={deviceTintOpacity}
                  onColorChange={setDeviceTintColor}
                  onOpacityChange={setDeviceTintOpacity}
                />
              </div>
            </details>

            <div
              ref={stageRef}
              className={`${styles.arrangeStage} ${styles[`stageBg_${backgroundStyle}`]}`}
              style={{ aspectRatio: `${CANVAS_W} / ${canvasH}` }}
            >
              {backgroundTintColor && backgroundStyle !== 'transparent' && (
                <div
                  className={styles.tintOverlay}
                  style={{ background: backgroundTintColor, opacity: backgroundTintOpacity / 100 }}
                />
              )}
              {order.map((key, i) => {
                const { Icon, label } = DEVICES.find((d) => d.key === key)!;
                const shot = results?.[key];
                return (
                  <DraggableDevice
                    key={key}
                    deviceKey={key}
                    Icon={Icon}
                    label={label}
                    image={shot?.image ?? null}
                    isLoading={status === 'loading'}
                    position={positions[key]}
                    zIndex={i}
                    stageRef={stageRef}
                    tintColor={deviceTintColor}
                    tintOpacity={deviceTintOpacity}
                    deviceStyle={deviceStyle}
                    onDragStart={bringToFront}
                    onCommit={commitDrag}
                    onResize={resizeDevice}
                    onResetOne={resetOneDevice}
                  />
                );
              })}
            </div>

            <div className={styles.combinedActions}>
              <button type="button" className="button" onClick={downloadComposite} disabled={isComposing || !results}>
                {isComposing ? (
                  <>
                    <Loader2 size={18} className={styles.spin} />
                    <span>Building...</span>
                  </>
                ) : (
                  <>
                    <ImageDown size={18} />
                    <span>Download combined image</span>
                  </>
                )}
              </button>
              <button type="button" className="button secondary" onClick={resetArrangement}>
                <RotateCcw size={16} />
                <span>Reset arrangement</span>
              </button>
            </div>

            {compositeError && (
              <div className={styles.errorBox} role="alert">
                <TriangleAlert size={20} />
                <span>{compositeError}</span>
              </div>
            )}
          </div>
        </section>
      )}

      {livePreview && liveUrl && (
        <section className={styles.results}>
          <div className={styles.container}>
            <div className={styles.resultsHeader}>
              <h2>Live preview</h2>
              <span className={styles.dims}>{liveUrl.replace(/^https?:\/\//, '')}</span>
            </div>

            <div className={styles.grid}>
              {DEVICES.map(({ key, Icon, label, dims }) => {
                const { w, h } = REAL_DEVICE_SIZE[key];
                const scale = LIVE_PREVIEW_TARGET_W / w;
                const displayH = h * scale;
                return (
                  <motion.div
                    key={key}
                    className={styles.card}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className={styles.cardHead}>
                      <Icon size={18} />
                      <span>{label}</span>
                      <span className={styles.dims}>{dims}</span>
                    </div>

                    <div
                      className={styles.liveFrameOuter}
                      style={{ width: LIVE_PREVIEW_TARGET_W, height: displayH }}
                    >
                      <iframe
                        key={liveUrl}
                        src={liveUrl}
                        title={`${label} live preview of ${liveUrl}`}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                        className={styles.liveFrame}
                        style={{ width: w, height: h, transform: `scale(${scale})` }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {status === 'success' && results && (
        <section className={styles.results}>
          <div className={styles.container}>
            <div className={styles.resultsHeader}>
              <h2>Individual screenshots</h2>
              <button type="button" className="button secondary" onClick={downloadAll}>
                <Download size={18} />
                <span>Download all (separate files)</span>
              </button>
            </div>

            <div className={styles.grid}>
              {DEVICES.map(({ key, Icon, dims }) => {
                const shot = results[key];
                if (!shot) return null;
                return (
                  <motion.div
                    key={key}
                    className={styles.card}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className={styles.cardHead}>
                      <Icon size={18} />
                      <span>{shot.label}</span>
                      <span className={styles.dims}>{dims}</span>
                    </div>

                    <div className={`${styles.frame} ${styles[key]}`}>
                      {key === 'phone' && <div className={styles.notch} />}
                      {(key === 'desktop' || key === 'laptop') && (
                        <div className={styles.chrome}>
                          <span />
                          <span />
                          <span />
                        </div>
                      )}
                      <div className={styles.screen}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={shot.image} alt={`${shot.label} screenshot of ${submittedUrl}`} />
                      </div>
                      {key === 'laptop' && <div className={styles.laptopBase} />}
                      {(key === 'tablet' || key === 'phone') && <div className={styles.homeIndicator} />}
                    </div>

                    <a
                      href={shot.image}
                      download={`${siteSlug(submittedUrl)}-${key}.png`}
                      className={styles.downloadBtn}
                    >
                      <Download size={16} />
                      Download
                    </a>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section className={styles.seoIntro}>
        <div className={styles.container}>
          <span className={styles.kicker}>About this tool</span>
          <h2>What a website mockup generator does</h2>
          <p>
            A website mockup generator turns a live URL into a set of clean, framed device
            screenshots, ready to use in a portfolio, a case study, a pitch deck, or a quick
            preview you send to a client before a call. Instead of resizing a browser window
            four separate times and cropping screenshots by hand, this tool captures the real
            rendered page at desktop, laptop, tablet, and phone widths in a single pass.
          </p>
          <p>
            Every capture runs through a real browser, not a static thumbnail service, so
            JavaScript-rendered content, custom fonts, animations, and responsive layout changes
            all show up exactly as a visitor would see them. That matters for modern sites built
            with frameworks like Next.js, React, or Vue, where a simple HTML snapshot would miss
            half the page.
          </p>
          <p>
            You get back four individual screenshots plus a combined, freely arrangeable
            composite image, framed in either a classic browser window or a modern borderless
            device, that you can restyle and download as one file in seconds.
          </p>
          <p>
            The four breakpoints are not arbitrary. Desktop at 1920×1080 and laptop at 1366×768
            cover the two most common screen sizes for browsing on a computer. Tablet at 768×1024
            and phone at 375×812 are the standard portrait dimensions used across most mockup
            templates and design systems, so the frames line up with what people already expect
            a device mockup to look like.
          </p>
        </div>
      </section>

      <section className={styles.seoSteps}>
        <div className={styles.container}>
          <span className={styles.kicker}>Process</span>
          <h2>How the mockup generator works</h2>
          <div className={styles.seoStepGrid}>
            {TOOL_STEPS.map(({ Icon, title, text }, i) => (
              <div key={title} className={styles.seoStepCard}>
                <span className={styles.seoStepNumber}>{i + 1}</span>
                <Icon size={22} />
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.seoBenefits}>
        <div className={styles.container}>
          <span className={styles.kicker}>Why use it</span>
          <h2>Why use a device mockup generator</h2>
          <div className={styles.seoBenefitGrid}>
            {TOOL_BENEFITS.map(({ Icon, title, text }) => (
              <div key={title} className={styles.seoBenefitCard}>
                <Icon size={22} />
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.seoAudience}>
        <div className={styles.container}>
          <span className={styles.kicker}>Who it&apos;s for</span>
          <h2>Who uses website mockups</h2>
          <ul className={styles.seoAudienceList}>
            {TOOL_AUDIENCE.map(({ title, text }) => (
              <li key={title}>
                <Users size={18} />
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.seoFaq}>
        <div className={styles.container}>
          <span className={styles.kicker}>FAQ</span>
          <h2>Frequently asked questions</h2>
          <div className={styles.seoFaqList}>
            {TOOL_FAQ.map(({ q, a }) => (
              <details key={q} className={styles.seoFaqItem}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: TOOL_FAQ.map(({ q, a }) => ({
            '@type': 'Question',
            name: q,
            acceptedAnswer: { '@type': 'Answer', text: a },
          })),
        }}
      />
    </>
  );
}
