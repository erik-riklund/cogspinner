import { getTask, registerTask, runTask } from './manager';
import type { TaskFunction, PipelineTaskFunction } from '#type:routines';

/**
 * Provides typing for a basic task function. The function simply returns the provided workload,
 * which should be a function that performs a single task.
 *
 * @typeparam `TContext` The type of the context object, defaulting to a generic object.
 * @param workload The task function to be executed.
 * @returns The provided task function.
 */
export function createTask<TContext extends Object = Record<string, any>>
  (workload: TaskFunction<TContext>): TaskFunction<TContext>
{
  return workload;
}

/**
 * Provides typing for a pipeline task function. The function returns the provided workload,
 * which should be a function that performs a task within a pipeline.
 *
 * @typeparam `TContext` The type of the context object, defaulting to a generic object.
 * @param workload The pipeline task function to be executed.
 * @returns The provided pipeline task function.
 */
export function createDynamicTask<TContext extends Object = Record<string, any>>
  (workload: PipelineTaskFunction<TContext>): PipelineTaskFunction<TContext>
{
  return workload;
}

/**
 * Registers a task that executes a sequence of other tasks. The function creates a task that
 * iterates over the provided list of task names and executes each one in order.
 *
 * @typeparam `TContext` The type of the context object, defaulting to a generic object.
 * @param name The name of the sequence task.
 * @param tasks An array of task names to be executed in sequence.
 */
export function createSequence<TContext extends Object = Record<string, any>> (name: string, tasks: string[]): void
{
  registerTask(
    name,
    createTask<TContext>(
      async (context) =>
      {
        for (const task of tasks) await runTask<TContext>(task, context);
      }
    )
  );
}

/**
 * Registers a task that executes a set of tasks in parallel. The function creates a task that executes
 * the provided list of task names concurrently using `Promise.allSettled`.
 *
 * @typeparam `TContext` The type of the context object, defaulting to a generic object.
 * @param name The name of the parallel task.
 * @param tasks An array of task names to be executed in parallel.
 */
export function createParallel<TContext extends Object = Record<string, any>> (name: string, tasks: string[]): void
{
  registerTask(
    name,
    createTask<TContext>(
      async (context) =>
      {
        await Promise.allSettled(
          tasks.map(task => runTask<TContext>(task, context))
        );
      }
    )
  );
}

/**
 * Creates a task that executes the provided list of task names as a dynamic flow, where each task calls 
 * the `next` function to proceed to the next task. Code that comes after `await next()` will be executed 
 * once the flow returns to the current task.
 *
 * @typeparam `TContext` The type of the context object, defaulting to a generic object.
 * @param name The name of the pipeline task.
 * @param tasks An array of task names to be executed in the pipeline.
 */
export function createDynamicFlow<TContext extends Object = Record<string, any>> (name: string, tasks: string[]): void
{
  registerTask(
    name,
    createTask<TContext>(
      async (context) =>
      {
        let currentTaskIndex = 0;
        let workloads = tasks.map(
          task => getTask<PipelineTaskFunction<TContext>>(task)
        );

        async function next (): Promise<void>
        {
          if (currentTaskIndex < workloads.length)
          {
            const currentTask = workloads[currentTaskIndex++];
            return typeof currentTask === 'function' ? currentTask(context, next) : Promise.resolve();
          }
        }

        await next();
      }
    )
  );
}