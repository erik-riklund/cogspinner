import { createHash } from 'crypto';
import { sequence, parallel, pipeline } from './builder';
import type { TaskFunction } from '#type:routines';

/**
 * A map to store registered tasks, where the key is the task name (`string`)
 * and the value is the task function (`Function`).
 */
const tasks = new Map<string, Function>();

/**
 * Executes a registered task by its name.
 *
 * @typeparam `TContext` The type of the context object, defaulting to a generic object.
 * @param name The name of the task to execute.
 * @param context The context object to pass to the task function. Defaults to an empty object.
 * @returns A promise that resolves when the task execution is complete.
 * @throws Error if the task with the given name does not exist.
 */
export function runTask<TContext extends object = object>
  (name: string, context: TContext = {} as TContext): Promise<void>
{
  return getTask(name)(context);
}

/**
 * Executes multiple tasks in parallel.
 *
 * @param tasks An array of task names to execute.
 * @returns An array of promises, each representing the execution of a task.
 */
export function runTasks (tasks: string[]): Promise<void>[]
{
  const promises: Promise<void>[] = [];
  tasks.forEach(task => promises.push(runTask(task)));

  return promises;
}

/**
 * ?
 */
export function runSequence (tasks: string[]): void
{
  const identifier = createHash('md5').update(tasks.join(',')).digest('hex');
  sequence(identifier, tasks); runTask(identifier, {});
}

/**
 * Retrieves a registered task by its name.
 *
 * @typeparam `T` The expected type of the task function, defaulting to TaskFunction.
 * @param name The name of the task to retrieve.
 * @returns The task function.
 * @throws Error if the task with the given name does not exist.
 */
export function getTask<T extends Function = TaskFunction> (name: string): T
{
  if (!tasks.has(name))
    throw new Error(`Task "${ name }" does not exist.`);

  return tasks.get(name) as T;
}

/**
 * Registers a task with a given name and workload.
 *
 * @typeparam `T` The type of the workload function, defaulting to `TaskFunction`.
 * @param name The name of the task to register.
 * @param workload The task function to register.
 */
export function registerTask<T extends Function = TaskFunction> (name: string, workload: T): void
{
  if (!tasks.has(name)) tasks.set(name, workload);
}

/**
 * Dynamically registers a task from a file.
 *
 * @param path The relative path to the task file within the 'routines' directory.
 * @returns A promise that resolves when the task is registered.
 */
export async function registerTaskFromFile (path: string): Promise<void>
{
  const workload = await loadTaskFromFile(`${ process.cwd() }/routines/${ path }`);
  const identifier = createTaskIdentifier(path);

  registerTask(identifier, workload);
}

/**
 * Creates a task identifier from a file path.
 *
 * @param path The file path.
 * @returns The task identifier (task name).
 */
function createTaskIdentifier (path: string): string
{
  return path.replaceAll('\\', '/').slice(0, path.lastIndexOf('.'));
}

/**
 * Loads a task function from a file.
 *
 * @param path The absolute file path.
 * @returns A promise that resolves with the loaded task function.
 */
async function loadTaskFromFile (path: string): Promise<Function>
{
  return (await import(path)).default;
}