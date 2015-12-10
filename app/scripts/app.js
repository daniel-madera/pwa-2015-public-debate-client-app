'use strict';

/**
 * @ngdoc overview
 * @name publicDebate
 * @description
 * # publicDebate
 *
 * Main module of the application.
 */
var publicDebate = angular.module('publicDebate', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute'
    ])
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/threads.html',
                controller: 'threadsController',
                controllerAs: 'threads'
            })
            .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'aboutController',
                controllerAs: 'about'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
