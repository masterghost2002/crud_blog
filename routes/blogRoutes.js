const express = require('express');
const blogRouter = express.Router();
const mongoose = require('mongoose');
const Blog = require('../database/models/blogModel');

// by default our rout is addOrEdit page
// localhost:3000/ will render the addOrEdit blog view
blogRouter.get('/', (req, res) => {
    res.render("blogs/addOrEdit", {
        viewTitle: "Add Blog",
        btn: "Add" //by default we will have add button instead of update
    });
});


//add blog --> when we click on the addBlog from addOrEdit will be redirected to /addBlog
// is the body._id == "" will call the addBlog thats mean we are adding a new blog
// else we are updating the blog
blogRouter.post('/addBlog', (req, res) => {
    if (req.body._id == "")
        addBlog(req, res);
    else
        updateBlog(req, res);
});


// this rout  will show all the blogs till now 
// when  we click view all blogs from the addOrEdit blog will be redirected to /monkeyblogs
blogRouter.get('/monkeyblogs', (req, res) => {
    Blog.find((err, blogs) => {
        if (!err) {
            res.render("blogs/viewBlogs", {
                blogs: blogs
            });
        }
        else {
            res.send("Unable To Fetch Blogs: " + err);
        }
    });
});


// when we click on edit button the id is passed as params /Blog._id
// will render blogs/addOrEdit page but now with the values of blog that we are updating
blogRouter.get('/:id', (req, res) => {
    Blog.findById(req.params.id, (err, result) => {
        if (!err) {
            res.render("blogs/addOrEdit", {
                viewTitle: "Update Blog",
                Blog: result, // replace the blog null values by currently updating blog values
                btn: "Update" // replace the btn with update
            });
        }
        else 
            res.send("Error while updating: " + err);
    });
});


// here are the add and update function for blog
    //if add blog success then redirect to /monkeyblogs (viewall blogs)
function addBlog(req, res) {
    let blog = new Blog({
        title: req.body.title,
        author: req.body.author,
        userName: req.body.userName,
        description: req.body.description,
        likes: 0,
        dislike: 0
    });
    blog.save((err, result) => {
        if (!err) 
            res.redirect('/monkeyblogs');
        else 
            res.send("Unable To add blog: " + err);
    });
};

    // if updating success redirect to view blogs
function updateBlog(req, res) {
    Blog.findOneAndUpdate({_id: req.body._id},
    {
        title: req.body.title,
        author: req.body.author,
        userName: req.body.userName,
        description: req.body.description,
        likes: req.body.likes,
        dislike: req.body.dislike
    },
        { new: true },
        (err, result) => {
            if (!err)
                res.redirect('/monkeyblogs');
            else 
                res.send("Error while updating: " + err);
        }
    )
}


// search api search by id
blogRouter.get('/searchblog', (req, res) => {
    Blog.findById({ _id: req.query._id }, (err, blog) => {
        if (!err) {
            res.render("/viewBlogs", {
                blogs: blog
            });
        }
        else 
            res.send("No blog to particular id is found: " + err);
    })
});

// delete blog

blogRouter.get('/delete/:id', (req, res) => {
    Blog.findByIdAndDelete(req.params.id, (err, result) => {
        if (!err) {
            res.redirect("/monkeyblogs");
        }
        else {
            res.send("Error while deletion: " + err);
        }
    })
});
module.exports = blogRouter;
