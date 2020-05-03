var express = require("express");
var app = express();
var bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    passport   = require("passport"),
    LocalStrategy  = require("passport-local"),
    methodOverride = require("method-override"),
    Campground = require("./models/campground"),
    Comment    = require("./models/comment"),
    User       = require("./models/user"),
    seedDB     = require("./seeds");

//requiring routes
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes       = require("./routes/index");
    
    //Comment    = require("./models/comment"),
    //Comment    = require("./models/user");

// mongoose.connect("mongodb://localhost:27017/tour_camp_v10", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
mongoose.connect("mongodb+srv://guru:password3522@cluster0-yeuc7.mongodb.net/tour_camp?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
// mongodb+srv://guru:<password#.#>@cluster0-yeuc7.mongodb.net/test?retryWrites=true&w=majority
app.use(bodyParser.urlencoded({extended: true})); 

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
// console.log(__dirname);
seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUnitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The TourCamp Server Has Started!");
});



/*
Campground.create(
    {
        name: "Guilin, China", 
        image: "https://cdn.tourradar.com/s3/tour/1500x800/169117_003eae5e.jpg"
    }, function(err, campground){
        if(err){
            console.log(err);
        } else {
            console.log("NEWLY CREATED CAMPGROUND: ");
            console.log(campground);
        }
    }); 
    

//res.render("campgrounds",{campgrounds:campgrounds});
var campgrounds = [
        {name: "Guilin, China", image: "https://cdn.tourradar.com/s3/tour/1500x800/169117_003eae5e.jpg"},
        {name: "Yuli County, China", image: "https://img.gmw.cn/images/attachement/jpg/site2/20191108/309c23cbaa431f2f427220.jpg"},
        // {name: "Xiaoqikong, Libo County, GuiZhou, China", image: "https://img.gmw.cn/images/attachement/jpg/site2/20200413/309c23cbaa431ffe1b4f41.jpg"},
        {name: "Moutain Goat's Rest", image: "https://img.gmw.cn/images/attachement/jpg/site2/20200413/309c23cbaa431ffe1b4f41.jpg"}
    ] */