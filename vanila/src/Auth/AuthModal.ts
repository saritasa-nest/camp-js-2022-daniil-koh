import { signIn } from '../firestore/firestoreOperations';
import { render } from '../index';

const TEMPLATE_EL = document.createElement('div');
TEMPLATE_EL.className = 'container';
TEMPLATE_EL.innerHTML = `
              <div class="z-depth-1 grey lighten-4 row auth-box">
                <form class="col s12 auth-form" method="post" >
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
                    <button type='submit' name='btn_login' class='col s12 btn btn-large waves-effect indigo'>Login
                    </button>
                  </div>
                </form>
              </div>
          `;

export const authModal: Function = (): Element => {
  TEMPLATE_EL.addEventListener('submit', onFormSubmit);

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
