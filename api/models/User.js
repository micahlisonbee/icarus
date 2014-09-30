/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	// Only save these attributes, not other auto attributes like CSRF
	schema: true,

	attributes: {
		firstName: {
			type: 'string',
			required: true

		},

		lastName: {
			type: 'string',
			required: true
		},

		email: {
			type: 'string',
			required: true,
			email: true,
			unique: true
		},

		password: {
			type: 'string',
			required: true
		},

		syncSpaces:{
			collection: 'syncSpace',
			via: 'user'
		},

		// Override toJSON and take out certain attributes
		toJSON: function() {
			var obj = this.toObject();
			delete obj.password;
			return obj;
		}

	},

	beforeCreate: function (values, next) {

		// Add check here if desired to confirm pass and pass confirmation match

		require('bcrypt').hash(values.password, 10, function passwordEncrypted(err, encryptedPassword) {
			if(err) return next(err);
			values.password = encryptedPassword;
			next();
		});
	}
};

