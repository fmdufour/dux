(function () {
    'use strict';

    angular
        .module('dux')
        .controller('consultaListasController', consultaListasController);

    consultaListasController.$inject = ['$location', '$stateParams', 'ListasService']; 

    function consultaListasController($location, $stateParams, ListasService) {
        /* jshint validthis:true */
        var vm = this;

        vm.listas = [];

        activate();



        function activate() {
            vm.eventoId = $stateParams.id;

            if (vm.eventoId == undefined || vm.eventoId == '') {
                $location.path('/Eventos/Agenda')
            }

            ListasService.getListas(vm.eventoId).then(function (response) {
                vm.listas = response.data;
            })
        }
    }
})();
