import { createTask } from '#gear:routines';
import type { Tree } from './types';

/**
 * ?
 */
export default createTask(
  async (context) =>
  {
    const { result, tree } = context;
    const { dependencies } = result as { dependencies: string[]; };
    const compiledTemplate = compileTree(tree, result);

    // result.template = [
    //   `import { html, LitElement } from 'lit';`,
    //   `import { customElement, property } from 'lit/decorators.js';`,
    //   ...dependencies.map(dependency => `import '../${ dependency }/template.js';`),
    //   `@customElement('${ context.id }')`,
    //   `export class Template${ context.id } extends LitElement {`,
    //   `render() {`, `return html\``, ...compiledTemplate, `\`;`, '}',
    //   '}'
    // ];

    result.template = [];
  }
);

/**
 * ?
 * 
 * @param tree The template tree to compile.
 * @param result The result object containing dependencies.
 * @returns An array of strings representing the compiled template.
 */
function compileTree (tree: Tree, result: { dependencies: string[]; }): string[]
{
  const output: string[] = [];

  // for (const node of tree)
  // {
  //   if (typeof node === 'object')
  //   {
  //     output.push(node.directive);

  //     if (node.children.length)
  //     {
  //       output.push(...compileTree(node.children, result));
  //     }

  //     const match = node.directive.match(/^<(\w+)(?=\s|>)/);

  //     if (Array.isArray(match))
  //     {
  //       result.dependencies.push(match[1]);
  //       output.push(`</${ match[1] }>`);
  //     }
  //   }
  //   else output.push(node.replaceAll('`', '\\`'));
  // }

  return output;
}