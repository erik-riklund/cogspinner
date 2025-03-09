/**
 * ?
 */
export interface CachedTemplate
{
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
  dependencies: string[];
}

/**
 * ?
 */
export type TemplateCache = Record<string, CachedTemplate>;

/**
 * ?
 */
export interface TemplateData
{
  /**
   * ?
   */
  head: Record<string, string>;

  /**
   * ?
   */
  style: Record<string, string>;
}