import { task } from '#gear:routines';
import type { RouteManifestContext } from './context';

/**
 * This task takes the `RouteManifestContext`, including the generated imports and route definitions,
 * and constructs a TypeScript file (`artifacts/routes.ts`) that exports an array of route modules.
 */
export default task<RouteManifestContext>(
  async (context) =>
  {
    const output = [
      '// this is a generated file - do not edit!',
      ...context.manifest.imports,
      'import type { RouteModule } from \'#type:router\';',
      `interface RouteManifest { file: string; module: RouteModule };`,
      'export const routeModules: RouteManifest[] = [',
      ...context.manifest.routes,
      '];'
    ];

    await Bun.write(`${ process.cwd() }/artifacts/routes.ts`, output.join('\n'));
  }
);