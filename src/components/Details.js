

export default function Details(props){

    return(
      <div className="details">
  
        <div className="details-container">
        <p className="font-bold underline">{props.name}</p>
        <p className="close" style={{left:props.x, top:props.y}}>CLOSE</p>
        <img onClick={props.changeDisplay} id="mainPic" src={props.link}/>
        </div>
      </div>
    )
  }