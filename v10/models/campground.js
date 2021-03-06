var mongoose  = require("mongoose");

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
  comments: [
       {
           type: mongoose.Schema.Types.ObjectId,
           ref:"Comment"
       }],
   name:  String,
   image: String,
   description: String,
   author: {
       id:{
           type: mongoose.Schema.Types.ObjectId,
           ref: "User"
       },
       username: String,
       
   }
});

module.exports = mongoose.model("Campground",campgroundSchema); 