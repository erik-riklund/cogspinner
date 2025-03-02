import { route } from '#gear:router';

/**
 * ?
 */
export default route(
  {
    /**
     * ?
     */
    handler: async (context) => context.html('<h1>hello world</h1>')
  }
);