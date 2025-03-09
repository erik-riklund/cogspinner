import { existsSync } from 'fs';
import { folders } from '~constants';

import { createTask, createWatcher, runTask } from '#gear:routines';

/**
 * Sets up a watcher on the templates directory to trigger
 * template transformation tasks on file changes.
 */
export default createTask(
  async (context) =>
  {
    createWatcher(
      {
        folder: folders.templates,
        callback: (_, file) =>
        {
          const absolutePath = `${ folders.templates }/${ file }`;

          if (existsSync(absolutePath) && (file.endsWith('.cog') || file.endsWith('.styl')))
            runTask('templates/transform-one', { file: file.replaceAll('\\', '/').replace(/\.styl$/, '.cog') });
        }
      }
    );
  }
);