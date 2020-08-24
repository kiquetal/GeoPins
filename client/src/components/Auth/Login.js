import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { GoogleLogin} from "react-google-login";
// import Typography from "@material-ui/core/Typography";
import { GraphQLClient } from "graphql-request";


const Login = ({ classes }) => {

  const onSuccess = async googleUser => {
  
  const { id_token }=  googleUser.getAuthResponse();
  console.log(id_token);
  const ME_QUERY=`{
  me {
    _id
    name
    email
  }
}`;
  
  const client =new GraphQLClient('http://localhost:4000/graphql',{
    headers: { authorization: id_token}
  });
  //let data = {}
  const data= await  client.request(ME_QUERY);
  console.log({ data} );
  
  }

  return <GoogleLogin
    onSuccess={onSuccess}
    isSignedIn={true}
    clientId="454433981322-q13aelbuh7kphv18qhfu2e9aidoec7vg.apps.googleusercontent.com"/>
};


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
