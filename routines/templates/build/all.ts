import { Glob } from 'bun';
import { folders } from '~constants';
import { createTask, runTask } from '#gear:routines';

/**
 * ?
 */
export default createTask(
  async () =>
  {
    const folder = `${ folders.templates }`;

    for await (const file of new Glob('views/**/*.cog').scan(folder))
      runTask('templates/build/single', { file: file.replaceAll('\\', '/') });
  }
);