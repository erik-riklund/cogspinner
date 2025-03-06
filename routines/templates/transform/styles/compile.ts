import stylus from 'stylus';
import { folders } from '~constants';
import { createTask } from '#gear:routines';

import type { TemplateTransformContext } from '../../context';

/**
 * This task takes the `style` property from the `TemplateTransformContext`,
 * compiles it using Stylus, and updates the property with the resulting CSS.
 */
export default createTask<TemplateTransformContext>(
  async (context) =>
  {
    const { style } = context;

    if (style !== null)
    {
      context.style = stylus(style)
        .set('compress', true)
        .set('include', folders.styles).render();
    }
  }
);