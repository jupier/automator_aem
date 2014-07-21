var db = require("./datastore");
var spawn = require('child_process').spawn;

var socketCb = function (socket){

    socket.on('cmd', function(cmd) {
        var id = cmd.id.replace("cmd_", "");

        db.find({"_id": id}, function(err, docs){
            var child = spawn('ls', ['-la', '/etc/']);
            child.stdout.on('data', function(data) {
                socket.emit('cmd_data', {data: data.toString()});
            });
        });
    });
}

module.exports = socketCb;