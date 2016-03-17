angular.module('myApp')
    .controller('ownRateBoxCtrl', function (){})
    .directive('ownRateBox', function () {
        return {
            restrict: 'E',
            templateUrl: 'static/view/rateBox.html',
            scope: {
                mark: '=value'
            },
            controller: 'ownRateBoxCtrl'
        }
    });