import type { TemplateElement } from '../types';

/**
 * Context object for tasks that process template elements.
 */
export interface ElementContext
{
  /**
   * The template element being processed.
   */
  element: TemplateElement;

  /**
   * An array of template dependencies.
   */
  dependencies: string[];
}