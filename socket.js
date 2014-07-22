var db = require("./datastore");
var spawn = require('child_process').spawn;
var exec = require('child_process').exec;

var socketCb = function (socket){

    socket.on('cmd', function(cmd) {
        var id = cmd.id.replace("cmd_", "");

        db.find({"_id": id}, function(err, docs){
        	//socket.emit('cmd_data', {data: "Mensarum enim voragines et varias voluptatum inlecebras, ne longius progrediar, praetermitto illuc transiturus quod quidam per ampla spatia urbis subversasque silices sine periculi metu properantes equos velut publicos signatis quod dicitur calceis agitant, familiarium agmina tamquam praedatorios globos post terga trahentes ne Sannione quidem, ut ait comicus, domi relicto. quos imitatae matronae complures opertis capitibus et basternis per latera civitatis cuncta discurrunt."});
            //var child = spawn('ls', ['-laR', '/etc/']);
            
            if (docs != [])
            {
                exec('mvn', function (error, stdout, stderr) {
                    if (stderr != "")
                        socket.emit('cmd_data', {data: stderr});
                    else
                    {
                        var doc = docs[0];
                        var child = spawn('mvn', [doc.deploiement_goals, doc.deploiement_profile]);
                        child.stdout.on('data', function(data) {
                            socket.emit('cmd_data', {data: data.toString()});
                        });
                    }
                   
                 });
            }

        });
    });
}

module.exports = socketCb;