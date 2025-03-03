import { createParallel, createSequence } from '#gear:routines';

/**
 * ?
 */
createSequence(
  'templates/transform-one',
  [
    'templates/transform/load-template',
    'templates/transform/process-content',
    'templates/transform/compile-template',
    'templates/transform/save-result'
  ]
);

/**
 * ?
 */
createParallel(
  'templates/transform/process-content',
  [
    'templates/transform/handle-styles',
    'templates/transform/handle-markup'
  ]
);

/**
 * ?
 */
createSequence(
  'templates/transform/handle-styles',
  [
    'templates/transform/styles/compile'
  ]
);

/**
 * ?
 */
createSequence(
  'templates/transform/handle-markup',
  [
    'templates/transform/markup/create-nodes',
    'templates/transform/markup/process-tree'
  ]
);