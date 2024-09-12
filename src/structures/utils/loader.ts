import fs from 'node:fs';
import path from 'node:path';

/**
 * Loads all files from a given directory and returns an array of file paths.
 * @param {string} dirName - The directory to load files from.
 */

export async function loadFiles(dirName: string): Promise<string[]> {
  try {
    const files = await fs.promises.readdir(dirName);
    return files.filter((file) => file.endsWith('.ts') || file.endsWith('.js')).map((file) => path.join(dirName, file));
  } catch {
    throw new Error(`Error loading files from directory: ${dirName}`);
  }
}

/**
 * Clears the require cache for a specific module.
 * @param {string} modulePath - The path of the module to clear from cache.
 */

export function clearCache(modulePath: string): void {
  const resolvedPath = require.resolve(modulePath);
  if (require.cache[resolvedPath]) {
    delete require.cache[resolvedPath];
  }
}
