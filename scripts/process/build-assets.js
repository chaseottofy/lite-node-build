import fs from 'fs/promises';
import path from 'path';

/**
 * Copies all files and subdirectories from srcDir/outputPath to distDir/outputPath
 * @param {string} srcDir '/src/'
 * @param {string} distDir '/dist/'
 * @param {string[]} outputPath ['images', 'fonts']
 */
const processAsset = async (srcDir, distDir, outputPath) => {
  try {
    const fullSrcDir = path.join(srcDir, outputPath);
    const fullDistDir = path.join(distDir, outputPath);

    // Ensure output directory exists
    try {
      await fs.access(fullDistDir);
    } catch {
      await fs.mkdir(fullDistDir, { recursive: true });
    }

    const assets = await fs.readdir(fullSrcDir, { withFileTypes: true });

    await Promise.all(
      assets.map(async (asset) => {
        const srcPath = path.join(fullSrcDir, asset.name);
        const distPath = path.join(fullDistDir, asset.name);
        // eslint-disable-next-line unicorn/prefer-ternary
        if (asset.isDirectory()) {
          // If it's a directory, recursively process assets in that directory
          await processAsset(srcDir, distDir, path.join(outputPath, asset.name));
        } else {
          // Otherwise, it's a file, so copy it
          await fs.copyFile(srcPath, distPath);
        }
      }),
    );
  } catch (error) {
    console.error(`Error processing assets: ${error}`);
  }
};

export default processAsset;
