import { Glob } from 'bun';
import { folders } from '~constants';

import { createTask, runTask } from '#gear:routines';

/**
 * Transforms all files with the '.cog' extension within the templates
 * folder into executeable functions used to render pages.
 */
export default createTask(
  async () =>
  {
    const scanner = new Glob('**/*.cog').scan(folders.templates);

    for await (const file of scanner)
    {
      //+ add checks to only transform files that have changed.

      runTask('templates/transform-one', { file: file.replaceAll('\\', '/') });
    }
  }
);