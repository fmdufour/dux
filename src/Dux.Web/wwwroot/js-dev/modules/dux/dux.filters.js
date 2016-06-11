(function () {
    'use strict';

    angular.module('dux').filter('data', ['$filter',function($filter){
        return function(input)
        {
            if(input == null){ return ""; } 
 
            var _date = $filter('date')(new Date(input), 'dd/MM/yyyy');
 
            return _date.toUpperCase();
        }
    }]);
})();