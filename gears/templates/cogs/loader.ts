import { existsSync } from 'fs';
import { folders } from '~constants';
import { filterObject } from '#gear:helpers';
import { getTemplateId } from '#gear:templates';

import type { CompiledTemplate, TemplateCache } from '#type:templates';

/**
 * Stores compiled templates, keyed by their names. Each entry contains the compiled template function
 * and the last access timestamp. It optimizes template retrieval by avoiding redundant loading.
 */
let cache: TemplateCache = {};

/**
 * Defines the duration (in milliseconds) for which a cached template remains valid after its last access.
 * Templates accessed within this time frame are considered active and are not removed during cleanup.
 */
const cacheLifetime = 3600000; // 1 hour in milliseconds

/**
 * Specifies the frequency (in milliseconds) at which the cache is scanned for unused templates. Templates
 * that have not been accessed for longer than `cacheLifetime` are removed during this process.
 */
const cacheCleanupInterval = 600000; // 10 minutes in milliseconds

/**
 * Retrieves a compiled template by its name. If the template is already in the cache, it returns the cached
 * version and updates its access time. If not, it loads the template, stores it in the cache, and then returns it.
 *
 * @param name The name of the template to retrieve.
 * @returns A `Promise` that resolves to the compiled template function.
 */
export async function getCompiledTemplate (name: string): Promise<[CompiledTemplate, string | null]>
{
  if (!cache[name])
  {
    const [template, stylesheet] = await loadCompiledTemplate(name);
    cache[name] = { accessed: 0, template, stylesheet };
  }

  cache[name].accessed = Date.now();
  return [cache[name].template, cache[name].stylesheet];
}

/**
 * Loads a compiled template from the artifacts directory. If the template file does not exist, a placeholder
 * function is returned, which indicates that the template was not found.
 *
 * @param name The name of the template to load.
 * @returns A `Promise` that resolves to the template function and its stylesheet, if any.
 */
async function loadCompiledTemplate (name: string): Promise<[CompiledTemplate, string | null]>
{
  const templateId = getTemplateId(`${ name }.cog`);

  const artifact = `${ folders.artifacts }/templates/${ templateId }.ts`;
  const template = existsSync(artifact) ? (await import(artifact)).default
    : (() => `The template "${ name }" does not exist.`);

  const stylesheet = await loadStylesheet(templateId);
  return [template as CompiledTemplate, stylesheet];
}

/**
 * ?
 */
async function loadStylesheet (templateId: string): Promise<string | null>
{
  const styles = `${ folders.artifacts }/stylesheets/${ templateId }.css`;
  return existsSync(styles) ? await Bun.file(styles).text() : null;
}

/**
 * Scans the cache and removes templates that have not been accessed within the `cacheLifetime`. This function
 * is called periodically by the cleanup interval to maintain the cache's efficiency.
 */
function clearUnusedTemplates (): void
{
  const currentTime = Date.now();

  cache = filterObject(cache, (_, value) =>
    currentTime - value.accessed < cacheLifetime
  );
}


/**
 * Initiates the cache cleanup process. It runs at intervals defined by `cacheCleanupInterval`,
 * ensuring that the cache remains up-to-date and efficient.
 */
setInterval(() => clearUnusedTemplates(), cacheCleanupInterval);