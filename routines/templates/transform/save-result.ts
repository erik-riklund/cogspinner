import { folders } from '~constants';
import { createTask } from '#gear:routines';
import type { TemplateTransformContext } from '../context';

/**
 * ?
 */
export default createTask<TemplateTransformContext>(
  async (context) =>
  {
    console.log(Bun.inspect(context, { colors: true })); //! debug

    await Bun.write(
      `${ folders.artifacts }/templates/${ context.id }.ts`, context.result
    );

    if (typeof context.style === 'string')
    {
      await Bun.write(
        `${ folders.artifacts }/stylesheets/${ context.id }.css`, context.style
      );
    }
  }
);