import { createTask } from '#gear:routines';
import { getTemplateId } from '#gear:templates';

import type { TemplateTransformContext } from '../context';

/**
 * ?
 */
export default createTask<TemplateTransformContext>(
  async (context) =>
  {
    const templateId = getTemplateId(context.file);
    const outputFolder = `${ process.cwd() }/artifacts/templates`;

    await Bun.write(`${ outputFolder }/${ templateId }.ts`, context.result);
  }
);