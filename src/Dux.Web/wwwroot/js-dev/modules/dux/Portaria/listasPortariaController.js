(function () {
    'use strict';

    angular
        .module('dux')
        .controller('listasPortariaController', listasPortariaController);

    listasPortariaController.$inject = ['$location', '$stateParams', 'ListasService', 'EventoService'];

    function listasPortariaController($location, $stateParams, ListasService, EventoService) {
        /* jshint validthis:true */
        var vm = this;

        vm.listas = [];

        vm.evento = {};

        activate();



        function activate() {
            vm.eventoId = $stateParams.id;

            if (vm.eventoId == undefined || vm.eventoId == '') {
                $location.path('/Eventos/Agenda')
            }

            EventoService.getEvento(vm.eventoId).then(function (response) {
                vm.evento = response.data;
            });

            ListasService.getListas(vm.eventoId).then(function (response) {
                vm.listas = response.data;
            });




        }
    }
})();
