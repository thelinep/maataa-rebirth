export type BrandAssetProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  aspectRatio?: string;
  sizes?: string;
};

export function BrandAsset({
  src,
  alt,
  className,
  priority = false,
  aspectRatio = "16 / 9",
  sizes = "(max-width: 720px) 100vw, 50vw"
}: BrandAssetProps) {
  return (
    <span className={`brand-asset${className ? ` ${className}` : ""}`} style={{ aspectRatio }}>
      <img
        alt={alt}
        className="brand-asset-image"
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "auto"}
        loading={priority ? "eager" : "lazy"}
        sizes={sizes}
        src={src}
      />
    </span>
  );
}
