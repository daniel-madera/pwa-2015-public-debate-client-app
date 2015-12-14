'use strict';

var app = angular.module('publicDebate');

app.controller('PostsController', function($scope, $routeParams, PostsResource, PaginationService) {
    $scope.thread_id = $routeParams.thread_id;

    $scope.get = function() {
        var params = {
            thread_id: $scope.thread_id
        }

        var success = function(value, responseHeaders) {
            $scope.postsObject = value;
            angular.extend($scope.postsObject, {
                pagination: PaginationService.getPagination(responseHeaders)
            });
            console.log($scope.postsObject);
        }

        var error = function(httpResponse) {
            console.log(httpResponse);
        }

        PostsResource.get(params, success, error);
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

        PostsResource.save({
            thread_id: $scope.thread_id
        }, postData, success, error);
    };

    angular.element(document).ready(function() {
        $scope.get();
    });
});
