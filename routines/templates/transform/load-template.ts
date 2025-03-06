import { folders } from '~constants';
import { createTask } from '#gear:routines';
import { getTemplateId } from '#gear:templates';

import type { TemplateTransformContext } from '../context';

/**
 * This task reads the template file, splits it into sections based on '---',
 * validates each section, and then assigns the content of each section to the
 * corresponding context property.
 */
export default createTask<TemplateTransformContext>(
  async (context) =>
  {
    context.id = getTemplateId(context.file);

    const reader = Bun.file(`${ folders.templates }/${ context.file }`);
    const sections = (await reader.text()).split(/---\r?\n/);

    for (const section of sections.map(s => s.trim()))
    {
      if (validateSection(context.file, section))
      {
        const [type, content] = getSectionParts(section);

        if (validateSectionType(context.file, type))
        {
          context[type as 'head' | 'style' | 'template'] =
            content.trim().length > 0 ? content : null;
        }
      }
    }

    context.head = context.head ?? null;
    context.style = context.style ?? null;
    context.template = context.template ?? null;
  }
);

/**
 * Validates that a section starts with a valid type declaration.
 * If the section is invalid, it logs an error message to the console.
 * 
 * @param file - The name of the template file.
 * @param section - The section to validate.
 * @returns `true` if the section is valid, `false` otherwise.
 */
function validateSection (file: string, section: string): boolean
{
  if (!section.startsWith('@'))
  {
    console.error(
      `Invalid section in template "${ file }":\n${ section }`,
    );
    console.error(
      'Sections must start with a type declaration: "@style:", "@head:" or "@template:".'
    );

    return false;
  }

  return true;
}

/**
 * Validates that a section type is one of the allowed types.
 * If the type is invalid, it logs an error message to the console.
 * 
 * @param file - The name of the template file.
 * @param type - The type to validate.
 * @returns `true` if the type is valid, `false` otherwise.
 */
function validateSectionType (file: string, type: string): boolean
{
  const validTypes = ['style', 'head', 'template'];

  if (!validTypes.includes(type))
  {
    console.error(
      `Invalid section type '${ type }' in template "${ file }".`,
      `Valid types: ${ validTypes.join(', ') }`
    );
  }

  return true;
}

/**
 * Extracts the type and content from a section string.
 * 
 * @param section - The section string to extract the type and content from.
 * @returns A tuple containing the type and content of the section.
 */
function getSectionParts (section: string): [type: string, content: string]
{
  const type = section.slice(1, section.indexOf(':'));
  const content = section.slice(section.indexOf(':') + 1).trim();

  return [type, content];
}