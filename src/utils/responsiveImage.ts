const RASTER_EXT = /\.(png|jpe?g|webp|avif)$/i;
const ORIGINAL_ASSET = /\/images\/(gameplay|extras)\//i;
const UNCOMPRESSED_DISPLAY = /\/images\/extras\/cloud-dma\.jpe?g$/i;

/** True for gameplay/extras sources. Original JPEGs stay on disk for OG; pages serve WebP/AVIF variants. */
export function isOriginalAsset(src: string): boolean {
  return ORIGINAL_ASSET.test(src);
}

/** Cloud DMA is shown from the original JPEG with no resize or WebP pass. */
export function keepOriginalDisplay(src: string): boolean {
  return UNCOMPRESSED_DISPLAY.test(src);
}

/** 400w covers ~330px card slots at 1x; 1920w covers 2x/3x featured cards. */
export const CARD_IMAGE_WIDTHS = [400, 960, 1920] as const;
export const CARD_IMAGE_SIZES = '(min-width: 1024px) 330px, (min-width: 640px) 50vw, 100vw';
/** Hero slot is a full column on desktop; 3840w covers 4K and 3x retina. */
export const HERO_IMAGE_WIDTHS = [960, 1920, 3840] as const;
export const HERO_IMAGE_SIZES = '(min-width: 1024px) 42vw, 92vw';
/** Thumbs ~148px CSS; 400w covers 2x DPR. */
export const THUMB_IMAGE_WIDTHS = [400] as const;
export const DEFAULT_IMAGE_WIDTHS = [960, 1920, 3840] as const;
export const GALLERY_IMAGE_WIDTHS = [960, 1920, 3840] as const;
export const GALLERY_IMAGE_SIZES = '(min-width: 2560px) 1920px, (min-width: 1280px) 72vw, 100vw';

export function stripRasterExt(src: string): string {
  return src.replace(RASTER_EXT, '');
}

export function variantSrc(src: string, width: number, ext: 'webp' | 'avif' = 'webp'): string {
  if (keepOriginalDisplay(src) || src.endsWith('.webp') || src.endsWith('.avif')) return src;
  return `${stripRasterExt(src)}-${width}.${ext}`;
}

export function webpSrc(src: string, width: number): string {
  return variantSrc(src, width, 'webp');
}

export function imageType(src: string): 'image/jpeg' | 'image/webp' | 'image/avif' {
  if (src.endsWith('.jpg') || src.endsWith('.jpeg')) return 'image/jpeg';
  if (src.endsWith('.avif')) return 'image/avif';
  return 'image/webp';
}

export function displayImageType(src?: string): 'image/jpeg' | 'image/webp' | 'image/avif' {
  if (src && keepOriginalDisplay(src)) return 'image/jpeg';
  return 'image/webp';
}

function srcSetFor(src: string, widths: readonly number[], ext: 'webp' | 'avif'): string {
  return widths.map((width) => `${variantSrc(src, width, ext)} ${width}w`).join(', ');
}

export function responsiveSrcSet(src: string, widths: readonly number[] = DEFAULT_IMAGE_WIDTHS): string {
  return srcSetFor(src, widths, 'webp');
}

/** Smallest variant — used as img src so Lighthouse and no-srcset clients get the right size. */
export function defaultWebpSrc(src: string, widths: readonly number[]): string {
  return webpSrc(src, widths[0] ?? 960);
}

export function imageSrcSet(src: string, widths: readonly number[] = DEFAULT_IMAGE_WIDTHS): string | undefined {
  if (!RASTER_EXT.test(src) || src.endsWith('.webp') || src.endsWith('.avif') || keepOriginalDisplay(src)) {
    return undefined;
  }
  return srcSetFor(src, widths, 'webp');
}

export function avifSrcSet(src: string, widths: readonly number[] = DEFAULT_IMAGE_WIDTHS): string | undefined {
  if (!RASTER_EXT.test(src) || src.endsWith('.webp') || src.endsWith('.avif') || keepOriginalDisplay(src)) {
    return undefined;
  }
  return srcSetFor(src, widths, 'avif');
}
