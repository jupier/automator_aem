var db = require("../datastore");
var express = require('express');
var router = express.Router();

var argumentsFormatter = function(req) {
	return {
	    title: 'Configuration',
	    path: req.originalUrl,
	    cmds: ['java', 'maven', 'vault'],
	};
};

router.get('/', function(req, res) {
	res.render('configuration', argumentsFormatter(req));
});

router.get('/check', function(req, res) {
	db.find({check_cmd: {$exists: true}, isOk: false}, function(err, docs){
		if (docs.length == 0)
			res.json({isOk: true});
		else
			res.json({isOk: false});
	});
});

module.exports = router;
