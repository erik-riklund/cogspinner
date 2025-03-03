import { createSequence } from '#gear:routines';

/**
 * ?
 */
export default createSequence(
  'templates/create-manifest',
  [
    'templates/manifest/get-files',
    'templates/manifest/save-result'
  ]
);