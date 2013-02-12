var assert = require('assert')
  , tests
  , UsersModel = geddy.model.UsersModel;

tests = [
  //0 'Test Model Add'
  function (callback) {
  	UsersModel.add('Greg', 'MyPassword!', function (answerDict) {
  		try{
  			assert.deepEqual(answerDict, {'errCode': 1, 'count': 1});
  			callback(true);
  		}catch (exc) {
  			callback(false);
  		}
  	});
  },
  //1 'Test Model Add Same'
  function (callback) {
  	UsersModel.add('Bob', 'MyPassword!', function (answerDict) {
  		console.log("add first same with errCode: " + answerDict.errCode);
  		UsersModel.add('Bob', 'MyPassword!', function (answerDict) {
  			console.log("add second same with errCode: " + answerDict.errCode);
  			try{
  	  			assert.deepEqual(answerDict, {'errCode': -2});
  	  			callback(true);
  	  		}catch (exc){
  	  			callback(false);
  	  		}
  	  	});
  	});
  },
  //2 'Test Model Add Different'
  function (callback) {
	UsersModel.add('Greg2', 'MyPassword!', function (answerDict) {
  		try{
  			assert.deepEqual(answerDict, {'errCode': 1, 'count': 1});
  			callback(true);
  		}catch (exc){
  			callback(false);
  		}
  	});
  },
  //3 'Test Model Add Empty Username'
  function (callback) {
	UsersModel.add("", 'MyPassword!', function (answerDict) {
    console.log("added null username and returned answerDict");
  		try{
  			assert.deepEqual(answerDict, {'errCode': -3});
  			callback(true);
  		}catch (exc){
  			callback(false);
  		}
  	});
  },
  //4 'Test Model Add Null Username'
  function (callback) {
	UsersModel.add(null, 'MyPassword!', function (answerDict) {
    console.log("added null username and returned answerDict");
  		try{
  			assert.deepEqual(answerDict, {'errCode': -3});
  			callback(true);
  		}catch (exc){
  			callback(false);
  		}
  	});
  },
  //5 'Test Model Add 129 Username'
  function (callback) {
	UsersModel.add('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 'MyPassword!', function (answerDict) {
  		try{
  			assert.deepEqual(answerDict, {'errCode': -3});
  			callback(true);
  		}catch (exc){
  			callback(false);
  		}
  	});
  },
  //6 'Test Model Add Empty Password'
  function (callback) {
	UsersModel.add('Greg5', "", function (answerDict) {
  		try{
  			assert.deepEqual(answerDict, {"errCode": -4});
  			callback(true);
  		}catch (exc){
  			callback(false);
  		}
  	});
  },
  //7 'Test Model Add Empty Password'
  function (callback) {
	UsersModel.add('Greg6', null, function (answerDict) {
		for (var key in answerDict){
  			console.log(key + " : " + answerDict[key]);
  		}
	  		try{
	  			assert.deepEqual(answerDict, {"errCode": -4});
	  			callback(true);
	  		}catch (exc){
	  			callback(false);
	  		}
	  	});
  },
  //8 'Test Model Add 129 Password'
  function (callback) {
	UsersModel.add('Greg7', 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', function (answerDict) {
  		for (var key in answerDict){
  			console.log(key + " : " + answerDict[key]);
  		}
  		try{
  			assert.deepEqual(answerDict, {"errCode": -4});
  			callback(true);
  		}catch (exc){
  			callback(false);
  		}
  	});
  },
  //9 'Test Model Login'
  function (callback) {
  	UsersModel.add('Greg', 'MyPassword!', function (answerDict) {
		UsersModel.login('Greg', 'MyPassword!', function (answerDict) {
			console.log("login with answerDict: ");
			for (var key in answerDict){
				console.log(key + " : " + answerDict[key]);
			}
			try{
		  		assert.deepEqual(answerDict, {'errCode': 1, 'count': 2});
		  		callback(true);
		  	}catch (exc){
		  		console.log("exception: " + exc);
		  		callback(false);
		  	}
	  	});
  	});

  },
  //10 'Test Model Login Bad Credentials'
  function (callback) {
	UsersModel.login('Greg12392', 'MyPassword!2', function (answerDict) {
		console.log("login with answerDict: ");
		for (var key in answerDict){
			console.log(key + " : " + answerDict[key]);
		}
  		try{
  			assert.deepEqual(answerDict, {'errCode': -1});
  			callback(true);
  		}catch (exc){
  			callback(false);
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
];


//vows tests
// var vows = require('vows');
// var suite = vows.describe('Testing Model');
// suite.addBatch({
//   'Test Login': {
//     topic: function () {
//       var self = this;
//       UsersModel.add('Greg', 'MyPassword!', function (useless) {
//         assert.deepEqual(useless, {'errCode': 1, 'count': 1});
//         UsersModel.login('Greg', 'MyPassword!', self.callback);
//       });
//     },
//     'Login callback': function (answerDict, err) {
//       //err is not used
//       console.log("answerDict: ");
//       for (var key in answerDict){
//         console.log(key + " : " + answerDict[key]);
//       }
//       // try{
//           assert.deepEqual(answerDict, {'errCode': 1, 'count': 2});
//           // callback(true);
//         // }catch (exc){
//         //   console.log("exception caught: " + exc);
//         //   // callback(false);
//         // }
//       }
//   },
//   'Test Model Add': {
//     topic: function () {
//                         UsersModel.add('Greg', 'MyPassword!', this.callback);
//     },
//     'Add User Callback': function (answerDict, err) {
//       console.log("GOT HERE");
//           // try{
//             console.log("received answerDict: "+ answerDict);
//             //assert.deepEqual(answerDict, {'errCode': 1, 'count': 1});
//             assert.equal(false, true);
//             console.log("asserted deepEqual");
//             // callback(true);
//           // // }catch (exc) {
//           //   console.log("exception: " + exc);
//           //   // callback(false);
//           // }
//           // test.done();
//     }
//   }
// });
//Node unit
// exports['Test Model Add'] = function (test) {
//   test.expect(1);
//   UsersModel.add('Greg', 'MyPassword!', function (answerDict) {
//     try{
//       test.deepEqual(answerDict, {'errCode': 1, 'count': 1});
//       callback(true);
//     }catch (exc) {
//       callback(false);
//     }
//     test.done();
//   });
// };

module.exports = tests;
// module.exports = suite;
