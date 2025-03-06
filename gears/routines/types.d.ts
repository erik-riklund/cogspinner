/**
 * Represents a function that performs a single task within a workflow.
 * It receives a context object, allowing it to access and modify shared data.
 * The function is asynchronous and should resolve when the task is complete.
 *
 * @typeparam `TContext` The type of the context object, defaulting to a generic object.
 * @param context The context object containing shared data.
 * @returns A promise that resolves when the task is complete.
 */
export type TaskFunction<TContext extends Object = Record<string, any>> = (context: TContext) => Promise<void>;

/**
 * Represents a function that performs a task within a pipeline, allowing it to control the flow.
 * It receives a context object and a `next` function, which should be called to proceed to the next task in the pipeline.
 * The function is asynchronous and should resolve when the task and any subsequent tasks (if `next` is called) are complete.
 *
 * @typeparam TContext The type of the context object, defaulting to a generic object.
 * @param context The context object containing shared data.
 * @param next A function that, when called, executes the next task in the pipeline.
 * @returns A promise that resolves when the task and any subsequent tasks (if `next` is called) are complete.
 */
export type PipelineTaskFunction<TContext extends Object = Record<string, any>> = (context: TContext, next: () => Promise<void>) => Promise<void>;