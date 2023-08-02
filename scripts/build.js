/*
Based on the following script, which is intended to be a lite version of a build tool like webpack : come up with a title for this script, as well as a description of what it does and why it's useful. Also, what are the benefits of using this script over a build tool like webpack? What are the drawbacks? What are the benefits of using a build tool like webpack over this script? What are the drawbacks?
*/


import {
  cssFiles, jsRoot, HTMLRoot, assetDirs,
} from './utility/directories.js';
import { distName, srcDir, distDir } from './utility/roots.js';
import deleteDirectoryContents from './utility/clean-dist.js';
import processCSS from './process/build-css.js';
import processJS from './process/build-js.js';
import processHTML from './process/build-html.js';
import processAsset from './process/build-assets.js';

/**
 * Must have Node version >= 14.8.0
 * @command npm run build
 *
 * Define distName, srcDir, and distDir in ./utility/roots.js
 * cssFiles, jsRoot, HTMLRoot, assetDirs are imported from ./utility/directories.js
 *
 *
 * NOT for production use :
    - I use this config for prototyping, testing, and codepen projects
 *
 * Processes files in parallel, which makes for:
    - quick build times | easy configuration | errors don't break build process
 *
 *
 * @description BUILD SCRIPT (ASYNC/AWAIT):
  1.) Deletes contents of /dist || creates /dist if it doesn't exist
  2.) Minifies and copies:
    - CSS file(s)
    - JS file(s)
    - HTML file(s)
  3.) Copies additional assets to /dist (HANDLES NESTED DIRECTORIES)
    - see notes in ./utility/directories.js
  4.) Log build time / errors
*/
const timeStart = Date.now();
try {
  await deleteDirectoryContents(distName);
  console.log('Deleted contents of dist directory');
  await processCSS(srcDir, distDir, cssFiles);
  await processJS(srcDir, distDir, jsRoot);
  await processHTML(srcDir, distDir, HTMLRoot);
  await Promise.all(assetDirs.map((dir) => processAsset(srcDir, distDir, dir)));
} catch (error) {
  console.error(error);
} finally {
  console.log(`Build time: ${Date.now() - timeStart}ms`);
}
