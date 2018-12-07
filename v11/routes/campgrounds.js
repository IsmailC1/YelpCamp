var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");


//Index route - show all campgrounds
router.get("/",function(req,res){
    //Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index",{campgrounds: allCampgrounds, page: 'campgrounds'});
        }
    }); 
});
//Create - add new campground to DB
router.post("/",middleware.isLoggedIn, function(req, res){
        var name = req.body.name;
        var price = req.body.price;
        var image = req.body.image;
        var desc = req.body.description;
        var author = {
            id: req.user._id,
            username: req.user.username
        }
        var newCampground = {name:name, price:price, image:image, description:desc, author: author}
        // create a new campground and save to database 
        Campground.create(newCampground, function(err, newlyCreated){
            if(err){
                console.log(err);
            }else {
                console.log(newlyCreated);
                res.redirect("/campgrounds");
            }
        });
    });

// NEW - show form to create new campground
router.get("/new",middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});
// Show - show more info about one campground
router.get("/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampgroud){
        if(err){
            console.log(err);
        }else{
            console.log(foundCampgroud);
              //render show template with that campground
                res.render("campgrounds/show",{campground: foundCampgroud});
        }
    });
});
//Edit Campground Route\
router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req, res){
      Campground.findById(req.params.id, function(err, foundCampgroud){
      req.flash("error","Campground not found");
     res.render("campgrounds/edit", {campground: foundCampgroud});
    });
});
//Update Campground Route
router.put("/:id" ,middleware.checkCampgroundOwnership,function(req, res){
    //find  and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        } else {
            //redirect somewhere else(show page)
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});
//Destroy Campground Route
router.delete("/:id",middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/campgrounds");  
        }else {
            res.redirect("/campgrounds");
        }
    })
});

// function checkCampgroundOwnership(req,res,next){
//           if(req.isAuthenticated()){
//             Campground.findById(req.params.id,function(err, foundCampgroud){
//                 if(err){
//                       res.redirect("back");
//                   } else{
//                       //DOES USER OWN THE CAMPGROUN
//                         if(foundCampgroud.author.id.equals(req.user._id)){
//                             next();
//                         } else {
//                             res.redirect("back");
//                         }
//                      }
//                 });
//               } else{
//               res.redirect("back");
//       }
// }
// function isLoggedIn(req,res, next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     res.redirect("/login");
// }

module.exports = router;