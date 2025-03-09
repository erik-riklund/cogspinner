import { watch } from 'fs';
import { folders } from '~constants';

import type { TemplateCache, TemplateData } from '../types';

/**
 * ?
 */
const cache: TemplateCache = {};

/**
 * ?
 */
export async function getTemplateData (id: string): Promise<TemplateData>
{
  if (!cache[id]) await loadTemplateMetadata(id);

  const data: TemplateData = { head: {}, style: {} };
  await getTemplateDependencies(id, data);

  return data;
}

/**
 * ?
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
 * ?
 */
export async function loadTemplateMetadata (id: string): Promise<void>
{
  cache[id] = JSON.parse(
    await Bun.file(`${ folders.artifacts }/templates/${ id }.json`).text()
  );
}

/**
 * ?
 */
watch(
  `${ folders.artifacts }/templates`, { recursive: true },

  (event, file) =>
  {
    if (file?.endsWith('.json'))
      delete cache[file.slice(0, file.indexOf('.'))];
  }
);