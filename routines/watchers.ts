import { createWatcher } from '#gear:routines';
import { task, runTask } from '#gear:routines';

/**
 * ?
 */
export default task(
  async (context) =>
  {
    /**
     * ?
     */
    createWatcher(
      {
        folder: `${ process.cwd() }/workshop/routes`,
        callback: (event, file) => (event === 'rename' && file?.endsWith('.ts')) && runTask('router-manifest')
      }
    );

    /**
     * ?
     */
    createWatcher(
      {
        folder: `${ process.cwd() }/workshop/templates`,
        callback: (_, file) => (file?.endsWith('.cog')) && runTask('transform-template', { file })
      }
    );
  }
);