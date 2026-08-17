export type DeviceKey = 'desktop' | 'laptop' | 'tablet' | 'phone';

export type CompositeShot = { label: string; image: string };
export type CompositeShots = Partial<Record<DeviceKey, CompositeShot>>;

// Canvas width is always fixed; height is derived per aspect ratio below.
// Capped so no ratio ever exceeds 1920x1920 — 1:1 is the tallest case and
// lands exactly at that cap (1920x1920); 4:3 and 16:9 come in under it.
export const CANVAS_W = 1920;

export const ASPECT_RATIOS = { '16:9': 16 / 9, '4:3': 4 / 3, '1:1': 1 } as const;
export type AspectRatioKey = keyof typeof ASPECT_RATIOS;

export function canvasHeightFor(ratio: AspectRatioKey): number {
  return Math.round(CANVAS_W / ASPECT_RATIOS[ratio]);
}

export type DeviceLayout = Record<DeviceKey, { x: number; y: number; w: number; h: number }>;

export const BACKGROUND_STYLES = ['gradient', 'dots', 'spotlight', 'flat', 'transparent'] as const;
export type BackgroundStyle = (typeof BACKGROUND_STYLES)[number];

export const DEVICE_STYLES = ['browser', 'modern'] as const;
export type DeviceStyle = (typeof DEVICE_STYLES)[number];

// Mixes two hex colors by linear RGB interpolation (t=0 -> a, t=1 -> b).
// Used for the modern device body: plain-RGB mixing (not the hue-preserving
// 'color' blend mode used elsewhere) so a custom device tint actually
// recolors the black default instead of staying dark regardless of hue.
function mixHexRgb(hexA: string, hexB: string, t: number): string {
  const a = [1, 3, 5].map((i) => parseInt(hexA.slice(i, i + 2), 16));
  const b = [1, 3, 5].map((i) => parseInt(hexB.slice(i, i + 2), 16));
  const mixed = a.map((v, i) => Math.round(v + (b[i] - v) * t));
  return `#${mixed.map((v) => v.toString(16).padStart(2, '0')).join('')}`;
}

// Perceived luminance (ITU-R BT.709), 0 = black, 1 = white — used to pick
// contrast-safe accents (camera dot, glass highlight) for whatever color the
// modern device body ends up as.
function relativeLuminance(hex: string): number {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// A semi-transparent color-blend overlay — like an Instagram-style tint,
// not a literal RGB-channel shift. Applied via canvas 'color' composite
// mode (same effect as CSS `mix-blend-mode: color`), so it recolors hue
// while preserving the underlying luminosity/detail.
export type Tint = { color: string; opacity: number };

// These mirror mockup.module.css's .frame/.chrome/.screen/.laptopBase/
// .homeIndicator rules exactly (same px values at the same DEVICE_SIZE
// reference scale), so the canvas export matches the live CSS preview
// instead of drifting into its own separate look.
const CHROME_H = 28; // desktop/laptop top chrome bar (.chrome padding + dots)
const DESKTOP_STAND_PAD = 28; // .frame.desktop padding-bottom
const DESKTOP_STAND_W = 90;
const DESKTOP_STAND_H = 10;
const LAPTOP_BASE_H = 14; // .laptopBase
const LAPTOP_HIGHLIGHT_W = 60;
const LAPTOP_HIGHLIGHT_H = 4;
const FLAT_FRAME_RADIUS = 10; // .frame border-radius (desktop/laptop)
const SCREEN_RADIUS_ROUNDED = 4; // .frame.tablet/.phone .screen border-radius
const BORDER: Record<'tablet' | 'phone', number> = { tablet: 5, phone: 6 }; // .frame.tablet/.phone border
const ROUNDED_FRAME_RADIUS: Record<'tablet' | 'phone', number> = { tablet: 26, phone: 34 };
const HOME_INDICATOR_H = 8;
const HOME_INDICATOR_W = 50;

// "Modern" device style — thin uniform bezels, no browser chrome bar, a
// Dynamic-Island-style notch, a laptop hinge/base bar wider than the
// screen, and a monitor neck+foot stand, matching a reference device
// mockup set (kept in the same flat/vector language as the browser style,
// not a photorealistic render).
const MODERN_BEZEL: Record<DeviceKey, number> = { desktop: 16, laptop: 16, tablet: 11, phone: 5 };
const MODERN_RADIUS: Record<DeviceKey, number> = { desktop: 12, laptop: 12, tablet: 20, phone: 26 };
const MODERN_SCREEN_RADIUS: Record<DeviceKey, number> = { desktop: 2, laptop: 2, tablet: 14, phone: 20 };
const MODERN_LAPTOP_BASE_H = 18;
const MODERN_LAPTOP_BASE_OVERHANG = 20;
const MODERN_DESKTOP_NECK_TOP_W = 50;
const MODERN_DESKTOP_NECK_BOTTOM_W = 90;
const MODERN_DESKTOP_NECK_H = 45;
const MODERN_DESKTOP_FOOT_W = 160;
const MODERN_DESKTOP_FOOT_H = 12;
const MODERN_PHONE_NOTCH_W = 40;
const MODERN_PHONE_NOTCH_H = 12;
const MODERN_PHONE_NOTCH_TOP = 10;
const MODERN_LAPTOP_NOTCH_W = 60;
const MODERN_LAPTOP_NOTCH_H = 8;
const MODERN_TABLET_CAM_R = 2.5;
const MODERN_PHONE_BTN_W = 2;

// Reference arrangement, designed in a ~2.67:1 coordinate space — all four
// devices' visual bottoms (frame + stand/base/home indicator) sit on the
// same baseline, like items resting on a table. fitLayoutToCanvas() below
// scales + centers this whole arrangement (bezels included) to fill
// whatever CANVAS_W x target-height it's given, so it works the same way
// regardless of the actual output resolution or aspect ratio.
export const DEVICE_SIZE: Record<DeviceKey, { w: number; h: number }> = {
  desktop: { w: 640, h: 360 },
  laptop: { w: 520, h: 292 },
  tablet: { w: 270, h: 360 },
  phone: { w: 140, h: 303 },
};

// User-tuned via the live drag/resize UI at a 1920x1080 (16:9) canvas, then
// shifted -48px horizontally to center the group (frame edges, including
// bezels, land at 72px from both the left and right canvas edges instead of
// 121px left / 24px right) — this *is* the 16:9 default (see DEFAULT_LAYOUT
// below), and also the shape fitLayoutToCanvas() scales from for the other
// aspect ratios.
const REFERENCE_LAYOUT: DeviceLayout = {
  desktop: { x: 394, y: 76, w: 1001, h: 563 },
  tablet: { x: 86, y: 324, w: 356, h: 475 },
  phone: { x: 374, y: 518, w: 185, h: 400 },
  laptop: { x: 1162, y: 421, w: 686, h: 385 },
};

// Back-to-front draw order. When the layout comes from user dragging, pass
// the current z-order (front-most last) so whichever device was most
// recently brought forward renders on top.
export const DEFAULT_ORDER: DeviceKey[] = ['desktop', 'laptop', 'tablet', 'phone'];

// Computes the outer frame box for a device given its screen rect — shared
// by referenceBounds() (layout math) and drawDeviceBrowser() (actual
// rendering) so the two can never drift apart from each other. `totalH` is
// frameH plus anything that extends further down but isn't part of the
// frame body itself (nothing, for this style — the stand is inside frameH).
function browserFrameGeometry(key: DeviceKey, screenX: number, screenY: number, screenW: number, screenH: number) {
  const scale = screenW / DEVICE_SIZE[key].w;

  if (key === 'desktop' || key === 'laptop') {
    const chromeH = CHROME_H * scale;
    const footH = key === 'desktop' ? DESKTOP_STAND_PAD * scale : LAPTOP_BASE_H * scale;
    const frameH = chromeH + screenH + footH;
    return {
      scale,
      frameX: screenX,
      frameY: screenY - chromeH,
      frameW: screenW,
      frameH,
      totalH: frameH,
      radius: FLAT_FRAME_RADIUS * scale,
      chromeH,
      border: 0,
      footH,
    };
  }

  const border = BORDER[key] * scale;
  const footH = HOME_INDICATOR_H * scale;
  const frameH = border * 2 + screenH + footH;
  return {
    scale,
    frameX: screenX - border,
    frameY: screenY - border,
    frameW: screenW + border * 2,
    frameH,
    totalH: frameH,
    radius: ROUNDED_FRAME_RADIUS[key] * scale,
    chromeH: 0,
    border,
    footH,
  };
}

// Same idea for the "modern" style — frameH covers just the bezel+screen
// body (what the frame background rect actually fills); totalH adds the
// laptop base bar / monitor neck+foot, which render as separate detached
// shapes below the frame, for bounds/layout purposes.
function modernFrameGeometry(key: DeviceKey, screenX: number, screenY: number, screenW: number, screenH: number) {
  const scale = screenW / DEVICE_SIZE[key].w;
  const bezel = MODERN_BEZEL[key] * scale;
  const frameX = screenX - bezel;
  const frameY = screenY - bezel;
  const frameW = screenW + bezel * 2;
  const frameH = screenH + bezel * 2;
  const radius = MODERN_RADIUS[key] * scale;

  let extraBottom = 0;
  if (key === 'laptop') extraBottom = MODERN_LAPTOP_BASE_H * scale;
  else if (key === 'desktop') extraBottom = (MODERN_DESKTOP_NECK_H + MODERN_DESKTOP_FOOT_H) * scale;

  return {
    scale,
    frameX,
    frameY,
    frameW,
    frameH,
    totalH: frameH + extraBottom,
    radius,
    bezel,
    extraBottom,
  };
}

function frameGeometry(
  style: DeviceStyle,
  key: DeviceKey,
  screenX: number,
  screenY: number,
  screenW: number,
  screenH: number
) {
  return style === 'modern'
    ? modernFrameGeometry(key, screenX, screenY, screenW, screenH)
    : browserFrameGeometry(key, screenX, screenY, screenW, screenH);
}

function referenceBounds(style: DeviceStyle) {
  let x0 = Infinity;
  let y0 = Infinity;
  let x1 = -Infinity;
  let y1 = -Infinity;
  for (const key of Object.keys(REFERENCE_LAYOUT) as DeviceKey[]) {
    const { x, y, w, h } = REFERENCE_LAYOUT[key];
    const { frameX, frameY, frameW, totalH } = frameGeometry(style, key, x, y, w, h);
    x0 = Math.min(x0, frameX);
    y0 = Math.min(y0, frameY);
    x1 = Math.max(x1, frameX + frameW);
    y1 = Math.max(y1, frameY + totalH);
  }
  return { x0, y0, x1, y1, w: x1 - x0, h: y1 - y0 };
}

// Scales + centers the reference arrangement to fill a canvas of any size,
// preserving the relative positions/overlaps between devices exactly.
// Bounds are computed from the 'browser' style regardless of which style is
// actually selected — the two styles' bezel/stand sizes differ only
// slightly, not enough to matter for this fit, and it keeps switching
// styles from needing to re-run the whole layout pipeline.
export function fitLayoutToCanvas(canvasW: number, canvasH: number, padding = 60): DeviceLayout {
  const bounds = referenceBounds('browser');
  const scale = Math.min((canvasW - padding * 2) / bounds.w, (canvasH - padding * 2) / bounds.h);
  const offsetX = (canvasW - bounds.w * scale) / 2 - bounds.x0 * scale;
  const offsetY = (canvasH - bounds.h * scale) / 2 - bounds.y0 * scale;

  const result = {} as DeviceLayout;
  for (const key of Object.keys(REFERENCE_LAYOUT) as DeviceKey[]) {
    const d = REFERENCE_LAYOUT[key];
    result[key] = {
      x: d.x * scale + offsetX,
      y: d.y * scale + offsetY,
      w: d.w * scale,
      h: d.h * scale,
    };
  }
  return result;
}

// REFERENCE_LAYOUT is already designed at exactly CANVAS_W x canvasHeightFor('16:9'),
// so the 16:9 default is the exact values, not a scaled/recentered
// approximation of them. Other ratios still go through fitLayoutToCanvas().
export const DEFAULT_LAYOUT: DeviceLayout = REFERENCE_LAYOUT;

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Failed to load screenshot image'));
    img.src = src;
  });
}

// Mirrors CSS `object-fit: cover; object-position: top`: crop symmetrically
// left/right when the source is relatively wider, crop from the bottom when
// the source is relatively taller, so the top of the page stays visible.
function drawCoverImage(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  dx: number,
  dy: number,
  dWidth: number,
  dHeight: number
) {
  const destRatio = dWidth / dHeight;
  const imgRatio = img.width / img.height;
  let sx = 0;
  const sy = 0; // object-position: top — never crop from the top
  let sWidth = img.width;
  let sHeight = img.height;

  if (imgRatio > destRatio) {
    sHeight = img.height;
    sWidth = sHeight * destRatio;
    sx = (img.width - sWidth) / 2;
  } else {
    sWidth = img.width;
    sHeight = sWidth / destRatio;
  }

  ctx.drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
}

// Fills a rounded-rect region with a semi-transparent color-blend tint —
// must be called with a clip already covering exactly that region, so the
// tint stays inside it (rounded corners, device frame shape, etc).
function applyTint(ctx: CanvasRenderingContext2D, tint: Tint, x: number, y: number, w: number, h: number) {
  if (!tint || tint.opacity <= 0) return;
  ctx.save();
  ctx.globalCompositeOperation = 'color';
  ctx.globalAlpha = tint.opacity;
  ctx.fillStyle = tint.color;
  ctx.fillRect(x, y, w, h);
  ctx.restore();
}

function drawBackground(
  ctx: CanvasRenderingContext2D,
  canvasW: number,
  canvasH: number,
  style: BackgroundStyle,
  tint?: Tint
) {
  // Leave the canvas untouched — its alpha channel starts fully transparent,
  // and PNG export (the only format this module produces) preserves that.
  // A tint has no backdrop to blend against here, so it's skipped too.
  if (style === 'transparent') return;

  ctx.save();
  ctx.beginPath();
  ctx.roundRect(0, 0, canvasW, canvasH, 28);
  ctx.clip();

  if (style === 'gradient') {
    const gradient = ctx.createLinearGradient(0, 0, 0, canvasH);
    gradient.addColorStop(0, '#0a0f1c');
    gradient.addColorStop(1, '#05070f');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvasW, canvasH);
  } else if (style === 'spotlight') {
    const cx = canvasW / 2;
    const cy = canvasH * 0.4;
    const r = Math.max(canvasW, canvasH) * 0.75;
    const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    gradient.addColorStop(0, '#1c2b4a');
    gradient.addColorStop(1, '#05070f');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvasW, canvasH);
  } else if (style === 'flat') {
    ctx.fillStyle = '#0a0f1c';
    ctx.fillRect(0, 0, canvasW, canvasH);
  } else {
    // dots
    ctx.fillStyle = '#0a0f1c';
    ctx.fillRect(0, 0, canvasW, canvasH);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    const spacing = 32;
    for (let py = spacing / 2; py < canvasH; py += spacing) {
      for (let px = spacing / 2; px < canvasW; px += spacing) {
        ctx.beginPath();
        ctx.arc(px, py, 1.4, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  if (tint) applyTint(ctx, tint, 0, 0, canvasW, canvasH);

  ctx.restore();
}

function drawDeviceBrowser(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  key: DeviceKey,
  screenX: number,
  screenY: number,
  screenW: number,
  screenH: number,
  tint?: Tint
) {
  const geo = browserFrameGeometry(key, screenX, screenY, screenW, screenH);
  const { scale, frameX, frameY, frameW, frameH, radius } = geo;

  // Drop shadow behind the frame — the main depth cue that sells the
  // overlapping "in front of" / "behind" stacking between devices.
  ctx.save();
  ctx.shadowColor = 'rgba(0, 0, 0, 0.55)';
  ctx.shadowBlur = 40 * scale;
  ctx.shadowOffsetY = 18 * scale;
  ctx.fillStyle = '#1a1a1a';
  ctx.beginPath();
  ctx.roundRect(frameX, frameY, frameW, frameH, radius);
  ctx.fill();
  ctx.restore();

  // Everything else is clipped to the frame's own rounded rect, matching
  // .frame's `overflow: hidden` — chrome bar / stand / base all get their
  // corners naturally rounded by the frame shape instead of drawing them
  // as separate rounded pieces.
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(frameX, frameY, frameW, frameH, radius);
  ctx.clip();

  if (key === 'desktop' || key === 'laptop') {
    // Chrome bar (matches .chrome: dark bar + 3 dots)
    ctx.fillStyle = '#26262a';
    ctx.fillRect(frameX, frameY, frameW, geo.chromeH);
    ctx.fillStyle = '#4b4b52';
    const dotR = 4.5 * scale;
    const dotGap = 6 * scale;
    const padX = 12.8 * scale;
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.arc(frameX + padX + dotR + i * (dotR * 2 + dotGap), frameY + geo.chromeH / 2, dotR, 0, Math.PI * 2);
      ctx.fill();
    }

    // Screen — flush against the frame's sides, no separate bezel border
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(screenX, screenY, screenW, screenH);
    drawCoverImage(ctx, img, screenX, screenY, screenW, screenH);

    if (key === 'desktop') {
      ctx.fillStyle = '#2c2c30';
      const standW = DESKTOP_STAND_W * scale;
      const standH = DESKTOP_STAND_H * scale;
      ctx.fillRect(frameX + frameW / 2 - standW / 2, frameY + frameH - standH, standW, standH);
    } else {
      ctx.fillStyle = '#2c2c30';
      ctx.fillRect(frameX, frameY + frameH - geo.footH, frameW, geo.footH);
      ctx.fillStyle = '#3a3a40';
      const hlW = LAPTOP_HIGHLIGHT_W * scale;
      const hlH = LAPTOP_HIGHLIGHT_H * scale;
      ctx.fillRect(frameX + frameW / 2 - hlW / 2, frameY + frameH - geo.footH + 4 * scale, hlW, hlH);
    }
  } else {
    // Screen — inset by the uniform border, own rounded corners
    ctx.beginPath();
    ctx.roundRect(screenX, screenY, screenW, screenH, SCREEN_RADIUS_ROUNDED * scale);
    ctx.clip();
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(screenX, screenY, screenW, screenH);
    drawCoverImage(ctx, img, screenX, screenY, screenW, screenH);

    ctx.fillStyle = '#4b4b52';
    const w = HOME_INDICATOR_W * scale;
    const h = 3 * scale;
    ctx.fillRect(
      frameX + frameW / 2 - w / 2,
      screenY + screenH + (geo.footH - h) / 2,
      w,
      h
    );
  }

  if (tint) {
    // Tint the frame/chrome/border only — carve the screen rect out of the
    // clip region (evenodd fill rule) so the actual website screenshot
    // never gets recolored, only stays clipped to the frame's rounded shape
    // via the outer clip already active from above.
    ctx.save();
    ctx.beginPath();
    ctx.rect(frameX, frameY, frameW, frameH);
    ctx.rect(screenX, screenY, screenW, screenH);
    ctx.clip('evenodd');
    applyTint(ctx, tint, frameX, frameY, frameW, frameH);
    ctx.restore();
  }

  ctx.restore();
}

function drawGlassHighlight(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  radius: number,
  isLight: boolean
) {
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, radius);
  ctx.clip();
  const gradient = ctx.createLinearGradient(x + w * 0.55, y, x + w, y + h * 0.45);
  // Dark bodies get a light glass reflection; light bodies get a subtle dark
  // shadow instead, since a white highlight on a near-white body would be
  // invisible.
  const rgb = isLight ? '0, 0, 0' : '255, 255, 255';
  const peakAlpha = isLight ? 0.08 : 0.14;
  gradient.addColorStop(0, `rgba(${rgb}, 0)`);
  gradient.addColorStop(1, `rgba(${rgb}, ${peakAlpha})`);
  ctx.fillStyle = gradient;
  ctx.fillRect(x, y, w, h);
  ctx.restore();
}

const MODERN_DEFAULT_BODY = '#000000';

function drawDeviceModern(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  key: DeviceKey,
  screenX: number,
  screenY: number,
  screenW: number,
  screenH: number,
  tint?: Tint
) {
  const geo = modernFrameGeometry(key, screenX, screenY, screenW, screenH);
  const { scale, frameX, frameY, frameW, frameH, radius } = geo;
  // One flat color for the whole device — bezel, notch, buttons, and
  // stand/base all match, unlike the browser style's multi-tone chrome.
  // The device tint control directly recolors the body (linear RGB mix from
  // black, strength = opacity) rather than layering a translucent overlay on
  // top of it — a hue/lightness-preserving blend against a near-black base
  // would barely look different no matter what color was picked.
  const bodyColor = tint ? mixHexRgb(MODERN_DEFAULT_BODY, tint.color, tint.opacity) : MODERN_DEFAULT_BODY;
  const isLight = relativeLuminance(bodyColor) > 0.5;
  // The camera dot needs to read against its own bezel regardless of tone.
  const camColor = isLight ? '#8a8a8a' : '#3a3a3a';

  ctx.save();
  ctx.shadowColor = 'rgba(0, 0, 0, 0.55)';
  ctx.shadowBlur = 40 * scale;
  ctx.shadowOffsetY = 18 * scale;
  ctx.fillStyle = bodyColor;
  ctx.beginPath();
  ctx.roundRect(frameX, frameY, frameW, frameH, radius);
  ctx.fill();
  ctx.restore();

  ctx.save();
  ctx.beginPath();
  ctx.roundRect(screenX, screenY, screenW, screenH, MODERN_SCREEN_RADIUS[key] * scale);
  ctx.clip();
  ctx.fillStyle = '#0a0a0a';
  ctx.fillRect(screenX, screenY, screenW, screenH);
  drawCoverImage(ctx, img, screenX, screenY, screenW, screenH);
  ctx.restore();

  if (key === 'phone') {
    // Side buttons — drawn outside the frame's own rounded rect, so no clip active here
    ctx.fillStyle = bodyColor;
    const btnW = MODERN_PHONE_BTN_W * scale;
    ctx.fillRect(frameX - btnW, frameY + frameH * 0.22, btnW, 14 * scale); // mute switch
    ctx.fillRect(frameX - btnW, frameY + frameH * 0.3, btnW, 22 * scale); // volume up
    ctx.fillRect(frameX - btnW, frameY + frameH * 0.4, btnW, 22 * scale); // volume down
    ctx.fillRect(frameX + frameW, frameY + frameH * 0.28, btnW, 30 * scale); // power

    // Dynamic-Island-style pill notch, floating near the top of the screen
    ctx.fillStyle = bodyColor;
    const notchW = MODERN_PHONE_NOTCH_W * scale;
    const notchH = MODERN_PHONE_NOTCH_H * scale;
    ctx.beginPath();
    ctx.roundRect(screenX + screenW / 2 - notchW / 2, screenY + MODERN_PHONE_NOTCH_TOP * scale, notchW, notchH, notchH / 2);
    ctx.fill();
  } else if (key === 'tablet') {
    // Front camera dot, centered on the top bezel
    ctx.fillStyle = camColor;
    ctx.beginPath();
    ctx.arc(frameX + frameW / 2, frameY + geo.bezel / 2, MODERN_TABLET_CAM_R * scale, 0, Math.PI * 2);
    ctx.fill();
  } else if (key === 'laptop') {
    ctx.fillStyle = bodyColor;
    const notchW = MODERN_LAPTOP_NOTCH_W * scale;
    const notchH = MODERN_LAPTOP_NOTCH_H * scale;
    ctx.beginPath();
    ctx.roundRect(screenX + screenW / 2 - notchW / 2, frameY, notchW, notchH, [0, 0, 6 * scale, 6 * scale]);
    ctx.fill();
  }

  drawGlassHighlight(ctx, frameX, frameY, frameW, frameH, radius, isLight);

  // Base/stand — detached shapes below the frame, not clipped to it
  if (key === 'laptop') {
    const baseH = MODERN_LAPTOP_BASE_H * scale;
    const overhang = MODERN_LAPTOP_BASE_OVERHANG * scale;
    ctx.fillStyle = bodyColor;
    ctx.beginPath();
    ctx.roundRect(frameX - overhang, frameY + frameH, frameW + overhang * 2, baseH, [0, 0, 8 * scale, 8 * scale]);
    ctx.fill();
  } else if (key === 'desktop') {
    const neckTopW = MODERN_DESKTOP_NECK_TOP_W * scale;
    const neckBottomW = MODERN_DESKTOP_NECK_BOTTOM_W * scale;
    const neckH = MODERN_DESKTOP_NECK_H * scale;
    ctx.fillStyle = bodyColor;
    ctx.beginPath();
    ctx.moveTo(frameX + frameW / 2 - neckTopW / 2, frameY + frameH);
    ctx.lineTo(frameX + frameW / 2 + neckTopW / 2, frameY + frameH);
    ctx.lineTo(frameX + frameW / 2 + neckBottomW / 2, frameY + frameH + neckH);
    ctx.lineTo(frameX + frameW / 2 - neckBottomW / 2, frameY + frameH + neckH);
    ctx.closePath();
    ctx.fill();

    const footW = MODERN_DESKTOP_FOOT_W * scale;
    const footH = MODERN_DESKTOP_FOOT_H * scale;
    ctx.fillStyle = bodyColor;
    ctx.beginPath();
    ctx.ellipse(frameX + frameW / 2, frameY + frameH + neckH, footW / 2, footH, 0, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawDevice(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  style: DeviceStyle,
  key: DeviceKey,
  screenX: number,
  screenY: number,
  screenW: number,
  screenH: number,
  tint?: Tint
) {
  if (style === 'modern') {
    drawDeviceModern(ctx, img, key, screenX, screenY, screenW, screenH, tint);
  } else {
    drawDeviceBrowser(ctx, img, key, screenX, screenY, screenW, screenH, tint);
  }
}

// Renders all captured viewports into a single PNG, arranged as a flat,
// layered device-frame composite (not photorealistic — see
// mockup.module.css for the matching on-page CSS frame styling this mirrors).
// `layout` and `order` default to the starting 16:9 arrangement but are
// meant to be overridden with whatever the user dragged devices to and
// whichever aspect ratio they picked.
export async function buildMockupComposite(
  shots: CompositeShots,
  layout: DeviceLayout = DEFAULT_LAYOUT,
  order: DeviceKey[] = DEFAULT_ORDER,
  canvasH: number = canvasHeightFor('16:9'),
  backgroundStyle: BackgroundStyle = 'gradient',
  backgroundTint?: Tint,
  deviceTint?: Tint,
  deviceStyle: DeviceStyle = 'browser'
): Promise<string> {
  const canvas = document.createElement('canvas');
  canvas.width = CANVAS_W;
  canvas.height = canvasH;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas is not supported in this browser');

  drawBackground(ctx, CANVAS_W, canvasH, backgroundStyle, backgroundTint);

  for (const key of order) {
    const shot = shots[key];
    if (!shot) continue;
    const { x, y, w, h } = layout[key];
    const img = await loadImage(shot.image);
    drawDevice(ctx, img, deviceStyle, key, x, y, w, h, deviceTint);
  }

  return canvas.toDataURL('image/png');
}
