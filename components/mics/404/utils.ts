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
  playerName?: string
): string => {
  const formattedDate = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const pageUrl = get404Url();
  const trimmedName = playerName?.trim();

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="800" height="1000">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#09090b"/>
        <stop offset="100%" stop-color="#121215"/>
      </linearGradient>
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#f59e0b"/>
        <stop offset="100%" stop-color="#d97706"/>
      </linearGradient>
      <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#10b981"/>
        <stop offset="100%" stop-color="#059669"/>
      </linearGradient>
    </defs>

    <!-- Outer Flat Card Frame -->
    <rect x="20" y="20" width="760" height="960" rx="28" fill="url(#bgGrad)" stroke="#27272a" stroke-width="3"/>
    <rect x="35" y="35" width="730" height="930" rx="20" fill="none" stroke="#3f3f46" stroke-width="1.5" stroke-dasharray="6 6" opacity="0.6"/>

    <!-- Trophy Graphic -->
    <g transform="translate(400, 310) scale(1.5)">
      <!-- Base -->
      <path d="M-40 60 L40 60 L25 80 L-25 80 Z" fill="url(#goldGrad)" />
      <rect x="-15" y="80" width="30" height="15" fill="#b45309" rx="2" />
      <rect x="-50" y="95" width="100" height="20" fill="url(#goldGrad)" rx="4" />
      
      <!-- Cup Main Body -->
      <path d="M-60 -70 C-60 10 -40 50 0 50 C40 50 60 10 60 -70 Z" fill="url(#goldGrad)" />
      <!-- Handles -->
      <path d="M-60 -50 C-95 -50 -95 10 -55 20" fill="none" stroke="url(#goldGrad)" stroke-width="10" stroke-linecap="round"/>
      <path d="M60 -50 C95 -50 95 10 55 20" fill="none" stroke="url(#goldGrad)" stroke-width="10" stroke-linecap="round"/>
      
      <!-- Emblem -->
      <path d="M0 -25 L6 -8 L24 -8 L10 3 L15 20 L0 10 L-15 20 L-10 3 L-24 -8 L-6 -8 Z" fill="#09090b" />
    </g>

    <!-- Top Badge -->
    <rect x="240" y="75" width="320" height="42" rx="21" fill="#10b981" fill-opacity="0.15" stroke="#10b981" stroke-width="1.5"/>
    <text x="400" y="102" font-family="sans-serif" font-size="16" font-weight="bold" fill="#34d399" text-anchor="middle" letter-spacing="2">404 GAME CHAMPION</text>

    <!-- Title Header -->
    <text x="400" y="555" font-family="sans-serif" font-size="40" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="1">MASTER OF TILES</text>
    <text x="400" y="590" font-family="sans-serif" font-size="17" fill="#a1a1aa" text-anchor="middle">404 Pattern Memory Match Challenge</text>

    ${
      trimmedName
        ? `<g>
            <rect x="200" y="612" width="400" height="38" rx="19" fill="#f59e0b" fill-opacity="0.1" stroke="#f59e0b" stroke-opacity="0.4" stroke-width="1.5"/>
            <text x="400" y="637" font-family="sans-serif" font-size="15" font-weight="bold" fill="#fbbf24" text-anchor="middle" letter-spacing="2">AWARDED TO: ${trimmedName.toUpperCase()}</text>
          </g>`
        : ""
    }

    <!-- Stats Container Box -->
    <rect x="120" y="${trimmedName ? 670 : 640}" width="560" height="135" rx="16" fill="#18181b" stroke="#27272a" stroke-width="2"/>
    
    <!-- Stat 1: Moves -->
    <text x="260" y="${trimmedName ? 718 : 688}" font-family="sans-serif" font-size="13" fill="#a1a1aa" text-anchor="middle">TOTAL MOVES</text>
    <text x="260" y="${trimmedName ? 765 : 735}" font-family="sans-serif" font-size="36" font-weight="bold" fill="#f59e0b" text-anchor="middle">${moves}</text>

    <!-- Divider line -->
    <line x1="400" y1="${trimmedName ? 695 : 665}" x2="400" y2="${trimmedName ? 775 : 745}" stroke="#27272a" stroke-width="2"/>

    <!-- Stat 2: Time -->
    <text x="540" y="${trimmedName ? 718 : 688}" font-family="sans-serif" font-size="13" fill="#a1a1aa" text-anchor="middle">TIME ELAPSED</text>
    <text x="540" y="${trimmedName ? 765 : 735}" font-family="sans-serif" font-size="36" font-weight="bold" fill="#34d399" text-anchor="middle">${formatTime(timeSeconds)}</text>

    <!-- Footer Info with site URL https://aarabii.me/ -->
    <text x="400" y="870" font-family="sans-serif" font-size="16" font-weight="700" fill="#a1a1aa" text-anchor="middle">${pageUrl}</text>
    <text x="400" y="900" font-family="sans-serif" font-size="13" fill="#71717a" text-anchor="middle">Completed on ${formattedDate}</text>
  </svg>`;
};

export const downloadSVGTrophy = (
  moves: number,
  timeSeconds: number,
  playerName?: string
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
  onComplete?: () => void
): void => {
  const svgContent = generateSVGTrophy(moves, timeSeconds, playerName);
  const blob = new Blob([svgContent], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const img = new Image();

  img.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 1600;
    canvas.height = 2000;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(img, 0, 0, 1600, 2000);
      const pngUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = pngUrl;
      link.download = "404_champion_trophy.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    URL.revokeObjectURL(url);
    if (onComplete) onComplete();
  };

  img.onerror = () => {
    URL.revokeObjectURL(url);
    if (onComplete) onComplete();
  };

  img.src = url;
};
