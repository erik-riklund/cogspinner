import type { RouteModule } from '#type:router';

/**
 * A utility function to define a route module. It simply returns the provided `RouteModule`,
 * but it should be used to infer types and improve code readability and maintainability.
 *
 * @param {RouteModule} module - The route module to define.
 * @returns {RouteModule} The same route module.
 */
export function route (module: RouteModule): RouteModule { return module; }