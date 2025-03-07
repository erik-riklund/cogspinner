import { isDevelopment } from '~constants';
import { createTask, runTask } from '#gear:routines';

export default createTask(
  async () =>
  {
    /**
     * Generates the manifest file for the application's router.
     */
    await runTask('router/create-manifest');

    /**
     * Transforms all template files within the project.
     */
    await runTask('templates/transform-all');

    /**
     * Starts file watchers if the application is in development mode.
     */
    if (isDevelopment) runTask('watchers');
  }
);