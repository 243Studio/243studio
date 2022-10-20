import "./styles.css";

const images = document.getElementsByTagName("img");
let globalIndex = 0;
let last = {x:0, y:0 };

function activate(image, x, y) {
  image.style.left = `${x}px`;
  image.style.top = `${y}px`;
  image.dataset.status = "active";
  last = { x, y }
}

const distanceFromLast = (x,y) =>{
  return Math.hypot(x - last.x, y - last.y)
}
window.onmousemove = (e) => {
  //console.log(e)
  
  if(distanceFromLast(e.clientX,e.clientY) > 100){
    
  const lead = images[globalIndex % images.length];
  const tail = images[(globalIndex - 5) % images.length]
  activate(lead, e.clientX, e.clientY);
  if(tail) tail.dataset.status = "inactive"
  globalIndex++;
  }
};
