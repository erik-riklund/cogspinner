import { folders } from '~constants';
import { createTask, runTask } from '#gear:routines';

/**
 * ?
 */
export default createTask(
  async (context) =>
  {
    const { file } = context;
    context.dependencies = [];

    const content = Bun.file(`${ folders.templates }/${ file }`);
    const segments = (await content.text()).split(/---\r?\n/);

    const tasks = [];
    for (const segment of segments.map(x => x.trim()))
    {
      const tag = segment.slice(0, segment.indexOf(':'));

      switch (tag)
      {
        case '@style':
          context.style = segment.slice(tag.length + 1);
          tasks.push(runTask('templates/compile-styles', context));
          break;

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

    console.log(context);
  }
);