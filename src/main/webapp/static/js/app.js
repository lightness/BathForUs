angular.module('myApp', ['ngRoute'])
    .config(function($routeProvider){
        'use strict';

        var BathesView = {
            templateUrl: 'static/js/view/bathes.html',
            controller: 'BathListCtrl'
        };

        var BathView = {
            templateUrl: 'static/js/view/bath.html',
            controller: 'BathDetailCtrl'
        };

        $routeProvider
            .when('/bathes', BathesView)
            .when('/bathes/:bathId', BathView)
            .otherwise({ redirectTo: '/bathes' })
    });