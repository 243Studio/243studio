import "./styles.css";

const images = document.getElementsByTagName("img");
let globalIndex = 0;

function activate(image, x, y) {
  image.style.left = `${x}px`;
  image.style.top = `${y}px`;
  image.dataset.status = "active";
}
window.onmousemove = (e) => {
  //console.log(e)
  const lead = images[globalIndex % images.length];
  activate(lead, e.clientX, e.clientY);

  globalIndex++;
};
