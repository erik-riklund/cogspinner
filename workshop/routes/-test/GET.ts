import { route } from '#gear:router';

/**
 * ?
 */
export default route(
  {
    /**
     * ?
     */
    handler: async (context) => context.html(
      `<h1>hello ${ context.req.param('test') }</h1>` +
      `<p>the name was hashed by middleware: ${ context.get('hash') }</p>`
    ),

    /**
     * ?
     */
    middleware: async (context, next) =>
    {
      context.set(
        'hash', Bun.hash(context.req.param('test') as string)
      );
      await next();
    }
  }
);