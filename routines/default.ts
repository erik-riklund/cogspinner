import { isDevelopment } from '~constants';
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
    await runTask('router/create-manifest');

    /**
     * ?
     */
    await runTask('templates/build-views');

    /**
     * ?
     */
    if (isDevelopment) runTask('watchers');
  }
);