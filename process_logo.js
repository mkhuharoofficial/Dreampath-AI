import { Jimp } from 'jimp';
import fs from 'fs';
import path from 'path';

async function processLogo() {
  try {
    const inputPath = path.join(process.cwd(), 'src/assets/images/dreampath_logo_1785915340882.jpg');
    console.log('Reading image from:', inputPath);
    
    const image = await Jimp.read(inputPath);
    
    // Convert near-white background pixels to transparent
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
      const red = image.bitmap.data[idx];
      const green = image.bitmap.data[idx + 1];
      const blue = image.bitmap.data[idx + 2];
      
      // If pixel is near-white (background)
      if (red > 220 && green > 220 && blue > 220) {
        // Calculate softness factor for antialiasing
        const minVal = Math.min(red, green, blue);
        if (minVal > 245) {
          image.bitmap.data[idx + 3] = 0; // Fully transparent
        } else {
          // Semi-transparent edge
          const alpha = Math.floor((245 - minVal) / 25 * 255);
          image.bitmap.data[idx + 3] = Math.max(0, Math.min(255, alpha));
        }
      }
    });

    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    const outputPath = path.join(publicDir, 'logo.png');
    await image.write(outputPath);
    console.log('Saved transparent logo to:', outputPath);

    // Copy to src/assets/logo.png as well
    const assetsDir = path.join(process.cwd(), 'src/assets');
    if (!fs.existsSync(assetsDir)) {
      fs.mkdirSync(assetsDir, { recursive: true });
    }
    await image.write(path.join(assetsDir, 'logo.png'));

    // Generate base64 data URI for jsPDF
    const buffer = await image.getBuffer('image/png');
    const base64 = buffer.toString('base64');
    const dataUri = `data:image/png;base64,${base64}`;
    
    const base64File = path.join(process.cwd(), 'src/assets/logoBase64.ts');
    fs.writeFileSync(base64File, `export const LOGO_BASE64 = "${dataUri}";\n`);
    console.log('Generated base64 logo in src/assets/logoBase64.ts');

  } catch (err) {
    console.error('Error processing logo:', err);
  }
}

processLogo();
