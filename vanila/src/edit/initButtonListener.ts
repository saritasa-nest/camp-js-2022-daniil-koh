/**
 * Init button listener to direct user to edit page.
 */
export function initButtonListener(){
  const button = document.querySelector('.edit-button') as HTMLButtonElement;
  button.addEventListener('click', directToEditPage)
}

/**
 * Direct to edit page.
 */
function directToEditPage(): void{
  const urlSearchParams = new URLSearchParams(window.location.search);
  const detailSearchParams = (Object.fromEntries(urlSearchParams.entries()));
  const { id } = detailSearchParams;
  window.location.href = `edit?id=${id}`;
}
