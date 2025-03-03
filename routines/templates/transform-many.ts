import { Glob } from 'bun';
import { existsSync, statSync } from 'fs';
import { createTask, runTask } from '#gear:routines';
import { getTemplateId } from '#gear:templates';

/**
 * ?
 */
export default createTask(
  async () =>
  {
    const transforms: Promise<void>[] = [];
    const sourceFolder = `${ process.cwd() }/workshop/templates`;
    const targetFolder = `${ process.cwd() }/artifacts/templates`;

    for await (const file of new Glob('**/*.cog').scan(sourceFolder))
    {
      const modified = { source: 0, target: 0 };
      const templateId = getTemplateId(file.replace('\\', '/'));

      modified.source = statSync(`${ sourceFolder }/${ file }`).mtimeMs;

      if (existsSync(`${ targetFolder }/${ templateId }.ts`))
        modified.target = statSync(`${ targetFolder }/${ templateId }.ts`).mtimeMs;

      if (modified.source > modified.target)
        transforms.push(runTask(
          'templates/transform-one', { file: file.replaceAll('\\', '/') }
        ));
    }

    await Promise.allSettled(transforms);

    //+ run the manifest generation task.
  }
);