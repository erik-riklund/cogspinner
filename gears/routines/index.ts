import { Glob } from 'bun';
import { watch } from 'fs';

import { registerTask, registerTaskFromFile, runTask, runTasks } from './cogs/manager';
import { task, pipeTask, sequence, parallel, pipeline } from './cogs/builder';

/**
 * Dynamically loads and registers tasks from TypeScript files within the 'routines' directory.
 * It uses Bun's `Glob` to recursively find all task files and registers them using `registerTaskFromFile`.
 */
const files = new Glob('**/*.ts');
for await (const file of files.scan(`${ process.cwd() }/routines`))
{
  await registerTaskFromFile(file);
}

/**
 * Watches the 'routines' directory for changes (specifically file renames) and dynamically registers
 * new or renamed TypeScript task files. This ensures that task definitions are updated in real-time as
 * files are added, removed, or renamed.
 */
watch(
  `${ process.cwd() }/routines`, { recursive: true },
  (event, path) => event === 'rename' &&
    (path as string).endsWith('.ts') && registerTaskFromFile(path as string)
);

/**
 * Executes the task named 'default' after all tasks have been dynamically loaded and registered.
 * This is typically used to setup an initial state or perform any one-time tasks.
 */
runTask('default');

/**
 * Exports the core task building and management functions, making them available for use in other modules.
 */
export { task, pipeTask, sequence, parallel, pipeline, runTask, runTasks, registerTask };