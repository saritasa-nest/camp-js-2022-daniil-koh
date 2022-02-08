import { onAuthStateChanged } from 'firebase/auth';

import { navbar, setAuthNavbarButtons, setLogoutNavbarButtons } from './components/Navbar/Navbar';
import { auth } from './firestore/init';
import { searchSpace } from './components/SearchAndSortSection/SearchSpace';
import { tableArea } from './components/Table/TableArea';
import { authModal } from './components/Auth/AuthModal';
import { changeAuthTableStatus } from './components/Table/Table';

/**
 * Render page, if something updated.
 */
export async function render(): Promise<void> {
  const mainDiv = document.querySelector<HTMLDivElement>('.main');
  if (mainDiv !== null) {
    mainDiv.innerHTML = '';
    await onAuthStateChanged(auth, user => {
      mainDiv.append(navbar(), searchSpace(), tableArea());
      if (user) {
        changeAuthTableStatus(true);
        if (mainDiv.contains(authModal())) {
          mainDiv.removeChild(authModal());
        }
        setLogoutNavbarButtons();
      } else {
        changeAuthTableStatus(false);
        mainDiv.append(authModal());
        setAuthNavbarButtons();
      }
    });
  }
}

render();
