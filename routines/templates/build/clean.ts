import { createTask } from '#gear:routines';

/**
 * ?
 */
export default createTask(
  async (context) =>
  {
    console.log('cleaning >', context.file);
  }
);