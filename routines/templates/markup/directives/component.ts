import { createTask } from '#gear:routines';
import { getTemplateId } from '#gear:templates';

import type { TemplateElement } from '../types';

/**
 * ?
 */
export default createTask(
  async (context) =>
  {
    const element: TemplateElement = context.element;
    const directive = element.directive;

    if (directive.startsWith('<cog-component'))
    {
      element.directive = 'COMPONENT';
    }
  }
);