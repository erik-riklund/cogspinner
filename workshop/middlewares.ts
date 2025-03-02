import type { ServerMiddleware } from '#type:server';

/**
 * An array to hold server middleware.
 * 
 * Middleware added to this array will be executed in the order they are added,
 * and are executed *before* any middleware registered within individual route files.
 */
export const middlewares: ServerMiddleware[] = [];