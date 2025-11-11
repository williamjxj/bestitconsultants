/**
 * Batch convert and compress PNG/JPG images to WebP and AVIF using sharp.
 * Run: node optimize-images.js
 */

import fs from "fs";
import path from "path";
import sharp from "sharp";

const inputDir = "../public/images";
const outputDir = "../public/optimized";

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

async function optimizeImage(filePath) {
  const fileName = path.basename(filePath, path.extname(filePath));

  const image = sharp(filePath).resize({
    width: 1600, // resize max width (adjust as needed)
    withoutEnlargement: true,
  });

  // Convert to WebP
  await image.webp({ quality: 80 }).toFile(`${outputDir}/${fileName}.webp`);

  // Convert to AVIF
  await image.avif({ quality: 70 }).toFile(`${outputDir}/${fileName}.avif`);

  console.log(`✅ Optimized: ${fileName}`);
}

fs.readdirSync(inputDir)
  .filter((file) => /\.(png|jpg|jpeg)$/i.test(file))
  .forEach((file) => {
    const filePath = path.join(inputDir, file);
    optimizeImage(filePath).catch(console.error);
  });
