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
  if (!username || username.length == 0 || username.length > 128) {
      console.log("bad username block");
      var answerDict = {};
      answerDict.errCode = -3; //"ERR_BAD_USERNAME"
      callback(answerDict);
    } else if (!password || password.length == 0 || password.length > 128){
      console.log("bad password block");
      //Check if password is not empty and <128 chars
      var answerDict = {};
      answerDict.errCode = -4; //"ERR_BAD_PASSWORD"
      callback(answerDict);
    } else {
      console.log("add to database block");
      //Add to database
      geddy.model.UsersModel.load({username: username}, function (err, result) {
      //geddy.db.users.findOne({username: user}, function(err, result){
        // if (err) {
        //   return callback(err, null);
        // }
        // if we already have the user, don't add another
        // console.log("got error: " + err + " and result:" + result);
        if (result) {
          // console.log("ERR_USER_EXISTS");
          var answerDict = {};
          answerDict.errCode = -2; //"ERR_USER_EXISTS"
          callback(answerDict);
        }
        // if we don't already have the user model, save a new one
        else {
          // todo.saved = true;
          var userInstance = geddy.model.UsersModel.create({username: username, password: password, count: 1});
          // console.log("userInstance created: " + userInstance);
          // console.log("userInstance count: " + userInstance.count);
          geddy.model.UsersModel.save(userInstance, function (err, results) {
          //geddy.db.users.save(todo, function(err, docs){
            //console.log("RESULT IS :" + results);
            // console.log("Saved user instance with error: " + err);
            // console.log("results are: " + results);
            var answerDict = {};
            answerDict.errCode = 1; //"SUCCESS"
            answerDict.count = 1;
            // console.log("SUCCESS");
            callback(answerDict);
            //return callback(err, docs);
          });
        }
      });
    }
};

UsersModel.login = function exists (username, password, callback) {
  geddy.model.UsersModel.load({username: username, password: password}, function (err, result){
  //geddy.db.users.findOne({username: user, password: password}, function(err, result){
    if (err) {
      //"ERR_BAD_CREDENTIALS"
      // console.log("ERR_BAD_CREDENTIALS ");
      var answerDict = {};
      answerDict.errCode = -1;
      callback(answerDict);
    }
    // if we already have the user, update count
    if (result) {
      // console.log("WE GOT A USER: " + result);
      result.updateProperties({count: result.count + 1});
      result.save(function(err, data) {
        if (err) {
          // console.log("got an error updating count: " + err);
          //"ERR_BAD_CREDENTIALS"
          // console.log("ERR_BAD_CREDENTIALS ");
          var answerDict = {};
          answerDict.errCode = -1;
          callback(answerDict);
        } else {
          // console.log("updated count + 1 with data: " + data);
          //"SUCCESS"
          // console.log("SUCCESS with Count: " + data.count);
          var answerDict = {};
          answerDict.errCode = 1;
          answerDict.count = data.count;
          callback(answerDict);
        }
      });
    } else{
      //No user exists with this login
      //"ERR_BAD_CREDENTIALS"
      // console.log("ERR_BAD_CREDENTIALS ");
      var answerDict = {};
      answerDict.errCode = -1;
      callback(answerDict);
    }
  });
};

UsersModel.TESTAPI_resetFixture = function TESTAPI_resetFixture (callback) {
  geddy.model.UsersModel.all(function (err, result) {
    // console.log("got all users models with error: " + err + " and result: " + result);
    for (var userModel in result){
      // console.log("trying to remove userModel: " + result[userModel]);
      geddy.model.UsersModel.remove(result[userModel].id);
    }
    callback({'errCode': 1}); //"SUCCESS"
  });
};

UsersModel.TESTAPI_unitTests = function TESTAPI_unitTests (callback) {
  //Remove all database entries
  UsersModel.TESTAPI_resetFixture(function (nothingImportant){
    var successCount = 0;
    var failCount = 0;
    var tests = require('../../test/users_model.js');
    var failedTests = "";

    var numberOfTests = 0;
    for (var key in tests){
      numberOfTests += 1;
    }
    console.log("There are " + numberOfTests + " tests to run.");
    var currentTestNumber = -1;
    // var numberOfTestsCompleted = 0;

    var done = function done(){
      var answerDict = {};
      answerDict.totalTests = successCount + failCount;
      answerDict.nrFailed = failCount;
      if (failCount == 0){
        answerDict.output = "All tests passed";
      } else {
        answerDict.output = failedTests;
      }
      callback(answerDict);
    };

    var runTests = function runTests(didTestPass){
      //Don't do anything for the first run
      if (currentTestNumber !== -1){
        //Save info from previous test
        if (!didTestPass){
          failCount += 1;
          failedTests += "Test " + currentTestNumber + ": FAILED.    ";
          console.log("Test " + currentTestNumber + ": FAILED.");
        } else{
          successCount += 1;
          console.log("Test " + currentTestNumber + ": PASSED.");
        }
      }
      //Now we run the next test
      currentTestNumber += 1;
      console.log("running test: " + currentTestNumber + " and there are :" + numberOfTests + " total tests");
      if (currentTestNumber >= numberOfTests){
        //Done running all tests
        console.log("running done now");
        done();
      } else{
        // try{
          //Run next test and pass this function as callback for next function
          tests[currentTestNumber](runTests);
        // } catch (exception) {
        //   console.log("Got exception: " + exception);
        //   failCount += 1;
        //   failedTests += currentTestNumber + ": FAILED.    ";
        // }
        // numberOfTestsCompleted++;
      }
    };


    //Start running tests
    runTests();





    // for (var key in tests){
    //   currentTestNumber++;
    //   while (numberOfTestsCompleted != currentTestNumber - 1){
    //     //wait for previous test to finish
    //   }
    //   console.log("running test: " + key);
    //   tests[key](function (succeeded){
    //     console.log(key + " succeeded = " + succeeded);
    //     if (succeeded){
    //       successCount += 1;
    //     } else {
    //       // console.log("Got exception: " + exception);
    //       failCount += 1;
    //       failedTests += key + ": FAILED.    ";
    //     }
    //     numberOfTestsCompleted++;
    //   });
    // }
    // while (numberOfTestsCompleted < numberOfTests){
    //   //do nothing
    // }

    
    // desc('Runs the Jake tests.');
    // task('test', {async: true}, function () {

      // tests.run(function (results, err){
      //   //print out results
      //   console.log("Results of the tests: " + results);
      //   var answerDict = {};
      //   answerDict.totalTests = results.total;
      //   answerDict.nrFailed = results.broken;
      //   answerDict.output = "WOOHOO";
      //   callback(answerDict);
      // });

      // var cmds = [
      //   'node ./tests/users_model.js'
      // ];
      // jake.exec(cmds, function () {
      //   console.log('All tests passed.');
      //   complete();
      // }, {printStdout: true});
    // });
  });
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

