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

    if (line.startsWith('<cog-position'))
    {
      const match = line.match(/^<cog-position\s+name="([\w\/\-]+)">/);

      if (Array.isArray(match))
      {
        lines[index] = `{% block ${ match[1] } %}`;
      }
    }
    else if (line === '</cog-position>')
    {
      lines[index] = '{% endblock %}';
    }
  }
);