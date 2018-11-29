var express       = require("express"),
    app           = express(),
    bodyParser    = require("body-parser"), 
    mongoose      = require("mongoose"),
    Campground    = require("./models/campground"),
    seedDB        = require("./seeds");
    

mongoose.connect("mongodb://localhost/yelp_camp_v3");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
seedDB();

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
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampgroud){
        if(err){
            console.log(err);
        }else{
            console.log(foundCampgroud);
              //render show template with that campground
                res.render("show",{campground: foundCampgroud});
        }
    });
})


app.listen(process.env.PORT, process.env.IP,function(){
    
    console.log("The YelpCamp Server Has Started!");
});