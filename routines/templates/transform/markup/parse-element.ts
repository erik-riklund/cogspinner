import { createTask, runTask } from '#gear:routines';
import type { ElementParserContext } from '~routines/templates/context';

/**
 * ?
 */
export default createTask<ElementParserContext>(
  async (context) =>
  {
    console.log('custom elements are not implemented yet.');
  }
);