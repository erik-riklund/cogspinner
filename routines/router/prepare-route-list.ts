import { createTask } from '#gear:routines';
import type { RouteManifestContext } from './context';

/**
 * This task iterates through the `files` array within the provided `RouteManifestContext`,
 * dynamically generates import statements for each file, and creates corresponding route
 * definitions. The generated import statements and route definitions are then stored in the
 * `manifest` property of the context object.
 */
export default createTask<RouteManifestContext>(
  async (context) =>
  {
    let i = 1;
    context.manifest = { imports: [], routes: [] };

    for (const file of context.files)
    {
      const identifier = `routeModule${ i++ }`;

      context.manifest.imports.push(
        `import ${ identifier } from '#route:${ file.replace('.ts', '') }';`
      );
      context.manifest.routes.push(`{ file: '${ file }', module: ${ identifier } },`);
    }
  }
);