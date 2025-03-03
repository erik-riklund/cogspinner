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
    runTask('router/create-manifest');

    /**
     * ?
     */
    runTask('templates/transform-many');

    /**
     * ?
     */
    if (process.argv.includes('-d')) runTask('watchers');
  }
);