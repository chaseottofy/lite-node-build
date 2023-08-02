import fs from 'fs/promises';
import { minify } from 'terser';

/**
 * Minifies and copies JS root from src -> dist
 * @param {string} srcDir 
 * @param {string} distDir 
 * @param {string} jsRoot 'index.js
 */
const processJS = async (srcDir, distDir, jsRoot) => {
  try {
    const js = await fs.readFile(`${srcDir}/${jsRoot}`, 'utf8');
    const result = await minify(js);
    await fs.writeFile(`${distDir}/${jsRoot}`, result.code);
  } catch (error) {
    console.error(error);
  }
};

export default processJS;
