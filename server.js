const { ApolloServer } = require('apollo-server');

const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

const mongoose = require('mongoose');
const { findOrCreateUser } = require('./controllers/userController');
mongoose.connect("mongodb://admin:paraguay@localhost:27017/geopoints",{
  useNewUrlParser:true
})
.then(()=>console.log("DB Connected"));

const server = new ApolloServer({
  typeDefs:typeDefs,
  resolvers:resolvers,
  context: async  ({req}) => {
    
    let authToken = null;
    let currentUser = null;
    try
    {
      
      authToken= req.headers.authorization;
      if (authToken) {
        currentUser =    await   findOrCreateUser(authToken);
        console.log("Obtain from" + currentUser.toString());
        
      }
    }
    catch (err){
      console.log("I cant obtain token");
    }
    return { currentUser };
  }
})



server.listen().then(({url})=>{
  console.log(`listen-${url}`);
})
