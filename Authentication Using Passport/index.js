const express = require('express');
const app = express();
const port = 8000;
const cookieParser =require('cookie-parser');
const db = require('./config/mongoose')

//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

const MongoStore = require('connect-mongo');

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'))

const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
//Extract styles and js from sub pages into layouts

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);




app.set('view engine','ejs');
app.set('views', './views');

app.use(session({
    name:'codeial',
    //Changed the secert key before the deployement in production mode
    secret: 'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100) 
    },
    store:  MongoStore.create({

        autoRemove:'disabled',

        mongoUrl:'mongodb://localhost/codeial_development'
    },
    function(err){
        console.log(err||'connect-mongoDB setup');
    }
    )

}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log(`Error: ${err}`);
    }

    console.log(`Server is running on the port ${port}`);
})