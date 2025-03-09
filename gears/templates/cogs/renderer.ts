import CleanCSS from 'clean-css';
import { minify } from 'html-minifier';
import { configure } from 'nunjucks';

import { getTemplateId } from '#gear:templates';
import { folders, isDevelopment } from '~constants';
import { appSettings } from '~workshop/app.config';
import { getTemplateData } from '#gear:templates';

import type { Context, Next } from 'hono';

/**
 * Configures the Nunjucks templating engine.
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
 * Configures the CSS optimizer.
 */
const optimizer = new CleanCSS({ level: 2 });

/**
 * Middleware for rendering views using Nunjucks and HTML minification.
 */
export async function viewRenderer (
  context: Context, next: Next): Promise<void>
{
  context.set('context', {});

  context.setRenderer(
    async (view) => context.html(
      await renderDocument(await view, context.get('context'))
    )
  );
  await next();
};

/**
 * Renders a document using Nunjucks, including head and style
 * dependencies, and minifies the output.
 * 
 * @param view The view name to render.
 * @param context The context object to pass to the Nunjucks template.
 * @returns The rendered and minified HTML document.
 */
async function renderDocument (
  view: string, context: Record<string, any>): Promise<string>
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
    '<script src="https://unpkg.com/htmx.org@2.0.4" integrity="sha384-HGfztofotfshcF7+8n' +
    '44JQL2oJmowVChPTg48S+jvZoztPfvwD79OC/LTtG6dMp+" crossorigin="anonymous"></script>',
    `<title>${ appSettings.title } | Work in progress</title>`,
    ...Object.values(data.head).map(content => content),
    '<style>', stylesheet.styles, '</style>',
    '</head>',
    '<body>',
    engine.render(`${ id }.njk`, context),
    '</body>',
    '</html>'
  ];

  return minify(
    document.join('\n'),
    {
      minifyCSS: true,
      collapseWhitespace: true,
      preserveLineBreaks: true,
      keepClosingSlash: true
    }
  );
}