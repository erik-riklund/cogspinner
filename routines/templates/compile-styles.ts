import stylus from 'stylus';
import { folders } from '~constants';
import { createTask } from '#gear:routines';

/**
 * Takes the Stylus code from the context, compiles it using the Stylus compiler,
 * and sets the compiled CSS back into the context. It includes specific folders
 * for imports and compresses the output.
 */
export default createTask(
  async (context) =>
  {
    const { style } = context;

    context.style = stylus(style)
      .include(folders.styles)
      .include(`${ folders.gears }/styles`)
      .set('compress', true).render();
  }
);