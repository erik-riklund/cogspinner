import { existsSync } from 'fs';
import { folders } from '~constants';
import { createTask, runTask } from '#gear:routines';
import { getTemplateId } from '#gear:templates';

import type { TemplateTransformContext } from '../context';

/**
 * ?
 */
export default createTask<TemplateTransformContext>(
  async (context) =>
  {
    if (existsSync(`${ folders.templates }/${ context.file }`))
    {
      runTask('templates/transform-one', context);
    }
    else
    {
      const templateId = getTemplateId(context.file);
      const outputFile = `${ folders.artifacts }/templates/${ templateId }.ts`;

      if (existsSync(outputFile))
        runTask('templates/transform/delete-output', { file: outputFile });
    }
  }
);