import type { Handler, MiddlewareHandler } from 'hono';

/**
 * Defines a module that is used to configure a route.
 * It allows specifying a request handler and middleware.
 */
export interface RouteModule
{
  /**
   * The request handler function that will be executed when a request matches the route.
   */
  handler?: Handler;

  /**
   * Middleware(s) to be applied to the route.
   * Can be a single middleware function or an array of middleware functions.
   * Middleware functions are executed before any route handlers.
   */
  middleware?: MiddlewareHandler | MiddlewareHandler[];
}

/**
 * Defines a complete route definition, including the path, method, and handler.
 * This is the final form of a route configuration, ready to be registered.
 */
export interface RouteDefinition
{
  /**
   * The path of the route (e.g., `/users`, `/products/:id`).
   */
  path: string;

  /**
   * The HTTP method of the route (`GET`, `POST`, `PUT`, `PATCH` or `DELETE`).
   */
  method: string;

  /**
   * The request handler function that will be executed when a request matches the path and method.
   */
  handler: Handler;
}