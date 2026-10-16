const RASTER_EXT = /\.(png|jpe?g|webp)$/i;
const ORIGINAL_ASSET = /\/images\/(gameplay|extras)\//i;
const UNCOMPRESSED_DISPLAY = /\/images\/extras\/cloud-dma\.jpe?g$/i;

/** True for gameplay/extras sources. Original JPEGs stay on disk for OG; pages serve WebP variants. */
export function isOriginalAsset(src: string): boolean {
  return ORIGINAL_ASSET.test(src);
}

/** Cloud DMA is shown from the original JPEG with no resize or WebP pass. */
export function keepOriginalDisplay(src: string): boolean {
  return UNCOMPRESSED_DISPLAY.test(src);
}

/** 400w covers ~330px card slots at 1x; 640w covers 2x retina. */
export const CARD_IMAGE_WIDTHS = [400] as const;
export const CARD_IMAGE_SIZES = '(min-width: 1024px) 330px, (min-width: 640px) 50vw, 100vw';
/** 640w covers hero at 1x; 960 covers 2x in the 490px slot without pulling 1280. */
export const HERO_IMAGE_WIDTHS = [640, 960] as const;
export const HERO_IMAGE_SIZES = '(min-width: 1024px) 400px, 92vw';
/** Thumbs ~148px CSS; 320w covers 2x DPR without pulling 640/960. */
export const THUMB_IMAGE_WIDTHS = [320] as const;
export const DEFAULT_IMAGE_WIDTHS = [400, 640, 960] as const;
export const GALLERY_IMAGE_WIDTHS = [400, 640] as const;
export const GALLERY_IMAGE_SIZES = '(min-width: 1024px) 640px, 230px';

export function stripRasterExt(src: string): string {
  return src.replace(RASTER_EXT, '');
}

export function webpSrc(src: string, width: number): string {
  if (keepOriginalDisplay(src) || src.endsWith('.webp')) return src;
  return `${stripRasterExt(src)}-${width}.webp`;
}

export function imageType(src: string): 'image/jpeg' | 'image/webp' {
  if (src.endsWith('.jpg') || src.endsWith('.jpeg')) return 'image/jpeg';
  return 'image/webp';
}

export function displayImageType(src?: string): 'image/jpeg' | 'image/webp' {
  if (src && keepOriginalDisplay(src)) return 'image/jpeg';
  return 'image/webp';
}

export function responsiveSrcSet(src: string, widths: readonly number[] = DEFAULT_IMAGE_WIDTHS): string {
  return widths.map((width) => `${webpSrc(src, width)} ${width}w`).join(', ');
}

/** Smallest variant — used as img src so Lighthouse and no-srcset clients get the right size. */
export function defaultWebpSrc(src: string, widths: readonly number[]): string {
  return webpSrc(src, widths[0] ?? 640);
}

export function imageSrcSet(src: string, widths: readonly number[] = DEFAULT_IMAGE_WIDTHS): string | undefined {
  if (!RASTER_EXT.test(src) || src.endsWith('.webp') || keepOriginalDisplay(src)) return undefined;
  return responsiveSrcSet(src, widths);
}
