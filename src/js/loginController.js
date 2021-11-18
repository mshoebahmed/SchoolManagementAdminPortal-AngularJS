//loginController-js 
app.controller('LoginController', function ($scope, $location, $rootScope, LoginService) {
    $rootScope.title = "AngularJS Login Sample";

    $scope.formSubmit = function () {
        if (LoginService.login($scope.username, $scope.password)) {
            $rootScope.userName = $scope.username;
            $scope.error = '';
            $scope.username = '';
            $scope.password = '';
            $location.path('Mains');
            $rootScope.isAuth= true;
        } else {
            $scope.error = "Incorrect username/password !";
        }
    };
});

app.factory('LoginService', function () {
    var admin = 'admin';
    var pass = 'password';
    var isAuthenticated = false;

    return {
        login: function (username, password) {
            isAuthenticated = username === admin && password === pass;
            return isAuthenticated;
        },
        isAuthenticated: function () {
            return isAuthenticated;
        }
    };

});

app.run(function ($rootScope, $location, LoginService) {
    console.clear();
    console.log('running');
    if (!LoginService.isAuthenticated()) {
        $location.path('Logins');
    }
});

