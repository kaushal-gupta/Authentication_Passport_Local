const express= require('express');
const routes = express.Router();
const passport = require('passport');

const userController = require('../controllers/user_controller');

routes.use('/profile',passport.checkAuthentication,userController.profile);


routes.get('/sign-in',userController.signIn);
routes.get('/sign-up',userController.signUp)

routes.post('/create',userController.create);

//use passport as middleware to authenticate
routes.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'},
),userController.createSession);


routes.get('/sign-out',userController.clearSession);

module.exports=routes;