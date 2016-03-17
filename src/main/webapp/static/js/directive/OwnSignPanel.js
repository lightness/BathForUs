angular.module('myApp')
    .controller('ownSignPanelCtrl', function ($scope, $location, $q, $mdMenu, $rootScope, $cookieStore) {

        $scope.inProgress = false;
        $scope.user = {
            login: '',
            password: ''
        };

        // # stub
        $scope.login = function () {
            $scope.inProgress = true;
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
                $scope.inProgress = false;
                $rootScope.username = login;
                $cookieStore.put("username", login);
                $mdMenu.hide();
            }

            function onLoginFail() {
                $scope.inProgress = false;
            }
        };

        // # stub
        $scope.logout = function () {
            $scope.inProgress = true;
            process().then(onLogoutSuccess, onLogoutFail);

            function process() {
                return $q(function (resolve, reject) {
                    setTimeout(function () {
                        resolve();
                    }, 2000);
                });
            }

            function onLogoutSuccess() {
                $scope.inProgress = false;
                delete $rootScope.username;
                $cookieStore.remove("username");
            }

            function onLogoutFail() {
                $scope.inProgress = false;
            }
        };

    })
    .directive('ownSignPanel', function () {
        return {
            restrict: 'E',
            templateUrl: 'static/view/signPanel.html',
            controller: 'ownSignPanelCtrl'
        }
    });