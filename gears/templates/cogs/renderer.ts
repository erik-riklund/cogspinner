import { appSettings } from '~workshop/app.config';
import type { Context, Next } from 'hono';

/**
 * ?
 */
export async function viewRenderer (
  context: Context, next: Next): Promise<void>
{
  context.setRenderer(
    async (view) => context.html(renderDocument())
  );
  await next();
};

/**
 * ?
 */
function renderDocument (): string
{
  let document = [
    '<!DOCTYPE html>',
    `<html lang="${ appSettings.lang }">`,
    '<head>',
    `<meta charset="${ appSettings.charset }">`,
    '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
    `<title>${ appSettings.title } | Work in progress</title>`,
    '</head>',
    '<body>',
    '<h1>Work in progress</h1>',
    '</body>',
    '</html>'
  ];

  return document.join('\n');
}