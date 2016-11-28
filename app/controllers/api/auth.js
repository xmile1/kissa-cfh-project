'use strict';
/**
 * Module dependencies.
 */
let mongoose = require('mongoose');
let jwt = require('jsonwebtoken');
let config = require('../../../config/config.js');
let User = mongoose.model('User');
let bcrypt = require('bcryptjs');

class Auth  {

  login(req, res){
    User.findOne({email: req.body.email}, (err, user) => {
      if(err) {
        res.status(500).send(err);
      }
      if(!user){
        res.status(401).json({
          success: false,
          message: 'Authentication failed. User not found'
        });
      } else if (user){
        //if user exits but wrong password
        if(!user.authenticate(req.body.password)) {
          res.status(401).json({
            success: false,
            message: 'Authentication failed. Invalid Password'
          });
        } else {
          let token = jwt.sign (user, "kjzdfhkjhfghzkjvhkashd,hdjgvmbxmvzbvbc",{
            expiresIn: '24h'
          });
          res.status(200).json({
            success: true,
            message: 'Authentication successful. User logged in',
            token: token
          });
        }
      }
    });
  }
}
const auth = new Auth();
module.exports = auth;