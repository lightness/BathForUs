angular.module('myApp')
    .controller('MainMenuCtrl', function ($scope, $location) {
        $scope.goto = function (path) {
            $location.path(path);
        };

        $scope.setClassByUrl = function (classname, path) {
            if ($location.path() === path) {
                return classname;
            } else {
                return '';
            }
        };


    });