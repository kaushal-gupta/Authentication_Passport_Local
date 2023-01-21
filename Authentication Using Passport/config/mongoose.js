const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/codeial_development');

const db = mongoose.connection;

db.once('error', console.error.bind(console,'Error in connection to DB'));
db.once('open', function(){
    console.log('Connected to database :: MongoDB');
})

module.exports = db;