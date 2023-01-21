const User = require('../models/users');

module.exports.profile = function(req,res){
    return res.render('user_profile',{
        title:'profile'
    })
}

//render the sign up page
module.exports.signUp=function(req,res){
    //not letting the authenticated user signup while there is session cookie exists
    if(req.isAuthenticated()){
       return res.redirect('/users/profile');
    }

    return res.render('user_sign_up',{
        title:'Codeial | SignUp'
    })
}


//render the sign in page
module.exports.signIn=function(req,res){
     //not letting the authenticated user sign in while there is session cookie exists
     if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title:'Codeial | SignIn'
    })
}

//get the sign up data
module.exports.create = function(req,res){
    if(req.body.password!=req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email:req.body.email},function(err,user){
        if(err){console.log('Error in finding the user in sign up page'); return;}

        if(!user){
            User.create(req.body,function(err, user){
                if(err){console.log('Error in creating the user in sign up page'); return;}
                
                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }
    })
}

//sign in and create the session
module.exports.createSession = function(req,res){
    return res.redirect('/');
}

//sign out and clear session
module.exports.clearSession = function(req, res){
    req.logout(function(err){
        if(err){
            console.log('Error in logging out')
            return res.redirect('back');
        }
    });
    res.redirect('/');
}