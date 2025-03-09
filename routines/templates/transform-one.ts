import { existsSync } from 'fs';
import { folders } from '~constants';
import { getTemplateId } from '#gear:templates';

import { createTask, runTask } from '#gear:routines';

/**
 * ?
 */
export default createTask(
  async (context) =>
  {
    const { file } = context;

    const content = Bun.file(`${ folders.templates }/${ file }`);
    const segments = (await content.text()).split(/---\r?\n/);

    const tasks = [];

    const styleFile = `${ file.slice(0, file.indexOf('.')) }.styl`;
    const stylesheet = `${ folders.templates }/${ styleFile }`;

    if (existsSync(stylesheet))
    {
      context.style = await Bun.file(stylesheet).text();
      tasks.push(runTask('templates/compile-styles', context));
    }

    for (const segment of segments.map(x => x.trim()))
    {
      const tag = segment.slice(0, segment.indexOf(':'));

      switch (tag)
      {
        case '@head':
          context.head = segment.slice(tag.length + 1).trim();
          break;

        case '@body':
          context.body = segment.slice(tag.length + 1).trim();
          tasks.push(runTask('templates/translate-body', context));
          break;
      }
    }

    await Promise.allSettled(tasks);

    if (Array.isArray(context.lines))
    {
      const templateId = getTemplateId(file);
      const targetFolder = `${ folders.artifacts }/templates`;

      await Bun.write(`${ targetFolder }/${ templateId }.njk`, context.lines.join('\n'));

      const metadata = {
        head: context.head ?? null,
        style: context.style ?? null,
        dependencies: context.dependencies
      };

      await Bun.write(`${ targetFolder }/${ templateId }.json`, JSON.stringify(metadata));
    }
  }
);