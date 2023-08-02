import fs from 'fs/promises';
import postcss from 'postcss';
import cssnano from 'cssnano';
import autoprefixer from 'autoprefixer';

/**
 * Minifies and copies CSS file(s) from src into singular dist .css file
 * @param {string} srcDir 
 * @param {string} distDir 
 * @param {string[]} cssFiles ['styles.css', 'reset.css']
 */
const processCSS = async (srcDir, distDir, cssFiles) => {
  try {
    const cssPromises = cssFiles.map((file) => fs.readFile(`${srcDir}/styles/${file}`, 'utf8'));
    const cssContents = await Promise.all(cssPromises);
    const combinedCSS = cssContents.join('').replaceAll('../fonts', './fonts');

    const result = await postcss([cssnano, autoprefixer]).process(combinedCSS, {
      from: `${srcDir}/combined.css`,
      to: `${distDir}/combined.css`,
    });

    await fs.writeFile(`${distDir}/styles.css`, result.css);

    if (result.map) {
      await fs.writeFile(`${distDir}/styles.css.map`, result.map.toString());
    }
  } catch (error) {
    console.error(error);
  }
};

export default processCSS;
