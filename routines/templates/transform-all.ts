import { Glob } from 'bun';
import { folders } from '~constants';

import { createTask, runTask } from '#gear:routines';

/**
 * Task to transform all template files in the templates directory.
 */
export default createTask(
  async () =>
  {
    for await (const file of new Glob('**/*.cog').scan(folders.templates))
      runTask('templates/transform-one', { file: file.replaceAll('\\', '/') });
  }
);