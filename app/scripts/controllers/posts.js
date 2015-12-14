'use strict';

/**
 * @ngdoc function
 * @name publicDebate.controller:postsController
 * @description
 * # postController
 * Controller of the publicDebate
 */

var app = angular.module('publicDebate');
app.controller('postsController', function($scope, $routeParams, Posts) {

    $scope.thread_id = $routeParams.thread_id;

    $scope.get = function() {
        var params = {
            thread_id: $scope.thread_id
        }

        var success = function(value, responseHeaders) {
            $scope.posts = value;
            var links = count = responseHeaders('Link');
            console.log(links);
        }

        var error = function(httpResponse) {
            console.log(httpResponse);
        }

        Posts.get(params, success, error);
    }

    $scope.create = function() {
        if ($scope.text == '') {
            return false;
        }

        var postData = {
            text: $scope.text
        };

        var success = function(value, responseHeaders) {
            $scope.text = '';
            $scope.get();
        }

        var error = function(httpResponse) {
            console.log(httpResponse);
        }

        Posts.save({
            thread_id: $scope.thread_id
        }, postData, success, error);
    };

    angular.element(document).ready(function() {
        $scope.get();
    });
});
