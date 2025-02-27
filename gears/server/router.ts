import type { Hono } from 'hono';
import type { ServerOptions, ServerMiddleware } from '#type:server';

/**
 * ?
 */
export async function initializeRouter (server: Hono,
  middlewares: Array<ServerMiddleware> = [], options: ServerOptions = {})
{
  //+ implement mounting of registered middlewares and routes.
}