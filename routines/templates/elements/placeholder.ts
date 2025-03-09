import { createTask } from '#gear:routines';
import type { ElementContext } from './types';

/**
 * Task to transform placeholder elements into Nunjucks block tags.
 */
export default createTask<ElementContext>(
  async (context) =>
  {
    const element = context.element;

    if (element.openingTag.startsWith('placeholder'))
    {
      const pattern = /^placeholder\s+"([\w-]+)":?$/;
      const match = element.openingTag.match(pattern);

      if (Array.isArray(match))
      {
        element.openingTag = `{% block ${ match[1] } %}`;
        element.closingTag = '{% endblock %}';
      }
    }
  }
);