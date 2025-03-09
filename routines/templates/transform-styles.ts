import stylus from 'stylus';
import parser from 'css-simple-parser';
import { folders } from '~constants';
import { getTemplateId } from '#gear:templates';
import { createTask } from '#gear:routines';

import type { NODE } from 'css-simple-parser';

/**
 * Compiles the Stylus code, parses the resulting CSS, adds a unique suffix to class selectors,
 * and updates the context with the modified CSS and a list of classes.
 */
export default createTask(
  async (context) =>
  {
    const { style } = context;

    context.style = stylus(style)
      .include(folders.styles)
      .include(`${ folders.gears }/styles`)
      .set('compress', true).render();

    context.classes = [] as string[];
    const tree = parser.parse(context.style);
    addClassSuffix(context, tree.children);

    context.style = parser.stringify(tree);
  }
);

/**
 * Recursively traverses the CSS node tree, adds a unique
 * suffix to class selectors, and collects the classes.
 * 
 * @param context The task context containing the file path and classes array.
 * @param nodes The array of CSS nodes to process.
 */
function addClassSuffix (context: Record<string, any>, nodes: NODE[])
{
  const suffix = getTemplateId(context.file).slice(0, 6);

  for (const node of nodes)
  {
    const selector = !node.selector.includes(':') ? node.selector
      : node.selector.slice(0, node.selector.indexOf(':'));

    node.selector = node.selector.replace(/^((?:[\w-]+)?\.(?:[\w-]+))/, `$1-${ suffix }`);

    if (!context.classes.includes(selector)) context.classes.push(selector);
    if (node.children.length) addClassSuffix(context, node.children);
  }
}