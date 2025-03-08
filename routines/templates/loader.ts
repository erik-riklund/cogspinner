import { folders } from '~constants';
import { createTask } from '#gear:routines';

/**
 * ?
 */
export default createTask(
  async (context) =>
  {
    const template = await loadTemplate(context.file);
    const sections = getSections(context.file, template);

    context.sections = {
      head: null, style: null, template: null, ...sections
    };
  }
);

/**
 * Loads the content of a template file as a string.
 * 
 * @param file - The path to the template file.
 * @returns A `Promise` that resolves to the file's content as a string.
 */
async function loadTemplate (file: string): Promise<string>
{
  return await Bun.file(`${ folders.templates }/${ file }`).text();
}

/**
 * Extracts the sections from a template string.
 *
 * @param file - The name of the template file.
 * @param template - The template content string.
 * @returns An object containing the extracted sections, keyed by their type.
 */
function getSections (file: string, template: string): Record<string, string>
{
  const result: Record<string, any> = {};
  const sections = template.split(/---\r?\n/);

  for (const section of sections.map(s => s.trim()))
  {
    if (validateSection(file, section))
    {
      const [type, content] = getSectionParts(section);

      if (validateSectionType(file, type))
      {
        if (/^template\s+\[/.test(type))
        {
          result.properties = {};
          console.log('parsing properties...');

          result[type] = content.slice(content.indexOf(']') + 1);
        }
        else result[type] = content;
      }
    }
  }

  return result;
}

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
  const isValid = section.startsWith('[style]') ||
    section.startsWith('[head]') || section.startsWith('[template]');

  if (!isValid)
  {
    console.error(
      `Invalid section in template "${ file }":\n${ section }`,
    );
    console.error(
      'Sections must start with a type declaration: [style], [head] or [template].'
    );
  }

  return isValid;
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

  if (!validTypes.includes(type) && !/^template\s+\[/.test(type))
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
  const type = section.slice(1, section.indexOf(']')).trim();
  const content = section.slice(section.indexOf(']') + 1).trim();

  return [type, content];
}