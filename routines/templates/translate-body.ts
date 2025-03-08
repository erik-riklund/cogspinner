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
    const { dependencies } = context;
    const lines: string[] = context.body.split(/\r?\n/);

    if (lines.length)
    {
      if (lines[0].startsWith('layout|'))
      {
        const layout = lines[0].slice(7).trim();
        lines[0] = `{% extends "layouts/${ layout }" %}`;

        dependencies.push(`layouts/${ layout }`);
      }

      const tasks: Promise<void>[] = [];
      lines.forEach((_, index) => tasks.push(
        runTask('templates/elements', { index, lines, dependencies }))
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
    'templates/elements/position'
  ]
);