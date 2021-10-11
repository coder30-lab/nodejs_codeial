//const express = require("express");
const User = require('../models/user');
module.exports.profile = function(req, res) {

    if (req.cookies.user_id) {

        User.findById(req.cookies.user_id, function(err, user) {
            if (user) {
                return res.render('user_profile', {
                    title: "User_profile",
                    user: user
                });
            } else {
                // console.log('in else of line no 14');
                return res.redirect('/users/sign_in');
            }
        });


    } else {
        // console.log('in else of line no 21');
        return res.redirect('/users/sign_in');
    }

}
module.exports.friend = function(req, res) {
    res.end('<h1>Friends Section</h1>')
}

//render the sign up page
module.exports.signUp = function(req, res) {
        return res.render('user_sign_up', {
            title: "codeial | signup"

        });
    }
    //render the sign in page
module.exports.signIn = function(req, res) {
    return res.render('user_sign_in', {
        title: "codeial | signIn"

    });
}


///get the sign up data
module.exports.create = function(req, res) {
    //check password and confirm password should same
    if (req.body.password != req.body.confirm_password) {

        return res.redirect('back');
    }
    User.findOne({
        email: req.body.email
    }, function(err, user) {
        if (err) {
            console.log('error in finding user  in signing up');
            return
        }
        if (!user) {
            User.create(req.body, function(err, user) {
                if (err) {
                    console.log('error in creating user and  signing up');
                    return
                }
                console.log('line no 47');
                return res.redirect('/users/sign_in');
            });
        } else {
            return res.redirect('back');
        }

    });

}

//create session and sign in the users
module.exports.createSession = function(req, res) {
    //Steps to authenticate

    //find the user
    User.findOne({
        email: req.body.email
    }, function(err, user) {
        if (err) {
            console.log('error in Finding the user user');
            return
        }
        //handle user found
        if (user) {
            //handle password which does not matched
            if (user.password != req.body.password) {
                return res.redirect('back');
            }
            //handle session creation
            res.cookie('user_id', user.id);
            return res.redirect('/users/profile');
        }
        //handle user not found
        else {
            return res.redirect('back');
        }


    });



}