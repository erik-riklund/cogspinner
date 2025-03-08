import stylus from 'stylus';
import { folders } from '~constants';
import { createTask } from '#gear:routines';

/**
 * This task takes the `style` property from the `TemplateTransformContext`,
 * compiles it using Stylus, and updates the property with the resulting CSS.
 */
export default createTask(
  async (context) =>
  {
    const { style } = context.sections;

    if (style)
    {
      context.sections.style = stylus(style)
        .set('include', folders.styles)
        .set('include', `${ folders.root }/gears/styles`)
        .set('compress', true).render();
    }
  }
);