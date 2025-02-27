import type { MiddlewareHandler } from 'hono';

/**
 * Configuration options for the server.
 */
interface ServerOptions
{
  /**
   * The port number on which the server will listen.
   *
   * @default 81 (or a default provided by the environment)
   */
  port?: number;
}

/**
 * Defines middleware to be applied to the server.
 */
interface ServerMiddleware
{
  /**
   * The route to which this middleware applies.
   *
   * - Use a specific path (e.g., `/api/users`) for targeted middleware.
   * - Use a glob pattern (e.g., `/api/*`) for wildcard middleware that should apply to all sub-paths.
   * - Use `*` or omit for middleware that applies to all routes.
   *
   * @default * (all routes)
   */
  route?: string;

  /**
   * The HTTP method for which this middleware is applicable.
   *
   * - Use specific methods (e.g., `POST`, `PUT`) for method-specific middleware.
   * - Use `*` for middleware that applies to all methods.
   *
   * @default GET
   */
  method?: string;

  /**
   * The middleware handler function that will be executed for matching routes and methods.
   *
   * @param {Context} c - The Hono context object, providing request and response capabilities.
   * @param {Next} next - The next middleware function in the chain. Call this to proceed.
   * @returns {Promise<Response | void>} A promise that resolves to a `Response` object or `void`.
   *
   * @example
   * ```typescript
   * const myMiddleware: MiddlewareHandler = async (c, next) => {
   *   console.log('Middleware executed');
   *   await next();
   * };
   * ```
   */
  handler: MiddlewareHandler;
}

export type { ServerOptions, ServerMiddleware };