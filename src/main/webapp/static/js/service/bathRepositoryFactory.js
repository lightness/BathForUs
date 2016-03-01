angular.module('myApp')
    .factory('BathRepository', ['$http', function ($http) {
        var url = 'bathes/';
        return {
            getAll: function () {
                return $http.get(url);
            },
            get: function (id) {
                return $http.get(url + id);
            }
        }
    }]);