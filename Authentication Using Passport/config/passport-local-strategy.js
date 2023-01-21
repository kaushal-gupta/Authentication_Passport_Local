const passport = require('passport');
const User = require('../models/users');


const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
    usernameField:'email'
    },
    function(email, password, done){
        //find a user and establish the identity
        User.findOne({email:email},function(err,user){
            if(err){
                console.log('Error in finding user ---> Passport');
                return done(err);
            }

            //user is not found or entered password doesnt match
            if(!user || user.password != password){
                console.log("Invalid user or password");
                return done(null,false);
            }
            //user is found
            return done(null,user);
        })

    }
));

// serializing the user to decide which key is to kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
})

//de-serialzing the user from the key in the cookies

passport.deserializeUser(function(id,done){
    User.findById(id, function(err,user){
        if(err){
            console.log('Error in finding user ---> Passport');
            return done(err);
        }
        return done(null, user);
    })
})

//Checking the request is authenticated or not

passport.checkAuthentication= function(req,res,next){
   //if use is authenticated(signed in)
    if(req.isAuthenticated()){
        return next();
    }

    //if user is not authenticated
    return res.redirect('/users/sign-in');

}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from session cookie
        //and we are sending this to locals for views
        res.locals.user = req.user;
    }
    next();

}

module.exports = passport;