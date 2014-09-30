/**
 * DashboardController
 *
 * @description :: Server-side logic for managing dashboards
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	'index': function(req, res) {

		User.findOne()
		.where({id: 1})
		.then(function(user) {
			SyncSpace.find({user: user.id}).then(function(syncSpaces) {

				console.log(syncSpaces);
				res.view('', {
					user: user,
					syncSpaces: syncSpaces
				});

			});
		})
		.catch(function(err){
		  console.log("error occured: " + err);
		});


		
	}
	
};

