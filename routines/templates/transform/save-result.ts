import { createTask } from '#gear:routines';
import type { TemplateTransformContext } from '../context';

/**
 * ?
 */
export default createTask<TemplateTransformContext>(
  async (context) =>
  {
    console.log(Bun.inspect(context, { colors: true })); //! debug

    const outputFolder = `${ process.cwd() }/artifacts/templates`;
    await Bun.write(`${ outputFolder }/${ context.id }.ts`, context.result);
  }
);