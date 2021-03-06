    const passport = require('passport');
    const LocalStrategy = require('passport-local').Strategy;

    const User = require('../models/user');
    //authentication using passwport 



    passport.use(new LocalStrategy({

            usernameField: 'email'

        },
        function(email, password, done) {
            //find the user and establish the strategy
            User.findOne({
                email: email

            }, function(err, user) {
                console.log(email);
                if (err) {
                    console.log('Error in finding user--->passport');
                    return done(err);
                }
                if (!user || user.password != password) {
                    console.log('Invalid user name and password');
                    return done(null, false);
                }

                return done(null, user);
            });
        }
    ));

    //serialising the user to deside which keyis to kept in the cookies
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            if (err) {
                console.log('Error in finding user--->passport');
                return done(err);
            }
            return done(null, user);
        });
    });





    passport.checkAuthentication = function(req, res, next) {
        // if the user is signed in the pass on the request to the next function(controller's action)
        if (req.isAuthenticated()) {
            return next();
        }
        // if the user is not signed in
        return res.redirect('/users/sign_in');
    }



    passport.setAuthenticatedUser = function(req, res, next) {
        if (req.isAuthenticated()) {
            // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
            res.locals.user = req.user;
        }

        next();
    }



    module.exports = passport;