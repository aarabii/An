import { FC } from "react";
import Image, { StaticImageData } from "next/image";

interface ImagesProps {
  url: string | StaticImageData;
  alt?: string;
  layout?: "fill" | "responsive" | "fixed";
  quality?: number;
  className?: string;
  width?: number;
  height?: number;
}

export const Images: FC<ImagesProps> = ({
  url,
  alt,
  layout,
  quality,
  className,
  width,
  height,
}) => {
  const convertImage = (w: number, h: number) => `
  <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <linearGradient id="g">
        <stop stop-color="#fff" offset="20%" />
        <stop stop-color="#fff" offset="50%" />
        <stop stop-color="#000" offset="70%" />
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#000" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
  </svg>`;

  const toBase64 = (str: string) =>
    typeof window === "undefined"
      ? Buffer.from(str).toString("base64")
      : window.btoa(str);

  return (
    <Image
      alt={alt ? alt : "Image"}
      src={url}
      width={width}
      height={height}
      placeholder="blur"
      loading="lazy"
      quality={quality ? quality : 100}
      layout={layout ? layout : "responsive"}
      className={className ? className : "rounded-lg"}
      blurDataURL={`data:image/svg+xml;base64,${toBase64(
        convertImage(700, 475)
      )}`}
      style={{
        objectFit: "cover",
      }}
    />
  );
};
