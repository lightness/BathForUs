angular.module('myApp')
    .controller('ownSignPanelCtrl', function ($scope, $location, $q, $mdMenu, FocusFactory, $rootScope, $cookieStore) {

        $scope.isFormOpen = false;

        $scope.inProgress = false;

        $scope.user = {
            login: '',
            password: ''
        };

        $scope.$watch('isFormOpen', function (value) {
            if (value){
                FocusFactory.focus('input-loginForm-login');
            }
        });

        $scope.openForm = function ($mdOpenMenu, $event) { 
            $mdOpenMenu($event);
            $scope.isFormOpen = true;
        };

        $scope.closeForm = function () {
            $mdMenu.hide();
            $scope.isFormOpen = false;
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

            function onLoginSuccess(username, userId) {
                $scope.inProgress = false;
                $rootScope.username = username;
                $rootScope.userId = userId;
                $cookieStore.put("username", username);
                $cookieStore.put("userId", userId);
                $scope.closeForm();
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
                delete $rootScope.userId;
                $cookieStore.remove("username");
                $cookieStore.remove("userId");
                $scope.user.login = '';
                $scope.user.password = '';
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