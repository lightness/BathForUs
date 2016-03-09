angular.module('myApp', ['ngRoute', 'ngMaterial', 'md.data.table'])
    .config(function($routeProvider){
        'use strict';

        function View(viewPath,controller) {
            this.templateUrl = 'static/view/' + viewPath;
            this.controller = controller;
        }

        $routeProvider
            .when('/bathes', new View('bath/list.html', 'BathListCtrl'))
            .when('/bathes/:bathId', new View('bath/detail.html', 'BathDetailCtrl'))
            .when('/services', new View('service/list.html', 'ServiceListCtrl'))
            .otherwise({ redirectTo: '/bathes' })
    });