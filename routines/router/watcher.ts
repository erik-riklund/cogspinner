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
        folder: folders.routes,
        callback: (event, file) => file?.endsWith('.ts')
          && runTask('router/create-manifest')
      }
    );
  }
);