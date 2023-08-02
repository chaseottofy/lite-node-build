import fs from 'fs/promises';
import htmlMinifier from 'html-minifier';

const minifyHTML = htmlMinifier.minify;

/**
 * Minifies and copies HTML root from src -> dist
 * @param {string} srcDir 
 * @param {string} distDir 
 * @param {string} HTMLIndex 'index.html'
 */
const processHTML = async (srcDir, distDir, HTMLIndex) => {
  try {
    const html = await fs.readFile(`${srcDir}/${HTMLIndex}`, 'utf8');

    const minifiedHTML = minifyHTML(html, {
      collapseWhitespace: true,
      removeComments: true,
      minifyCSS: true,
      minifyJS: true,
      removeStyleLinkTypeAttributes: true,
    })
      .replaceAll(/<link\s+rel="stylesheet".*?>/g, '')
      .replaceAll(/<script.*?>.*?<\/script>/g, `${'<link rel="stylesheet" href="styles.css">'}$&`);

    await fs.writeFile(`${distDir}/${HTMLIndex}`, minifiedHTML);
  } catch (error) {
    console.error(error);
  }
};

export default processHTML;
