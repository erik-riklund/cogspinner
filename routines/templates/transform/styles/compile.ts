import stylus from 'stylus';
import { createTask } from '#gear:routines';

import type { TemplateTransformContext } from '../../context';

/**
 * ?
 */
export default createTask<TemplateTransformContext>(
  async (context) =>
  {
    const { styles } = context;

    if (styles !== null)
    {
      const path = `${ process.cwd() }/workshop/styles`;
      context.styles = stylus(styles).set('include', path).render();
    }
  }
);