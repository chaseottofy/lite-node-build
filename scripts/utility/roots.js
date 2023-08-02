/**
 * @fileoverview Default Root directories for the project.
 */

/** @const {string} */
const distName = 'dist';
const srcName = 'src';
const rootDir = process.cwd();
const srcDir = `${rootDir}/${srcName}`;
const distDir = `${rootDir}/${distName}`;

export { distName, srcDir, distDir };
