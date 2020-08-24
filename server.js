const { ApolloServer } = require('apollo-server');

const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

const mongoose = require('mongoose');

mongoose.connect("mongodb://admin:paraguay@localhost:27017/geopoints",{
  useNewUrlParse:true
})
.then(()=>console.log("DB Connected"));

const server = new ApolloServer({
  typeDefs:typeDefs,
  resolvers:resolvers
})

server.listen().then(({url})=>{
  console.log(`listen-${url}`);
})
