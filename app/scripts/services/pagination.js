'use strict';

var app = angular.module('publicDebate');

app.service('PaginationService', function() {

    /*
     *   Returns array of links where index is rel attribute 
     *   and value is link. Format of link header is defined
     *   by RFC5988.
     */
    this.parseLink = function(header) {
        if (!header || header.length === 0) {
            return undefined;
        }

        var parts = header.split(',');
        var links = {};

        for (var i = 0; i < parts.length; i++) {
            var section = parts[i].split(';');
            if (!section || section.length !== 2) {
                return undefined;
            }
            var url = section[0].replace(/<(.*)>/, '$1').trim();
            var name = section[1].replace(/rel="(.*)"/, '$1').trim();
            links[name] = url;
        }
        return links;
    };

    /*
     *   Returns array of pagination values - (offset, limit, count),
     *   Values are parsed from Content-Range header. Format is defined as
     *   <offset>-<limit>/<count>.
     */
    this.parseContentRange = function(header) {
        if (!header || header.length === 0) {
            return undefined;
        }

        var values = header.match(/\s*([0-9]+)\s*:\s*([0-9]+)\/\s*([0-9]+)\s*/);

        if (!values || values.length !== 4) {
            return undefined;
        }

        return {
            offset: parseInt(values[1]),
            limit: parseInt(values[2]),
            count: parseInt(values[3])
        };
    };

    /*
     *   Returns array of max paginator values - unit, max_limit (maximum count of resources that
     *   can be fetched from server). Format is defined as <unit> <max_limit>
     */
    this.parseAcceptRange = function(header) {
        if (!header || header.length === 0) {
            return undefined;
        }

        var values = header.match(/\s*([a-zA-Z0-9]+)\s+([0-9]+)\s*/);

        if (!values || values.length !== 3) {
            return undefined;
        }

        return {
            unit: values[1],
            maxLimit: parseInt(values[2])
        };
    };

    /*
     *   Returns object with attributes - maxLimit, offset, limit, pageNumber, pageLimit, links: {next, prev, fist, last}
     */
    this.getPagination = function(headers) {
        var paginationObject = {};
        var links = this.parseLink(headers('link'));
        var contentRange = this.parseContentRange(headers('content-range'));
        var acceptRange = this.parseAcceptRange(headers('accept-range'));

        angular.extend(
            paginationObject,
            contentRange,
            acceptRange, {
                links: links
            }
        );

        if (paginationObject.offset !== undefined && paginationObject.limit !== undefined && paginationObject.count !== undefined) {
            paginationObject.pageNumber = Math.floor(paginationObject.offset / paginationObject.limit) + 1;
            paginationObject.pageCount = Math.ceil(paginationObject.count / paginationObject.limit);
        }

        return paginationObject.length === 0 ? undefined : paginationObject;
    };
});
