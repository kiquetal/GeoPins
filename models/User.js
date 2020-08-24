const mongose = require ('mongoose');

const UserSchema = new mongose.Schema({
  
  name: String,
  email: String,
  picture: String
});

module.exports = mongose.model("User",UserSchema);
