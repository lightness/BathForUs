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
            },
            remove: function (id) {
                return $http.delete(url + id);
            },
            getMarks: function (id) {
                return $http.get(url + id + "/marks");
            },
            putMark: function (id, mark) {
                return $http.put(url + id + "/marks", mark);
            },
            getMarksByUser: function(id, userId) {
                return $http.get(url + id + "/users/" + userId + "/marks");
            },
            getAverageMarkByUser: function(id, userId) {
                return $http.get(url + id + "/users/" + userId + "/marks/average");
            },
            getAverageMarkByService: function (id, serviceId) {
                return $http.get(url + id + "/services/" + serviceId + "/marks/average");
            },
            getAverageMark: function(id) {
                return $http.get(url + id + "/marks/average");
            }
        }
    }]);