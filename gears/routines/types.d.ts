/**
 * ?
 */
export type TaskFunction = (context?: object) => Promise<void>;

/**
 * ?
 */
export type PipelineTaskFunction =
  (context: object, next: () => Promise<void>) => Promise<void>;