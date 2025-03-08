/**
 * Represents the tree structure resulting from parsing a template string.
 */
export type Tree = (string | TemplateElement)[];

/**
 * Represents a template element with a directive string and a list of child elements.
 */
export interface TemplateElement
{
  /**
   * The directive string, e.g., "$component|name".
   */
  directive: string;

  /**
   * Tree structure of child elements.
   */
  children: Tree;
}

/**
 * Represents a stack frame used during template parsing to keep track of nested elements.
 */
export interface Stack
{
  /**
   * The indentation level of the element, determined by the number of leading spaces divided by 2.
   */
  level: number;

  /**
   * The element associated with this stack frame.
   */
  element: TemplateElement;
}