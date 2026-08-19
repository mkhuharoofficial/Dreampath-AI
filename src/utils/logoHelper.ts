import { LOGO_BASE64 } from '../assets/logoBase64';

// Official Hosted Logo URL provided by user
export const OFFICIAL_LOGO_URL = 'https://i.ibb.co/7xmKZNZY/IMG-20260811-110751-removebg-preview.png';
export const HOSTED_LOGO_PAGE_URL = 'https://ibb.co/0pbr6V6D';
export const LOCAL_FALLBACK_LOGO_URL = '/logo.png';

let cachedLogoDataUrl: string | null = null;

/**
 * Load image as Base64 Data URL for jsPDF / canvas rendering.
 * Uses CORS-compliant anonymous loading with multiple reliable fallback tiers:
 * Tier 1: Official Hosted Image (ImgBB CDN)
 * Tier 2: Local bundled /logo.png
 * Tier 3: Pre-embedded Base64 vector/raster fallback
 */
export const getLogoDataUrl = async (): Promise<string> => {
  if (cachedLogoDataUrl) {
    return cachedLogoDataUrl;
  }

  const tryLoad = (url: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      const timer = setTimeout(() => {
        img.src = '';
        reject(new Error(`Timeout loading image from ${url}`));
      }, 5000);

      img.onload = () => {
        clearTimeout(timer);
        try {
          const canvas = document.createElement('canvas');
          const scale = 3;
          canvas.width = (img.naturalWidth || img.width || 400) * scale;
          canvas.height = (img.naturalHeight || img.height || 400) * scale;

          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            const dataUrl = canvas.toDataURL('image/png');
            resolve(dataUrl);
          } else {
            reject(new Error('Canvas context not available'));
          }
        } catch (canvasErr) {
          reject(canvasErr);
        }
      };

      img.onerror = (err) => {
        clearTimeout(timer);
        reject(err);
      };

      img.src = url;
    });
  };

  // Attempt Tier 1: Official Hosted Logo
  try {
    const dataUrl = await tryLoad(OFFICIAL_LOGO_URL);
    if (dataUrl) {
      cachedLogoDataUrl = dataUrl;
      return dataUrl;
    }
  } catch {
    // console.warn('Hosted logo load failed, trying local fallback...', err);
  }

  // Attempt Tier 2: Local /logo.png
  try {
    const localDataUrl = await tryLoad(LOCAL_FALLBACK_LOGO_URL);
    if (localDataUrl) {
      cachedLogoDataUrl = localDataUrl;
      return localDataUrl;
    }
  } catch {
    // console.warn('Local logo load failed, using embedded base64 fallback...', err);
  }

  // Attempt Tier 3: Pre-embedded Base64
  cachedLogoDataUrl = LOGO_BASE64;
  return LOGO_BASE64;
};
