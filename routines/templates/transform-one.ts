import { existsSync } from 'fs';
import { folders } from '~constants';
import { getTemplateId } from '#gear:templates';

import { createTask, createParallel, createSequence, runTask } from '#gear:routines';

/**
 * Defines a task for parallel execution of tasks for transforming a template.
 */
createParallel('template/transform', ['template/styles', 'template/markup']);

/**
 * Defines a sequence of tasks to handle styles within a template.
 */
createSequence('template/styles', ['templates/styles/compile']);

/**
 * Defines a sequence of tasks to transform markup within a template.
 */
createSequence('template/markup', [
  'templates/markup/parse', 'templates/markup/transform'
]);

/**
 * Transforms a single template file into an executeable function.
 */
export default createTask(
  async (context) =>
  {
    const { file } = context;
    context.id = getTemplateId(file);
    const filePath = `${ folders.templates }/${ file }`;

    if (existsSync(filePath))
    {
      const template = await loadTemplate(filePath);
      context.sections = getSections(file, template);

      context.result = {
        style: null,
        head: context.sections.head ?? null,
        template: null
      };

      await runTask('template/transform', context);

      console.log({ tree: context.tree });
    }
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
  return await Bun.file(file).text();
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
  const result: Record<string, string> = {};
  const sections = template.split(/-{3}\r?\n/);

  for (const section of sections.map(s => s.trim()))
  {
    if (validateSection(file, section))
    {
      const [type, content] = getSectionParts(section);

      if (validateSectionType(file, type)) result[type] = content;
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
  const isValid = section.startsWith('@style') ||
    section.startsWith('@head') || section.startsWith('@template');

  if (!isValid)
  {
    console.error(
      `Invalid section in template "${ file }":\n${ section }`,
    );
    console.error(
      'Sections must start with a type declaration: "@style", "@head" or "@template".'
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
  const type = section.slice(1, section.indexOf('\n')).trim();
  const content = section.slice(section.indexOf('\n') + 1).trim();

  return [type, content];
}