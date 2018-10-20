const open = require('open');

var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');
var cors        = require('cors');

app.use(cors())

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});

mongoose.Promise = require('bluebird')
var promise = mongoose.connect('mongodb://localhost/test_crawler', {
    useMongoClient: true
});

// DEFINE MODEL
var archive = require('./models/archive');

// [CONFIGURE APP TO USE bodyParser]
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// [CONFIGURE SERVER PORT]

var port = process.env.PORT || 28082;

// [CONFIGURE ROUTER]
var router = require('./routes')(app, archive);

// [RUN SERVER]
var server = app.listen(port, function(){
 console.log("Express server has started on port " + port)
});