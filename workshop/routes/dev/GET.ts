import { watch, statSync } from 'fs';
import { folders } from '~constants';
import { route } from '#gear:router';

/**
 * ?
 */
let modified: number = statSync(`${ folders.artifacts }/routes.ts`).mtimeMs;

/**
 * ?
 */
watch(`${ folders.artifacts }/templates`, () => modified = Date.now());
watch(folders.routes, { recursive: true }, () => modified = Date.now());

/**
 * ?
 */
export default route(
  {
    /**
     * ?
     */
    handler: async (context) => context.json({ modified })
  }
);