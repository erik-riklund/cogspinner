import { route } from './cogs/helpers';
import { routeModules } from '#artifact:routes';

import type { Hono } from 'hono';
import type { ServerMiddleware } from '#type:server';

/**
 * ?
 */
export async function initializeRouter (server: Hono,
  middlewares: ServerMiddleware[], routesFolder: string): Promise<void>
{
  //+ implement mounting of registered middlewares and routes.
}

/**
 * ?
 */
export { route };