import { Font, pixelBasedPreset } from "react-email";

export const emailTailwindConfig = {
  presets: [pixelBasedPreset],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        surface: "#0e0e10",
        card: "#141416",
        "card-subtle": "#18181b",
        "card-muted": "#1e1e24",
        foreground: "#f4f4f5",
        "foreground-secondary": "#d4d4d8",
        muted: "#a1a1aa",
        border: "#27272a",
        "border-subtle": "#202024",
        accent: "#f59e0b", // chart-1 amber token
      },
      fontFamily: {
        heading: ["Oxanium", "system-ui", "-apple-system", "sans-serif"],
        sans: [
          "Manrope",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        mono: [
          "JetBrains Mono",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },
    },
  },
};

export function EmailFonts() {
  return (
    <>
      <Font
        fontFamily="Oxanium"
        fallbackFontFamily="sans-serif"
        webFont={{
          url: "https://fonts.gstatic.com/s/oxanium/v19/6NuL8Up5Oz69n3-Y0p_2F.woff2",
          format: "woff2",
        }}
        fontWeight={600}
        fontStyle="normal"
      />
      <Font
        fontFamily="Manrope"
        fallbackFontFamily="sans-serif"
        webFont={{
          url: "https://fonts.gstatic.com/s/manrope/v15/xn7gOHwg135P2I0TiLq42e296Nit.woff2",
          format: "woff2",
        }}
        fontWeight={400}
        fontStyle="normal"
      />
      <Font
        fontFamily="JetBrains Mono"
        fallbackFontFamily="monospace"
        webFont={{
          url: "https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_al06PQ.woff2",
          format: "woff2",
        }}
        fontWeight={400}
        fontStyle="normal"
      />
    </>
  );
}
