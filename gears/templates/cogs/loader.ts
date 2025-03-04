import type { CachedTemplate, CompiledTemplate } from '#type:templates';

/**
 * ?
 */
const cache = new Map<string, CachedTemplate>();

/**
 * ?
 */
export async function getCompiledTemplate (name: string): Promise<CompiledTemplate>
{
  if (!cache.has(name))
  {
    const template = await loadCompiledTemplate(name);
    cache.set(name, { accessed: 0, template });
  }

  cache.get(name)!.accessed = Date.now();
  return cache.get(name)!.template;
}

/**
 * ?
 */
async function loadCompiledTemplate (name: string): Promise<CompiledTemplate>
{
  //+ load the template function.

  //? print a warning and return a mock function if it doesn't exist.
}

/**
 * ?
 */

//+ add an interval to clear the cache of unused templates.