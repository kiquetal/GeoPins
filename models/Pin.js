const mongose = require ('mongoose');

const PinSchema = new mongose.Schema({
  
  content: String,
  createdAt: String,
  title: String,
  image: String,
  latitude: Number,
  longitude: Number,
  author: {
    type: mongose.Schema.ObjectId,
    ref: "User"
  },
  comments : [{
    text:String,
    createdAt:{
      type: Date,default:Date.now
    },
    author: {
      type: mongose.Schema.ObjectId,
      ref: "User"
    }
  }]
},{timestamps: true});

module.exports = mongose.model("Pin",PinSchema);
