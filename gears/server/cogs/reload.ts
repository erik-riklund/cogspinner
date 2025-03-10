import { folders } from '~constants';
import { watch, statSync } from 'fs';

import type { Context } from 'hono';

/**
 * Used to track when the routes configuration was last changed.
 */
let modified: number = statSync(`${ folders.artifacts }/routes.ts`).mtimeMs;

/**
 * Watches for changes in template and routes directories and updates the modified timestamp.
 */
watch(`${ folders.artifacts }/templates`, () => modified = Date.now());
watch(folders.routes, { recursive: true }, () => modified = Date.now());

/**
 * Returns the last modified timestamp as a JSON response.
 */
export default async (context: Context) => context.json({ modified });