import { logIn } from '../../firestore/firestoreOperations';
import { render } from '../../index';
import { authFormElements } from '../../Interfaces/authFormElements';

const TEMPLATE_EL = document.createElement('div');
TEMPLATE_EL.classList.add('modal');
TEMPLATE_EL.id = 'modal-auth';
TEMPLATE_EL.innerHTML =
  `<div class="modal-content">
      <form class="col s12 auth-form" method="post">
        <div class='row'>
          <div class='col s12'>
          </div>
        </div>
        <div class='row'>
          <div class='input-field col s12'>
            <input class='validate' type='email' name='email' id='email'/>
            <label for='email'>Enter your email</label>
          </div>
        </div>
        <div class="row">
          <div class='input-field col s12'>
            <input class='validate' type='password' name='password' id='password'/>
            <label for='password'>Enter your password</label>
          </div>
        </div>
        <br/>
        <div class='row'>
          <div class='col s10'></div>
          <button type='submit' name='btn_login' class='col s2 btn btn-large waves-effect blue-grey lighten-1'>Login</button>
        </div>
      </form>
    </div>`;

/**
 * Sign in to the website.
 * @param event Clicking on btn.
 */
function onFormSubmit(event: Event): void {
  event.preventDefault();
  if (event.target !== null) {
    const authForm = TEMPLATE_EL.querySelector<HTMLFormElement>('.auth-form');

    if (authForm !== null) {
      const { email, password } = <authFormElements>authForm.elements;

      // TODO get error if user not auth.
      logIn(email.value, password.value).then(() => render());
    }
  }
}

/**
 * Init materialize css for modal.
 */
function initStyles(): void {
  M.Modal.init(TEMPLATE_EL);
}

export const authModal = (): HTMLDivElement => {
  TEMPLATE_EL.addEventListener('submit', onFormSubmit);
  initStyles();
  return TEMPLATE_EL;
};