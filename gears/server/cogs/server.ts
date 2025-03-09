import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';
import { initializeRouter } from '#gear:router';
import { viewRenderer } from '#gear:templates';

import type { ServerOptions, ServerMiddleware } from '#type:server';

/**
 * Creates a Hono server instance with specified options and middlewares.
 */
export function createServer (options: ServerOptions = {}, middlewares: ServerMiddleware[] = [])
{
  return {
    /**
     * Starts the Hono server and returns the fetch handler and port.
     */
    start: async function ()
    {
      const server = new Hono();

      server.use('/assets/*', serveStatic({ root: 'public' }));
      initializeRouter(server, [{ handler: viewRenderer }, ...middlewares]);

      return {
        fetch: server.fetch,
        port: options?.port ?? parseInt(process.env['PORT'] ?? '81')
      };
    }
  };
}