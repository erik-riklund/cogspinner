import type { MiddlewareHandler } from 'hono';

/**
 * Defines the configuration options for the server.
 */
export interface ServerOptions
{
  /**
   * The port number on which the server should listen.
   *
   * If not provided, the server will attempt to use the `PORT` environment variable.
   * If that is also not set, the port `81` will be used by default.
   */
  port?: number;
}

/**
 * Defines the structure for server middleware.
 *
 * Middleware allows you to intercept and modify incoming requests and outgoing responses.
 * This interface specifies the properties required to define a middleware function.
 * 
 * @see https://hono.dev/docs/guides/middleware
 */
export interface ServerMiddleware
{
  /**
   * The route pattern to which the middleware should be applied.
   *
   * - If not provided, the middleware will be applied to all routes by default.
   */
  route?: string;

  /**
   * The HTTP method to which the middleware should be applied.

   * - If not provided, the middleware will be applied to all requests by default.
   */
  method?: string;

  /**
   * The middleware handler function.
   *
   * This function will be executed when a request matches the specified route and method.
   * It receives the Hono context and a `next` function to pass control to the next middleware.
   */
  handler: MiddlewareHandler;
}