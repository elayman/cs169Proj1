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

  return true;
}
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

