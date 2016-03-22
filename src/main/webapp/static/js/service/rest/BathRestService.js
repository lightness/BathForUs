angular.module('myApp')
    .factory('BathRestService', function ($http) {
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
            putMark: function (id, mark) {
                return $http.put(url + id + "/marks", mark);
            },
            getMyMarks: function(id) {
                return $http.get(url + id + "/marks/my");
            },
            getMyAverageMark: function(id) {
                return $http.get(url + id + "/marks/my/average");
            },
            getAverageMarkByService: function (id, serviceId) {
                return $http.get(url + id + "/services/" + serviceId + "/marks/average");
            },
            getAverageMark: function(id) {
                return $http.get(url + id + "/marks/average");
            }
        }
    });