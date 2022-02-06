import { onAuthStateChanged } from 'firebase/auth';

import { authModal } from './components/Auth/AuthModal';
import { table } from './components/Table/Table';
import { navbar } from './components/Navbar/Navbar';
import { auth } from './firestore/init';
import { searchSpace } from './components/SearchAndSortSection/SearchSpace';

/**
 * Render page, if something updated.
 */
export async function render(): Promise<void> {
  const mainDiv: Element = document.getElementsByClassName('main')[0];
  await onAuthStateChanged(auth, user => {
    const navbarElement: Element = navbar();
    const tableElement: HTMLTableElement = table();
    const searchSpaceElement: HTMLDivElement = searchSpace();
      mainDiv.append(navbarElement, searchSpaceElement, tableElement);
    if (user) {
      mainDiv.append(authModal());
    } else {
      mainDiv.innerHTML = '';
    }
  });
}

render();
