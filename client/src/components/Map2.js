import React, {useState, useEffect, useContext} from "react";
import { withStyles } from "@material-ui/core/styles";
// import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";
// import DeleteIcon from "@material-ui/icons/DeleteTwoTone";
import ReactMapGL, { NavigationControl,Marker} from 'react-map-gl';
import PinIcon from "./PinIcon";
import Context  from '../context'
const INITIAL_STATE ={
  latitude:-25.30066,
  longitude:-57.63591,
  zoom:15
}
const Map = ({ classes }) => {
  const { dispatch ,  state } = useContext(Context);
  const [ viewport, setViewPort] = useState(INITIAL_STATE);
  const [ userPosition, setUserPosition ] = useState(null);
  
  const { draft } = state;
  useEffect(()=>{
  
    getUserPosition();
    
  },[])
  
  const getUserPosition = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        setViewPort({ ...viewport, latitude, longitude });
        setUserPosition({ latitude, longitude });
      });
    }
  };
  useEffect(() => {
    getUserPosition();
  }, []);
  
  
  const handleMapClick = ({ lngLat, leftButton }) => {
    if (!leftButton) return;
    if (!state.draft) {
      dispatch({ type: 'CREATE_DRAFT' });
    }
    const [longitude, latitude] = lngLat;
    dispatch({
      type: 'UPDATE_DRAFT_LOCATION',
      payload: { longitude, latitude }
    });
  };
  
  return (<div className={classes.root}>
    
    
    
    <ReactMapGL
      
      width="100vw"
      height="calc(100vh - 64px)"
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxApiAccessToken="pk.eyJ1Ijoia2lxdWV0YWwiLCJhIjoiY2tlYW1mZWk3MDBhaDJycnNzMXJiNTZkaSJ9.E_r-OGMFxMRcpKNX8LtN3Q"
      onViewportChange={newViewPort => setViewPort(newViewPort)}
      onClick={handleMapClick}
      {...viewport}

    ><div className={classes.navigationControl}>
      <NavigationControl       onViewportChange={newViewPort => setViewPort(newViewPort)}
      />
    </div>
      
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
      { /* Draft Pin*/}
      { draft && (
        <Marker
          latitude={draft.latitude}
          longitude={draft.longitude}
          offsetLeft={-19}
          offsetTop={-37}
        >
          <PinIcon size={40} color="hotpink"></PinIcon>
        </Marker>
      )}
    </ReactMapGL>
  </div>);
};

const styles = {
  root: {
    display: "flex",
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
