import React, { useState } from 'react';
import { OFFICIAL_LOGO_URL, LOCAL_FALLBACK_LOGO_URL } from '../utils/logoHelper';
import { Compass } from 'lucide-react';

interface LogoImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
  fallbackText?: string;
  showTextFallback?: boolean;
}

export const LogoImage: React.FC<LogoImageProps> = ({
  className = 'h-12 w-auto object-contain',
  alt = 'Dreampath AI Logo',
  fallbackText = 'Dreampath AI',
  showTextFallback = true,
  style,
  ...props
}) => {
  const [currentSrc, setCurrentSrc] = useState<string>(OFFICIAL_LOGO_URL);
  const [hasError, setHasError] = useState<boolean>(false);
  const [attemptCount, setAttemptCount] = useState<number>(0);

  const handleError = () => {
    if (attemptCount === 0) {
      // Step 1: Retry with local bundled /logo.png
      setAttemptCount(1);
      setCurrentSrc(LOCAL_FALLBACK_LOGO_URL);
    } else {
      // Step 2: Switch to elegant text/badge fallback
      setHasError(true);
    }
  };

  if (hasError && showTextFallback) {
    return (
      <div 
        className="inline-flex items-center gap-2 font-display font-black text-slate-900 tracking-tight select-none"
        style={{ maxHeight: '50px', ...style }}
      >
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-teal-500 to-emerald-400 flex items-center justify-center text-white shadow-md">
          <Compass className="w-5 h-5 animate-spin-slow" />
        </div>
        <span className="text-xl bg-gradient-to-r from-indigo-600 to-teal-600 bg-clip-text text-transparent">
          {fallbackText}
        </span>
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      crossOrigin="anonymous"
      onError={handleError}
      className={className}
      style={{
        maxHeight: '50px',
        width: 'auto',
        objectFit: 'contain',
        ...style
      }}
      {...props}
    />
  );
};
