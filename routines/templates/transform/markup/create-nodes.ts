import { createTask } from '#gear:routines';
import type { Node, TemplateTransformContext } from '../../context';

/**
 * ?
 */
interface Stack
{
  /**
   * ?
   */
  node: Node;

  /**
   * ?
   */
  level: number;
}

/**
 * ?
 */
export default createTask<TemplateTransformContext>(
  async (context) =>
  {
    context.tree = [];
    const stack: Stack[] = [];

    for (const line of context.content)
    {
      if (line.trimStart().length > 0)
      {
        const trimmedLine = line.trim();
        const lineLevel = getLevel(line);
        const node: Node = { element: trimmedLine, children: [] };

        popStackToParentLevel(stack, lineLevel);
        pushNodeOntoStack(context.tree, stack, node, lineLevel);
      }
    }
  }
);

/**
 * ?
 */
function getLevel (line: string): number
{
  const level = line.length - line.trimStart().length;
  if (level % 2 !== 0) console.warn(
    `Invalid indentation, must be an even number of spaces: "${ line }"`
  );

  return Math.floor(level / 2);
}

/**
 * ?
 */
function popStackToParentLevel (stack: Stack[], currentLevel: number): void
{
  while (stack.length && stack[stack.length - 1].level >= currentLevel)
    stack.pop(); // unwind the stack to the correct parent.
}

/**
 * ?
 */
function pushNodeOntoStack (root: Node[], stack: Stack[], node: Node, level: number): void
{
  if (stack.length)
    stack[stack.length - 1].node.children.push(node);
  else root.push(node);

  stack.push({ node, level });
}