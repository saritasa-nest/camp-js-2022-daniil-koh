const TEMPLATE_EL = document.createElement('div');
TEMPLATE_EL.className = 'container-fluid navbar-fixed navbar';
TEMPLATE_EL.innerHTML = `
<nav class="green">
<div class="nav-wrapper">
<div class="container-fluid" style="margin:0px 30px;">
<a href="" class="brand-logo left">Logo</a>

  <a href="" class="button-collapse right" data-activates="sidenav">MENU</a>

  <ul class="right hide-on-med-and-down">
<li><a href="">Log ing</a></li>
<li><a href="">Register</a></li>

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
