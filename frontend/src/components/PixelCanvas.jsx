import { useEffect, useRef } from "react";

const GRID = 36;
const PALETTE = ["#F5DCD7", "#FBEBE8", "#EAE7EC", "#E2E8E4", "#F5EBE0", "#E8D5CF", "#D9CFDD", "#F3E4DE"];

// Deterministic pseudo-random
const rand = (seed) => {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

function buildPixels() {
  const pixels = [];
  const cx = GRID / 2;
  const headR = GRID * 0.24;
  const headCY = GRID * 0.36;
  const shoulderCY = GRID * 0.88;
  const shoulderRX = GRID * 0.34;
  const shoulderRY = GRID * 0.24;

  for (let y = 0; y < GRID; y++) {
    for (let x = 0; x < GRID; x++) {
      const dx = x + 0.5 - cx;
      const dyHead = y + 0.5 - headCY;
      const inHead = (dx * dx) / (headR * headR) + (dyHead * dyHead) / (headR * headR * 1.25) <= 1;
      const dyS = y + 0.5 - shoulderCY;
      const inShoulders =
        y + 0.5 > GRID * 0.62 &&
        (dx * dx) / (shoulderRX * shoulderRX) + (dyS * dyS) / (shoulderRY * shoulderRY) <= 1;
      const inNeck = Math.abs(dx) < GRID * 0.075 && y > GRID * 0.52 && y < GRID * 0.66;

      if (inHead || inShoulders || inNeck) {
        const seed = x * 73 + y * 149;
        const angle = Math.atan2(y + 0.5 - GRID * 0.5, dx);
        const speed = 0.35 + rand(seed) * 0.85;
        pixels.push({
          gx: x,
          gy: y,
          color: PALETTE[Math.floor(rand(seed + 1) * PALETTE.length)],
          vx: Math.cos(angle) * speed + (rand(seed + 2) - 0.5) * 0.4,
          vy: Math.sin(angle) * speed + (rand(seed + 3) - 0.5) * 0.4 - 0.12,
          delay: rand(seed + 4) * 0.25,
          size: 0.85 + rand(seed + 5) * 0.3,
          spin: (rand(seed + 6) - 0.5) * 2.4,
        });
      }
    }
  }
  return pixels;
}

export default function PixelCanvas({ progress }) {
  const canvasRef = useRef(null);
  const pixelsRef = useRef(null);
  const progressRef = useRef(progress);
  const rafRef = useRef(null);

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    pixelsRef.current = buildPixels();

    const resize = () => {
      const parent = canvas.parentElement;
      const size = Math.min(parent.clientWidth * 0.86, parent.clientHeight * 0.92, 560);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const cell = w / GRID;
      const p = progressRef.current;

      ctx.clearRect(0, 0, w, h);

      const explode = Math.min(Math.max((p - 0.2) / 0.8, 0), 1);
      const ease = explode * explode * (3 - 2 * explode);

      for (const px of pixelsRef.current) {
        const local = Math.min(Math.max((ease - px.delay * 0.5) / (1 - px.delay * 0.5), 0), 1);
        const dist = local * Math.max(w, h) * 0.85;
        const x = (px.gx + 0.5) * cell + px.vx * dist;
        const y = (px.gy + 0.5) * cell + px.vy * dist;
        const alpha = Math.max(1 - local * local * 1.15, 0);
        if (alpha <= 0.01) continue;

        const size = cell * px.size * (1 - local * 0.35);
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.translate(x, y);
        ctx.rotate(px.spin * local);
        ctx.fillStyle = px.color;
        const half = size / 2;
        ctx.beginPath();
        ctx.roundRect(-half, -half, size, size, size * 0.22);
        ctx.fill();
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute z-0 opacity-90"
      data-testid="hero-pixel-canvas"
      aria-hidden="true"
    />
  );
}
