import { Hono } from 'hono';
import type { ServerOptions, ServerMiddleware } from '#type:server';

/**
 * ?
 */
export function createServer ()
{
  const middlewares = [];
  const options: ServerOptions = {};

  //+ implement loading of options from configuration file.
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
      app.get('*', async (context) => context.text('Hello world'));
      // await initializeRouter(app, middlewares, options);

      return { port: options?.port ?? parseInt(process.env['PORT'] ?? '81'), fetch: app.fetch };
    }
  };

  return server;
}