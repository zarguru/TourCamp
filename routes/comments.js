var express = require("express");
var router  = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");

// ============================
// COMMENT Rounte
// ============================

router.get("/new", isLoggedIn, function(req, res){
    // res.send("THIS WILL BE THE COMMENT FORM!");
    // find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("./comments/new", {campground: campground});  // "./comments/new", NOT "comments/new"
        }
    });
});

router.post("/", function(req, res){
    // lookup campground using ID
    Campground.findById(req.params.id, function(err, campground) {
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            // console.log(req.body.comment);
            // var text = req.body.
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    // Creat new comment
                    campground.comments.push(comment);
                    // Connect new comment to campground
                    campground.save();
                    // redirect campground show page
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });
});

//COMMENTS EDIT ROUTE
router.get("/:comment_id/edit", checkCommentOwnership, function(req, res){
    //res.send("EDIT ROUTE FOR COMMENT");
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if(err){
            res.redirect("back");
        } else {
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
        }
    });
});

// COMMENT UPDATE
//campgrounds/:id/comments/:comment_id
router.put("/:comment_id", checkCommentOwnership, function(req, res){
    // res.send("YOU HIT THE UPDATE ROUTE COMMENTS");
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// COMMENT DESTROY ROUTE
router.delete("/:comment_id", checkCommentOwnership, function(req, res){
    //findByIdAndRemove
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// middlewares
function checkCommentOwnership(req, res, next) {
    // is user logged in?
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect("back");
            } else {
                // does user own the comment?
                if(foundComment.author.id.equals(req.user._id)){  //req.user && 
                    // res.render("campgrounds/edit", {campground: foundCampground});
                    next();
                } else {
                    // res.send("YOU DO NOT HAVE PERMISSION TO DO THAT!");
                    res.redirect("back");
                }
            }
        });
    } else {
        // console.log("YOU NEED TO BE LOGGED IN TO DO THAT!!!");
        // res.render("login");
        // res.send("YOU NEED TO BE LOGGED IN TO DO THAT!!!");
        res.redirect("back");
    }
}

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;