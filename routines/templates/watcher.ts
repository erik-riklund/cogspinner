import { existsSync } from 'fs';
import { folders } from '~constants';

import { createTask, createWatcher, runTask } from '#gear:routines';

/**
 * ?
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