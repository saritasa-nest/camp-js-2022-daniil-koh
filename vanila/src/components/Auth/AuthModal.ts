import { signIn } from '../../firestore/firestoreOperations';
import { render } from '../../index';

const TEMPLATE_EL = document.createElement('div');
TEMPLATE_EL.className = 'modal';
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

export const authModal: Function = (): Element => {
  TEMPLATE_EL.addEventListener('submit', onFormSubmit);
  initStyles();
  return getElement();

  /**
   * Sign in to the website.
   * @param event Clicking on btn.
   */
  async function onFormSubmit(event: Event): Promise<void> {
    event.preventDefault();
    if (event.target !== null) {
      const authForm: Element = (<Element> TEMPLATE_EL.querySelector('.auth-form'));

        // @ts-ignore
        const { emailElement, passwordElement } = (<HTMLFormElement> authForm).elements;
          await signIn(emailElement.value, passwordElement.value).then(() => render());
          }
          }

          /**
           * Return Auth modal element.
           */
          function getElement(): Element {
            return TEMPLATE_EL;
          }

          };

/**
 * Init materialize css for modal.
 */
function initStyles(): void {
  M.Modal.init(TEMPLATE_EL);
}
