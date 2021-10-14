const Post = require('../models/post');
const User = require('../models/user');
module.exports.home = function(req, res) {
    // Post.find({}, function(err, posts) {

    //     return res.render('home', {
    //         title: "Home",
    //         posts: posts
    //     });

    // })

    Post.find({}).
    populate('user').
    populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        }) // only return the user name
        .exec(function(err, posts) {

            User.find({}, function(err, users) {


                if (err) return handleError(err);
                return res.render('home', {
                    title: "Home",
                    posts: posts,
                    all_user: users

                });
            });
        });



}