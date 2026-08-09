import { NASALIZATION_BASE64, BASTLIGA_BASE64 } from "./fontsData";
import { heading, serif, signature } from "@/app/fonts";

export const formatTime = (totalSeconds: number): string => {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

export const get404Url = (): string => {
  if (typeof window !== "undefined") {
    return `${window.location.origin}/`;
  }
  return "https://aarabii.me/";
};

export const generateSVGTrophy = (
  moves: number,
  timeSeconds: number,
  playerName?: string,
): string => {
  const formattedDate = new Date()
    .toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .toUpperCase();

  const pageUrl = get404Url();
  const trimmedName = playerName?.trim();
  const displayName = trimmedName
    ? trimmedName.toUpperCase()
    : "ANONYMOUS PLAYER";

  // font family names from Next.js font loader and PostScript font names
  const fontNasalization = heading.style.fontFamily
    ? `${heading.style.fontFamily}, 'NasalizationFont', 'Nasalization-Regular', 'Nasalization', var(--font-heading), Impact, sans-serif`
    : "'NasalizationFont', 'Nasalization-Regular', 'Nasalization', var(--font-heading), Impact, sans-serif";

  const fontSerif = serif.style.fontFamily
    ? `${serif.style.fontFamily}, 'Instrument Serif', var(--font-serif), Georgia, serif`
    : "'Instrument Serif', var(--font-serif), Georgia, serif";

  const fontSignature = signature.style.fontFamily
    ? `${signature.style.fontFamily}, 'SignatureFont', 'BastligaOne', 'Bastliga1', 'Bastliga', var(--font-signature), cursive, sans-serif`
    : "'SignatureFont', 'BastligaOne', 'Bastliga1', 'Bastliga', var(--font-signature), cursive, sans-serif";

  // name box is 810px wide - shrink font as the name gets longer so it fits cleanly
  const nameFontSize =
    displayName.length > 22
      ? 42
      : displayName.length > 15
        ? 52
        : displayName.length > 10
          ? 60
          : 68;

  // dark brutalist palette
  const BG = "#0a0a0b";
  const CREAM = "#f1eee5";
  const INK = "#0a0a0b";
  const YELLOW = "#e7f20a";
  const PANEL = "#141417";
  const MUTE = "rgba(241,238,229,0.55)";
  const HAIR = "rgba(241,238,229,0.28)";
  const HAIR_SOFT = "rgba(241,238,229,0.15)";

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1600 900">
  <defs>
    <pattern id="dots" width="18" height="18" patternUnits="userSpaceOnUse">
      <circle cx="3" cy="3" r="2.5" fill="${CREAM}" opacity=".35"/>
    </pattern>
    <pattern id="grain" width="32" height="32" patternUnits="userSpaceOnUse">
      <circle cx="4" cy="8" r="1" fill="${CREAM}" opacity=".1"/>
      <circle cx="18" cy="22" r="1.2" fill="${CREAM}" opacity=".08"/>
      <circle cx="28" cy="5" r=".8" fill="${CREAM}" opacity=".12"/>
    </pattern>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&amp;display=swap');

      @font-face {
        font-family: 'NasalizationFont';
        src: url('data:application/x-font-opentype;charset=utf-8;base64,${NASALIZATION_BASE64}') format('opentype'),
             url('data:font/otf;base64,${NASALIZATION_BASE64}') format('opentype');
        font-weight: normal;
        font-style: normal;
      }

      @font-face {
        font-family: 'Nasalization-Regular';
        src: url('data:application/x-font-opentype;charset=utf-8;base64,${NASALIZATION_BASE64}') format('opentype');
        font-weight: normal;
        font-style: normal;
      }

      @font-face {
        font-family: 'SignatureFont';
        src: url('data:application/x-font-opentype;charset=utf-8;base64,${BASTLIGA_BASE64}') format('opentype'),
             url('data:font/otf;base64,${BASTLIGA_BASE64}') format('opentype');
        font-weight: normal;
        font-style: normal;
      }

      @font-face {
        font-family: 'BastligaOne';
        src: url('data:application/x-font-opentype;charset=utf-8;base64,${BASTLIGA_BASE64}') format('opentype');
        font-weight: normal;
        font-style: normal;
      }

      .block{fill:${CREAM}}
      .ink{fill:${INK}}
      .yellow{fill:${YELLOW}}
      .nasalization{font-family: ${fontNasalization};}
      .serif-font{font-family: ${fontSerif};}
      .signature-font{font-family: ${fontSignature};}
      .label{font-family: var(--font-mono), 'Courier New', monospace; letter-spacing:3px}
      .condensed{font-family: ${fontNasalization};}
    </style>
  </defs>


  <!-- BASE -->
  <rect width="1600" height="900" fill="${BG}"/>
  <rect x="24" y="24" width="1552" height="852" fill="none" stroke="${CREAM}" stroke-width="3"/>
  <rect width="1600" height="900" fill="url(#grain)"/>

  <!-- SPINE (full height) -->
  <rect x="0" y="0" width="130" height="900" class="block"/>
  <text x="65" y="450" transform="rotate(-90 65 450)" text-anchor="middle" class="nasalization ink" style="font-family: ${fontNasalization};" font-size="38" letter-spacing="10">CERTIFICATE</text>

  <!-- CORNER APERTURE -->
  <rect x="1460" y="50" width="92" height="92" class="block"/>
  <rect x="1483" y="74" width="45" height="45" fill="${BG}"/>
  <rect x="1500" y="92" width="12" height="12" class="yellow"/>

  <!-- HEADER -->
  <text x="200" y="175" class="nasalization yellow" style="font-family: ${fontNasalization};" font-size="90" letter-spacing="2">CERTIFICATE</text>
  <rect x="200" y="205" width="320" height="50" class="block"/>
  <text x="222" y="238" class="label ink" font-size="22">OF ACHIEVEMENT</text>

  <!-- TROPHY PANEL -->
  <rect x="190" y="260" width="470" height="560" rx="18" fill="${PANEL}" stroke="${HAIR}" stroke-width="1.5"/>
  <rect x="190" y="260" width="470" height="560" rx="18" fill="url(#grain)"/>
  <rect x="210" y="280" width="130" height="110" fill="url(#dots)"/>

  <g transform="translate(216 231) scale(0.82)">
    <path d="M80 105 C15 70,5 155,78 180 L100 145 C55 140,54 116,92 130Z" class="yellow"/>
    <path d="M430 105 C495 70,505 155,432 180 L410 145 C455 140,456 116,418 130Z" class="yellow"/>
    <path d="M92 72 Q255 118 418 72 L382 310 Q350 385 255 405 Q160 385 128 310Z" class="yellow"/>
    <path d="M145 92 Q255 122 365 92 L340 280 Q315 330 255 345 Q195 330 170 280Z" fill="${BG}" opacity=".22"/>
    <path d="M250 85 L292 90 L280 320 L255 340 L238 318Z" fill="${BG}" opacity=".35"/>
    <path d="M215 375h80v95h-80z" class="yellow"/>
    <path d="M185 455h140l25 45H160z" class="yellow"/>
    <rect x="125" y="500" width="260" height="92" class="block"/>
    <rect x="145" y="522" width="220" height="48" fill="none" stroke="${INK}" stroke-width="3" opacity=".5"/>
    <text x="255" y="542" text-anchor="middle" class="label ink" font-size="16">404 GAME</text>
    <text x="255" y="562" text-anchor="middle" class="label ink" font-size="16">CHAMPION</text>
  </g>

  <!-- DIVIDER -->
  <rect x="682" y="260" width="16" height="560" class="block"/>

  <!-- RIGHT COLUMN -->
  <text x="730" y="300" class="label" font-size="20" fill="${MUTE}">PROUDLY PRESENTED TO</text>

  <rect x="730" y="320" width="810" height="110" class="yellow"/>
  <text x="755" y="395" class="serif-font ink" style="font-family: ${fontSerif};" font-size="${nameFontSize}">${displayName}</text>

  <line x1="730" y1="452" x2="1540" y2="452" stroke="${HAIR}" stroke-width="2"/>

  <text x="730" y="490" class="label" font-size="17" fill="${MUTE}">FOR MASTERING THE 404 PATTERN MEMORY MATCH</text>
  <text x="730" y="515" class="label" font-size="17" fill="${MUTE}">WITH SKILL, STRATEGY AND SPEED.</text>

  <line x1="730" y1="545" x2="1540" y2="545" stroke="${HAIR_SOFT}" stroke-width="1"/>

  <!-- STATS -->
  <rect x="730" y="575" width="78" height="78" class="block"/>
  <text x="769" y="628" text-anchor="middle" class="condensed ink" style="font-family: ${fontNasalization};" font-size="50">↗</text>
  <text x="825" y="598" class="label" font-size="16" fill="${MUTE}">TOTAL MOVES</text>
  <text x="825" y="648" class="condensed yellow" style="font-family: ${fontNasalization};" font-size="42">${moves}</text>
  <rect x="825" y="655" width="150" height="6" class="yellow"/>

  <line x1="1060" y1="575" x2="1060" y2="655" stroke="${HAIR}" stroke-width="2"/>

  <rect x="1100" y="575" width="78" height="78" class="block"/>
  <circle cx="1139" cy="613" r="21" fill="none" stroke="${INK}" stroke-width="5"/>
  <path d="M1139 613l12-9M1133 581h12M1139 577v-7" stroke="${INK}" stroke-width="5"/>
  <text x="1195" y="598" class="label" font-size="16" fill="${MUTE}">TOTAL TIME</text>
  <text x="1195" y="648" class="condensed yellow" style="font-family: ${fontNasalization};" font-size="42">${formatTime(timeSeconds)}</text>
  <rect x="1195" y="655" width="190" height="6" class="yellow"/>

  <line x1="730" y1="700" x2="1540" y2="700" stroke="${HAIR_SOFT}" stroke-width="1"/>

  <!-- FOOTER -->
  <text x="730" y="750" class="label" font-size="16" fill="${MUTE}">DATE</text>
  <text x="730" y="785" class="label" font-size="20" fill="${CREAM}">${formattedDate}</text>

  <text x="1150" y="750" class="label" font-size="16" fill="${MUTE}">404 MASTER</text>
  <text x="1150" y="785" class="label" font-size="20" fill="${CREAM}">${pageUrl}</text>

  <!-- SERIAL MARK -->
  <path d="M1470 828l14-16M1487 828l14-16M1504 828l14-16" stroke="${CREAM}" stroke-width="4" opacity=".5"/>
  <text x="1536" y="855" text-anchor="end" class="signature-font" style="font-family: ${fontSignature};" font-size="32" fill="rgba(241,238,229,0.85)">aarabii...</text>
</svg>`;
};


export const downloadSVGTrophy = (
  moves: number,
  timeSeconds: number,
  playerName?: string,
): void => {
  const svgContent = generateSVGTrophy(moves, timeSeconds, playerName);
  const blob = new Blob([svgContent], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "404_champion_trophy.svg";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const downloadPNGFromSVG = (
  moves: number,
  timeSeconds: number,
  playerName?: string,
  onComplete?: () => void,
): void => {
  const svgContent = generateSVGTrophy(moves, timeSeconds, playerName);

  // High resolution scale (3200x1800) matching 1600x900 SVG viewBox (16:9 ratio)
  const scale = 2;
  const width = 1600 * scale;
  const height = 900 * scale;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");

  // Base64 Data URI for robust cross-browser SVG to PNG conversion
  const svgBase64 = btoa(unescape(encodeURIComponent(svgContent)));
  const url = `data:image/svg+xml;base64,${svgBase64}`;
  const img = new Image();

  img.onload = () => {
    if (ctx) {
      // Draw background fill
      ctx.fillStyle = "#0a0a0b";
      ctx.fillRect(0, 0, width, height);

      // Draw full SVG image across full canvas dimensions
      ctx.drawImage(img, 0, 0, width, height);

      const pngUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = pngUrl;
      link.download = "404_champion_trophy.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    if (onComplete) onComplete();
  };

  img.onerror = () => {
    if (onComplete) onComplete();
  };

  img.src = url;
};
