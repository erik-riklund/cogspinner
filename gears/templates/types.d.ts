/**
 * Represents a cached template's metadata.
 */
export interface CachedTemplate
{
  /**
   * The HTML content for the template's head section.
   */
  head: string | null;

  /**
   * The CSS content for the template's stylesheet.
   */
  style: string | null;

  /**
   * An array of template IDs that this template depends on.
   */
  dependencies: string[];
}

/**
 * A cache storing template metadata, keyed by template ID.
 */
export type TemplateCache = Record<string, CachedTemplate>;

/**
 * Represents aggregated template data,
 * including head and style content from dependencies.
 */
export interface TemplateData
{
  /**
   * A record of head content from this template
   * and its dependencies, keyed by template ID.
   */
  head: Record<string, string>;

  /**
   * A record of style content from this template
   * and its dependencies, keyed by template ID.
   */
  style: Record<string, string>;
}