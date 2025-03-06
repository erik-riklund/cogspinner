import { createParallel, createSequence } from '#gear:routines';

/**
 * ?
 */
createParallel(
  'templates/transform',
  [
    'templates/transform-styles'
  ]
);

/**
 * ?
 */
createSequence(
  'templates/transform-styles',
  [
    'templates/transform/styles/compile'
  ]
);