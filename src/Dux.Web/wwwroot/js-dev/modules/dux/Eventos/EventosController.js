(function () {
    'use strict';

    angular
        .module('dux')
        .controller('eventosController', eventosController);

    eventosController.$inject = ['$scope','$state']; 

    function eventosController($scope,$state) {
        /* jshint validthis:true */
        var vm = this;        

        activate();

        function activate() {

        }
    }
})();
