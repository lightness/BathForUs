angular.module('myApp')
    .factory('CommentRestService', function ($http) {
        var url = 'bathes/';
        return {
            get: function (params) {
                return $http.get(url, { params: params });
            },
            save: function (bath) {
                return $http.post(url, bath);
            },
            remove: function (id) {
                return $http.delete(url + id);
            }
        }
    });
