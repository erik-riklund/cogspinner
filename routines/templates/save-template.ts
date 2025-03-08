import { folders } from '~constants';
import { createTask } from '#gear:routines';

/**
 * Takes the compilation result, extracts the head, styles, and template,
 * and writes them to separate files in the artifacts directory.
 */
export default createTask(
  async (context) =>
  {
    const { result } = context;
    const targetFolder = `${ folders.artifacts }/${ context.id }`;

    console.log(context);

    // if (result.head !== null)
    //   Bun.write(`${ targetFolder }/head.html`, result.head);
    // if (result.style !== null)
    //   Bun.write(`${ targetFolder }/styles.css`, result.style);

    // Bun.write(`${ targetFolder }/template.ts`, result.template.join('\n'));
  }
);