import CleanCSS from 'clean-css';
import { useRenderContext } from './context';
import { getCompiledTemplate } from './loader';

import type { Context, Next } from 'hono';
import type { RenderContext } from '../types';

/**
 * ?
 */
export async function viewRenderer (
  context: Context, next: Next): Promise<void>
{
  context.setRenderer(
    async (view) => 
    {
      const renderContext = useRenderContext();
      const template = await getCompiledTemplate(`views/${ await view }`);
      const content = await template(renderContext, {});

      //+ implement cache?

      return context.html(renderDocument(renderContext, content));
    }
  );
  await next();
};

/**
 * ?
 */
function renderDocument (context: RenderContext, content: string): string
{
  const css = new CleanCSS({ level: 2 });
  const styles = Object.values(context.styles).join('');
  const elements = Object.values(context.head).join('');

  let document = [
    '<!DOCTYPE html>',
    `<html lang="${ context.lang }">`,
    '<head>',
    `<title>${ context.title }</title>`,
    elements,
    '<style>',
    css.minify(styles).styles,
    '</style>',
    '</head>',
    '<body>',
    content,
    '</body>',
    '</html>'
  ];

  return document.join('\n');
}