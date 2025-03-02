import { createTask } from '#gear:routines';
import type { TemplateTransformContext } from '../context';

/**
 * ?
 */
export default createTask<TemplateTransformContext>(
  async (context) =>
  {
    const templateId = Bun.hash(context.file);
    const outputFolder = `${ process.cwd() }/artifacts/templates`;

    await Bun.write(`${ outputFolder }/${ templateId }.ts`, context.result);
  }
);