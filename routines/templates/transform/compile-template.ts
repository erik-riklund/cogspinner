import { createTask } from '#gear:routines';
import type { TemplateTransformContext } from '../context';

/**
 * ?
 */
export default createTask<TemplateTransformContext>(
  async (context) =>
  {
    let result: string[] = [
      `export default function (context: Record<string, any>): void {`,
      `  // this is not implemented yet.`,
      `}`
    ];

    context.result = result.join('\n');
  }
);