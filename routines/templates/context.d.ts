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