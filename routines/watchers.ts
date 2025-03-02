import { createWatcher } from '#gear:routines';
import { createTask, runTask } from '#gear:routines';

/**
 * ?
 */
export default createTask(
  async (context) =>
  {
    /**
     * ?
     */
    createWatcher(
      {
        folder: `${ process.cwd() }/workshop/routes`,
        callback: (event, file) => file?.endsWith('.ts') && runTask('router/create-manifest')
      }
    );

    /**
     * ?
     */
    createWatcher(
      {
        folder: `${ process.cwd() }/workshop/templates`,
        callback: (_, file) => (file?.endsWith('.cog')) && runTask(
          'templates/transform-one', { file: file.replaceAll('\\', '/') }
        )
      }
    );
  }
);