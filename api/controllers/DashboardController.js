/**
 * DashboardController
 *
 * @description :: Server-side logic for managing dashboards
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	'index': function(req, res) {


		var user = req.session.User;

		SyncSpace.find({user: user.id}).then(function(syncSpaces) {

			console.log(syncSpaces);
			res.view('', {
				user: user,
				syncSpaces: syncSpaces
			});

		})
		.catch(function(err){
		  console.log("error occured: " + err);
		});
		
	}
	
};

