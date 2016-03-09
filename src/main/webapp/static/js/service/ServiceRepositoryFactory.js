angular.module('myApp')
    .factory('ServiceRepository', ['$http', function ($http) {
        var url = 'services/';
        return {
            getAll: function () {
                return $http.get(url);
            },
            get: function (id) {
                return $http.get(url + id);
            },
            save: function (bath) {
                return $http.post(url, bath);
            }
        }
    }]);