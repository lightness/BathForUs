angular.module('myApp', ['ngRoute'])
    .config(function($routeProvider){
        'use strict';

        function View(viewPath,controller) {
            this.templateUrl = 'static/js/view/' + viewPath;
            this.controller = controller;
        }

        $routeProvider
            .when('/bathes', new View('bath/list.html', 'BathListCtrl'))
            .when('/bathes/add', new View('bath/add.html', 'BathAddCtrl'))
            .when('/bathes/:bathId', new View('bath/detail.html', 'BathDetailCtrl'))
            .when('/services', new View('service/list.html', 'ServiceListCtrl'))
            .otherwise({ redirectTo: '/bathes' })
    });