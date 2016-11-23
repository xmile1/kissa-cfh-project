'use strict';
let mongoose = require('mongoose');
const User = mongoose.model('User'),
	   jwt = require('jsonwebtoken'),
	   config = require('../../config/env/all');

module.exports.login = (req, res) => {
	User.findOne({email: req.body.email}, (err, user) => {
		if (err) return err;
		//check if email does not exists
		if (!user) {
			res.json({success: false, message: 'Incorrect email or password'});
		} else {
			//check if user password against the one the database
			if (!user.authenticate(req.body.password)) {
				res.json({success: false, message: 'Authentication failed'});
			} else {
				//if everyhing is fine, assign a token to the user
				const token = jwt.sign(user, config.secret, {expiresIn: '24h'});
				res.json({success: true, message: 'Login is successfull', token: token});
			}
		}
	});
}
