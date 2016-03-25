angular.module('myApp')
    .factory('CommentRestService', function ($http) {
        var url = 'comment/';
        return {
            get: function (id) {
                return $http.get('bathes/' + id + '/comments');
            },
            save: function (comment) {
                return $http.post(url, comment);
            },
            remove: function (id) {
                return $http.delete(url + id);
            }
        }
    });
