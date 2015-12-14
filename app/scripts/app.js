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
            controller: 'ThreadsController',
        })
        .when('/threads', {
            templateUrl: 'views/threads.html',
            controller: 'ThreadsController',
        })
        .when('/threads/:thread_id/posts', {
            templateUrl: 'views/posts.html',
            controller: 'PostsController',
        })
        .otherwise({
            redirectTo: '/'
        });
});
