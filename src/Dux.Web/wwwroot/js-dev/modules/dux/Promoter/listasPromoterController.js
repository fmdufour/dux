(function () {
    'use strict';

    angular
        .module('dux')
        .controller('listasPromoterController', listasPromoterController);

    listasPromoterController.$inject = ['$location', '$stateParams', 'PromoterService', '$state'];

    function listasPromoterController($location, $stateParams, PromoterService) {
        /* jshint validthis:true */
        var vm = this;

        vm.listas = [];

        activate();



        function activate() {
            vm.eventoId = $stateParams.eventoId;

            if (vm.eventoId == undefined || vm.eventoId == '') {
                $location.path('/Eventos/Agenda')
            }

            PromoterService.getListas(vm.eventoId).then(function (response) {
                vm.listas = response.data;
            })
        }
    }
})();
