angular.module('myApp')
    .controller('ownSignPanelCtrl', function ($scope, $location, AuthService, $mdMenu, FocusFactory, $rootScope) {

        $scope.isFormOpen = false;

        $scope.inProgress = false;

        $scope.user = {
            login: '',
            password: ''
        };

        $scope.$watch('isFormOpen', function (value) {
            if (value) {
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

        $scope.login = function () {
            $scope.inProgress = true;
            var login = $scope.user.login;
            var password = $scope.user.password;
            AuthService
                .login({username: login, password: password})
                .then(onLoginSuccess)
                .catch(onLoginFail);

            function onLoginSuccess() {
                $scope.inProgress = false;
                $scope.closeForm();
            }

            function onLoginFail() {
                $scope.inProgress = false;
            }
        };

        $scope.logout = function () {
            $scope.inProgress = true;
            AuthService
                .logout()
                .then(onLogoutSuccess)
                .catch(onLogoutFail);

            function onLogoutSuccess() {
                $scope.inProgress = false;
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