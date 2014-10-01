/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var bcrypt = require('bcrypt');

module.exports = {

	'new': function(req, res) {
		res.view();
	},

	create: function(req, res, next) {

		// Check for email and password in params sent via the form,
		if (!req.param('email') || !req.param('password')) {

			console.log("no email/password");
			res.send({err: "Email and Password are both required."});
			return;
		}

		// Try to find the user by their email address. 
		// findOneByEmail() is a dynamic finder in that it searches the model by a particular attribute.

		console.log("Looking up user");
		console.log(req.param('email'));
		User.findOneByEmail(req.param('email'), function foundUser(err, user) {
			if (err) {
				console.log("Error finding user");
				res.send({err: "Error in query"});
				return;
			}
			
			// If no user is found...
			if (!user) {
				console.log("User not found");
				res.send({err: "User with that email not found."});
				return;
			}

			// // Compare password from the form params to the encrypted password of the user found.
			console.log("verifying password");
			// console.log("password param: " + req.param('password'));
			// console.log("user hash: " + user.password);
			bcrypt.compare(req.param('password'), user.password, function(err, valid) {
				if (err) {
					console.log(err);
					res.send({err: "Error validating password."});
					return;
				}

				// If the password from the form doesn't match the password from the database...
				if (!valid) {
					console.log("Password is incorrect.");
					res.send({err: "Password is incorrect."});
					return;
				}

				// Log user in
				req.session.authenticated = true;
				req.session.User = user;

				console.log("User signed in.");
				res.send({user: user});
				return;
				
			});
		});
	},

	destroy: function(req, res, next) {

		User.findOne(req.session.User.id, function foundUser(err, user) {

			var userId = req.session.User.id;

			if (user) {
				// The user is "logging out" (e.g. destroying the session)
				// Wipe out the session (log out)
				req.session.destroy();

				// Redirect the browser to the sign-in screen
				res.redirect('/session/new');
			} else {

				// Wipe out the session (log out)
				req.session.destroy();

				// Redirect the browser to the sign-in screen
				res.redirect('/session/new');
			}
		});
	}
};

