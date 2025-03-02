import { Hono } from 'hono';
import { initializeRouter } from '#gear:router';

import type { MiddlewareHandler } from 'hono';
import type { ServerOptions, ServerMiddleware } from '#type:server';

/**
 * Creates a server instance using the Hono framework, allowing for the registration
 * of global middleware and the configuration of server options.
 *
 * @param {ServerOptions} [options={}] - Optional server configuration options, such as the port number.
 * @param {ServerMiddleware[]} [middlewares=[]] - Optional array of middleware to apply to all routes.
 * @returns {object} - An object containing methods for registering middleware and starting the server.
 */
export function createServer (options: ServerOptions = {},
  middlewares: ServerMiddleware[] = [], renderer?: MiddlewareHandler)
{
  return {
    /**
     * This asynchronous method creates a new Hono server instance, initializes the router with
     * the provided middleware, and returns an object containing the server's `fetch` function and
     * the port number on which the server will listen.
     *
     * The port number is determined by the `options.port` property, falling back to the `PORT`
     * environment variable, and finally defaulting to `81` if neither is provided.
     *
     * @returns A promise that resolves to an object containing the server's `fetch` function and port number.
     */
    start: async function ()
    {
      const server = new Hono();
      if (renderer) server.use(renderer);
      initializeRouter(server, middlewares);

      return {
        fetch: server.fetch,
        port: options?.port ?? parseInt(process.env['PORT'] ?? '81')
      };
    }
  };
}