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

var server = "http://private-54742-pwa2015publicdebate.apiary-mock.com/pwa2015publicdebate";

app.factory('Threads', ['$resource', function($resource) {
    return $resource(server + '/threads', {});
}]);

app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/threads-list.html',
            controller: 'threadsController',
            controllerAs: 'threads'
        })
        .when('/threads', {
            templateUrl: 'views/threads-list.html',
            controller: 'threadsController',
            controllerAs: 'threads'
        })
        .when('/threads/:thread_id', {
            templateUrl: 'views/thread-detail.html',
            controller: 'threadController',
            controllerAs: 'thread'
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
