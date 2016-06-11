(function () {
    'use strict';

    angular
        .module('dux')
        .controller('criarListaController', criarListaController);

    criarListaController.$inject = ['$location', 'PerfisService', 'ListasService', '$stateParams', 'toastr']; 

    function criarListaController($location, PerfisService, ListasService, $stateParams, toastr) {
        /* jshint validthis:true */
        var vm = this;

        vm.lista = {};

        activate();

        function activate() {
            vm.perfilSelecionado = '';
            var id = $stateParams.id;
            var eventoId = $stateParams.eventoId;

            if (eventoId === undefined || eventoId == '') {
                $location.path('/Evento/Listas');
            }

            vm.lista.eventoId = eventoId;

            if (id === undefined || id == '') {
                vm.editar = false;
            }
            else {
                vm.editar = true;

                ListasService.getLista(id).then(function (response) {
                    vm.lista = response.data;
                })
            }

            PerfisService.getPerfisDistribuicao().then(function (response) {
                vm.perfisDist = response.data;
            });
        }

        vm.salvaLista = function () {
            ListasService.salvaLista(vm.lista).then(function (response) {
                if (vm.editar == true) {
                    toastr.success("A lista " + vm.lista.nomeLista + " foi editada com sucesso", "Editado")
                }
                else {
                    toastr.success("A lista " + vm.lista.nomeLista + " foi salva com sucesso", "Salvo")
                }
                $location.path('/Evento/' + vm.eventoId + '/Listas');
            })
            .catch(function (response) {
                if (response.status == 400) {
                    _showValidationErrors(vm, response);
                }
                else {
                    toastr.error('Aconteceu um erro ao salvar sua Lista, tente novamente após um tempo', 'Erro');
                }
            });
        }


        function _showValidationErrors(vm, error) {
            vm.validationErrors = [];
            if (error.data && angular.isObject(error.data)) {
                for (var key in error.data) {
                    vm.validationErrors.push(error.data[key][0]);
                }
            } else {
                vm.validationErrors.push('Não foi possível adicionar o perfil');
            };
        }


        //seleciona perfil distribuicao dropdown lista
        vm.selecionaPerfil = function (perfil) {
            vm.perfilSelecionado = perfil.nomePerfil;
            vm.lista.perfilDistribuicaoId = perfil.id;
        }

        //limpa perfil distribuicao dropdown lista
        vm.limpaPerfil = function () {
            vm.perfilSelecionado = null;
            vm.lista.perfilDistribuicaoId = null;
        }
    }
})();
