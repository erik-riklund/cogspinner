import { useRenderContext } from './context';
import { getCompiledTemplate } from './loader';

import type { Context, Next } from 'hono';

/**
 * ?
 */
export async function viewRenderer (
  context: Context, next: Next): Promise<void>
{
  context.set('renderContext', useRenderContext());
  context.setRenderer(
    async (view) => context.html(renderDocument(await view))
  );

  await next();
};

/**
 * ?
 */
function renderDocument (view: string): string
{
  return 'not done yet.';
}