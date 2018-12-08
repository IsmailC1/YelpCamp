var Campground = require("../models/campground");
var Comment = require("../models/comment");


//all the middleware goes here
var middlewareObj = {};


middlewareObj.checkCampgroundOwnership = function(req,res,next){
          if(req.isAuthenticated()){
            Campground.findById(req.params.id,function(err, foundCampgroud){
                if(err){
                    req.flash("error","Campground not found");
                      res.redirect("back");
                  } else{
                      //DOES USER OWN THE CAMPGROUN
                        if(foundCampgroud.author.id.equals(req.user._id) || req.user.isAdmin ){
                            next(); 
                        }
                        else {
                             req.flash("error","You do not have permission to do that");
                            res.redirect("back");
                        }
                     }
                });
              } else{
                  req.flash("error","You need to be logged in to do that");
              res.redirect("back");
      }
}

middlewareObj.checkCommentOwnership = function(req,res,next){
      if(req.isAuthenticated()){
          Comment.findById(req.params.comment_id,function(err, foundComment){
          if(err){
              res.redirect("back");
          } else{
             //DOES USER OWN THE Comment
              if(foundComment.author.id.equals(req.user._id) || foundComment.author.id.equals(req.user.isAdmin)){
                  next();
               
              } else {
                  req.flash("error","You don't have permission to do that");
                  res.redirect("back");
                     }
              }
          });
     } else{
      req.flash("error","You need to be logged in to do that!");
      res.redirect("back");
  }
}
middlewareObj.isLoggedIn = function(req,res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that!");
    res.redirect("/login");
}

module.exports = middlewareObj;

//  var Campground = require("../models/campground");
//  var Comment = require("../models/comment");
//  module.exports = {
//      isLoggedIn: function(req, res, next){
//          if(req.isAuthenticated()){
//              return next();
//          }
//          req.flash("error","You must be signed in to do that!");
//          res.redirect("/login");
//      },
//      checkUserCampground: function(req, res, next){
//          if(req.isAuthenticated()){
//              Campground.findById(req.params.id, function(err, campground){
//                  if(campground.author.id.equals(req.user._id)){
//                      next();
//                  }else {
//                          req.flash("error","You dont have permission to do that!");
//                          console.log("Badd");
//                          res.redirect("campgrounds/" + req.params.id);
//                      }
//                  });
//                 } else{
//                      req.flash("error","You need to be signed in to do that!");
//                      res.redirect("/login");
//                  }
//          },
//          checkUserComment: function(req, res, next){
//              console.log("You made it!");
//              if(req.isAuthenticated()){
//                  Comment.findById(req.params.commentId, function(err, comment){
//                      if(comment.author.id.equals(req.user._id)){
//                          next();
//                      }else{
//                          req.flash("error", "You dont have permisson to do that");
//                          res.redirect("/campgrounds/" + req.params.id);
//                      }
//                  });
//              } else{
//                  req.flash("error", "You need to be signed in to do that!");
//                  res.redirect("login");
//              }
//          }
//  }







