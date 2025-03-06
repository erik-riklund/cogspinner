import { createTask } from '#gear:routines';
import type { TemplateTransformContext } from '../context';

/**
 * ?
 */
export default createTask<TemplateTransformContext>(
  async (context) =>
  {
    let result: string[] = [
      'export default function (',
      '  context: Record<string, any>,',
      '  props: Record<string, any> = {}): string {',
      'return [', ...context.output, '].join("\\n");', '}'
    ];

    context.result = result.join('\n');
  }
);