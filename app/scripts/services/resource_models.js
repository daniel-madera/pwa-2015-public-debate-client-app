var app = angular.module('publicDebate');

var server = "http://private-54742-pwa2015publicdebate.apiary-mock.com/pwa2015publicdebate";

app.factory('ThreadsResource', ['$resource', function($resource) {
    return $resource(server + '/threads', {});
}]);

app.factory('PostsResource', ['$resource', function($resource) {
    return $resource(server + '/threads/:thread_id/posts', {});
}]);
