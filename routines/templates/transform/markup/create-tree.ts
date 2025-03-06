import { createTask } from '#gear:routines';

import type { TemplateTransformContext } from '../../context';

/**
 * Represents a stack frame used during template
 * parsing to keep track of nested elements.
 */
interface Stack
{
  /**
   * The indentation level of the element, determined by the number
   * of leading spaces divided by 2.
   */
  level: number;

  /**
   * The element associated with this stack frame.
   */
  element: Element;
}

/**
 * Represents the tree structure resulting from parsing a template string.
 * It can contain strings (representing plain text and HTML) or `Element` objects
 * (representing template directives) and their children.
 */
export type Tree = (string | Element)[];

/**
 * Represents a template element with a directive string and a list of child elements.
 */
interface Element
{
  /**
   * The directive string, e.g., "~ someDirective ~".
   */
  directive: string;

  /**
   * An array of child elements, which can be strings or other `Element` objects.
   */
  children: (string | Element)[];
}

/**
 * Creates a task that transforms a template string into a tree structure. Indentation
 * levels are used to establish parent-child relationships between elements.
 */
export default createTask<TemplateTransformContext>(
  async (context) =>
  {
    const tree: Tree = [];
    const stack: Stack[] = [];

    const { template } = context;

    if (typeof template === 'string')
    {
      const lines = template.split(/\r?\n/);

      for (let i = 0; i < lines.length; i++)
      {
        const line = lines[i].trim();

        if (line.length)
        {
          const level = getIndentLevel(lines[i]);
          popStackToParentLevel(stack, level);

          const element = !isTemplateDirective(line) ? line :
            { directive: line, children: [] } satisfies Element;
          const parent: Element | undefined = stack[stack.length - 1]?.element;

          addElementToTree(tree, parent, element);
          if (typeof element !== 'string') stack.push({ level, element });
        }
      }
    }

    context.tree = tree;
  }
);

/**
 * Checks if a line represents a template directive.
 *
 * @param line - The line to check.
 * @returns `true` if the line is a template directive, `false` otherwise.
 */
function isTemplateDirective (line: string): boolean
{
  return line.startsWith('~ ') && line.endsWith(' ~');
}

/**
 * Calculates the indentation level of a line.
 *
 * The level is determined by the number of leading spaces divided by 2.
 * A warning is logged if the indentation is not an even number of spaces.
 *
 * @param line - The line to calculate the level for.
 * @returns The indentation level.
 */
function getIndentLevel (line: string): number
{
  const level = line.length - line.trimStart().length;
  if (level % 2 !== 0) console.warn(
    `Invalid indentation, must be an even number of spaces: "${ line }"`
  );

  return Math.floor(level / 2);
}

/**
 * Pops elements from the stack until the top element's level is less than
 * the current level. This is used to find the parent element in the stack.
 *
 * @param stack - The stack to manipulate.
 * @param currentLevel - The current indentation level.
 */
function popStackToParentLevel (stack: Stack[], currentLevel: number): void
{
  while (stack.length && stack[stack.length - 1].level >= currentLevel)
    stack.pop(); // unwind the stack to find the parent.
}

/**
 * Adds an element to the tree, either as a root element or as a child of a parent element.
 *
 * @param tree - The tree to add the element to.
 * @param parent - The parent element, or `undefined` if the element is a root element.
 * @param element - The element to add.
 */
function addElementToTree (tree: Tree,
  parent: Element | undefined, element: Element | string): void
{
  if (parent === undefined) tree.push(element); else parent.children.push(element);
}