var nedb = require('nedb');

var db = new nedb({filename: 'db/automator_db'});
db.loadDatabase(function(err){
    if (err != null) 
    	console.log("LoadDatabase error : " + err);
});

module.exports = db;