/**
 * ?
 */
const rootFolder = process.cwd();

/**
 * ?
 */
export const folders =
{
  /**
   * ?
   */
  artifacts: `${ rootFolder }/artifacts`,

  /**
   * ?
   */
  routes: `${ rootFolder }/workshop/routes`,

  /**
   * ?
   */
  templates: `${ rootFolder }/workshop/templates`
};

/**
 * ?
 */
export const isDevelopment = process.argv.includes('-d');