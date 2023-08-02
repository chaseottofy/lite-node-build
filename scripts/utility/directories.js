/**
 * @param {string[]} cssFiles : CSS files to be bundled together
 * Even if there is only one file, it must be in an array
 */
const cssFiles = ['reset.css', 'themes.css', 'root.css', 'main.css'];

/**
 * @param {string} jsRoot : Javascript root file
 */
const jsRoot = 'index.js';

/**
 * @param {string} HTMLRoot : HTML root file
 */
const HTMLRoot = 'index.html';

/**
 * @param {string[]} assetDirs
 * FONTS MUST BE WITHIN A FOLDER CALLED 'fonts'
 * MUST BE IN THE ROOT OF SRC
 * Will account for nested directories
 * @example
  src
  |- images
  |  |- icons
  |  |  |- icon1.png
  |  |  |- icon2.png
  |- fonts
  |  |- font1.woff
  |  |- font2.woff
 */
const assetDirs = ['images', 'fonts'];

export {
  cssFiles, jsRoot, HTMLRoot, assetDirs,
};
