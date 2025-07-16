// Custom image loader for static export with optimization
export default function imageLoader({ src, width, quality }) {
  // Set default quality for better performance
  const defaultQuality = quality || 75;
  
  // For external images, return as-is with optimization parameters
  if (src.startsWith('http')) {
    // For Pexels images, add optimization parameters
    if (src.includes('pexels.com')) {
      const url = new URL(src);
      url.searchParams.set('auto', 'compress');
      url.searchParams.set('cs', 'tinysrgb');
      url.searchParams.set('w', width.toString());
      url.searchParams.set('q', defaultQuality.toString());
      url.searchParams.set('fit', 'crop');
      return url.toString();
    }
    
    // For Unsplash images, add optimization parameters
    if (src.includes('unsplash.com')) {
      const url = new URL(src);
      url.searchParams.set('auto', 'format,compress');
      url.searchParams.set('w', width.toString());
      url.searchParams.set('q', defaultQuality.toString());
      url.searchParams.set('fit', 'crop');
      return url.toString();
    }
    
    // For other external images, return as-is
    return src;
  }
  
  // For local images in static export, return as-is
  return src;
}