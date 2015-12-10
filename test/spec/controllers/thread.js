'use strict';

var server = "http://private-54742-pwa2015publicdebate.apiary-mock.com/pwa2015publicdebate";

describe('threadsController', function() {
    beforeEach(module('publicDebate'));

    var $controller, mockThreadResource, $httpBackend, $scope;

    beforeEach(inject(function(_$controller_, $injector) {
        $controller = _$controller_;
        $httpBackend = $injector.get('$httpBackend');
        $scope = {};
        $controller('threadsController', {
            $scope: $scope
        });
    }));

    afterEach(inject(function(_$controller_, $injector) {
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.verifyNoOutstandingExpectation();
    }));

    it('Create new Thread', function() {
        $httpBackend.expectGET(server + '/threads').respond(200, {
            offset: 0,
            limit: 2,
            threads: [{
                id: 1,
                url: "/threads/1",
                title: "Mock thread 1",
                created: "2015-08-05T08:40:51.620Z",
                author: {
                    id: 1,
                    first_name: "John",
                    last_name: "Smith",
                    username: "john.smith"
                }
            }, {
                id: 2,
                url: "/threads/2",
                title: "Mock thread 2",
                created: "2015-12-09T08:40:51.620Z",
                author: {
                    id: 2,
                    first_name: "Jeremy",
                    last_name: "Jackson",
                    username: "jeremy.jackson"
                }
            }]
        });

        $scope.title = "New Title";
        $httpBackend.expectPOST(server + '/threads')
            .respond({
                "id": 3,
                "url": "/threads/3",
                "title": "This is a new mock thread",
                "created": "2015-08-05T08:40:51.620Z",
                "author": {
                    "id": 2,
                    "first_name": "Jeremy",
                    "last_name": "Jackson",
                    "username": "jeremy.jackson"
                }
            });

        $scope.create();
        $httpBackend.flush();
        expect($scope.threadsObject.threads.length).toEqual(3);
        expect($scope.title).toEqual('');
    });
});
