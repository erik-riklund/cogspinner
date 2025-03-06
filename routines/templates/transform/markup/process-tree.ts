import { createTask, runTask } from '#gear:routines';
import type {
  Node, TemplateTransformContext, ElementParserContext
} from '~routines/templates/context';

/**
 * ?
 */
const parserTaskPrefix = 'templates/transform/markup';

/**
 * ?
 */
export default createTask<TemplateTransformContext>(
  async (context) => 
  {
    context.output = [];

    // for (const node of context.tree)
    //   await processNode(node, context.output);
  }
);

/**
 * ?
 */
async function processNode (node: Node, output: string[]): Promise<void>
{
  const { element, children } = node;

  if (element.startsWith('-- '))
  {
    await runTask<ElementParserContext>(
      `${ parserTaskPrefix }/parse-element`, { element, output }
    );
  }
  else
  {
    output.push(`'${ element.replaceAll(/(['])/g, '\\$1') }',`);
  }

  for (const child of children) await processNode(child, output);
}