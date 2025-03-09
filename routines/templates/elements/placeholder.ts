import { createTask } from '#gear:routines';
import type { ElementContext } from '../translate-body';

/**
 * ?
 */
export default createTask<ElementContext>(
  async (context) =>
  {
    const { index, lines } = context;
    const line = lines[index];

    if (line.startsWith('<cog-placeholder'))
    {
      const match = line.match(/^<cog-placeholder\s+name="([\w\/\-]+)"\s*\/>/);

      if (Array.isArray(match))
      {
        lines[index] = `{% block ${ match[1] } %}{% endblock %}`;
      }
    }
  }
);