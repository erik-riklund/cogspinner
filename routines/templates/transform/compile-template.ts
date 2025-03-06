import { createTask } from '#gear:routines';
import type { TemplateTransformContext } from '../context';

/**
 * ?
 */
export default createTask<TemplateTransformContext>(
  async (context) =>
  {
    let result: string[] = [
      'import type {RenderContext, TemplateElement} from \'../../gears/templates/types\';',
      'export default async function (context: RenderContext, props: Record<string, any> = {}, children: TemplateElement[] = []): Promise<string> {'
    ];

    if (typeof context.head === 'string')
      result.push(`context.includeElement('${ context.id }', \`${ escapeBackticks(context.head) }\`);`);
    if (typeof context.style === 'string')
      result.push(`context.registerStylesheet('${ context.id }', \`${ escapeBackticks(context.style) }\`);`);

    result.push('return [', ...(context.output ?? []), '].join("\\n");', '}');
    context.result = result.join('\n');
  }
);

/**
 * ?
 */
function escapeBackticks (input: string): string
{
  return input.replace(/`/g, '\\`');
}