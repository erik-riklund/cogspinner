import type { MiddlewareHandler } from 'hono';

/**
 * ?
 */
export const viewRenderer: MiddlewareHandler = async (context, next) =>
{
  context.setRenderer(
    (content) =>
    {
      //+ ?

      return context.html(`intercepted: ${ content }`);
    }
  );

  await next();
};