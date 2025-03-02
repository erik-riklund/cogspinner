import { createSequence } from '#gear:routines';

/**
 * ?
 */
createSequence('router/create-manifest', [
  'router/find-route-files',
  'router/prepare-route-list',
  'router/save-manifest'
]);