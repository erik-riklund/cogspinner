import { createHash } from 'crypto';
import { viewRenderer } from './cogs/renderer';
import { getTemplateData } from './cogs/cache';

/**
 * Generates a unique identifier for a template file based on the file's name.
 *
 * @param file The name of the template file.
 * @returns A 16-character hexadecimal string representing the template ID.
 */
export function getTemplateId (file: string): string
{
  return 't' + createHash('md5').update(file).digest('hex').slice(0, 11);
}

/**
 * Re-exports the `viewRenderer` function to create a more convenient and
 * organized API for other parts of the application.
 */
export { getTemplateData, viewRenderer };