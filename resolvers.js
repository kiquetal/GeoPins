const {AuthenticationError} = require("apollo-server");
const user = {
  _id: 1,
  name: "Reed",
  email: "algo@gmai.com",
  
  picture: "https://cloudanary.com/asf"
}
const Pin = require('./models/Pin');
const authenticated = next => (root, args, ctx, info) => {
  
  if (!ctx.currentUser) {
    throw new AuthenticationError('Are u there Authenticated Error,no te veo, header, o no, los dioses ocultos');
  }
  return next(root, args, ctx, info)
}


module.exports = {
  
  Query: {
    me: authenticated((root, args, ctx) => {
      return ctx.currentUser
    })
  },
  Mutation: {
    
    createPin:async (root, args, ctx, info) => {
      await new Pin({
      ...args.input,
      
      });
    }
    
  }
  
  
}
