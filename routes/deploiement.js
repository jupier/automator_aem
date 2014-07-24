var express = require('express');
var router = express.Router();
var db = require("../datastore");

var argumentsFormatter = function(req, validationErrors, error, success) {
	return {
		success: success,
		error: error,
		errors: validationErrors,
	    name: req.query.name,
	    goals: req.query.goals || '', 
	    profile: req.query.profile || '',
	    title: 'Deploiement',
	    path: req.originalUrl
	};
};

router.get('/', function(req, res) {
	res.render('deploiement', argumentsFormatter(req, null, null, null));
});

router.get('/add', function(req, res) {
	req.checkQuery('name', 'Le nom est requis (champ alphanuméric entre 5 et 15 caractères)').notEmpty().isLength(5, 15);
	req.checkQuery('goals', 'Le goals est requis (champ alpha)').notEmpty();
	req.checkQuery('profile', 'Le profile est requis (champ alpha)').notEmpty();
	req.checkQuery('folder', 'Le dossier est requis (champ alpha)').notEmpty();

	var errors = req.validationErrors();
	if (errors)
	{
		res.render('deploiement', argumentsFormatter(req, errors, null, null));
		return ;
	}
	db.find({deploiement_name: req.query.name}, function (err, docs) {
		if (docs != null && docs.length == 0)
		{
			db.insert({
				deploiement_name: req.query.name,
				deploiement_goals: req.query.goals,
				deploiement_profile: req.query.profile,
				deploiement_folder: req.query.folder
				}, function(err, docs) {
					if (err == null)
						res.render('deploiement', argumentsFormatter(req, null, null, "Le job a été créé avec succès"));
					else
						res.render('deploiement', argumentsFormatter(req, null, "Une erreur s'est produite pendant la création du job", null));
				});
		}
		else
			res.render('deploiement', argumentsFormatter(req, null, "Un job du même nom existe déjà", null));
	});

});

router.get('/list', function(req, res) {
	db.find({deploiement_name:{$exists: true}}, function(err, docs){
		res.json(docs);
	})
});

module.exports = router;