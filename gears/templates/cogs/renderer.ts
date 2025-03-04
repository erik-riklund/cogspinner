import { getCompiledTemplate } from './loader';

import type { Context, Next } from 'hono';
import type { RenderingContext } from '#type:templates';

/**
 * This function is a middleware for the Hono framework that enables rendering views
 * using compiled templates. It sets up a context object and a custom renderer function
 * that retrieves and executes compiled templates based on the provided view name.
 *
 * @param context The Hono context object.
 * @param next The next middleware function in the chain.
 */
export async function viewRenderer (
  context: Context, next: Next): Promise<void>
{
  /**
   * ?
   */
  context.setRenderer(
    async (view) =>
    {
      const renderContext: RenderingContext = { styles: [] };
      const [template, stylesheet] = await getCompiledTemplate(`views/${ view }`);

      if (stylesheet !== null) renderContext.styles.push(stylesheet);

      context.set('context', renderContext);
      return context.html(template(context.get('context')));
    }
  );

  await next();
};