/**
 * The root folder of the project, determined by the current working directory.
 */
const rootFolder = process.cwd();

/**
 * An object containing paths to various folders within the project.
 */
export const folders =
{
  /**
   * ?
   */
  root: process.cwd(),

  /**
   * The path to the artifacts folder, where build outputs and other generated files are stored.
   */
  artifacts: `${ rootFolder }/artifacts`,

  /**
   * The path to the routes folder, which contains route definitions and handlers.
   */
  routes: `${ rootFolder }/workshop/routes`,

  /**
   * The path to the styles folder, which contains stylesheets and other styling resources.
   */
  styles: `${ rootFolder }/workshop/styles`,

  /**
   * The path to the templates folder, which contains template files used for rendering pages.
   */
  templates: `${ rootFolder }/workshop/templates`
};

/**
 * A boolean indicating whether the application is running in development mode.
 * This is determined by checking if the command-line arguments include the '-d' flag.
 */
export const isDevelopment = process.argv.includes('-d');