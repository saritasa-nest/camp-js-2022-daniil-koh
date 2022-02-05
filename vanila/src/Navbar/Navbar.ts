const TEMPLATE_EL = document.createElement('div');
TEMPLATE_EL.className = 'container-fluid navbar-fixed navbar';
TEMPLATE_EL.innerHTML = `
  <nav class="blue-grey lighten-1">
    <div class="nav-wrapper">
      <div class="container-fluid">
        <ul class="right hide-on-med-and-down">
          <li><a href="#" class="modal-trigger">Login</a></li>
          <li><a href="#" class="modal-trigger">Register</a></li>
        </ul>
      </div>
    </div>
  </nav>`;

/**
 * Navbar component.
 */
export const navbar = (): Element => TEMPLATE_EL;
