import { isDevelopment } from '~constants';
import { createTask, runTask, runTasks } from '#gear:routines';

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
    // await runTask('templates/build/all');

    /**
     * Starts file watchers if the application is in development mode.
     */
    if (isDevelopment)
    {
      runTasks(['router/watcher', /*'templates/watcher'*/]);
    }
  }
);