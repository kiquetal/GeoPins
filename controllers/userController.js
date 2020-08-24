
const User = require('../models/User');
const { OAuth2Client } = require('google-auth-library');
const client =new OAuth2Client("454433981322-q13aelbuh7kphv18qhfu2e9aidoec7vg.apps.googleusercontent.com");

exports.findOrCreateUser = async token => {

  const googleUser = await  verifyAuthToken(token);
  const user =await checkIfUserExists(googleUser.email);
  console.log("user encontrado " +user);
  return user ? user : createNewUser(googleUser);
};

const verifyAuthToken = async token => {
  
  try
  {
    const ticket = await  client.verifyIdToken({ idToken:token,
    audience:"454433981322-q13aelbuh7kphv18qhfu2e9aidoec7vg.apps.googleusercontent.com"
    });
    return ticket.getPayload();
    
  }
  catch (err)
  {
   console.log("error "+ err.toString());
  }
  
  
}
const checkIfUserExists = async email =>await User.findOne({email}).exec();
const createNewUser = async googleUser => {
  const { name, email, picture } = googleUser;
  const user = {name,email,picture};
  return await  new User(user).save();
}
