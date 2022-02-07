import { logOut } from '../../firestore/firestoreOperations';

const TEMPLATE_EL = document.createElement('div');
TEMPLATE_EL.classList.add('container-fluid', 'navbar-fixed', 'navbar');
TEMPLATE_EL.innerHTML = `
  <nav class="blue-grey lighten-1">
  <div class="nav-wrapper">
  <div class="container-fluid" >
   <ul class="right hide-on-med-and-down links">
  </ul>
  </div>
  </div>
  </nav>`;

const LOGIN_LI_EL = document.createElement('li');
LOGIN_LI_EL.innerHTML = `<a href="#modal-auth" class="modal-trigger">Login</a>`;

const REG_LI_EL = document.createElement('li');
REG_LI_EL.innerHTML = `<a href="#modal-auth" class="modal-trigger">Register</a>`;

const LOG_OUT = document.createElement('li');
LOG_OUT.innerHTML = `<a href="" class="modal-trigger">Logout</a>`;

/**
 * Adding auth buttons to the navbar delete listener.
 */
export function setAuthNavbarButtons(): void {
  const links = TEMPLATE_EL.querySelector<HTMLLIElement>('.links');
  if (links !== null) {
    links.innerHTML = ``;
    links.append(LOGIN_LI_EL, REG_LI_EL);
    LOG_OUT.removeEventListener('click', logoutHandler);
  }
}

/**
 * Adding logout button and add event listener.
 */
export function setLogoutNavbarButtons(): void {
  const links = TEMPLATE_EL.querySelector<HTMLLIElement>('.links');
  if (links !== null) {
    links.innerHTML = ``;
    links.append(LOG_OUT);
    LOG_OUT.addEventListener('click', logoutHandler);
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
export const navbar = (): HTMLDivElement => TEMPLATE_EL;
