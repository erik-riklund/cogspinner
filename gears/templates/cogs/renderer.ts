import CleanCSS from 'clean-css';
import { minify } from 'html-minifier';
import { configure } from 'nunjucks';

import { getTemplateId } from '#gear:templates';
import { folders, isDevelopment } from '~constants';
import { appSettings } from '~workshop/app.config';
import { getTemplateData } from '#gear:templates';

import type { Context, Next } from 'hono';

/**
 * ?
 */
const engine = configure(
  `${ folders.artifacts }/templates`,
  {
    autoescape: false,
    noCache: isDevelopment,
    watch: isDevelopment
  }
);

/**
 * ?
 */
const optimizer = new CleanCSS({ level: 2 });

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
  const id = getTemplateId(`views/${ view }.cog`);
  const data = await getTemplateData(id);

  const stylesheet = optimizer.minify(
    Object.values(data.style).join('')
  );

  let document = [
    '<!DOCTYPE html>',
    `<html lang="${ appSettings.lang }">`,
    '<head>',
    `<meta charset="${ appSettings.charset }">`,
    '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
    `<title>${ appSettings.title } | Work in progress</title>`,
    ...Object.values(data.head).map(content => content),
    '<style>', stylesheet.styles, '</style>',
    '</head>',
    '<body>',
    engine.render(`${ id }.njk`, {}),
    '</body>',
    '</html>'
  ];

  return minify(document.join('\n'),
    {
      minifyCSS: true,
      collapseWhitespace: true,
      preserveLineBreaks: true,
      keepClosingSlash: true
    }
  );
}