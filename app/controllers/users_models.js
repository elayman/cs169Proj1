var UsersModels = function () {
  //this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];
  this.respondsWith = ['json'];

  this.index = function (req, resp, params) {
    var self = this;

    geddy.model.UsersModel.all(function(err, usersModels) {
      self.respond({params: params, usersModels: usersModels});
    });
  };

  // this.add = function (req, resp, params) {
  //   this.respond({params: params});
  // };

  this.add = function (req, resp, params) {
    params.id = params.id || geddy.string.uuid(10);

    //console.log("params are: %j", params);
    //console.log("req is : %j", req);

    //console.log("request.body is :" + req.body);
  
  // //Set response type
  // response.set('Content-Type', 'application/json');

  // if (request.is('application/json')) { 
  //   //DO EVERYTHING
  
  //   username = String(request.body.user);
  //   password = String(request.body.password);
  //   console.log("username length is: " + username.length);
  //   console.log("password length is: " + password.length);
  //   //Check if username is not empty and <128 chars
  //   if (!username || username=="" || username.length >= 128) {
  //     var answerDict = {};
  //     answerDict.errCode = -3; "ERR_BAD_USERNAME"
  //     response.send(answerDict);
  //   } else if (!password || password=="" || password.length >= 128){
  //     //Check if password is not empty and <128 chars
  //     var answerDict = {};
  //     answerDict.errCode = -4; "ERR_BAD_PASSWORD"
  //     response.send(answerDict);
  //   } else {
  //     //Check if exists
  //     client.query('SELECT * FROM users WHERE username = $1', [username],
  //       function (err, result) {
  //         console.log("Result from if user exists: %j", result);
  //         if (result.rowCount > 0) {
  //           var answerDict = {};
  //           answerDict.errCode = -2; //"ERR_USER_EXISTS"
  //           response.send(answerDict);
  //         } else if (result.rowCount == 0) {
  //           //Doesn't exist so create it
  //           client.query('INSERT INTO users VALUES ($1, $2, $3)', [username, password, 0], 
  //             function (err, result) {
  //               console.log("RESULT IS :" + result);
  //               var answerDict = {};
  //               console.log("SUCCESS");
  //               answerDict.errCode = 1; //"SUCCESS"
  //               response.send(answerDict);
  //           });
  //         }
  //     });
  //   }
  // }


    var self = this
      //, usersModel = geddy.model.UsersModel.create(params);
    geddy.model.UsersModel.add(params.user, params.password, function (answerDict) {
      if (answerDict){
        self.respond(answerDict);
      } else{
        self.respond({"DIDN'T WORK":"NOOOOO"});
      }
    });
    
    // usersModel.save(function(err, data) {
    //   if (err) {
    //     params.errors = err;
    //     self.transfer('add');
    //   } else {
    //     self.redirect({controller: self.name});
    //   }
    // });
  };

  this.login = function (req, resp, params) {
    params.id = params.id || geddy.string.uuid(10);
    var self = this;
    // console.log("REQUEST IS: ");
    // for (var key in req) {
    //   console.log(key + " : " + req.key);
    // }
    // console.log("PARAMS ARE: ");
    // for (var key in params) {
    //   console.log(key + " : " + params.key);
    // }

    var username = params.user;
    var password = params.password;

    geddy.model.UsersModel.getCount(username, password, function (count) {
      if (count != false) {
        //"SUCCESS"
        console.log("SUCCESS with Count: " + count);
        self.respond({errCode: 1, count: count});
      } else {
        //"ERR_BAD_CREDENTIALS"
        console.log("ERR_BAD_CREDENTIALS ");
        self.respond({errCode: -1})
      }
    });
  };

  // this.show = function (req, resp, params) {
  //   var self = this;

  //   geddy.model.UsersModel.first(params.id, function(err, usersModel) {
  //     self.respond({params: params, usersModel: usersModel.toObj()});
  //   });
  // };

  // this.edit = function (req, resp, params) {
  //   var self = this;

  //   geddy.model.UsersModel.first(params.id, function(err, usersModel) {
  //     self.respond({params: params, usersModel: usersModel});
  //   });
  // };

  this.resetFixture = function resetFixture (req, resp, params) {
    var self = this;
    geddy.model.UsersModel.TESTAPI_resetFixture(function (answerDict) {
      self.respond(answerDict);
    });
  };

  this.unitTests = function unitTests (req, resp, params) {
    var self = this;
    geddy.model.UsersModel.TESTAPI_unitTests(function (answerDict) {
      self.respond(answerDict);
    });
  };

  // this.update = function (req, resp, params) {
  //   var self = this;

  //   geddy.model.UsersModel.first(params.id, function(err, usersModel) {
  //     usersModel.updateProperties(params);

  //     usersModel.save(function(err, data) {
  //       if (err) {
  //         params.errors = err;
  //         self.transfer('edit');
  //       } else {
  //         self.redirect({controller: self.name});
  //       }
  //     });
  //   });
  // };

  // this.destroy = function (req, resp, params) {
  //   var self = this;

  //   geddy.model.UsersModel.remove(params.id, function(err) {
  //     if (err) {
  //       params.errors = err;
  //       self.transfer('edit');
  //     } else {
  //       self.redirect({controller: self.name});
  //     }
  //   });
  // };

};

exports.UsersModels = UsersModels;
