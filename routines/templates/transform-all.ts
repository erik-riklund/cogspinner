import { Glob } from 'bun';
import { createTask, runTask } from '#gear:routines';

/**
 * ?
 */
export default createTask(
  async () =>
  {
    const folder = `${ process.cwd() }/workshop/templates`;

    for await (const file of new Glob('**/*.cog').scan(folder))
      runTask('templates/transform-one', { file: file.replaceAll('\\', '/') });
  }
);