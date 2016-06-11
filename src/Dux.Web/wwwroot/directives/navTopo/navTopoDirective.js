(function() {
    'use strict';

    angular.module('adm').directive('navTopo', function () {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                title : '@',
                subtitle: '@',
            },
            templateUrl: "/directives/navtopo/navtopotemplate.html",
            controller: "navTopoController"
        }
    });
})();