import { createTask } from '#gear:routines';
import { getTemplateId } from '#gear:templates';

import type { TemplateTransformContext } from '../context';

/**
 * ?
 */
export default createTask<TemplateTransformContext>(
  async (context) =>
  {
    /**
     * ?
     */
    context.id = getTemplateId(context.file);

    /**
     * ?
     */
    const reader = Bun.file(
      `${ process.cwd() }/workshop/templates/${ context.file }`
    );
    const [styles, markup] = (await reader.text()).split(/---\r?\n/);

    /**
     * ?
     */
    context.styles = (styles && markup) ? styles.trim() : null;
    context.content = ((styles && markup) ? markup : styles).trim().split(/\r?\n/);
  }
);