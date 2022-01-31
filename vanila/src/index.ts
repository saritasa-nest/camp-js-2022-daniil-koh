import { authForm } from './Auth/AuthForm';
import { table } from './Table/Table';
import { navbar } from './Navbar/Navbar';

let authorization = false;

export const changeAuthStatus = (value: boolean): void => {
  authorization = value;
  render();
};
export const getAuthStatus = (): boolean => authorization;

/**
 * Render page, if something updated.
 */
function render(): void {
  const mainDiv: Element = document.getElementsByClassName('main')[0];
  const authFormEl: Element = document.getElementsByClassName('auth')[0];
  if (getAuthStatus()) {
    mainDiv.appendChild(navbar());
    mainDiv.appendChild(table());
    authFormEl.innerHTML = '';
  } else {
    authFormEl.innerHTML = authForm();
    for (let i = 0; i < mainDiv.children.length; i++) {
      const childElement: Element = <Element> mainDiv.children.item(i);
      if (childElement) {
        childElement.innerHTML = '';
      }
    }
  }
}

render();
