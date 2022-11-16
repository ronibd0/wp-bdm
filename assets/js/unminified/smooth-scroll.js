// Scroll to specific hash link.
const links = document.querySelectorAll("a");

if( links ) {
  for ( const link of links ) {
    if ( link.hash !== "" ) {
      link.addEventListener("click", clickHandler);
    }
  }
}

function clickHandler(e) {
  e.preventDefault();

  const href = this.getAttribute("href");
  const offsetTop = document.querySelector(href).offsetTop;

  scroll({
    top: offsetTop,
    behavior: "smooth"
  });

}