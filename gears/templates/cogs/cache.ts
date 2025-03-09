import { watch } from 'fs';
import { folders } from '~constants';

import type { TemplateCache, TemplateData } from '../types';

/**
 * Cache to store template metadata (head injections, styles and dependencies).
 */
const cache: TemplateCache = {};

/**
 * Loads template metadata from cache or file, and recursively fetches dependencies.
 * 
 * @param id The ID of the template.
 * @returns The template data object.
 */
export async function getTemplateData (id: string): Promise<TemplateData>
{
  if (!cache[id]) await loadTemplateMetadata(id);

  const data: TemplateData = { head: {}, style: {} };
  await getTemplateDependencies(id, data);

  return data;
}

/**
 * Recursively retrieves template dependencies and adds them to the data object.
 * It traverses the dependency tree, adding head and style information for each dependent template.
 * 
 * @param id The ID of the template.
 * @param data The data object to populate with dependencies.
 * @returns A promise that resolves when all dependencies have been processed.
 */
async function getTemplateDependencies (id: string, data: TemplateData): Promise<void>
{
  if (!cache[id]) await loadTemplateMetadata(id);

  if (cache[id].head) data.head[id] = cache[id].head;
  if (cache[id].style) data.style[id] = cache[id].style;

  await Promise.allSettled(
    cache[id].dependencies.map(
      dependency => getTemplateDependencies(dependency, data)
    )
  );
}

/**
 * Loads template metadata from a JSON file and stores it in the cache.
 * 
 * @param id The ID of the template.
 * @returns A promise that resolves when the metadata has been loaded.
 */
export async function loadTemplateMetadata (id: string): Promise<void>
{
  cache[id] = JSON.parse(
    await Bun.file(`${ folders.artifacts }/templates/${ id }.json`).text()
  );
}

/**
 * Watches the template metadata directory for changes and invalidates the cache.
 */
watch(
  `${ folders.artifacts }/templates`, { recursive: true },

  (_, file) =>
  {
    if (file?.endsWith('.json'))
      delete cache[file.slice(0, file.indexOf('.'))];
  }
);