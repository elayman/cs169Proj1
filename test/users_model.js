var assert = require('assert')
  , tests
  , UsersModel = geddy.model.UsersModel;

tests = {
  'Test Model Add': function () {
  	UsersModel.add('Greg', 'MyPassword!', function (answerDict) {
  		assert.deepEqual(answerDict, {'errCode': 1, 'count': 1});
  	});
  },
  'Test Model Add Same': function () {
  	UsersModel.add('Bob', 'MyPassword!', function (answerDict) {
		console.log("add first same with errCode: " + answerDict.errCode);
		UsersModel.add('Bob', 'MyPassword!', function (answerDict) {
			console.log("add second same with errCode: " + answerDict.errCode);
			try{
	  			assert.deepEqual(answerDict, {'errCode': -2});
	  			return true;
	  		}catch (exc){
	  			return false;
	  		}
	  	});
  	});
  },
  'Test Model Add Different': function () {
	UsersModel.add('Greg2', 'MyPassword!', function (answerDict) {
  		try{
  			assert.deepEqual(answerDict, {'errCode': 1, 'count': 1});
  			return true;
  		}catch (exc){
  			return false;
  		}
  	});
  },
  'Test Model Add Empty Username': function () {
	UsersModel.add('', 'MyPassword!', function (answerDict) {
  		try{
  			assert.deepEqual(answerDict, {'errCode': -3});
  			return true;
  		}catch (exc){
  			return false;
  		}
  	});
  },
  'Test Model Add Null Username': function () {
	UsersModel.add(null, 'MyPassword!', function (answerDict) {
  		try{
  			assert.deepEqual(answerDict, {'errCode': -3});
  			return true;
  		}catch (exc){
  			return false;
  		}
  	});
  },
  'Test Model Add 129 Username': function () {
	UsersModel.add('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 'MyPassword!', function (answerDict) {
  		try{
  			assert.deepEqual(answerDict, {'errCode': -3});
  			return true;
  		}catch (exc){
  			return false;
  		}
  	});
  },
  'Test Model Add Empty Password': function () {
	UsersModel.add('Greg5', '', function (answerDict) {
  		try{
  			assert.deepEqual(answerDict, {"errCode": -4});
  			return true;
  		}catch (exc){
  			return false;
  		}
  	});
  },
  'Test Model Add Empty Password': function () {
	UsersModel.add('Greg6', null, function (answerDict) {
		for (var key in answerDict){
  			console.log(key + " : " + answerDict[key]);
  		}
	  		try{
	  			assert.deepEqual(answerDict, {"errCode": -4});
	  			return true;
	  		}catch (exc){
	  			return false;
	  		}
	  	});
  },
  'Test Model Add 129 Password': function () {
	UsersModel.add('Greg7', 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', function (answerDict) {
  		for (var key in answerDict){
  			console.log(key + " : " + answerDict[key]);
  		}
  		try{
  			assert.deepEqual(answerDict, {"errCode": -4});
  			return true;
  		}catch (exc){
  			return false;
  		}
  	});
  },
  'Test Model Login': function () {
  	UsersModel.add('Greg', 'MyPassword!', function (answerDict) {
		UsersModel.login('Greg', 'MyPassword!', function (answerDict) {
			console.log("login with answerDict: ");
			for (var key in answerDict){
				console.log(key + " : " + answerDict[key]);
			}
			try{
		  		assert.deepEqual(answerDict, {'errCode': 1, 'count': 2});
		  		return true;
		  	}catch (exc){
		  		console.log("exception: " + exc);
		  		return false;
		  	}
	  	});
  	});

  },
  'Test Model Login Bad Credentials': function () {
	UsersModel.login('Greg12392', 'MyPassword!', function (answerDict) {
		console.log("login with answerDict: ");
		for (var key in answerDict){
			console.log(key + " : " + answerDict[key]);
		}
  		try{
  			assert.deepEqual(answerDict, {'errCode': -1});
  			return true;
  		}catch (exc){
  			return false;
  		}
  	});
  }
 //  'Test Model TESTAPI_resetFixture': function () {
	// UsersModel.TESTAPI_resetFixture(function (answerDict) {
	//   		assert.equal(answerDict, {'errCode': 1});
	//   	});
	// //Add user previously added
	// UsersModel.add('Greg', 'MyPassword!', function (answerDict) {
 //  		assert.equal(answerDict, {'errCode': 1, 'count': 1});
 //  	});
 //  }
  // },
// 'Test Controller TESTAPI_resetFixture': function () {
// 	var req = {'stuff': 'moreStuff'};
// 	var resp = {'stuff': 'moreStuff'};
// 	var params = {'':''};
// 	var answerDict = UsersController.resetFixture(req, resp, params);
// 	assert.equal(answerDict, {'errCode': null});
// 	//Add user previously added
// 	UsersModel.add('Greg', 'MyPassword!', function (answerDict) {
//   		assert.equal(answerDict, {'errCode': 1});
//   	});
//   }
};

module.exports = tests;
