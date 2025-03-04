/**
 * ?
 */
export interface RenderingContext
{
  /**
   * ?
   */
  styles: string[];

  /**
   * ?
   */
  [key: string]: any;
}

/**
 * A map-like structure that holds cached templates, where each key is a string
 * representing the template name, and the value is a `CachedTemplate` object.
 */
export type TemplateCache = { [key: string]: CachedTemplate; };

/**
 * Represents a cached template, which is a compiled template function that has been memoized
 * by the `loadCompiledTemplate` function. The `accessed` property is updated each time the
 * template is accessed, and is used to clear the cache of unused templates.
 */
export interface CachedTemplate
{
  /**
   * The timestamp of when the template was last accessed.
   */
  accessed: number;

  /**
   * The compiled template function.
   */
  template: CompiledTemplate;

  /**
   * ?
   */
  stylesheet: string | null;
}

/**
 * Represents a compiled template function that takes a context object and returns a string.
 * The context object is expected to contain the data needed to render the template.
 *
 * @param context The context object containing data used to render the template.
 * @returns A string representing the rendered template.
 */
export type CompiledTemplate = (context: Record<string, any>) => string;