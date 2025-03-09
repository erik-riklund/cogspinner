import { existsSync } from 'fs';
import { folders } from '~constants';
import { getTemplateId } from '#gear:templates';

import { createTask, runTask } from '#gear:routines';

/**
 * A task that reads a template file, parses its segments, and executes tasks
 * to compile styles and translate the body. It writes the compiled Nunjucks
 * template and its metadata to the artifacts directory.
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
      tasks.push(runTask('templates/transform-styles', context));
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

    //? refactor the class scoping process below:

    if (Array.isArray(context.output))
    {
      const output: string[] = context.output;

      if (Array.isArray(context.classes))
      {
        const classes: string[] = context.classes;
        const suffix = getTemplateId(file).slice(0, 6);

        for (let i = 0; i < output.length; i++)
        {
          if (output[i].includes('class="'))
          {
            const element = output[i].slice(1, output[i].indexOf(' '));

            for (const selector of classes)
            {
              if (selector.startsWith(`${ element }.`) || selector.startsWith('.'))
              {
                const classList = output[i].match(/class="([^"]+)"/)![1].split(' ');

                for (let c = 0; c < classList.length; c++)
                {
                  if (classList[c] === selector.slice(selector.indexOf('.') + 1))
                  {
                    classList[c] = `${ classList[c] }-${ suffix }`;
                  }
                }

                output[i] = output[i].replace(
                  /class="([^"]+)"/, `class="${ classList.join(' ') }"`
                );
              }
            }
          }
        }
      }

      const templateId = getTemplateId(file);
      const targetFolder = `${ folders.artifacts }/templates`;

      await Bun.write(`${ targetFolder }/${ templateId }.njk`, context.output.join('\n'));

      const metadata = {
        head: context.head ?? null,
        style: context.style ?? null,
        dependencies: context.dependencies
      };

      await Bun.write(`${ targetFolder }/${ templateId }.json`, JSON.stringify(metadata));
    }
  }
);