angular.module('myApp')
    .factory('LoginRestService', function ($http) {
        return {
            getStatus: function () {
                return $http.get('login/');
            },
            login: function (credentials) {
                return $http.post('login/', credentials);
            },
            logout:  function () {
                return $http.post('logout');
            }
        }
    });