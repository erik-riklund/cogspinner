import { Hono } from 'hono';
import { initializeRouter } from '#gear:server/router';
import type { ServerOptions, ServerMiddleware } from '#type:server';

/**
 * ?
 */
export function createServer (options: ServerOptions = {})
{
  const middlewares: Array<ServerMiddleware> = [];
  //+ implement loading of middlewares based on configuration file.

  const server =
  {
    /**
     * ?
     */
    registerMiddleware: (middleware: ServerMiddleware) =>
      middlewares.push({ route: '*', method: 'GET', ...middleware })
    ,

    /**
     * ?
     */
    start: async function ()
    {
      const app = new Hono();
      await initializeRouter(app, middlewares, options);

      app.get('*', async (context) => context.text('Hello world'));
      return { port: options?.port ?? parseInt(process.env['PORT'] ?? '81'), fetch: app.fetch };
    }
  };

  return server;
}