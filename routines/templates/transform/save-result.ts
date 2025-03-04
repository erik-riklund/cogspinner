import { createTask } from '#gear:routines';
import type { TemplateTransformContext } from '../context';

/**
 * ?
 */
export default createTask<TemplateTransformContext>(
  async (context) =>
  {
    console.log(Bun.inspect(context, { colors: true })); //! debug

    const outputFolder = `${ process.cwd() }/artifacts`;
    await Bun.write(`${ outputFolder }/templates/${ context.id }.ts`, context.result);

    if (context.styles !== null)
    {
      await Bun.write(
        `${ outputFolder }/stylesheets/${ context.id }.css`, context.styles
      );
    }
  }
);