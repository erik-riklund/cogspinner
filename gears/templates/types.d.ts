/**
 * A map-like structure that holds cached templates, where each key is a string
 * representing the template name, and the value is a `CachedTemplate` object.
 */
export type TemplateCache = Record<string, CachedTemplate>;

/**
 * Represents a compiled template function that takes a context object and returns a string.
 * The context object is expected to contain the data needed to render the template.
 *
 * @param context The context object containing data used to render the template.
 * @returns A string representing the rendered template.
 */
export type CompiledTemplate = (context: RenderContext, props: Record<string, any>) => Promise<string>;

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
}

/**
 * Represents the context data needed for rendering a page. This interface encapsulates information
 * like the title, styles, and meta tags that should be included in the rendered output.
 */
export interface RenderContext
{
  /**
   * ?
   */
  lang: string;

  /**
   * The title of the rendered page.
   */
  title: string;

  /**
   * A map of stylesheets to be included in the rendered output. The keys represent template IDs,
   * and the values represent the corresponding styles.
   */
  styles: Record<string, string>;

  /**
   * ?
   */
  head: Record<string, string>;

  /**
   * ?
   */
  data: Record<string, any>;

  /**
   * Registers a stylesheet with the given template ID and content. This allows for dynamically
   * adding stylesheets during the rendering process.
   */
  registerStylesheet: (id: string, stylesheet: string) => void;

  /**
   * ?
   */
  includeElement: (id: string, element: string) => void;
}