import { folders } from '~constants';
import { getTemplateId } from '#gear:templates';

import { createTask, createParallel, createSequence, runTask } from '#gear:routines';

/**
 * ?
 */
export default createTask(
  async (context) =>
  {
    console.log('building >', context.file);
    context.id = getTemplateId(context.file);

    await runTask('templates/loader', context);
    await runTask('templates/transform', context);
    await runTask('templates/compile', context);

    //+ save styles and head elements.

    Bun.file(`${ folders.artifacts }/templates/${ context.id }.ts`).write(context.result);
  }
);

/**
 * ?
 */
createParallel(
  'templates/transform',
  [
    'templates/styles',
    'templates/markup'
  ]
);

/**
 * ?
 */
createSequence(
  'templates/styles',
  [
    'templates/styles/compile'
  ]
);

/**
 * ?
 */
createSequence(
  'templates/markup',
  [
    'templates/markup/parse',
    'templates/markup/transform'
  ]
);