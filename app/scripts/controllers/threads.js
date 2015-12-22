'use strict';

var app = angular.module('publicDebate');
app.controller('ThreadsController', function($scope, $routeParams, $filter, $location, ThreadsResource, PaginationService, MessagesService) {

    $scope.get = function() {

        var success = function(value, responseHeaders) {
            $scope.threadsObject = value;
            angular.extend($scope.threadsObject, {
                pagination: PaginationService.getPagination(responseHeaders)
            });
            $scope.select();
        };

        var error = function(httpResponse) {
            MessagesService.addErrorMessages(httpResponse.data.errors);
        };

        return ThreadsResource.get({}, success, error);
    };

    $scope.create = function() {

        if ($scope.user === undefined) {
            MessagesService.add({
                text: 'Please sign in or register.',
                level: 'danger'
            });

            return false;
        }

        if (!$scope.thread.title) {
            MessagesService.add({
                text: 'Thread title cannot be empty.',
                level: 'danger'
            });
            return false;
        }

        var postData = {
            title: $scope.thread.title
        };

        var success = function() {
            $scope.thread = undefined;
            $scope.get();
            MessagesService.add({
                text: 'Thread was created successfully.',
                level: 'success'
            });
        };

        var error = function(httpResponse) {
            MessagesService.addErrorMessages(httpResponse.data.errors);
        };

        return ThreadsResource.save({}, postData, success, error);
    };

    $scope.edit = function() {

        if ($scope.user === undefined) {
            MessagesService.add({
                text: 'Please sign in or register.',
                level: 'danger'
            });

            return false;
        }

        if (!$scope.thread.title) {
            MessagesService.add({
                text: 'Thread title cannot be empty.',
                level: 'danger'
            });
            return false;
        }

        if ($scope.thread.author.username !== $scope.user.username) {
            MessagesService.add({
                text: 'You can edit only yours threads.',
                level: 'danger'
            });
            return false;
        }

        var postData = {
            title: $scope.thread.title
        };

        var success = function() {
            $scope.thread = undefined;
            $scope.get();
            MessagesService.add({
                text: 'Thread was modified successfully.',
                level: 'success'
            });
            $scope.threadId = null;
        };

        var error = function(httpResponse) {
            console.log(httpResponse);
            MessagesService.addErrorMessages(httpResponse.data.errors);
        };

        return ThreadsResource.patch({
            threadId: $scope.thread.id
        }, postData, success, error);
    };

    $scope.select = function() {
        // if is specified threadId (threads/1) then set 
        // selected thread to $scope.thread variable
        if ($routeParams.threadId && $scope.threadsObject) {
            var threads = $filter('filter')($scope.threadsObject.threads, {
                id: $routeParams.threadId
            });
            if (threads.length === 1) {
                $scope.thread = threads[0];
            }
        }
    };

    angular.element(document).ready(function() {
        $scope.get();
    });
});
