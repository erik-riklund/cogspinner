import { createTask, runTask } from '#gear:routines';

import type { TemplateTransformContext } from '../../context';

/**
 * ?
 */
export default createTask<TemplateTransformContext>(
  async (context) =>
  {
    await runTask('templates/transform/markup/parse-directives', context);
    console.log(Bun.inspect(context.tree, { colors: true }));
  }
);

/**
 * ?
 */
