import { Glob } from 'bun';
import { createTask } from '#gear:routines';

import type { RouteManifestContext } from './context';

/**
 * This task scans the `workshop/routes` directory to identify files that define middleware
 * and route handlers. It uses a glob pattern to efficiently locate files corresponding to common
 * HTTP methods like `GET`, `POST`, `PUT`, `PATCH`, and `DELETE`.
 * 
 * The task then populates an array within a provided context object with the file paths of these
 * identified route handler files, normalizing the paths to use forward slashes for consistency.
 */
export default createTask<RouteManifestContext>(
  async (context) =>
  {
    context.files = [];

    const folder = `${ process.cwd() }/workshop/routes`;
    const pattern = '**/{GET,POST,PUT,PATCH,DELETE}.ts';
    const fileIterator = new Glob(pattern).scan(folder);

    for await (const file of fileIterator)
      context.files.push(file.replaceAll('\\', '/'));
  }
);