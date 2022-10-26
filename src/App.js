
import './styles/App.css';
import { Projects } from './Data/project';
import {useEffect, useRef, useState} from 'react'
import useMouse from '@react-hook/mouse-position'
import Details from './components/Details'
let globalIndex = 0;



function App() {

  const [pos, setPos] = useState({x:0, y:0})
  const [display, setDisplay] = useState(false)
  const [detailTitle, setDetailTitle] = useState("")
  const [detailLink, setDetailLink] = useState("")

  const ref = useRef(null)
  const mouse = useMouse(ref, {
    enterDelay: 100,
    leaveDelay: 100,
  })

  let last = {x:0, y:0 };


let t = 0
let state = "on"
function activate(image, x, y) {
  
  let coco = document.getElementById(image)
  coco.style.zIndex = t
  coco.classList.add('show')
  //console.log(coco)
  coco.style.left = `${x}px`;
  coco.style.top = `${y}px`;

  /*const r = document.getElementsByTagName("img")
  for (let t = 0; t< r.length; t++){
    r[t].style.zIndex = 0
  } */
  //const p = r.map(item => item.style.zIndex = 0)
  //image.dataset.status = "active";
  last = { x, y }
  
}


const distanceFromLast = (x,y) =>{
  return Math.hypot(x - parseInt(last.x), y - parseInt(last.y))
}

//controlMouse(e)

  //console.log(e)
  
useEffect(()=>{
  //console.log(pos.x, pos.y)
  controlMouse()
},[pos.x, pos.y])
  function position(e){
      setPos((prev)=>{
        
        
        if(Math.hypot(e.clientX - prev.x, e.clientY - prev.y) > 100 ){
          pos.x = e.clientX
          pos.y = e.clientY
          return pos
        }

        else{
          return {...prev}
        }
      })

  }
function controlMouse(){
  if(distanceFromLast(mouse.x,mouse.y) > 100){
    const lead = Projects[globalIndex % Projects.length]['name'];
    //const tail = Projects[(globalIndex - 5) % Projects.length]['name']
    //console.log(lead)
    //console.log(mouse.x, mouse.y)
    activate(lead, pos.x, pos.y);
    /*if(tail) {
      tail.dataset.status = "inactive"
    }*/
    
    
    
    for (let i = 0; i < Projects.length; i++){
      //console.log((globalIndex + i)  % Projects.length )
      //images[(globalIndex  % images.length) - i ].style.zIndex = 10 - i
    }
    
    //console.log(lead.style.zIndex)
    //console.log(globalIndex++)
    globalIndex++;
    t ++;
  };
} 
  function changeDisplay(){
      setDisplay(false)
  }
  function showDetails(project){
    setDisplay(true)
    setDetailTitle(project.name)
    setDetailLink(project.link)
    let x = document.querySelectorAll("img")
    for (let i=0; i< x.length; i++){
      x[i].classList.remove("show")
    }
  }
  
 
  const Images = Projects.map(image =>{
    let imageId = Projects.indexOf(image)

      let x = `${mouse.x}`
      let y = `${mouse.y}`
      return(
        
        
        mouse.x!==null && mouse.y!==null && <a  onClick={()=>showDetails(image)}>
          <img className='' alt={image.name} id={image.name}  key = {image.link} src= {image.link} /> 
          </a>
        
        )

  }
  )
  return (
    <div onMouseMove={position} ref={ref} className="App">


      {display && <Details 
      name={detailTitle}
      link={detailLink}
      changeDisplay={changeDisplay}
      x={mouse.x}
      y={mouse.y}
      />
      
      
      //mouse.x!==null && mouse.y!==null && <div style={{top:mouse.y, left:mouse.x}} className='cursor'></div> 
      }

      <p className="ref">    x: {pos.x} y: {pos.y}
  </p>
      {Images
      }
     
    </div>
  );
}

export default App;
