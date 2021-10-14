//const express = require("express");
const User = require('../models/user');
module.exports.profile = function(req, res) {
    User.findById(req.params.id, function(err, user) {

        return res.render('user_profile', {
            title: 'User Profile',
            profile_user: user
        });
    });
}
module.exports.friend = function(req, res) {
    res.end('<h1>Friends Section</h1>')
}

//render the sign up page
module.exports.signUp = function(req, res) {
        if (req.isAuthenticated()) {
            return res.redirect('/users/profile');
        }
        return res.render('user_sign_up', {
            title: "codeial | signup"

        });
    }
    //render the sign in page
module.exports.signIn = function(req, res) {

    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
}



///get the sign up data
module.exports.create = function(req, res) {
    //check password and confirm password should same
    if (req.body.password != req.body.confirm_password) {
        console.log('Not matcing p and cp');
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
                console.log('line no 49 create');
                return res.redirect('/users/sign_in');
            });
        } else {
            console.log('line no 53 create');
            return res.redirect('back');
        }

    });

}

//create session and sign in the users

module.exports.createSession = function(req, res) {

    return res.redirect('/');


    //Steps to authenticate

    // //find the user



}
module.exports.destroySession = function(req, res) {
    req.logout();
    return res.redirect('/');
}