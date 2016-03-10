angular.module('myApp')
    .factory('ServiceRepository', ['$http', function ($http) {
        var url = 'services/';
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