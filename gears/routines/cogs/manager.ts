import type { TaskFunction, PipelineTaskFunction } from '#type:routines';
/**
 * ?
 */
const tasks = new Map<string, Function>();

/**
 * ?
 */
export function getTask<T extends Function = TaskFunction> (name: string): T 
{
  if (!tasks.has(name))
    throw new Error(`Task "${ name }" does not exist.`);

  return tasks.get(name) as T;
}

/**
 * ?
 */
export function registerTask (name: string, workload: Function): void
{
  if (tasks.has(name))
    throw new Error(`Task "${ name }" already exists.`);

  tasks.set(name, workload);
}

/**
 * ?
 */
export async function registerTaskFromFile (path: string): Promise<void>
{
  // console.debug('--loading task file:', path);
  const workload = await loadTaskFromFile(`${ process.cwd() }/routines/${ path }`);
  const identifier = createTaskIdentifier(path);
  // console.debug('--assigning identifier:', identifier);

  registerTask(identifier, workload);
}

/**
 * ?
 */
function createTaskIdentifier (path: string): string
{
  return path.replaceAll('\\', '/').slice(0, path.lastIndexOf('.'));
}

/**
 * ?
 */
async function loadTaskFromFile (path: string): Promise<Function>
{
  return (await import(path)).default;
}