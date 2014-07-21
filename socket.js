var db = require("./datastore");

var socketCb = function (socket){

    socket.on('cmd', function(cmd) {
        
        /*
        db.insert(cmd, function (err, newDoc) {
            console.log(err);
            console.log(newDoc);
        });

        db.find({id: '123344'}, function(err, docs){
            console.log(err);
            console.log(docs);
        });
        */
        
    });
}

module.exports = socketCb;