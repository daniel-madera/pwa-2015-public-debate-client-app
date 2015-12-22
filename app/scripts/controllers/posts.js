'use strict';

var app = angular.module('publicDebate');

app.controller('PostsController', function($scope, $routeParams, PostsResource, ThreadsResource, PaginationService, MessagesService) {
    $scope.thread = {};
    $scope.thread.id = $routeParams.threadId;

    $scope.get = function() {
        var params = {
            threadId: $scope.thread.id
        };

        var success = function(value, responseHeaders) {
            $scope.postsObject = value;
            angular.extend($scope.postsObject, {
                pagination: PaginationService.getPagination(responseHeaders)
            });
        };

        var success1 = function(value, responseHeaders) {
            $scope.thread = value;
        };

        var error = function(httpResponse) {
            MessagesService.addErrorMessages(httpResponse.data.errors);
        };

        return PostsResource.get(params, success, error) && ThreadsResource.get(params, success1, error);
    };

    $scope.create = function() {
        if (!$scope.user) {
            MessagesService.add({
                text: 'Please sign in or register.',
                level: 'danger'
            });

            return false;
        }

        if (!$scope.text) {
            return false;
        }

        var postData = {
            text: $scope.text
        };

        var success = function() {
            $scope.text = '';
            $scope.get();
            MessagesService.add({
                text: 'Post was created successfully.',
                level: 'success'
            });
        };

        var error = function(httpResponse) {
            MessagesService.addErrorMessages(httpResponse.data.errors);
        };

        return PostsResource.save({
            threadId: $scope.threadId
        }, postData, success, error);
    };

    angular.element(document).ready(function() {
        $scope.get();
    });
});
