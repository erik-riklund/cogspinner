import { Glob } from 'bun';
import { watch } from 'fs';

import { registerTaskFromFile } from './cogs/manager';

console.debug('initializing routines...');

/**
 * ?
 */
for await (const file of new Glob('**/*.ts').scan(`${ process.cwd() }/routines`))
{
  console.debug(`loading routine: ${ file }`);
  registerTaskFromFile(file);
}

/**
 * ?
 */
watch(
  `${ process.cwd() }/routines`, { recursive: true },
  (event, path) =>
  {
    console.debug('routine added:', path);
    event === 'rename' && registerTaskFromFile(path as string);
  }
);