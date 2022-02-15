/**
 * Init HTML components.
 */
import { fillingPlaceholders } from './fillingPlaceholders';
async function init(): Promise<void> {
  await fillingPlaceholders();
}
init();
