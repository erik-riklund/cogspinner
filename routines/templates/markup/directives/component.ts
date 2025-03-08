import { parseExpressionAt } from 'acorn';
import { getTemplateId } from '#gear:templates';
import { createTask } from '#gear:routines';

import type { TemplateElement } from '../types';

/**
 * Processes component directives, converting them into template tags with attributes.
 */
export default createTask(
  async (context) =>
  {
    const element: TemplateElement = context.element;
    const directive = element.directive;

    if (directive.startsWith('$component|'))
    {
      const definition = directive.match(
        /^\$component\|((?:[\w-]+\/*)[\w-]+)(?:\s+(\{.*\}))?$/
      );

      if (Array.isArray(definition))
      {
        const [component, parameters] = definition.slice(1);
        const componentId = getTemplateId(`components/${ component }.cog`);
        const attributes = createAttributeList(parameters);

        element.directive = !attributes.length ? `<${ componentId }>`
          : `<${ componentId } ${ attributes.join(' ') }>`;
      }
    }
  }
);

/**
 * Creates a list of HTML attributes from a JavaScript object literal string.
 * 
 * @param parameters The string representation of a JavaScript object literal.
 * @returns An array of HTML attribute strings.
 */
export function createAttributeList (parameters: string): string[]
{
  const attributes: string[] = [];
  const tree = parseExpressionAt(
    parameters, 0, { ecmaVersion: 'latest' }
  );

  Object.entries<any>(
    (tree as any).properties).map(
      ([_, property]) =>
      {
        const node = property.value;
        const key = property.key.name;

        switch (node.type)
        {
          case 'Identifier':
            attributes.push(`${ key }="\${this.${ node.name }}"`);
            break;

          case 'Literal':
            const type = typeof node.value;

            let prefix = type === 'boolean' ? '?' : '';
            let value = type === 'boolean' ? node.raw :
              /^["']/.test(node.raw) ? node.value : node.raw;

            attributes.push(`${ prefix }${ key }="${ value }"`);
            break;
        }
      }
    );

  return attributes;
}