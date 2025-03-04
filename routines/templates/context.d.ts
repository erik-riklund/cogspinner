/**
 * ?
 */
export interface Node
{
  /**
   * ?
   */
  element: string;

  /**
   * ?
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
  styles: string | null;

  /**
   * ?
   */
  content: string[];

  /**
   * ?
   */
  tree: Node[];

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