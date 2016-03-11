angular.module('myApp')
    .factory('BathRepository', ['$http', function ($http) {
        var url = 'bathes/';
        return {
            getAll: function (params) {
                return $http.get(url, { params: params });
            },
            get: function (id) {
                return $http.get(url + id);
            },
            save: function (bath) {
                return $http.post(url, bath);
            }
        }
    }]);