import { folders } from '~constants';
import { createWatcher } from '#gear:routines';
import { createTask, runTask } from '#gear:routines';

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
        folder: folders.routes,

        callback: (_, file) =>
          file?.endsWith('.ts') && runTask('router/create-manifest')
      }
    );

    /**
     * ?
     */
    createWatcher(
      {
        folder: folders.templates,

        callback: (_, file) => file.endsWith('.cog') &&
          runTask('templates/transform/check-source', { file: file.replaceAll('\\', '/') })
      }
    );

    /**
     * ?
     */
    createWatcher(
      {
        folder: `${ folders.artifacts }/templates`,

        callback: (_, file) => { console.log('triggered by', file); }
      }
    );
  }
);