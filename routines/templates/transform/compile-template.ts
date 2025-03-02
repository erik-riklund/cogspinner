import { createTask } from '#gear:routines';
import type { TemplateTransformContext } from '../context';

/**
 * ?
 */
export default createTask<TemplateTransformContext>(
  async (context) =>
  {
    let result: string[] = [
      `export default function (context: object): string {`,
      `  return '';`,
      `}`
    ];

    context.result = result.join('\n');
    console.log('compilation completed.', result);
  }
);