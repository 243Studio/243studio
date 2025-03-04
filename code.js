let Projects;
fetch("https://243studio.github.io/projects/projects.json")
  .then(response => response.json()) // Parse JSON
  .then(data => {
    Projects = data
  }) // Work with JSON data
  .catch(error => console.error('Error fetching JSON:', error));

let marked = window.marked
let images = document.getElementsByTagName("img");
let lead =""
let detail = document.getElementById('detail-container')
let main = document.getElementById('main')
let detailImg = document.getElementById('description')
const close = document.getElementById('end')
let footer = document.getElementById("footer")
let globalIndex = 0;
let last = {x:0, y:0 };
let doc = document.getElementById('body')
let index = 0
let next = document.getElementById('next')
let previous = document.getElementById('previous')
let title = document.getElementById('title')
let detailText =document.getElementById('detail-text')
let t = 0
let state = "on"
let mobile = document.getElementById('mobile')
let loading = document.getElementById('loading')
let mouse = document.getElementById('mouse')
let detailz = document.getElementById('detail')

let direction = document.getElementById("direction")

function PageLoad(doc, event){
  let mm = doc.getElementsByClassName('img')
  let loaded = 0
  for(let i = 0; i < mm.length; i++)
  {
    if(mm[i].complete)
    {
      loaded ++;
    }
    else{
      mm[i].addEventListener('load', function(){
        loaded += 1;

        if (loaded=== mm.length){
          event()
        }
      })
    }
    if(loaded===mm.length){
      event()
    }
    
  }
  
}
PageLoad(main, function(){
  main.style.display="block"
  loading.style.display="none"
  direction.style.display='flex'
})

let e = (s)=> DOMPurify.sanitize(e)

function activate(image, x, y) {
  direction.style.display="none"
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
    //images[(globalIndex  % images.length) - i ].style.zIndex = 10 - i
  }

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
  close.style.display="block"
  detail.classList.remove('fadeOut')
  detailImg.setAttribute('src', Projects[index].link)
  detailImg.style.filter="unset"
  title.innerText = Projects[index].name
  detailText.innerHTML = Projects[index].description ? marked.parse(Projects[index].description) : ""
  doc.style.width="100%"
  doc.style.height="100vh"
}
function clear(){
  main.style.display="none"
  main.removeEventListener('mousemove', (e)=>controlMouse(e))
  if (state === "on"){
  }
}



function hide(x){
  gsap.to(x,{opacity:0})
  gsap.to(x, {display:"none"})
}

function show(x){
  gsap.to(x, {display:"flex", duration:0.1})
  gsap.fromTo(x, {opacity:0}, {opacity:1, duration:2, ease:'power3'})


}



function closeDescription(){
  for (let img of images){
    img.dataset.status = "inactive"
  }
  hide("#detail-container")
  
  close.style.display="none"
  doc.style.overflow = "hidden"
  hide(".next-previous")
  hide('#end')
  hide('#mouse')
  show('#main')
  main.addEventListener('mousemove', (e)=>{
    controlMouse(e)
  })
}

function switchPage(e){
  if (typeof index === "undefined"){
    index = 0
  }
  
  let text = "";
  if(e.target.innerHTML === "NEXT"){
    index =  ((index + 1) % (images.length - 1))
    
  }
  
  else if(e.target.innerHTML === "PREVIOUS"){

    index = ((index - 1) + (images.length - 1 )) % (images.length - 1)
  
  }
  
  if(Projects[index].description !== undefined){
    text = Projects[index].description
  }
  else{
    text = ""
  }
  detailImg.setAttribute('src', Projects[index].link )
  title.innerText = Projects[index].name
  detailText.innerHTML = marked.parse(text);
}

close.addEventListener('click', ()=>closeDescription())

function screenSize(){

  if(window.outerWidth < 800){
    main.style.display="none"
    mobile.style.display="block"
    direction.style.display="none"
    //alert("This website is only accessible on PC, Desktop or Mac")
  }
  else{
    main.style.display="block"
    mobile.style.display="none"
  }
}
next.addEventListener('click', (e)=>switchPage(e))
previous.addEventListener('click', (e)=>switchPage(e))
window.addEventListener('load', ()=> screenSize())

window.addEventListener('resize', ()=>screenSize())
window.addEventListener('keydown', e => {
  if(detail.style.display !== "none"){

    if (e.key == "ArrowUp") {
      
      detailz.scrollBy({ top: -50, behavior: 'smooth' });
    } 
    else if (e.key == "ArrowDown") {
      detailz.scrollBy({ top: 50, behavior: 'smooth' });
      
    }
  }
});
function buttonPosition(e){
  if(e.clientX > (window.innerWidth - (window.innerWidth * 17.5 / 100) ))
  {


    next.style.transform='translate(-50%,-50%)'
    next.style.position = 'absolute'
    next.style.top = `${e.layerY}px`
    next.style.left = `${e.layerX}px`
    previous.style.top=`${window.innerHeight/2}px`
    previous.style.left="5%"
    mouse.style.display="none"
    next.style.transition= 'unset'

  }

  else if (e.clientX < (window.innerWidth - (window.innerWidth - (window.innerWidth * 17.5 / 100) )))
  {
    previous.style.transform='translate(-50%,-50%)'
    previous.style.position = 'absolute'
    previous.style.top = `${e.layerY}px`
    previous.style.left = `${e.layerX}px`

    next.style.top=`${window.innerHeight/2}px`
    next.style.left="unset"
    next.style.right="5%"
    mouse.style.display="none"

  }
  else{
    mouse.style.display="block"
    mouse.style.position="absolute"
    mouse.style.top=`${e.layerY}px`
    mouse.style.left= `${e.layerX}px`
    detail.style.cursor="default"
    description.style.cursor="pointer"
    previous.style.top=`${window.innerHeight/2}px`
    previous.style.left="5%"
    next.style.top=`${window.innerHeight/2}px`
    next.style.left="unset"
    next.style.right="5%"

  }




}
let containerD = document.getElementById('detail-container')
containerD.addEventListener("mousemove", (e)=>{buttonPosition(e)})