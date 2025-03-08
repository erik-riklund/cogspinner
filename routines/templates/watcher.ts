import { existsSync } from 'fs';
import { folders } from '~constants';

import { createTask, createWatcher, runTask } from '#gear:routines';

/**
 * ?
 */
export default createTask(
  async () =>
  {
    /**
     * ?
     */
    createWatcher(
      {
        folder: folders.templates,
        callback: (_, filePath) =>
        {
          const file = filePath.replaceAll('\\', '/');

          if (file.endsWith('.cog'))
          {
            let task = existsSync(`${ folders.templates }/${ file }`)
              ? 'templates/build/single' : 'templates/clean';

            runTask(task, { file });
          }
        }
      }
    );
  }
);