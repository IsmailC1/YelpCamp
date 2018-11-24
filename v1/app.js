var express = require("express");
var app = express();
var bodyParser = require("body-parser"); 

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
 var campgrounds = [
        {name:"Salmon Creek", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSrGaN1uUzHFpz9M6BTYTqoLMFlI1OTl-O4KVzTKdRfQynbQ_8uA"},
        {name:"Granite Hill", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRphF5Oe4XrbVl7gshDMv7T10LrWj9UknODJ-TurpYsZOU-Ct6ZDQ"},
        {name:"Mountain Goat's Rest", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsJV9rbs5XBBsIEhZS4q2fzLVoKpKyz72JHqefFnhf-NdgW2jU_g"},
        {name:"Salmon Creek", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSrGaN1uUzHFpz9M6BTYTqoLMFlI1OTl-O4KVzTKdRfQynbQ_8uA"},
        {name:"Granite Hill", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRphF5Oe4XrbVl7gshDMv7T10LrWj9UknODJ-TurpYsZOU-Ct6ZDQ"},
        {name:"Mountain Goat's Rest", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsJV9rbs5XBBsIEhZS4q2fzLVoKpKyz72JHqefFnhf-NdgW2jU_g"},
        {name:"Salmon Creek", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSrGaN1uUzHFpz9M6BTYTqoLMFlI1OTl-O4KVzTKdRfQynbQ_8uA"},
        {name:"Granite Hill", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRphF5Oe4XrbVl7gshDMv7T10LrWj9UknODJ-TurpYsZOU-Ct6ZDQ"},
        {name:"Mountain Goat's Rest", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsJV9rbs5XBBsIEhZS4q2fzLVoKpKyz72JHqefFnhf-NdgW2jU_g"}

        ];

app.get("/", function(req, res){
   res.render("landing");
});
app.get("/campgrounds",function(req,res){
   res.render("campgrounds",{campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){
        var name = req.body.name;
        var image = req.body.image;
        var newCampground = {name:name,  image:image}
        campgrounds.push(newCampground);
        res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res) {
    res.render("new.ejs");
});

app.listen(process.env.PORT, process.env.IP,function(){
    
    console.log("The YelpCamp Server Has Started!");
});