var helpers = require('./helpers');
var _data = require('./data');

var handlers = {};

handlers.createUser = function(data,callback) {

  var name     = typeof (data.payload.NAME) == 'string' && data.payload.NAME.trim().length > 0 ?  data.payload.NAME.trim() : false;
  var email    = helpers.validateMailAddress(data.payload.EMAIL);
  var address  = typeof (data.payload.ADDRESS) == 'string' && data.payload.ADDRESS.trim().length > 0 ?  data.payload.ADDRESS.trim() : false;
  var password = typeof (data.payload.PASSWORD) == 'string' && data.payload.PASSWORD.trim().length > 0 ?  data.payload.PASSWORD.trim() : false;

  if(name && email && address && password) {

    var hashedEmail = helpers.hash(email);
    _data.read('users',hashedEmail,(err,data) => {
      if(err) {
        var hashedPassword = helpers.hash(password);

        var userObject = {
          'NAME' : name,
          'EMAIL' : email,
          'ADDRESS' : address,
          'PASSWORD' : hashedPassword
        };

        _data.create('users',hashedEmail,userObject,(err,data) => {
          if(!err) {
            callback(200,{'sStatus':'User created succesfully'});
          }
          else {
            callback(500,{'eStatus':'Count not create new user'});
          }
        });
      }
      else {
        callback(500,{'eStatus':'User already exist in database,Please login...'});
      }
    })
  }

  else {
    callback(400,{'eStatus':'Missing mandatory fields'});
  }

};

handlers.editUser = function(data,callback) {

};

handlers.removeAccount = function(data,callback) {

};

handlers.login = function(data,callback) {

};

handlers.logout = function(data,callback) {

};

handlers.showMenu = function(data,callback) {

};

handlers.notFound = function(data,callback) {
  callback(404);
};

module.exports = handlers;
