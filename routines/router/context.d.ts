/**
 * Defines the context object used when generating the route manifest.
 */
export interface RouteManifestContext
{
  /**
   * An array of file paths that contains route module definitions.
   */
  files: string[];

  /**
   * An object containing arrays of generated imports and route definitions.
   */
  manifest: { imports: string[]; routes: string[]; };
}