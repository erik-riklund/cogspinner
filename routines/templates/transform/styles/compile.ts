import stylus from 'stylus';
import { createTask } from '#gear:routines';

/**
 * ?
 */
export default createTask(
  async (context) =>
  {
    const sections = context.sections;
    const style: string = sections.style;

    sections.style = stylus(style).set('compress', true).render();
  }
);