'use strict';

var app = angular.module('publicDebate');
app.controller('ThreadsController', function($scope, $location, ThreadsResource, PaginationService) {
    $scope.get = function() {
        var params = {};

        var success = function(value, responseHeaders) {
            $scope.threadsObject = value;
            angular.extend($scope.threadsObject, {
                pagination: PaginationService.getPagination(responseHeaders)
            });
        }

        var error = function(httpResponse) {
            console.log(httpResponse);
        }

        ThreadsResource.get(params, success, error);
    }

    $scope.create = function() {
        if ($scope.title == '') {
            return false;
        }

        var postData = {
            title: $scope.title
        };

        var success = function(value, responseHeaders) {
            $scope.title = '';
            $scope.get();
        }

        var error = function(httpResponse) {
            console.log(httpResponse);
        }

        ThreadsResource.save({}, postData, success, error);
    };

    angular.element(document).ready(function() {
        $scope.get();
    });
});
