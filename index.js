
const images = document.getElementsByTagName("img");
let globalIndex = 0;
let last = {x:0, y:0 };

let t = 0
let state = "on"
function activate(image, x, y) {
  image.style.left = `${x}px`;
  image.style.top = `${y}px`;

  image.dataset.status = "active";
  image.style.zIndex = t
  last = { x, y }
  
}

const distanceFromLast = (x,y) =>{
  return Math.hypot(x - last.x, y - last.y)
}

  const di = document.getElementById('main')
  di.addEventListener('mousemove', (e)=>{
    controlMouse(e)
  })

  //console.log(e)
  
function controlMouse(e){

  if(distanceFromLast(e.clientX,e.clientY) > 100){
    
    const lead = images[globalIndex % images.length];
    const tail = images[(globalIndex - 9) % images.length]
    
    activate(lead, e.clientX, e.clientY);
    if(tail) {
      tail.dataset.status = "inactive"
  }
    


   for (let i = 0; i < images.length; i++){
    console.log((globalIndex + i)  % images.length )
    //images[(globalIndex  % images.length) - i ].style.zIndex = 10 - i
   }

  //console.log(lead.style.zIndex)
  globalIndex++;
  t ++;
  }
};

function clear(){
  di = document.getElementById('main')
  if (state)
  di.innerHTML=""
  di.removeEventListener('mousemove', (e)=>controlMouse(e))
}

const close = document.getElementById('end')
close.addEventListener('click', ()=>{

  if (state==="on"){
    clear()
    state = "off"

  }
  const notice = document.getElementById('notice')
  notice.style.display = "block"
})

