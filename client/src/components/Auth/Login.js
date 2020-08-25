import React , { useContext } from "react";
import { withStyles } from "@material-ui/core/styles";
import { GoogleLogin} from "react-google-login";
// import Typography from "@material-ui/core/Typography";
import { GraphQLClient } from "graphql-request";
import Context from '../../context';
import {Typography} from "@material-ui/core/es";

import { ME_QUERY } from '../../graphql/queries';
const Login = ({ classes }) => {
  const {dispatch} = useContext(Context);
  
  const onSuccess = async googleUser => {
    const {id_token} = googleUser.getAuthResponse();
    
    
    const client = new GraphQLClient('http://localhost:4000/graphql', {
      headers: {authorization: id_token}
    });
    //let data = {}
    const data = await client.request(ME_QUERY);
    console.log({data});
    dispatch({type: "LOGIN_USER", payload: data.me})
    dispatch({type:"IS_LOGGED_IN",payload:googleUser.isSignedIn()})
  }
  
  return (
    <div className={classes.root}>
      <Typography
        component="h1"
        variant="h3"
        gutterBottom
        noWrap
        style={{color: "rgb(66,133,244)"}} >
        Bienvenido
      </Typography>
      <GoogleLogin
        buttonText="Ingresar con cuenta google"
        onSuccess={onSuccess}
        isSignedIn={true}
        theme="dark"
        clientId="454433981322-q13aelbuh7kphv18qhfu2e9aidoec7vg.apps.googleusercontent.com"/>
    </div>
  );
  
}
const styles = {
  root: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center"
  }
};

export default withStyles(styles)(Login);
