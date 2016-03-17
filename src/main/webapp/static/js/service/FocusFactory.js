angular.module('myApp')
    .factory('FocusFactory', function ($timeout, $window) {
        return {
            focus: function (id) {
                $timeout(function () {
                    var element = $window.document.getElementById(id);
                    if (element)
                        element.focus();
                });
            }
        };
    });