import {Projects}  from "./Data/project.mjs";



let images = document.getElementsByTagName("img");
let lead =""
console.log(images)
let detail = document.getElementById('detail-container')
let main = document.getElementById('main')
let detailImg = document.getElementById('description')
const close = document.getElementById('end')
let footer = document.getElementById("footer")
console.log(main.style.display)
let globalIndex = 0;
let last = {x:0, y:0 };
let doc = document.getElementById('body')
let complete = 0
let index = 0
let nextPrevious = document.getElementsByClassName("next-previous")
let next = document.getElementById('next')
let previous = document.getElementById('previous')
let title = document.getElementById('title')
let detailText =document.getElementById('detail-text')
let t = 0
let state = "on"


function activate(image, x, y) {
  console.log(image)
  image.style.left = `${x}px`;
  image.style.top = `${y}px`;
  /*const r = document.getElementsByTagName("img")
  for (let t = 0; t< r.length; t++){
    r[t].style.zIndex = 0
  } */
  //const p = r.map(item => item.style.zIndex = 0)
  for (let k of images){
    k.style.filter="grayscale(100%)"
  }
  image.dataset.status = "active";
  image.style.filter="unset"
  //let v = image.parentNode
  //v.setAttribute('href', Projects[image.dataset.index].link)
  //console.log(v)
  console.log(image.dataset.index)
  image.style.zIndex = t
  last = { x, y } 
}

const distanceFromLast = (x,y) =>{
  return Math.hypot(x - last.x, y - last.y)
}

  main.addEventListener('mousemove', (e)=>{
    controlMouse(e)
  })

  //console.log(e)
  
function controlMouse(e){

  if(distanceFromLast(e.clientX,e.clientY) > 100){
    
    lead = images[globalIndex % (images.length-1)];
    lead.style.filter=""
    const tail = images[(globalIndex - 9) % (images.length-1)]
    lead.onclick = () => display(lead)
    let g = document.getElementById('tt')
    activate(lead, e.clientX, e.clientY);
    if(tail) {
      tail
      tail.dataset.status = "inactive"
  }
    


   for (let i = 0; i < images.length; i++){
    ///console.log((globalIndex + i)  % images.length )
    //images[(globalIndex  % images.length) - i ].style.zIndex = 10 - i
  }

  //console.log(lead.style.zIndex)
  globalIndex++;
  t ++;
  }
};

function display(lead){
  clear()
  index = lead.dataset.index
  show('#detail-container')
  show(".next-previous")
  show('#end')
  doc.style.height="fit-content"
  doc.style.overflowY= "scroll"
  close.style.display="block"
  detail.classList.remove('fadeOut')
  detailImg.setAttribute('src', Projects[index].link)
  detailImg.style.filter="unset"
  title.innerText = Projects[index].name
  detailText.innerText = Projects[index].description ? Projects[index].description : ""
  doc.style.width="100%"
  doc.style.height="100vh"
}
function clear(){
  main.style.display="none"
  main.removeEventListener('mousemove', (e)=>controlMouse(e))
  if (state === "on"){
  }
}

function buttonFollowMouse(e){
  return 1;
}

function hide(x){
  gsap.to(x,{opacity:0})
  gsap.to(x, {display:"none"})
}

function show(x){
  gsap.to(x, {display:"flex", duration:0.1})
  gsap.fromTo(x, {opacity:0}, {opacity:1, duration:2, ease:'power3'})


}

function toggleFooter(){
  if((window.scrollY - window.innerHeight) > 30){
    show("#footer")
    console.log(window.scrollY + " and "  + window.innerHeight)
  }
  else if((window.scrollY) - parseInt(window.innerHeight) <= 30) {
    hide("#footer")
  }
}

function closeDescription(){
  for (let img of images){
    img.dataset.status = "inactive"
  }
  hide("#detail-container")
  main.removeAttribute("style")
  close.style.display="none"
  doc.style.overflow = "hidden"
  hide(".next-previous")
  hide('#end')
}

function switchPage(e){
  index ++;
  let x = ""
  if(e.target.innerHTML === "NEXT"){
    x =  (index) % (images.length-1)
  }

  else{
    x = ((images.length-1) - (index  % (images.length-1))) % (images.length-1)
  }
  detailImg.setAttribute('src', Projects[x].link )
  title.innerText = Projects[x].name
  if(Projects[x].description.length > 0){
    detailText.innerText = Projects[x].description
  }
  else{
    detailText=""
  }
}

close.addEventListener('click', ()=>closeDescription())

function screenSize(){
  console.log(window.innerWidth)
  if(window.innerWidth < 450){
    doc.style.display="none"
    alert("This website is only accessible on PC, Desktop or Mac")
    return 1;
  }
  else{
    doc.style.display="block"
  }
}
next.addEventListener('click', (e)=>switchPage(e))
previous.addEventListener('click', (e)=>switchPage(e))
window.addEventListener('load', ()=> screenSize())

window.addEventListener('resize', ()=>screenSize())