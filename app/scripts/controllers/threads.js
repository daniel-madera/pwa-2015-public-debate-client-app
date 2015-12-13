'use strict';

/**
 * @ngdoc function
 * @name publicDebate.controller:threadsController
 * @description
 * # MainCtrl
 * Controller of the publicDebate
 */

var app = angular.module('publicDebate');
app.controller('threadsController', function($scope, Threads) {

    $scope.get = function() {
        var params = {
            // offset: 0,
            // limit: 20,
            // sort: '-created,title'
        };

        var success = function(value, responseHeaders) {
            $scope.threadsObject = value;
        }

        var error = function(httpResponse) {
            console.log(httpResponse);
        }

        Threads.get(params, success, error);
    }

    $scope.create = function() {
        if ($scope.title == '') {
            return false;
        }

        var postData = {
            title: $scope.title
        };

        var success = function(value, responseHeaders) {
            $scope.threadsObject.threads.push(value);
            $scope.title = '';
        }

        var error = function(httpResponse) {
            console.log(httpResponse);
        }

        Threads.save({}, postData, success, error);
    };

    angular.element(document).ready(function() {
        $scope.get();
    });
});
