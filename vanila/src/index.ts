import { onAuthStateChanged } from 'firebase/auth';

import { authModal } from './Auth/AuthModal';
import { table } from './Table/Table';
import { navbar } from './Navbar/Navbar';
import { auth } from './firestore/init';

/**
 * Render page, if something updated.
 */
export async function render(): Promise<void> {
  const mainDiv: Element = document.getElementsByClassName('main')[0];
  const authFormEl: Element = document.getElementsByClassName('auth')[0];
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

render();
