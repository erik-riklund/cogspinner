import type { Context, Next } from 'hono';

/**
 * ?
 */
export async function viewRenderer (context: Context, next: Next): Promise<void>
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