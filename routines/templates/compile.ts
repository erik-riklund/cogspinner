import { createTask } from '#gear:routines';
import type { Tree } from './markup/types';

/**
 * ?
 */
export default createTask(
  async (context) =>
  {
    const { tree } = context;

    context.dependencies = [];
    const template = compileTree(tree, context);

    const result =
      [
        ...context.dependencies.map((dependency: string) =>
          `import ${ dependency } from './${ dependency }.ts';`
        ),
        `export default function (context: Record<string, any>): string {`,
        `return \``, ...template, `\`;`,
        `}`
      ];

    context.result = result.join('\n');
  }
);

/**
 * ?
 * 
 * @param tree The template tree to compile.
 * @param result The result object containing dependencies.
 * @returns An array of strings representing the compiled template.
 */
function compileTree (tree: Tree, context: Record<string, any>): string[]
{
  const output: string[] = [];

  for (const node of tree)
  {
    if (typeof node === 'object')
    {
      output.push(node.opening);

      if (node.children.length)
      {
        output.push(...compileTree(node.children, context));
      }

      const match = node.directive.match(/^<cog-(?:component|layout)\s+name="(\w+)"/);

      if (Array.isArray(match))
      {
        context.dependencies.push(match[1]);
        node.closing && output.push(node.closing);
      }
    }
    else output.push(node.replaceAll('`', '\\`'));
  }

  return output;
}