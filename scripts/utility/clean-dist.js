import fs from 'fs/promises';
import path from 'path';

/**
 * deleteDirectoryContents
 * @param {string} dirPath
 * @description delete contents of a directory or create it if it doesn't exist
 */
const deleteDirectoryContents = async (dirPath) => {
  // if the directory does not exist, create it and return
  try {
    await fs.access(dirPath);
  } catch {
    await fs.mkdir(dirPath, { recursive: true });
    return;
  }

  const files = await fs.readdir(dirPath);
  const promises = files.map(async (file) => {
    const filePath = path.join(dirPath, file);
    const stat = await fs.stat(filePath);
    // Check if the item is a file or directory
    if (stat.isFile()) {
      // If it's a file, delete it
      return fs.unlink(filePath);
      // eslint-disable-next-line no-else-return
    } else if (stat.isDirectory()) {
      // If it's a directory, first delete its contents
      await deleteDirectoryContents(filePath);
      // Then delete the directory itself
      return fs.rmdir(filePath);
    }

    return null;
  });

  // Wait for all promises to resolve
  await Promise.all(promises);
};

export default deleteDirectoryContents;
