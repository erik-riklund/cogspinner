import { createTask } from '#gear:routines';

import type { TemplateTransformContext } from '../../context';

/**
 * ?
 */
export default createTask<TemplateTransformContext>(
  async (context) =>
  {
    console.log('parse lines completed.');
  }
);