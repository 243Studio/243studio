import logo from './logo.svg';
import './App.css';
import { Projects } from './Data/project';
import {useEffect, useRef} from 'react'
import useMouse from '@react-hook/mouse-position'

function App() {

  const ref = useRef(null)

  const mouse = useMouse(ref, {
    enterDelay: 100,
    leaveDelay: 100,
  })

  const Images = Projects.map(image =>{
    let imageId = Projects.indexOf(image)
    return(

      <img className='show' id={imageId} style={{width:'100px', top:mouse.y- imageId*5, left:mouse.x-imageId*5}} key = {image.link} src= {image.link} />
    )
  }
  )
  return (
    <div ref={ref} className="App">
      <div style={{top:mouse.y, left:mouse.x}} className='cursor'></div>

      {/*<p>
        x: {mouse.x} 
        y: {mouse.y}
  </p>*/}
      {Images}
    </div>
  );
}

export default App;
