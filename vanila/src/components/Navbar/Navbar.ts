import { logOut } from '../../firestore/firestoreOperations';

const templateElement = document.createElement('div');
templateElement.classList.add('container-fluid', 'navbar-fixed', 'navbar');
templateElement.innerHTML = `
  <nav class="blue-grey lighten-1">
    <div class="nav-wrapper">
      <div class="container-fluid" >
        <ul class="right hide-on-med-and-down links">
        </ul>
      </div>
    </div>
  </nav>`;

const loginElement = document.createElement('li');
loginElement.innerHTML = `<a href="#modal-auth" class="modal-trigger">Login</a>`;

const regElement = document.createElement('li');
regElement.innerHTML = `<a href="#modal-auth" class="modal-trigger">Register</a>`;

const logOutElement = document.createElement('li');
logOutElement.innerHTML = `<a href="" class="modal-trigger">Logout</a>`;

/**
 * Adding auth buttons to the navbar delete listener.
 */
export function setAuthNavbarButtons(): void {
  const links = templateElement.querySelector<HTMLLIElement>('.links');
  if (links !== null) {
    links.innerHTML = ``;
    links.append(loginElement, regElement);
    logOutElement.removeEventListener('click', logoutHandler);
  }
}

/**
 * Adding logout button and add event listener.
 */
export function setLogoutNavbarButtons(): void {
  const links = templateElement.querySelector<HTMLLIElement>('.links');
  if (links !== null) {
    links.innerHTML = ``;
    links.append(logOutElement);
    logOutElement.addEventListener('click', logoutHandler);
  }
}

/**
 * Log out listen function.
 */
function logoutHandler(): void {
  logOut();
}

/**
 * Navbar component.
 */
export const navbar = (): HTMLDivElement => templateElement;
