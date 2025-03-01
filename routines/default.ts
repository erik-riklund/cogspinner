import { task, sequence, parallel, runTask } from '#gear:routines';

/**
 * Defines a task that checks if the command-line arguments passed to the process
 * include the flag `-d`. If it's present, it executes the `development` task.
 * Otherwise, it executes the `production` task.
 */
export default task(
  async () =>
  {
    /**
     * ?
     */
    sequence('router-manifest', [
      'router/find-route-files',
      'router/prepare-route-list',
      'router/save-manifest'
    ]);

    /**
     * ?
     */
    runTask('router-manifest');

    /**
     * ?
     */
    if (process.argv.includes('-d')) runTask('watchers');
  }
);