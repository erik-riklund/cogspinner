import { createSequence } from '#gear:routines';

/**
 * Defines the task sequence that generates the router manifest.
 */
createSequence('router/create-manifest', [
  'router/find-route-files', 'router/prepare-route-list', 'router/save-manifest'
]);