import { authModal } from './Auth/AuthModal';
import { table } from './Table/Table';
import { navbar } from './Navbar/Navbar';
import {auth } from './firestore'
import { onAuthStateChanged } from 'firebase/auth';

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
      authFormEl.innerHTML = authModal();
      for (let i = 0; i < mainDiv.children.length; i++) {
        const childElement: Element = <Element>mainDiv.children.item(i);
        if (childElement) {
          childElement.innerHTML = '';
        }
      }
    }
  })
}

render();
