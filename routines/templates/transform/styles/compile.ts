import stylus from 'stylus';
import { createTask } from '#gear:routines';

import type { TemplateTransformContext } from '../../context';

/**
 * ?
 */
export default createTask<TemplateTransformContext>(
  async (context) =>
  {
    const { styles } = context.content;

    if (styles !== null)
    {
      const path = `${ process.cwd() }/workshop/styles`;
      context.content.styles = stylus(styles).set('include', path).render();
    }

    console.log('compile styles completed.');
  }
);