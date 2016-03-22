angular.module('myApp')
    .controller('ownRateBoxCtrl', function (){})
    .directive('ownRateBox', function () {
        return {
            restrict: 'E',
            templateUrl: 'static/view/rateBox.html',
            scope: {
                mark: '=value'
            },
            controller: 'ownRateBoxCtrl',
            link: function(scope, element, attrs){
                scope.mode = 'canRate' in attrs ? 'writable' : 'read-only';
            }
        }
    });