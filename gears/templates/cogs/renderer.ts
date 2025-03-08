import { folders } from '~constants';
import { getTemplateId } from '#gear:templates';
import { appSettings } from '~workshop/app.config';

import type { Context, Next } from 'hono';

/**
 * ?
 */
export async function viewRenderer (
  context: Context, next: Next): Promise<void>
{
  context.setRenderer(
    async (view) => context.html(
      await renderDocument(await view)
    )
  );
  await next();
};

/**
 * ?
 */
async function renderDocument (view: string): Promise<string>
{
  const templateId = getTemplateId(`views/${ view }.cog`);

  let document = [
    '<!DOCTYPE html>',
    `<html lang="${ appSettings.lang }">`,
    '<head>',
    `<meta charset="${ appSettings.charset }">`,
    '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
    `<title>${ appSettings.title } | Work in progress</title>`,
    '</head>',
    '<body>',
    await renderView(templateId),
    '</body>',
    '</html>'
  ];

  return document.join('\n');
}

/**
 * ?
 */
async function renderView (id: string): Promise<string>
{
  return 'Work in progress...';
}