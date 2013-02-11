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
	  		assert.deepEqual(answerDict, {'errCode': -2});
	  	});
  	});
  },
  'Test Model Add Different': function () {
	UsersModel.add('Greg2', 'MyPassword!', function (answerDict) {
  		assert.deepEqual(answerDict, {'errCode': 1, 'count': 1});
  	});
  },
  'Test Model Add Empty Username': function () {
	UsersModel.add('', 'MyPassword!', function (answerDict) {
  		assert.deepEqual(answerDict, {'errCode': -3});
  	});
  },
  'Test Model Add Null Username': function () {
	UsersModel.add(null, 'MyPassword!', function (answerDict) {
  		assert.deepEqual(answerDict, {'errCode': -3});
  	});
  },
  'Test Model Add 129 Username': function () {
	UsersModel.add('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 'MyPassword!', function (answerDict) {
  		assert.deepEqual(answerDict, {'errCode': -3});
  	});
  },
  'Test Model Add Empty Password': function () {
	UsersModel.add('Greg5', '', function (answerDict) {
  		assert.deepEqual(answerDict, {"errCode": -4});
  	});
  },
  'Test Model Add Empty Password': function () {
	UsersModel.add('Greg6', null, function (answerDict) {
		for (var key in answerDict){
  			console.log(key + " : " + answerDict[key]);
  		}
	  		assert.deepEqual(answerDict, {"errCode": -4});
	  	});
  },
  'Test Model Add 129 Password': function () {
	UsersModel.add('Greg7', 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', function (answerDict) {
  		for (var key in answerDict){
  			console.log(key + " : " + answerDict[key]);
  		}
  		assert.deepEqual(answerDict, {"errCode": -4});
  	});
  }
 //  'Test Model Login 10 times': function () {
 //  	// var x = 2;
 //  	// while (x<10){
	// UsersModel.login('Greg', 'MyPassword!', function (answerDict) {
	//   		assert.equal(answerDict, {'errCode': 1, 'count': 2});
	//   	});
	// // }
 //  },
 //  'Test Model Login Bad Credentials': function () {
	// UsersModel.login('Greg12392', 'MyPassword!', function (answerDict) {
	//   		assert.equal(answerDict, {'errCode': -1});
	//   	});
	// }
 //  },
 //  'Test Model TESTAPI_resetFixture': function () {
	// UsersModel.TESTAPI_resetFixture(function (answerDict) {
	//   		assert.equal(answerDict, {'errCode': null});
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
