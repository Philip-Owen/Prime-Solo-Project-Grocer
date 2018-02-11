myApp.controller('LoginController', ['$http', '$location', 'UserService', '$mdDialog', function($http, $location, UserService, $mdDialog) {
    console.log('LoginController created');
    var self = this;
    self.user = {
      username: '',
      password: ''
    };

    self.message = UserService.message;

    self.loginAlert = false;



    self.login = function (userCreds) {
      console.log('login function');
      if (self.user.username === '' || self.user.password === '') {
        self.loginAlert = true;
      } else {
        console.log('sending to server...', userCreds);
        $http.post('/api/user/login', userCreds).then(
          function (response) {
            if (response.status == 200) {
              console.log('success: ', response.data);
              // location works with SPA (ng-route)
              $location.path('/user');
              self.loginAlert = false;
            } else {
              console.log('failure error: ', response);
              self.loginAlert = true;
            }
          },
          function (response) {
            console.log('failure error: ', response);
            self.loginAlert = true;
          });
      }
    };

    self.registerUser = function (newUser) {
      console.log(newUser);
      if (newUser.username === '' || newUser.password === '') {
        self.message = "Choose a username and password!";
      } else {
        console.log('sending to server...', newUser);
        $http.post('/api/user/register', newUser).then(function (response) {
          console.log('success');
          $location.path('/home');
        },
          function (response) {
            console.log('error');
            self.message = "Something went wrong. Please try again.";
          });
      }
    };

    self.registerDialog = function (ev) {
      $mdDialog.show({
          controller: DialogController,
          controllerAs: 'vm',
          templateUrl: '../views/partials/register.partial.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: true
        })
        .then(function (answer) {
          self.registerUser(answer);
        }, function () {
          self.status = 'You cancelled the dialog.';
          console.log(self.status);
        });
    };

    function DialogController($mdDialog) {
      const self = this;

      self.registerAlert = false;

      self.hide = function () {
        $mdDialog.hide();
      };

      self.cancel = function () {
        $mdDialog.cancel();
      };

      self.answer = function (answer) {
        console.log('answer', answer);
        if(answer.hasOwnProperty('username') && answer.hasOwnProperty('password')) {
          if (answer.username === '' || answer.password === '') {
            self.registerAlert = true;
          } else {
            $mdDialog.hide(answer);
            self.registerAlert = false;
          }
        } else {
          self.registerAlert = true;
        }
      };
    }
}]);