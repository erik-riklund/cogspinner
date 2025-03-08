import stylus from 'stylus';
import { folders } from '~constants';
import { createTask } from '#gear:routines';

/**
 * ?
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