import { folders } from '~constants';
import { createTask } from '#gear:routines';

/**
 * ?
 */
interface DeleteOutputContext
{
  /**
   * ?
   */
  file: string;
}

/**
 * ?
 */
export default createTask<DeleteOutputContext>(
  async (context) => await Bun.file(context.file).delete()
);