export const createDarkBlurSVG = (w: number, h: number): string => `
  <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <linearGradient id="darkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#1a1a1a;stop-opacity:1" />
        <stop offset="25%" style="stop-color:#2d2d2d;stop-opacity:0.8" />
        <stop offset="50%" style="stop-color:#404040;stop-opacity:0.6" />
        <stop offset="75%" style="stop-color:#2d2d2d;stop-opacity:0.8" />
        <stop offset="100%" style="stop-color:#1a1a1a;stop-opacity:1" />
      </linearGradient>
      <filter id="blur" x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence baseFrequency="0.04" numOctaves="3" result="noise" seed="1"/>
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="8"/>
        <feGaussianBlur stdDeviation="12" result="blur"/>
        <feColorMatrix values="0.3 0.3 0.3 0 0 0.3 0.3 0.3 0 0 0.3 0.3 0.3 0 0 0 0 0 1 0"/>
      </filter>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#darkGradient)" filter="url(#blur)" />
  </svg>`;

export const toBase64 = (str: string): string =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

export const createBlurDataURL = ({
  width = 700,
  height = 475,
}: {
  width?: number;
  height?: number;
} = {}): string => {
  const svg = createDarkBlurSVG(width, height);
  return `data:image/svg+xml;base64,${toBase64(svg)}`;
};
