(function () {
    'use strict';

    angular
        .module('dux')
        .controller('nomesListaController', nomesListaController);

    nomesListaController.$inject = ['ngDialog', 'toastr', '$location', '$stateParams', '$scope',
                                 'ListasService', 'PortariaService', '$rootScope'];

    function nomesListaController(ngDialog, toastr, $location, $stateParams, $scope, ListasService, PortariaService, $rootScope) {
        /* jshint validthis:true */
        var vm = this;

        vm.nomes = [];
        vm.lista = {};

        activate();


        function activate() {
            var id = $stateParams.id;

            carregaNomes(id);

            ListasService.getLista(id).then(function (response) {
                vm.lista = response.data;
            });
        }


        function carregaNomes(listaId) {
            PortariaService.getNomes(listaId).then(function (response) {
                vm.nomes = response.data;
            });
        }

        $rootScope.$on('pesquisa', function (e, obj) {
            vm.pesquisa = obj.pesquisa;
        });

        vm.confPresenca = function (nome) {
            if (!nome.presencaConf) {
                nome.presencaConf = true;

                PortariaService.confPresenca(vm.lista.id, nome.id).then(function (response) {
                    toastr.info("Presença de " + nome.nome + " confirmada", "Presença confirmada");
                })
                .catch(function (response) {
                    nome.presencaConf = false;
                    toastr.error("Ocorreu um erro ao confirmar a presença de " + nome.nome, "Erro");
                })
            }            
        }
    }
})();
