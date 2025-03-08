import { folders } from '~constants';
import { createTask } from '#gear:routines';

/**
 * Creates a JSON file containing information about the template.
 */
export default createTask(
  async (context) =>
  {
    const metadata = {
      head: context.result.head !== null,
      styles: context.result.style !== null,
      dependencies: context.result.dependencies
    };

    const target = `${ folders.artifacts }/${ context.id }/metadata.json`;
    await Bun.write(target, JSON.stringify(metadata));
  }
);