import { useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface CustomImageProps extends Omit<ImageProps, 'src'> {
  src: string | null;
}

// const getImageUrl = (imageUrl: string | null): string => {
//   if (!imageUrl) return '';
//   if (imageUrl.includes('amazonaws.com')) return imageUrl;
//   const imageKey = imageUrl.split('/').pop();
//   return `/image/${imageKey}`;
// };



const CustomImage: React.FC<CustomImageProps> = ({ src, alt, ...props }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);


  // Log the src to debug the URL
  console.log('Image source URL:', src);

  //   const fullSrc = getImageUrl(src);
  const fullSrc = src || ''; // Use the provided src directly


  if (hasError) {
    return <div className="bg-gray-200 flex items-center justify-center" {...props}>Failed to load image</div>;
  }

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
          Loading...
        </div>
      )}
      <Image
        src={fullSrc}
        alt={alt}
        {...props}
        unoptimized // Disable Next.js image optimization
        onLoadingComplete={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
      />
    </div>
  );
};

export default CustomImage;