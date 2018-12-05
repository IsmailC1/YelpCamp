var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
//Index route - show all campgrounds


router.get("/",function(req,res){
    //Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index",{campgrounds: allCampgrounds});
        }
    }); 
});

//Create - add new campground to DB

router.post("/", function(req, res){
        var name = req.body.name;
        var image = req.body.image;
        var desc = req.body.description;
        var newCampground = {name:name,  image:image, description:desc}
        // create a new campground and save to database 
        Campground.create(newCampground, function(err, newlyCreated){
            if(err){
                console.log(err);
            }else {
                res.redirect("/campgrounds");
            }
        });
    });

// NEW - show form to create new campground


router.get("/new", function(req, res) {
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

module.exports = router;