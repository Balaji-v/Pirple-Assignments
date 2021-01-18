var helpers = {};

helpers.parseJsonToObject = function(data) {
  try{
    var obj = JSON.parse(str);
    return obj;
  } catch(e){
    return {};
  }
};

helpers.validateMailAddress = function () {
  //To DO
};

helpers.hash = function() {
  //To DO
};

helpers.verifyToken = function(userId,token,callback) {
  //To Do
};

helpers.createRandomToken = function(StrLen) {
  //To DO
};

module.exports = helpers;
