import { createTask } from '#gear:routines';
import type { Tree } from './types';

/**
 * Compiles a parsed template tree into a `LitElement` component.
 */
export default createTask(
  async (context) =>
  {
    const { result, tree } = context;

    result.template = [
      `import { html, LitElement } from 'lit';`,
      `import { customElement, property } from 'lit/decorators.js';`,
      `@customElement('${ context.id }')`,
      `export class Template${ context.id } extends LitElement {`,
      `render() {`, `return html\``, ...compileTree(tree, result), `\`;`, '}',
      '}'
    ];
  }
);

/**
 * Recursively compiles a template tree into an array of strings representing
 * the `LitElement` template. It also collects component dependencies.
 * 
 * @param tree The template tree to compile.
 * @param result The result object containing dependencies.
 * @returns An array of strings representing the compiled template.
 */
function compileTree (tree: Tree, result: { dependencies: string[]; }): string[]
{
  const output: string[] = [];

  for (const node of tree)
  {
    if (typeof node === 'object')
    {
      output.push(node.directive);

      if (node.children.length)
      {
        output.push(...compileTree(node.children, result));
      }

      const match = node.directive.match(/^<(\w+)(?=\s|>)/);

      if (Array.isArray(match))
      {
        result.dependencies.push(match[1]);
        output.push(`</${ match[1] }>`);
      }
    }
    else output.push(node.replaceAll('`', '\\`'));
  }

  return output;
}