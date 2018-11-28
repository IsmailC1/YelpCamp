var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"), 
    mongoose = require("mongoose");


mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
   name:  String,
   image: String,
   description: String
});

var Campground = mongoose.model("Campground",campgroundSchema); 

// Campground.create(
//     {
//         name:"Granite Hill",
//         image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRphF5Oe4XrbVl7gshDMv7T10LrWj9UknODJ-TurpYsZOU-Ct6ZDQ",
//         description: "This is a huge granite hill, no bathrooms. No watter. Beautiful Granite!"
        
//     },
//     function(err, campground){
//         if(err){
//             console.log(err);
//         }else{
//             console.log("Newly Created Campground: ");
//             console.log(campground);
//         }
//     });


app.get("/", function(req, res){
   res.render("landing");
});

//Index route - show all campgrounds


app.get("/campgrounds",function(req,res){
    //Get all campgrounds from DB
    Campground.find({},function(err, allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("index",{campgrounds: allCampgrounds});
        }
    });
});

//Create - add new campground to DB

app.post("/campgrounds", function(req, res){
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


app.get("/campgrounds/new", function(req, res) {
    res.render("new.ejs");
});

// Show - show more info about one campground

app.get("/campgrounds/:id", function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampgroud){
        if(err){
            console.log(err);
        }else{
              //render show template with that campground
                res.render("show",{campground: foundCampgroud});
        }
    });
    req.params.id
})


app.listen(process.env.PORT, process.env.IP,function(){
    
    console.log("The YelpCamp Server Has Started!");
});