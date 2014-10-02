/**
 * SyncSpaceController
 *
 * @description :: Server-side logic for managing syncspaces
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	create: function(req, res, next) {

	    var syncSpaceObj = {
	      name: req.param('name'),
	      user: req.param('user'),
	      url: "http://synchrodev.com/1234567abcdefg"
	    };

	    if ((syncSpaceObj.name == null || syncSpaceObj.name == '') ||
	    	(syncSpaceObj.user == null || syncSpaceObj.user == '')) {

			console.log("missing attributes");
			res.send({err: "All fields are required"});
			return;
		}

	    SyncSpace.create(syncSpaceObj, function syncSpaceCreated(err, syncSpace) {

			if (err) {
				console.log("Error creating sync space");
				res.send({err: err});
				return;
			}

			console.log("Sync Space Created");
			res.send({syncSpace: syncSpace});
			return;

	    });
  	}
	
};

