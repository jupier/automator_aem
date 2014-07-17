var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var io = require('socket.io');
var nedb = require('nedb');

var index = require('./routes/index');
var deploiement = require('./routes/deploiement');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/deploiement', deploiement);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// datastore
var db = new nedb({filename: 'db/automator_db'});
db.loadDatabase(function(err){
    if (err != null) console.log("loadDatabase error : " + err);
});

// socket.io configuration
var server = http.Server(app);
var socket = io(server);
socket.on('connection', function(socket){

    socket.on('cmd', function(cmd) {
        
        db.insert(cmd, function (err, newDoc) {
            console.log(err);
            console.log(newDoc);
        });

        db.find({id: '123344'}, function(err, docs){
            console.log(err);
            console.log(docs);
        });

    });

    socket.on('disconnect', function() {

    });

});

module.exports = server;