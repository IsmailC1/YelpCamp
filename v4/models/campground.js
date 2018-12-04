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
   description: String
});

module.exports = mongoose.model("Campground",campgroundSchema); 