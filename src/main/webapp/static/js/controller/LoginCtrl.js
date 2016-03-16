angular.module('myApp')
    .controller('LoginCtrl', function ($scope, $location, $q, $mdMenu, $rootScope, $cookieStore) {

        $scope.loginInProgress = false;
        $scope.logoutInProgress = false;
        $scope.user = {
            login: '',
            password: ''
        };

        // # stub
        $scope.login = function () {
            $scope.loginInProgress = true;
            var login = $scope.user.login;
            var password = $scope.user.password;
            process().then(onLoginSuccess, onLoginFail);

            function process() {
                return $q(function (resolve, reject) {
                    setTimeout(function () {
                        if (login == 'xual') {
                            resolve(login);
                        } else {
                            reject();
                        }
                    }, 2000);
                });
            }

            function onLoginSuccess(login) {
                $scope.loginInProgress = false;
                $rootScope.username = login; debugger;
                $cookieStore.put("username", login);
                $mdMenu.hide();
            }

            function onLoginFail() {
                $scope.loginInProgress = false;
            }
        };

        // # stub
        $scope.logout = function () {
            $scope.logoutInProgress = true;
            process().then(onLogoutSuccess, onLogoutFail);

            function process() {
                return $q(function (resolve, reject) {
                    setTimeout(function () {
                        resolve();
                    }, 2000);
                });
            }

            function onLogoutSuccess() {
                $scope.logoutInProgress = false;
                delete $rootScope.username;
                $cookieStore.remove("username");
            }

            function onLogoutFail() {
                $scope.logoutInProgress = false;
            }
        };

    });