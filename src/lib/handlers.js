var helpers = require('./helpers');
var _data = require('./data');

var handlers = {};

handlers.createUser = function(data,callback) {

  var name     = typeof (data.payload.NAME) == 'string' && data.payload.NAME.trim().length > 0 ?  data.payload.NAME.trim() : false;
  var email    = helpers.validateMailAddress(data.payload.EMAIL);
  var address  = typeof (data.payload.ADDRESS) == 'string' && data.payload.ADDRESS.trim().length > 0 ?  data.payload.ADDRESS.trim() : false;
  var password = typeof (data.payload.PASSWORD) == 'string' && data.payload.PASSWORD.trim().length > 0 ?  data.payload.PASSWORD.trim() : false;

  if(name && email && address && password) {

    var userId = helpers.hash(email);
    _data.read('users',userId,(err,data) => {
      if(err) {
        var hashedPassword = helpers.hash(password);

        var userObject = {
          'USER_ID' : userId,
          'NAME' : name,
          'EMAIL' : email,
          'ADDRESS' : address,
          'PASSWORD' : hashedPassword
        };

        _data.create('users',userId,userObject,(err,data) => {
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

    var userId = typeof(data.payload.USER_ID) == 'string' && data.payload.USER_ID.trim().length > 0 ? data.payload.USER_ID.trim() : false;

    if(userId) {

        var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;

        helpers.verifyToken(userId,token,function(tokenIsValid) {
          if(tokenIsValid) {

              //TO do
              // check if user exist or not, if exist remove user details,tokens and cart

          }
          else {
            callback(403,{"eStatus" : "Missing required token in header, or token is invalid or token is expired."});
          }
        });

    }
    else {
      callback(500,{'eStatus':'Missing required fields.'});
    }
};

handlers.login = function(data,callback) {

  var email    = helpers.validateMailAddress(data.payload.EMAIL);
  var password = typeof (data.payload.PASSWORD) == 'string' && data.payload.PASSWORD.trim().length > 0 ?  data.payload.PASSWORD.trim() : false;

  if(email && password) {
    var userId = helpers.hash(email);
    var hashedPassword = helpers.hash(password);

    _data.read('users',userId,function(err,userData) {
      if(!err && userData) {

        if(hashedPassword == userData.PASSWORD) {
          var tokenId = helpers.createRandomToken(20);
          var expiryTime = Date.now() + 1000 * 60 * 60;
          var tokenObject = {
            'USER_ID' : userId,
            'TOKEN_ID' : tokenId,
            'EXPIRY_TIME' : expiryTime
          };

          _data.create('tokens',tokenId,tokenObject,function(err,tokenData) {
            if(!err) {
              callback(200,tokenObject);
            }
            else {
                callback(500,{'eStatus' : 'Could not create the new token'});
            }
          });

        }
        else {
          callback(400,{'eStatus' : 'Password did not match the specified user\'s stored password'});
        }

      }
      else {
        callback(400,{'eStatus' : 'Could not find the specified user.'});
      }
    });

  }
  else {
    callback(500,{'eStatus':'Missing required fields or user corresponds to mail account '+email+' does not exist'});
  }
};

handlers.logout = function(data,callback) {

};

handlers.showMenu = function(data,callback) {

};

handlers.notFound = function(data,callback) {
  callback(404);
};

module.exports = handlers;
