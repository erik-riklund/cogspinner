import type { Stylesheet } from 'css';

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
  content:
  {
    /**
     * ?
     */
    styles: string | null;

    /**
     * ?
     */
    markup: string[];
  };

  /**
   * ?
   */
  result: string;
}