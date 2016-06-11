(function () {
    'use strict';

    angular
        .module('dux')
        .controller('criarEventoController', criarEventoController);

    criarEventoController.$inject = ['$rootScope', 'PerfisService', 'EventoService', 'toastr', '$location'];

    function criarEventoController($rootScope, PerfisService, EventoService, toastr, $location) {
        
        var vm = this;

        vm.selecCor = function (cor) {
            vm.corSelec = cor;
            vm.evento.corCalendario = cor;
        }

        activate();

        //inicio activate
        function activate() {

            PerfisService.getPerfisLista().then(function (response) {
                vm.perfisLista = response.data;
            })

            vm.calendario = {
                opened : false
            };

            resetaEvento();

            vm.cores = [
                'blue',
                'black',
                'yellow',
                'green',
                'purple',
                'red'
            ];

            vm.selecCor(vm.cores[0]);

            vm.dtaInicio = new Date();
        }
        //final activate

        vm.openCalendario = function(){
            vm.calendario.opened = true;
        }

        function resetaEvento() {
            vm.evento = {
                nomeEvento: ''
            };
        }

        vm.salvaEvento = function (evento) {
            vm.validationErrors = [];
            EventoService.salvaEvento(evento).then(function () {
                toastr.success('O Evento foi criado com sucesso', 'Salvo');
                $location.path('/Eventos/Agenda');
            })
            .catch(function (response) {
                if (response.status == 400) {
                    _showValidationErrors(vm, response);
                }
                else {
                    toastr.error('Aconteceu um erro ao salvar seu Evento, tente novamente após um tempo', 'Erro');
                }
            });
        }

        vm.selecionaPerfilLista = function (perfil) {
            vm.perfilListaSelec = perfil.nomePerfil;
            vm.evento.perfilListaId = perfil.id;
        }

        //limpa perfil lista dropdown
        vm.limpaPerfilLista = function () {
            vm.perfilListaSelec = null;
            vm.evento.perfilListaId = null;
        }

        function _showValidationErrors(vm, error) {
            vm.validationErrors = [];
            if (error.data && angular.isObject(error.data)) {
                for (var key in error.data) {
                    vm.validationErrors.push(error.data[key][0]);
                }
            } else {
                vm.validationErrors.push('Não foi possível adicionar o Evento');
            };
        }
    }
})();
