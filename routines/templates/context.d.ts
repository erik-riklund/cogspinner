/**
 * Represents a node in the document tree structure,
 * used for representing template elements.
 */
export interface Node
{
  /**
   * The full HTML or template element (a single line).
   */
  element: string;

  /**
   * An array of child nodes, representing the nested elements within this node.
   */
  children: Node[];
}

/**
 * ?
 */
export interface TemplateTransformContext
{
  /**
   * ?
   */
  id: string;

  /**
   * ?
   */
  file: string;

  /**
   * ?
   */
  head: string | null;

  /**
   * ?
   */
  style: string | null;

  /**
   * ?
   */
  template: string | null;

  /**
   * ?
   */
  output: string[];

  /**
   * ?
   */
  result: string;
}

/**
 * ?
 */
export interface ElementParserContext
{
  /**
   * ?
   */
  element: string;

  /**
   * ?
   */
  output: string[];
}

/**
 * ?
 */
export interface CreateManifestContext
{
  /**
   * ?
   */
  templates: { id: string, name: string; }[];
}