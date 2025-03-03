import { createTask } from '#gear:routines';
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
    const reader = Bun.file(
      `${ process.cwd() }/workshop/templates/${ context.file }`
    );
    const [styles, markup] = (await reader.text()).split(/---\r?\n/);

    /**
     * ?
     */
    context.styles = (styles && markup) ? styles.trim() : null;
    context.structure = (styles && markup) ? markup : styles.trim();
  }
);