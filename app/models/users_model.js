var UsersModel = function () {

  this.defineProperties({
    user: {type: 'string', required: true},
    password: {type: 'string', required: true},
    count: {type: 'int', required: true},
  });

  this.validatesLength('user', {max: '128'});
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


UsersModel.add = function add (user, password) {
  var count = 0;
  //Add to database
  geddy.db.users.findOne({username: user}, function(err, result){
    if (err) {
      return callback(err, null);
    }
    // if we already have the user, don't add another
    if (result) {
      return -3;
    }
    // if we don't already have the to do item, save a new one
    else {
      todo.saved = true;
      geddy.db.users.save(todo, function(err, docs){
        return callback(err, docs);
      });
    }
  });
  return true;
};

UsersModel.exists = function exists (user) {
  geddy.db.users.findOne({username: user}, function(err, result){
    if (err) {
      return false;
    }
    // if we already have the user, don't add another
    if (result) {
      result.updateProperties({count: result.count + 1});
        result.save(function(err, data) {
          if (err) {
            return false;
          } else {
            return result.count + 1;
          }
        });
    } else{
      return false;
    }
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

