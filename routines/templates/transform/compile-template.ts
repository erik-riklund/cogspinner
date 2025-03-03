import { createTask } from '#gear:routines';
import type { TemplateTransformContext } from '../context';

/**
 * ?
 */
export default createTask<TemplateTransformContext>(
  async (context) =>
  {
    console.log(Bun.inspect(context, { colors: true }));

    let result: string[] = [
      `export default function (context: Record<string, any>): void {`,
      `  // this is not implemented yet.`,
      `}`
    ];

    context.result = result.join('\n');
    // console.log('compilation completed.\n', result);
  }
);