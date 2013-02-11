var UsersModel = function () {

  this.defineProperties({
    username: {type: 'string', required: true},
    password: {type: 'string', required: true},
    count: {type: 'int', required: true},
  });

  this.adapter = 'postgres';
  this.validatesLength('username', {max: '128'});
  this.validatesLength('password', {max: '128'});

  /*
  this.property('lastName', 'string');
  this.property('firstName', 'string');

  this.validatesPresent('login');
  this.validatesFormat('login', /[a-z]+/, {message: 'Subdivisions!'});
  this.validatesLength('login', {min: 3});
  // Use with the name of the other parameter to compare with
  this.validatesConfirmed('password', 'confirmPassword');
  // Use with any function that returns a Boolean
  this.validatesWithFunction('password', function (s) {
      return s.length > 0;
  });

  // Can define methods for instances like this
  this.someMethod = function () {
    // Do some stuff
  };
  */

};


UsersModel.add = function add (username, password, callback) {
  var count = 0;
  if (!username || username=="" || username.length > 128) {
      var answerDict = {};
      answerDict.errCode = -3; //"ERR_BAD_USERNAME"
      return answerDict;
    } else if (!password || password=="" || password.length > 128){
      //Check if password is not empty and <128 chars
      var answerDict = {};
      answerDict.errCode = -4; //"ERR_BAD_PASSWORD"
      callback(answerDict);
    } else {
      //Add to database
      geddy.model.UsersModel.load({username: username}, function (err, result) {
      //geddy.db.users.findOne({username: user}, function(err, result){
        // if (err) {
        //   return callback(err, null);
        // }
        // if we already have the user, don't add another
        console.log("got error: " + err + " and result:" + result);
        if (result) {
          console.log("ERR_USER_EXISTS");
          var answerDict = {};
          answerDict.errCode = -2; //"ERR_USER_EXISTS"
          callback(answerDict);
        }
        // if we don't already have the user model, save a new one
        else {
          // todo.saved = true;
          var userInstance = geddy.model.UsersModel.create({username: username, password: password, count: 1});
          console.log("userInstance created: " + userInstance);
          console.log("userInstance count: " + userInstance.count);
          geddy.model.UsersModel.save(userInstance, function (err, results) {
          //geddy.db.users.save(todo, function(err, docs){
            //console.log("RESULT IS :" + results);
            console.log("Saved user instanc with error: " + err);
            console.log("results are: " + results);
            var answerDict = {};
            answerDict.errCode = 1; //"SUCCESS"
            answerDict.count = 1;
            console.log("SUCCESS");
            callback(answerDict);
            //return callback(err, docs);
          });
        }
      });
    }
};

UsersModel.getCount = function exists (username, password, callback) {
  geddy.model.UsersModel.load({username: username, password: password}, function (err, result){
  //geddy.db.users.findOne({username: user, password: password}, function(err, result){
    if (err) {
      callback(false);
    }
    // if we already have the user, update count
    if (result) {
      console.log("WE GOT A USER: " + result);
      result.updateProperties({count: result.count + 1});
      result.save(function(err, data) {
        if (err) {
          console.log("got an error updating count: " + err);
          callback(false);
        } else {
          console.log("updated count + 1 with data: " + data);
          callback(data.count);
        }
      });
    } else{
      //No user exists with this login
      callback(false);
    }
  });
};

UsersModel.TESTAPI_resetFixture = function TESTAPI_resetFixture (callback) {
  geddy.model.UsersModel.all(function (err, result) {
    console.log("got all users models with error: " + err + " and result: " + result);
    for (var userModel in result){
      console.log("trying to remove userModel: " + result[userModel]);
      geddy.model.UsersModel.remove(result[userModel].id);
    }
    callback({'errCode': null});
  });
};

UsersModel.TESTAPI_unitTests = function TESTAPI_unitTests (callback) {
  var successCount = 0;
  var failCount = 0;
  var tests = require('../test/users_model.js');
  console.log("found tests: " + tests);
  for (var key in tests){
    console.log("running test: " + key);
    try{
      geddy.test.tests[key]();
      successCount += 1;
    } catch(exception){
      failCount += 1;
    }
  }
  var answerDict = {};
  answerDict.totalTests = successCount + failCount;
  answerDict.nrFailed = failCount;
  answerDict.output = "Success";
  callback(answerDict);
};
/*
// Can also define them on the prototype
UsersModel.prototype.someOtherMethod = function () {
  // Do some other stuff
};
// Can also define static methods and properties
UsersModel.someStaticMethod = function () {
  // Do some other stuff
};
UsersModel.someStaticProperty = 'YYZ';
*/

UsersModel = geddy.model.register('UsersModel', UsersModel);

