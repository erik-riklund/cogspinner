import stylus from 'stylus';
import { folders } from '~constants';
import { createTask } from '#gear:routines';

import type { TemplateTransformContext } from '../../context';

/**
 * This task takes the `styles` property from the `TemplateTransformContext`,
 * compiles it using Stylus, and updates the property with the resulting CSS.
 */
export default createTask<TemplateTransformContext>(
  async (context) =>
  {
    const { styles } = context;

    if (styles !== null)
    {
      context.styles = stylus(styles).set('include', folders.styles).render();
    }
  }
);