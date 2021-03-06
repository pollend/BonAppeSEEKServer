var express = require('express');
var session = require('express-session');

var app = express();


//used for the jade template engine
var jade = require('jade');
app.set('view engine', 'jade');

//linking bower components and public folder
app.use('/b_public', express.static("bower_components"));
app.use('/public', express.static("public"));

//globals------------------------------------------------------------------
global.__config = require("./config.js");

global.__base = __dirname + '/';


app.use(session({
    secret: __config.token_salt,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 100000
    }
}));



//initialize --------------------------------------------------------------
//
//creates the database model
require("./database/database.js")();

//sets up the basic web pages displayed
//require("./webpage/base.js")(app);

//used for rest interface
require("./restful/base.js")(app);


//creates the server-------------------------------------------------------
var server = app.listen(3000, function() {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Created Server at http://%s:%s', host, port);

});

app.get("/*", function(req, res) {
    res.sendFile(__base + "/public/html/index.html");
});