import { getTemplateId } from '#gear:templates';
import { createTask, createParallel, runTask } from '#gear:routines';

/**
 * ?
 */
export interface ElementContext
{
  /**
   * ?
   */
  lines: string[];

  /**
   * ?
   */
  index: number;

  /**
   * ?
   */
  dependencies: string[];
}

/**
 * ?
 */
export default createTask(
  async (context) =>
  {
    context.dependencies = [];
    const lines: string[] = context.body.split(/\r?\n/);

    if (lines.length)
    {
      if (lines[0].startsWith('layout|'))
      {
        const layout = lines[0].slice(7).trim();
        const layoutId = getTemplateId(`layouts/${ layout }.cog`);
        lines[0] = `{% extends "${ layoutId }.njk" %}`;

        context.dependencies.push(layoutId);
      }

      const tasks: Promise<void>[] = [];
      lines.forEach((_, index) => tasks.push(
        runTask('templates/elements', { index, lines, dependencies: context.dependencies }))
      );

      await Promise.allSettled(tasks);
    }

    context.lines = lines;
    delete context.body;
  }
);

/**
 * ?
 */
createParallel(
  'templates/elements',
  [
    'templates/elements/placeholder',
    'templates/elements/position'
  ]
);