import { Glob } from 'bun';
import { folders } from '~constants';
import { createTask, runTask } from '#gear:routines';

/**
 * ?
 */
export default createTask(
  async () =>
  {
    const glob = new Glob('views/**/*.cog');
    for await (const file of glob.scan(folders.templates))
      runTask('templates/build-view', { file: file.replaceAll('\\', '/') });
  }
);