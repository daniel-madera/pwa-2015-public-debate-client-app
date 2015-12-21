'use strict';

var app = angular.module('publicDebate');
app.controller('ThreadsController', function($scope, ThreadsResource, PaginationService, MessagesService) {

    $scope.closeMessage = function(index) {
        MessagesService.remove($scope.messages[i]);
    };

    $scope.get = function() {
        var params = {};

        var success = function(value, responseHeaders) {
            $scope.threadsObject = value;
            angular.extend($scope.threadsObject, {
                pagination: PaginationService.getPagination(responseHeaders)
            });
        }

        var error = function(httpResponse) {
            MessagesService.addErrorMessages(httpResponse.data.errors);
        }

        return ThreadsResource.get(params, success, error);
    }

    $scope.create = function() {

        if ($scope.user == undefined) {
            MessagesService.add({
                text: "Please sign in or register.",
                level: 'danger'
            });

            return false;
        }

        if ($scope.title == '') {
            MessagesService.add({
                text: "Thread title cannot be empty.",
                level: 'danger'
            });
            return false;
        }

        var postData = {
            title: $scope.title
        };

        var success = function(value, responseHeaders) {
            $scope.title = '';
            $scope.get();
            MessagesService.add({
                text: "Thread was created successfully.",
                level: 'success'
            });
        }

        var error = function(httpResponse) {
            MessagesService.addErrorMessages(httpResponse.data.errors);
        }

        return ThreadsResource.save({}, postData, success, error);
    };

    angular.element(document).ready(function() {
        $scope.get();
    });
});
