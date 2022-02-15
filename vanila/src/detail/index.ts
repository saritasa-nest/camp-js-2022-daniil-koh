import { setDetails } from './fillingDetails';
import {initButtonListener} from "../edit/initButtonListener";
/**
 * Init HTML components.
 */
async function init(): Promise<void> {
  initButtonListener();
  await setDetails();
}
init();
