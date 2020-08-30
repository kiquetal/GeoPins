import React , { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
// import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";
// import DeleteIcon from "@material-ui/icons/DeleteTwoTone";
import ReactMapGL, { NavigationControl} from 'react-map-gl';
const INITIAL_STATE ={
  latitude:-25.30066,
  longitude:-57.63591,
  zoom:15
}
const Map = ({ classes }) => {
  const [ viewport, setViewPort] = useState(INITIAL_STATE);
  
  return (<div className={classes.root}>
    
    
    
    <ReactMapGL
      width="100vw"
      height="calc(100vh - 64px)"
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxApiAccessToken="pk.eyJ1Ijoia2lxdWV0YWwiLCJhIjoiY2tlYW1mZWk3MDBhaDJycnNzMXJiNTZkaSJ9.E_r-OGMFxMRcpKNX8LtN3Q"
      onViewportChange={newViewPort => setViewPort(newViewPort)}
      {...viewport}
    ><div className={classes.navigationControl}>
      <NavigationControl       onViewportChange={newViewPort => setViewPort(newViewPort)}
      />
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
