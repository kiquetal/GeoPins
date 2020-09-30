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
    }),
    getPins: async  (root,args,ctx)=>{
      await Pin.find({}).populate('author').populate('comments.author')
      return pins;
    }
  },
  Mutation: {
    
    createPin:authenticated(async (root, args, ctx, info) => {
      const newPin = await new Pin({
        ...args.input,
        author: ctx.currentUser._id
      }).save();
      const pinAdded = await Pin.populate(newPin, 'author');
      return pinAdded;
    })
    
  }
  
  
}
