import React, {useEffect} from "react";
import withRoot from "../withRoot";
import Header from '../components/Header'
import Map from '../components/Map';
const App = (props) => {
  useEffect(()=>{
    console.log("App"+ JSON.stringify(props));
  })
  return (
    <>
    <Header/>
      <Map/>
  </>);
};

export default withRoot(App);
