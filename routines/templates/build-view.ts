import { folders } from '~constants';
import { createTask, runTask } from '#gear:routines';
import { getTemplateId } from '#gear:templates';

/**
 * ?
 */
export default createTask(
  async (context) =>
  {
    context.id = getTemplateId(context.file);
    const content = await loadTemplateAsync(context.file);
    context.sections = parseSections(context.file, content);

    await runTask('templates/transform', context);

    console.log({ context });
  }
);

/**
 * ?
 */
async function loadTemplateAsync (file: string): Promise<string>
{
  return await Bun.file(`${ folders.templates }/${ file }`).text();
}

/**
 * ?
 */
function parseSections (file: string, template: string): Record<string, string | null>
{
  const sections = template.trim().split(/---\r?\n/);
  const result: Record<string, string | null> = { head: null, style: null, template: null };

  sections.forEach(
    (section) =>
    {
      const type = section.slice(0, section.indexOf('\n')).trim();

      if (/^@(head|style|template)$/.test(type))
      {
        result[type.slice(1)] = section.slice(section.indexOf('\n') + 1).trim();
      }
      else console.error(`Invalid section type "${ type }" in template "${ file }".`);
    }
  );

  return result;
}
