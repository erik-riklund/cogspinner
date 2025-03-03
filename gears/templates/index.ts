import { createHash } from 'crypto';
import { viewRenderer } from './cogs/renderer';

/**
 * ?
 */
export function getTemplateId (file: string): string
{
  return createHash('sha256').update(file).digest('hex').slice(0, 16);
}

/**
 * ?
 */
export { viewRenderer };