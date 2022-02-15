import { initButtonListener } from '../edit/initButtonListener';

import { setDetails } from './fillingDetails';

/**
 * Init HTML components.
 */
async function init(): Promise<void> {
  initButtonListener();
  await setDetails();
}
init();
