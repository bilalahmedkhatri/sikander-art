type ImageOptions = {
  sizes: string;
  loading?: 'lazy' | 'eager';
  width?: number;
};

// Request resized CDN variants instead of downloading original stock photos.
// Local assets and other image providers retain their original URL.
export const imageUrl = (source: string, width: number) => {
  let url: URL;
  try {
    url = new URL(source);
  } catch {
    return source;
  }

  if (!['images.pexels.com', 'images.unsplash.com'].includes(url.hostname)) {
    return source;
  }

  url.searchParams.set('w', String(width));
  url.searchParams.set('q', '70');
  if (url.hostname === 'images.pexels.com') {
    url.searchParams.set('auto', 'compress');
    url.searchParams.set('cs', 'tinysrgb');
  } else {
    url.searchParams.set('auto', 'format');
    url.searchParams.set('fit', 'crop');
  }
  return url.toString();
};

export const responsiveImageProps = (source: string, {
  sizes,
  loading = 'lazy',
  width = 800,
}: ImageOptions) => {
  const src = imageUrl(source, width);
  const widths = [320, 480, 640, 800, 960, 1200, 1600];
  return {
    src,
    // Only advertise variants for providers that actually resize the image.
    srcSet: imageUrl(source, 320) === imageUrl(source, 640) ? undefined : widths.map(size => `${imageUrl(source, size)} ${size}w`).join(', '),
    sizes,
    loading,
    decoding: 'async' as const,
  };
};
