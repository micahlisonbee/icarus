/**
 * HomeController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
	'index': function(req, res) {

		if (req.session.authenticated) {
			res.redirect('/dashboard');
			return;
		}

		res.view({
			_layoutFile: '../../views/layoutHome.ejs'
		});
	}

};

