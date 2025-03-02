import { task, sequence, parallel, runTask } from '#gear:routines';

/**
 * ?
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


    /**
     * ?
     */
    if (process.argv.includes('-d')) runTask('watchers');
  }
);