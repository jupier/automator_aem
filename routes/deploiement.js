var express = require('express');
var router = express.Router();
var db = require("../datastore");

/* GET home page. */
router.get('/', function(req, res) {
	res.render('deploiement', { title: 'Deploiement', path: req.originalUrl });
});

router.get('/add', function(req, res) {
	req.checkQuery('name', 'Le nom est requis (champ alphanuméric entre 5 et 15 caractères)').notEmpty().isLength(5, 15);
	req.checkQuery('goals', 'Le goals est requis (champ alpha)').notEmpty();
	req.checkQuery('profile', 'Le profile est requis (champ alpha)').notEmpty();
	req.checkQuery('folder', 'Le dossier est requis (champ alpha)').notEmpty();
	req.checkQuery('name', 'caca').jobAllreadyExists();

	var errors = req.validationErrors();
	if (errors)
	{
		res.render('deploiement', {
			errors: errors,
		    name: req.query.name,
		    goals: req.query.goals || '', 
		    profile: req.query.profile || '',
		    title: 'Deploiement',
		    path: req.originalUrl
		});
		return ;
	}

	res.render('deploiement', {
			success: "Le job " + req.query.name + " a été créé avec succès",
			name: req.query.name,
		    goals: req.query.goals || '', 
		    profile: req.query.profile || '',
			title: 'Deploiement', 
			path: req.originalUrl 
		});
});

module.exports = router;