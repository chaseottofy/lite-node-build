import { distName } from './utility/roots.js';
import deleteDirectoryContents from './utility/clean-dist.js';

/**
 * @command npm run clean
 * @description Deletes contents of /dist || creates /dist if it doesn't exist
 * Runs before build script but can be run independently with command above
*/
try {
  await deleteDirectoryContents(distName);
  console.log('Deleted contents of dist directory');
} catch (error) {
  console.error(error);
}
