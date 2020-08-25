const { AuthenticationError } = require("apollo-server");
const user = {
  _id:1,
  name:"Reed",
  email:"algo@gmai.com",
  picture:"https://cloudanary.com/asf"
}

const authenticated = next => (root,args,ctx,info) => {

  if (!ctx.currentUser) {
    throw new AuthenticationError('Authenticated Error');
  }
  return next(root,args,ctx,info)
}


module.exports ={
  
    Query:{
      me: authenticated((root,args,ctx)=> {
        return ctx.currentUser
      })
    }



}
