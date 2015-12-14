'use strict';

/**
 * @ngdoc overview
 * @name publicDebate
 * @description
 * # publicDebate
 *
 * Main module of the application.
 */
var app = angular.module('publicDebate', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute'
]);

app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/threads.html',
            controller: 'threadsController',
        })
        .when('/threads', {
            templateUrl: 'views/threads.html',
            controller: 'threadsController',
        })
        .when('/threads/:thread_id/posts', {
            templateUrl: 'views/posts.html',
            controller: 'postsController',
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
