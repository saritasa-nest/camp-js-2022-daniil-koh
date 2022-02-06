const TEMPLATE_EL = document.createElement('div');
TEMPLATE_EL.className = 'container-fluid navbar-fixed navbar';
TEMPLATE_EL.innerHTML = `
  <nav class="blue-grey lighten-1">
  <div class="nav-wrapper">
  <div class="container-fluid" >
   <ul class="right hide-on-med-and-down">
  <li><a href="#modal-auth" class="modal-trigger">Login</a></li>
  <li><a data-target="#modal-auth" class="modal-trigger">Register</a></li>
  </ul>
  </div>
  </div>
  </nav>`;

/**
 * Navbar component.
 */
export const navbar = (): Element => {
  return getElement();

  /**
   * Return Navbar element.
   */
  function getElement(): Element {
    return TEMPLATE_EL;
  }
};
