import { fillingPlaceholders } from './fillingPlaceholders';

/**
 * Init HTML components.
 */
async function init(): Promise<void> {
  await fillingPlaceholders();
}
init();
