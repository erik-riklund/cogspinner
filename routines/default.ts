import { isDevelopment } from '~constants';
import { createTask, runTask, runTasks } from '#gear:routines';

export default createTask(
  async () =>
  {
    await Promise.all(
      [
        /**
         * Generates the manifest file for the application's router.
         */
        runTask('router/create-manifest'),

        /**
         * Transforms all template files within the project.
         */
        runTask('templates/transform-all')
      ]
    );

    /**
     * Starts file watchers if the application is in development mode.
     */
    if (isDevelopment) runTasks(['router/watcher', 'templates/watcher']);
  }
);