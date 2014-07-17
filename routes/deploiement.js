var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	res.render('deploiement', { title: 'Deploiement', path: req.originalUrl });
});

module.exports = router;