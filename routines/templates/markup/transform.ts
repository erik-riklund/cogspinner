import { createTask, createParallel, runTask } from '#gear:routines';

import type { TemplateElement, Tree } from './parse';

/**
 * Defines parallel tasks for processing markup directives.
 * This ensures that these directive processing tasks run concurrently for efficiency.
 */
createParallel('templates/markup/process-directive', [
  'templates/markup/directives/layout', 'templates/markup/directives/component'
]);

/**
 * Creates a task that processes the entire template tree.
 * This is the main entry point for processing the parsed template structure.
 */
export default createTask(
  async (context) => await processTree(context.tree as Tree)
);

/**
 * Recursively processes each element in the template tree.
 * 
 * @param tree The template tree to process.
 * @returns A `Promise` that resolves when all elements have been processed.
 */
async function processTree (tree: Tree)
{
  for (const element of tree)
  {
    if (typeof element === 'object')
    {
      await processElement(element);
    }
  }
}

/**
 * Processes a single template element, including its children and directives.
 * Child elements are processed recursively and concurrently.
 * 
 * @param element The template element to process.
 * @returns A `Promise` that resolves when the element directive has been processed.
 */
async function processElement (element: TemplateElement)
{
  if (element.children.length)
  {
    processTree(element.children); // no await for efficiency.
  }

  await runTask('templates/markup/process-directive', { element });
}