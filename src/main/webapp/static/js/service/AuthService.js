angular.module('myApp')
    .factory('AuthService', function ($rootScope, LoginRestService, ToastFactory, $q) {
        function processUserActivation(data) {
            $rootScope.user = {};
            if (data.username && data.username != "anonymousUser") {
                $rootScope.user.name = data.username;
            }
            var isAnonymous = false;
            var isUser = false;
            var isAdmin = false;
            angular.forEach(data.roles, function (role) {
                if (role.authority == 'ROLE_ANONYMOUS')
                    isAnonymous = true;
                else if (role.authority == 'ROLE_USER')
                    isUser = true;
                else if (role.authority == 'ROLE_ADMIN')
                    isAdmin = true;
            });
            $rootScope.user.isAnonymous = isAnonymous;
            $rootScope.user.isUser = isUser;
            $rootScope.user.isAdmin = isAdmin;
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
                })
                .catch(function () {
                    ToastFactory.showToast('Ошибка в процессе аутентификации');
                });
        }

        function login(credentials) {
            return LoginRestService
                .login(credentials)
                .then(function (response) {
                    processUserActivation(response.data);
                })
                .catch(function (error) {
                    if (error.status == 403) {
                        ToastFactory.showToast("Неверный логин или пароль");
                        return $q.reject();
                    } else { 
                        ToastFactory.showToast('Ошибка в процессе аутентификации');
                        return "Unexpected error";
                    }
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