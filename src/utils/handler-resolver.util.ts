import * as path from 'path';

/**
 * Resolves the relative path to a handler function in the function index files.
 * @param context - The absolute path of the current file.
 * @returns The relative path to the handler function.
 */
export const handlerPath = (context: string): string => {
  const relativePath = path.relative(process.cwd(), context);
  return relativePath.replace(/\\/g, '/'); // Ensure compatibility with Windows paths
};
