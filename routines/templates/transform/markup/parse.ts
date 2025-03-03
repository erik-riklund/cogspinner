import yaml from 'js-yaml';
import { createTask } from '#gear:routines';

import type { TemplateTransformContext } from '../../context';

/**
 * ?
 */
export default createTask<TemplateTransformContext>(
  async (context) =>
  {
    try { context.document = yaml.load(context.structure); }
    catch (error) { console.error(error.message); }
  }
);