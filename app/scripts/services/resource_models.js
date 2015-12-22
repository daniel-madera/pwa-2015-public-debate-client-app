'use strict';

var app = angular.module('publicDebate');

var server = 'http://private-54742-pwa2015publicdebate.apiary-mock.com/pwa2015publicdebate';

app.factory('ThreadsResource', ['$resource', function($resource) {
    return $resource(server + '/threads/:threadId', {}, {
        patch: {
            method: 'PATCH'
        }
    });
}]);

app.factory('PostsResource', ['$resource', function($resource) {
    return $resource(server + '/threads/:threadId/posts', {});
}]);

app.factory('UsersResource', ['$resource', function($resource) {
    return $resource(server + '/users', {});
}]);

app.factory('UserLoginResource', ['$resource', function($resource) {
    return $resource(server + '/users/login', {}, {
        login: {
            method: 'POST'
        }
    });
}]);
