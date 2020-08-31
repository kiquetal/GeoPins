import React , { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
// import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";
// import DeleteIcon from "@material-ui/icons/DeleteTwoTone";
import ReactMapGL, { NavigationControl,Marker} from 'react-map-gl';
import PinIcon from "./PinIcon";
const INITIAL_STATE ={
  latitude:-25.30066,
  longitude:-57.63591,
  zoom:15
}
const Map = ({ classes }) => {
  const [ viewport, setViewPort] = useState(INITIAL_STATE);
  const [ userPosition, setUserPosition ] = useState(null);
  
  
  useEffect(()=>{
    
    getCurrentPosition();
    
  },[])
  
  const onClick= event =>{
    console.log(event);
  }
  const getCurrentPosition=()=>{
    
    if ("geolocation" in navigator)
    {

      navigator.geolocation.getCurrentPosition((position)=>{
        
        const {latitude, longitude} = position.coords;
        console.log("my current location");
        console.log({latitude,longitude})
        setViewPort({...viewport,latitude,longitude})
        setUserPosition({latitude,longitude});
      })
    }
    else
    {
      console.log("no navigator");
    }
    
  }
  
  return (<div className={classes.root}>
    
    
    
    <ReactMapGL
      width="100vw"
      height="calc(100vh - 64px)"
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxApiAccessToken="pk.eyJ1Ijoia2lxdWV0YWwiLCJhIjoiY2tlYW1mZWk3MDBhaDJycnNzMXJiNTZkaSJ9.E_r-OGMFxMRcpKNX8LtN3Q"
      onViewportChange={newViewPort => setViewPort(newViewPort)}
      {...viewport}
      onClick={onClick}
    ><div className={classes.navigationControl}>
      <NavigationControl       onViewportChange={newViewPort => setViewPort(newViewPort)}
      />
    </div>
      <div>
        {           console.log("dibujar marker")}
        { userPosition && (

        <Marker
        latitude={userPosition.latitude}
        longitude={userPosition.longitude}
        offsetLeft={-19}
        offsetTop={-37}
        >
          <PinIcon size={40} color="red"></PinIcon>
        </Marker>
        
        )}
      </div>
    </ReactMapGL>
  </div>);
};

const styles = {
  root: {
    display: "flex"
  },
  rootMobile: {
    display: "flex",
    flexDirection: "column-reverse"
  },
  navigationControl: {
    position: "absolute",
    top: 0,
    left: 0,
    margin: "1em"
  },
  deleteIcon: {
    color: "red"
  },
  popupImage: {
    padding: "0.4em",
    height: 200,
    width: 200,
    objectFit: "cover"
  },
  popupTab: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  }
};

export default withStyles(styles)(Map);
