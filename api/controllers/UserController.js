/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	'new': function(req, res) {
		res.view();
	},

	create: function(req, res, next) {

	    var userObj = {
	      firstName: req.param('firstName'),
	      lastName: req.param('lastName'),
	      email: req.param('email'),
	      password: req.param('password')
	    };

	    if ((userObj.firstName == null || userObj.firstName == '') ||
			(userObj.lastName == null || userObj.lastName == '') ||
			(userObj.email == null || userObj.email == '') ||
			(userObj.password == null || userObj.password == '')) {

			console.log("missing attributes");
			res.send({err: "All fields are required"});
			return;
		}

	    // Create a User with the params sent from 
	    // the sign-up form --> new.ejs
	    User.create(userObj, function userCreated(err, user) {

			if (err) {
				console.log("Error creating user");
				res.send({err: err});
				return;
			}


			// Log user in
			req.session.authenticated = true;
			req.session.User = user;

			console.log("User signed in.");
			res.send({user: user});
			return;

	    });
  	}
	
};

