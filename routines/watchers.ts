import { watch } from 'fs';
import { task, runTask } from '#gear:routines';

/**
 * ?
 */
export default task(
  async () =>
  {
    /**
     * ?
     */
    watch(`${ process.cwd() }/workshop/routes`, { recursive: true },
      (event, file) =>
      {
        if (event === 'rename' && file?.endsWith('.ts')) runTask('router-manifest');
      }
    );
  }
);