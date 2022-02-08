import { onAuthStateChanged } from 'firebase/auth';

import { authModal } from './Auth/AuthModal';
import { table } from './Table/Table';
import { navbar } from './Navbar/Navbar';
import { auth } from './firestore/init';

/**
 * Render page, if something updated.
 */
export async function render(): Promise<void> {
  const mainDiv = document.querySelector<HTMLDivElement>('.main');
  const authFormEl = document.querySelector<HTMLDivElement>('.auth');
  if (mainDiv !== null && authFormEl !== null) {
    await onAuthStateChanged(auth, user => {
      if (user) {
        mainDiv.appendChild(navbar());
        mainDiv.appendChild(table());
        authFormEl.innerHTML = '';
      } else {
        authFormEl.appendChild(authModal());
        mainDiv.innerHTML = '';
      }
    });
  }
}

render();
