import { basename, dirname } from 'path';
import { routeModules } from '#artifact:routes';

import type { Hono } from 'hono';
import type { ServerMiddleware } from '#type:server';
import type { RouteDefinition } from '#type:router';

/**
 * Initializes the router by processing route modules,
 * applying middleware, and mounting route handlers.
 *
 * @param {Hono} server - The Hono server instance.
 * @param {ServerMiddleware[]} middlewares - An array to store server-level middleware.
 */
export function initializeRouter (
  server: Hono, middlewares: ServerMiddleware[]): void
{
  const routes: RouteDefinition[] = [];

  for (const { file, module } of routeModules)
  {
    if (module.handler)
    {
      routes.push(
        {
          method: getRouteMethod(file),
          path: `/${ createRoutePath(file) }`,

          handler: module.handler
        }
      );
    }

    if (module.middleware)
    {
      if (!Array.isArray(module.middleware))
        module.middleware = [module.middleware];

      module.middleware.forEach(middleware =>
        middlewares.push(
          {
            route: `/${ createRoutePath(file) }/*`,
            method: getRouteMethod(file).toLowerCase(),

            handler: middleware
          }
        )
      );
    }
  }

  applyMiddlewares(server, middlewares);
  mountRouteHandlers(server, routes);
}

/**
 * Applies the registered middleware to the Hono server.
 *
 * @param {Hono} server - The Hono server instance.
 * @param {ServerMiddleware[]} middlewares - An array of server-level middleware to apply.
 */
function applyMiddlewares (server: Hono, middlewares: ServerMiddleware[]): void
{
  middlewares.forEach(
    middleware =>
    {
      if (!middleware.route && !middleware.method)
      {
        server.use(middleware.handler);
      }
      else if (middleware.route && !middleware.method)
      {
        server.use(middleware.route, middleware.handler);
      }
      else if (!middleware.route && middleware.method)
      {
        // @ts-ignore - Hono server methods are dynamically accessed
        server[middleware.method]('*', middleware.handler);
      }
      else
      {
        // @ts-ignore - Hono server methods are dynamically accessed
        server[middleware.method](middleware.route, middleware.handler);
      }
    }
  );
}

/**
 * Mounts the route handlers to the Hono server.
 *
 * @param {Hono} server - The Hono server instance.
 * @param {RouteDefinition[]} routes - An array of route definitions to mount.
 */
function mountRouteHandlers (server: Hono, routes: RouteDefinition[]): void 
{
  routes.forEach(route => server.on(route.method, route.path, route.handler));
}

/**
 * Creates a route path from a file path, converting hyphens to parameter names.
 *
 * @param {string} filePath - The file path of the route module.
 * @returns {string} The formatted route path.
 */
function createRoutePath (filePath: string): string
{
  let path = dirname(filePath);

  return path === '.' ? '' : path.replaceAll(/(?<=^|\/)\-(\w+)/g, ':$1');
}

/**
 * Extracts the HTTP method from a file path.
 *
 * @param {string} filePath - The file path of the route module.
 * @returns {string} The HTTP method (e.g., 'GET', 'POST').
 */
function getRouteMethod (filePath: string): string
{
  return basename(filePath, '.ts');
}