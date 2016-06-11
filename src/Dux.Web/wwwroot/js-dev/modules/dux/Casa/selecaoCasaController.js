(function () {
    'use strict';

    angular
        .module('dux')
        .controller('selecaoCasaController', selecaoCasaController);

    selecaoCasaController.$inject = ['CasaService', 'AuthService']; 

    function selecaoCasaController(CasaService, AuthService) {
        /* jshint validthis:true */
        var vm = this;

        var casaSelecionada = {};

        activate();

        function activate() {

            CasaService.getCasaSelec().then(function (response) {
                casaSelecionada = response.data;
            });
            
            CasaService.getCasas().then(function (response) {
                vm.casas = response.data;
            });

        }

        vm.selecionaCasa = function (casa) {
            CasaService.selecionaCasa(casa).then(function (response) {
               AuthService.refreshToken().then(function () {
                    AuthService.setCasa(response.data);
                });
            });
        }
    }
})();
