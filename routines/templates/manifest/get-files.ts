import { Glob } from 'bun';
import { folders } from '~constants';
import { getTemplateId } from '#gear:templates';
import { createTask } from '#gear:routines';

import type { CreateManifestContext } from '../context';

/**
 * ?
 */
export default createTask<CreateManifestContext>(
  async (context) =>
  {
    context.templates = [];
    const glob = new Glob('**/*.cog');

    for await (const file of glob.scan(folders.templates))
    {
      const templateId = getTemplateId(file.replaceAll('\\', '/'));
      context.templates.push(
        { id: templateId, name: file.replaceAll('\\', '/').slice(0, file.lastIndexOf('.')) }
      );
    }
  }
);