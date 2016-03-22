angular.module('myApp')
    .factory('AuthService', function ($rootScope, LoginRestService, ToastFactory) {
        function processUserActivation(data) {
            $rootScope.user = {};
            if (data.username && data.username != "anonymousUser") {
                $rootScope.user.name = data.username;
            }
            $rootScope.user.isAnonymous = data.roles && data.roles.indexOf('ROLE_ANONYMOUS') > -1;
            $rootScope.user.isUser = data.roles && data.roles.indexOf('ROLE_USER') > -1;
            $rootScope.user.isAdmin = data.roles && data.roles.indexOf('ROLE_ADMIN') > -1;
        }

        function processUserDeactivation() {
            delete $rootScope.user.name;
            $rootScope.user.isAdmin = false;
            $rootScope.user.isUser = false;
            $rootScope.user.isAnonymous = true;
        }

        function init() {
            return LoginRestService
                .getStatus()
                .then(function (response) {
                    processUserActivation(response.data);
                }, function () {
                    ToastFactory.showToast('Ошибка в процессе аутентификации');
                });
        }

        function login(credentials) {
            return LoginRestService
                .login(credentials)
                .then(function (response) {
                    processUserActivation(response.data);
                }, function () {
                    ToastFactory.showToast('Ошибка в процессе аутентификации');
                });
        }

        function logout() {
            return LoginRestService
                .logout()
                .then(function (response) {
                    processUserDeactivation();
                }, function () {
                    ToastFactory.showToast('Ошибка в процессе аутентификации');
                });
        }

        return {
            init: init,
            login: login,
            logout: logout
        }
    });