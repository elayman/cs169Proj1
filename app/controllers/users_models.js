var UsersModels = function () {
  this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];
  //this.respondsWith = ['json'];

  this.index = function (req, resp, params) {
    var self = this;
    geddy.model.UsersModel.all(function(err, usersModels) {
      self.respond({format: 'json', params: params, usersModels: usersModels});
    });
  };
  //POST Request for doForm
  this.loginForm = function (req, resp, params) {
    var self = this;
    console.log("doForm called with loginInput: " + params.loginInput + " and addInput: " + params.addInput);
    if (params.addInput == 'on') {
      self.add(req, resp, params);
    } else if (params.loginInput == 'on') {
      console.log("logging in");
      self.login(req, resp, params);
    }
  };

  //GET Request for Add
  this.addGet = function (req, resp, params) {
    var self = this;
    self.respond(params, {
      format: 'html'
    , template: 'app/views/users_models/add'
    });
  };

  //POST Request for Add
  this.add = function (req, resp, params) {
    params.id = params.id || geddy.string.uuid(10);
    var self = this;
    geddy.model.UsersModel.add(params.user, params.password, function (answerDict) {
      if (answerDict){
        params.count = answerDict.count;
        params.errCode = answerDict.errCode;
        self.respond(answerDict);
      }
    });
  };

  //GET Request for Login
  this.loginGet = function (req, resp, params) {
    var self = this;
    self.respond(params, {
      format: 'html'
    , template: 'app/views/users_models/loginForm'
    });
  };

  //POST Request for Login
  this.login = function (req, resp, params) {
    params.id = params.id || geddy.string.uuid(10);
    var self = this;

    var username = params.user;
    var password = params.password;

    geddy.model.UsersModel.login(username, password, function (answerDict) {
      if (answerDict) {
        params.count = answerDict.count;
        params.errCode = answerDict.errCode;
        console.log("LOGGED IN AND GOT errCode: " + answerDict.errCode);
        self.respond(answerDict);
      } else{
        console.log("TRIED TO LOG IN BUT FAILED");
      }
    });
  };


  this.resetFixture = function (req, resp, params) {
    var self = this;
    geddy.model.UsersModel.TESTAPI_resetFixture(function (answerDict) {
      self.respond(answerDict);
    });
  };

  this.unitTests = function (req, resp, params) {
    var self = this;
    geddy.model.UsersModel.TESTAPI_unitTests(function (answerDict) {
      self.respond(answerDict);
    });
  };

};

exports.UsersModels = UsersModels;
