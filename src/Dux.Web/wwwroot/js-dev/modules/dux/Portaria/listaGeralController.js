(function () {
    'use strict';

    angular
        .module('dux')
        .controller('listaGeralController', listaGeralController);

    listaGeralController.$inject = ['ngDialog', 'toastr', '$location', '$stateParams', '$scope',
                                 'EventoService', 'PortariaService', '$rootScope'];

    function listaGeralController(ngDialog, toastr, $location, $stateParams, $scope, EventoService, PortariaService, $rootScope) {
        /* jshint validthis:true */
        var vm = this;

        vm.nomes = [];
        vm.evento = {};

        activate();


        function activate() {
            var id = $stateParams.id;

            carregaNomes(id);
            carregaEvento(id);

        }


        function carregaNomes(eventoId) {
            PortariaService.getNomesEvento(eventoId).then(function (response) {
                vm.nomes = response.data;
            });
        }

        function carregaEvento(eventoId) {
            EventoService.getEvento(eventoId).then(function (response) {
                vm.evento = response.data;
            })
        }

        $rootScope.$on('pesquisa', function (e, obj) {
            vm.pesquisa = obj.pesquisa;
        });

        vm.confPresenca = function (nome) {
            if (!nome.presencaConf) {
                nome.presencaConf = true;

                PortariaService.confPresenca(nome.listaId, nome.id).then(function (response) {
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
