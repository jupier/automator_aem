var express = require('express');
var router = express.Router();

var argumentsFormatter = function(req) {
	console.log(req);
	return {
	    title: 'Configuration',
	    path: req.originalUrl
	};
};

router.get('/', function(req, res) {
	res.render('configuration', argumentsFormatter(req));
});

module.exports = router;
