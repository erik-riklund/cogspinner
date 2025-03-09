/**
 * Represents an element in the template parsing stack.
 */
export interface Stack
{
  /**
   * The indentation level of the element.
   */
  level: number;

  /**
   * The template element itself.
   */
  element: TemplateElement;
}

/**
 * Represents a single element within the template structure.
 */
export interface TemplateElement
{
  /**
   * An array of child elements nested within this element.
   */
  children: Tree;

  /**
   * The opening tag or directive of the element.
   */
  openingTag: string;

  /**
   * The closing tag of the element, or `null` if it's a self-closing element.
   */
  closingTag: string | null;
}

/**
 * Represents a tree structure of template elements.
 */
export type Tree = TemplateElement[];