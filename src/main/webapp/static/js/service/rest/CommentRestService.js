angular.module('myApp')
    .factory('CommentRestService', function ($http) {
        var url = 'comment/';
        return {
            get: function (id) {
                return $http.get('bathes/' + id + '/comments');
            },
            save: function (bathId, comment) {
                return $http.post('bathes/' + bathId + "/comment",  comment);
            },
            remove: function (id) {
                return $http.delete(url + id);
            }
        }
    });
