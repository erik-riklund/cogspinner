import { createTask } from '#gear:routines';
import { getTemplateId } from '#gear:templates';

import type { TemplateElement } from '../parse';

/**
 * Task to process layout directives, replacing them with the corresponding layout template ID.
 * It identifies layout directives in the form '$layout|layoutName'.
 */
export default createTask(
  async (context) =>
  {
    const element: TemplateElement = context.element;
    const directive = element.directive;

    if (directive.startsWith('$layout|'))
    {
      const [layout] = directive.replace(/:$/, '').split('|').slice(1);
      const layoutId = getTemplateId(`layouts/${ layout }.cog`);

      element.directive = `<${ layoutId }>`;
    }
  }
);