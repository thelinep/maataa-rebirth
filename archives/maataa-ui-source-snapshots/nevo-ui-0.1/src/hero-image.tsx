import type { CSSProperties, ImgHTMLAttributes } from "react";

const classes = (...values: Array<string | undefined | false>) => values.filter(Boolean).join(" ");

export type HeroImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "alt" | "className"> & {
  alt: string;
  className?: string;
  /** AVIF candidates ("url 640w, url 1024w"), offered before WebP/fallback. */
  avifSrcSet?: string;
  /** WebP candidates, offered after AVIF. */
  webpSrcSet?: string;
  /** Colour painted behind the image while it loads. */
  placeholderColor?: string;
  /** Show the alt text as a visible caption (default true, the original behaviour). */
  caption?: boolean;
  /** Above-the-fold hero: load eagerly with high fetch priority. */
  priority?: boolean;
};

/** A responsive, semantically labelled hero image. Hosts supply the asset and
 * text; the visual frame and responsive behaviour remain MAATAA-owned. When
 * AVIF/WebP candidates are supplied it renders a <picture> so browsers pick the
 * smallest format and width they support. */
export function HeroImage({ alt, className, avifSrcSet, webpSrcSet, placeholderColor, caption = true, priority = false, sizes = "(min-width: 1200px) 1200px, 100vw", loading, decoding, style, ...props }: HeroImageProps) {
  const frameStyle: CSSProperties | undefined = placeholderColor ? { backgroundColor: placeholderColor } : undefined;
  const image = <img {...props} sizes={avifSrcSet || webpSrcSet || props.srcSet ? sizes : undefined} alt={alt} loading={loading ?? (priority ? "eager" : "lazy")} decoding={decoding ?? "async"} fetchPriority={priority ? "high" : undefined} style={style} />;
  return <figure className={classes("maataa-ui", "maataa-ui__hero-image", className)} style={frameStyle}>
    {avifSrcSet || webpSrcSet ? <picture>{avifSrcSet ? <source type="image/avif" srcSet={avifSrcSet} sizes={sizes} /> : null}{webpSrcSet ? <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} /> : null}{image}</picture> : image}
    {caption && alt ? <figcaption>{alt}</figcaption> : null}
  </figure>;
}
