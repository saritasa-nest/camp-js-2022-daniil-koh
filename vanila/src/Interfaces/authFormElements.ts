/**
 * Form interface for auth input elements.
 */
export interface authFormElements extends HTMLCollection {

  /**
   * Email input element.
   */
  emailElement: HTMLInputElement;

  /**
   * Password input element.
   */
  passwordElement: HTMLInputElement;
}
