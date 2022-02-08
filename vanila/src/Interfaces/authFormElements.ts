/**
 * Form interface for auth input elements.
 */
export interface AuthFormElements extends HTMLCollection {

  /**
   * Email input element.
   */
  readonly email: HTMLInputElement;

  /**
   * Password input element.
   */
  readonly password: HTMLInputElement;
}
