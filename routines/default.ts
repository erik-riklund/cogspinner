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
    await runTask('templates/transform-many');

    /**
     * ?
     */
    if (isDevelopment) runTask('watchers');
  }
);