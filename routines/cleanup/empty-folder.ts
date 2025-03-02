import { rm } from 'node:fs/promises';
import { createTask } from '#gear:routines';

/**
 * Context for the task that empties a specified folder.
 */
interface EmptyFolderTaskContext
{
  /**
   * The relative path to the folder that should be emptied.
   * This path is relative to the current working directory.
   */
  folder: string;
}

/**
 * Creates a task that empties a specified folder by recursively removing its contents.
 *
 * @param context The context object containing the folder to empty.
 * @returns A task function that, when executed, empties the specified folder.
 */
export default createTask<EmptyFolderTaskContext>(
  async (context) =>
  {
    await rm(
      `${ process.cwd() }/${ context.folder }`, { recursive: true, force: true }
    );
  }
);