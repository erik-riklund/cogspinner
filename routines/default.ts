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
    // await runTask('cleanup/empty-folder', { folder: 'artifacts' });

    /**
     * ?
     */
    runTask('router/create-manifest');

    /**
     * ?
     */
    runTask('templates/transform-all');

    /**
     * ?
     */
    if (process.argv.includes('-d')) runTask('watchers');
  }
);