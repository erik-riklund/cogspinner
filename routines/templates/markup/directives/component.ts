import { createTask } from '#gear:routines';
import { getTemplateId } from '#gear:templates';

import type { TemplateElement } from '../parse';

/**
 * ?
 */
export default createTask(
  async (context) =>
  {
    const element: TemplateElement = context.element;
    const directive = element.directive;

    if (directive.startsWith('$component|'))
    {
      const definition = directive.match(
        /^\$component\|((?:[\w-]+\/*)[\w-]+)(?:\s+\{(.*)\})?$/
      );

      if (Array.isArray(definition))
      {
        const [component, parameters] = definition.slice(1);
        const componentId = getTemplateId(`components/${ component }.cog`);
        const attributes = createAttributeList(parameters);

        console.log({ attributes });
        element.directive = !attributes.length ? `<${ componentId }>`
          : `<${ componentId } ${ attributes.join(' ') }>`;
      }
    }
  }
);

/**
 * ?
 */
function createAttributeList (parameters: string): string[]
{
  return ['todo!'];
}