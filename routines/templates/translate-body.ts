import { getTemplateId } from '#gear:templates';
import { createTask, createParallel, runTask } from '#gear:routines';

import type { TemplateElement, Tree, Stack } from './types';

/**
 * Defines parallel tasks for processing template elements.
 */
createParallel(
  'templates/elements',
  [
    'templates/elements/placeholder',
    'templates/elements/position'
  ]
);

/**
 * Task to translate a template body into a Nunjucks template. It parses the template
 * body, handles layout inheritance, transforms elements, and generates Nunjucks output.
 */
export default createTask(
  async (context) =>
  {
    context.output = [] as string[];
    context.dependencies = [] as string[];

    const lines: string[] = context.body.split(/\r?\n/);

    if (lines.length)
    {
      if (lines[0].startsWith('layout|'))
      {
        const layout = lines[0].slice(7).trim();
        const layoutId = getTemplateId(`layouts/${ layout }.cog`);
        context.output[0] = `{% extends "${ layoutId }.njk" %}`;

        context.dependencies.push(layoutId);
        lines.shift();
      }

      const tree = createTree(lines);
      await transformTree(tree, context.dependencies);
      createOutputFromTree(context.output, tree);
    }

    delete context.body;
  }
);

/**
 * Creates a tree structure from an array of template lines.
 * 
 * @param lines The array of template lines.
 * @returns The created template tree.
 */
function createTree (lines: string[]): Tree
{
  const root: Tree = [];
  const stack: Stack[] = [];

  for (const line of lines)
  {
    const trimmedLine = line.trim();
    if (!trimmedLine.length) continue;

    const indent = line.search(/\S/);
    const element: TemplateElement = {
      openingTag: trimmedLine, closingTag: null, children: []
    };

    if (!stack.length || indent === 0)
    {
      stack.length = 0;
      root.push(element);
    }
    else
    {
      while (stack.length > 0 && stack[stack.length - 1].level >= indent)
        stack.pop(); // rewind the stack to find the parent element.

      const parent = stack[stack.length - 1].element;
      parent.children.push(element);
    }

    stack.push({ element, level: indent });
  }

  return root;
}

/**
 * Transforms the template tree by running element processing tasks.
 * 
 * @param tree The template tree to transform.
 * @param dependencies The array of template dependencies.
 * @returns A promise that resolves when all element processing tasks have completed.
 */
async function transformTree (tree: Tree, dependencies: string[]): Promise<void>
{
  const tasks: Promise<void>[] = [];

  for (const element of tree)
  {
    if (/^\w+(\s+[^:]+)?:?$/.test(element.openingTag))
    {
      tasks.push(
        runTask('templates/elements', { element, dependencies })
      );
    }
  }

  await Promise.all(tasks);
}

/**
 * Creates the Nunjucks output from the transformed template tree. It recursively
 * traverses the tree and appends the opening and closing tags to the output array.
 * 
 * @param output The array to store the Nunjucks output.
 * @param tree The transformed template tree.
 */
function createOutputFromTree (output: string[], tree: Tree): void
{
  for (const element of tree)
  {
    output.push(element.openingTag);
    createOutputFromTree(output, element.children);

    if (element.closingTag) output.push(element.closingTag);
  }
}