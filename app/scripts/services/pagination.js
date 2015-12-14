var app = angular.module('publicDebate');

app.service('PaginationService', function() {

    /*
     *   Returns array of links where index is rel attribute 
     *   and value is link. Format of link header is defined
     *   by RFC5988.
     */
    var parseLink = function(header) {
        if (header.length === 0) {
            return undefined;
        }

        var parts = header.split(',');
        var links = {};
        for (var i = 0; i < parts.length; i++) {
            var section = parts[i].split(';');
            if (section.length !== 2) {
                return undefined;
            }
            var url = section[0].replace(/<(.*)>/, '$1').trim();
            var name = section[1].replace(/rel="(.*)"/, '$1').trim();
            links[name] = url;
        }
        return links;
    }

    /*
     *   Returns array of pagination values - (offset, limit, count),
     *   Values are parsed from Content-Range header. Format is defined as
     *   <offset>-<limit>/<count>.
     */
    var parseContentRange = function(header) {
        var values = header.match(/\s*([0-9]+)\s*-\s*([0-9]+)\/\s*([0-9]+)\s*/);
        if (values.length !== 3) {
            return undefined;
        }

        return {
            offset: values[0],
            limit: values[1],
            count: values[2]
        };
    }

    /*
     *   Returns array of max paginator values - unit, max_limit (maximum count of resources that
     *   can be fetched from server). Format is defined as <unit> <max_limit>
     */
    var parseAcceptRange = function(header) {
        var values = header.match(/\s*([a-zA-Z0-9]+)\s+([0-9]+)\s*/);

        if (values.length !== 2) {
            return undefined;
        }

        return {
            unit: values[0],
            max_limit: values[1]
        };
    }

    /*
     *   Returns object with attributes - max_limit, offset, limit, links: {next, prev, fist, last}
     */
    var getPagination = function(headers) {
        var paginationObject = {};
        var link = headers('link');
        var contentRange = headers('content-range');
        var acceptRange = headers('accept-range');

        angular.extend(
            paginationObject,
            parseAcceptRange(acceptRange),
            parseContentRange(contentRange), {
                links: parseLink(link)
            });

        return paginationObject.length === 0 ? undefined : paginationObject;
    }
});
