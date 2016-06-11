(function () {
    'use strict';

    angular
        .module('dux')
        .controller('criarPerfilListaController', criarPerfilListaController);

    criarPerfilListaController.$inject = ['ngDialog', '$scope', 'PerfisService', 'toastr', '$location', '$stateParams'];

    function criarPerfilListaController(ngDialog, $scope, PerfisService, toastr, $location, $stateParams) {
        /* jshint validthis:true */
        var vm = this;

        activate();

        function activate() {
            resetaLista();
            resetaAgend();
            $scope.perfilSelecionado = '';

            vm.perfil = {
                nomePerfil: '',
                observacoes: '',
                layoutListas: []
            };

            var id = $stateParams.id;

            if (id === undefined || id == '') {
                $scope.editar = false;
            }
            else {
                $scope.editar = true;
                PerfisService.getPerfilLista(id).then(function (response) {
                    vm.perfil = response.data;
                })
            }
            PerfisService.getPerfisDistribuicao().then(function (response) {
                $scope.perfisDist = response.data;
            });            
        }

        function selecionaPerfilDist(idPerfil) {
            for (var i = 0; i < $scope.perfisDist.length; i++) {

                var perfilDist = $scope.perfisDist[i];
                if (perfilDist.id == idPerfil) {
                    $scope.perfilSelecionado = perfilDist.nomePerfil;
                }
            }
        }


        //seleciona perfil distribuicao dropdown lista
        $scope.selecionaPerfil = function (perfil) {
            $scope.perfilSelecionado = perfil.nomePerfil;
            $scope.lista.perfilDistribuicaoId = perfil.id;
        }

        //limpa perfil distribuicao dropdown lista
        $scope.limpaPerfil = function () {
            $scope.perfilSelecionado = null;
            $scope.lista.perfilDistribuicaoId = null;
        }

        $scope.addAgendamento = function () {
            $scope.lista.layoutAgendamentos.push($scope.agend);
            resetaAgend();
        }

        $scope.addLista = function () {
            vm.perfil.layoutListas.push($scope.lista);
            resetaLista();
        }

        $scope.editaLista = function () {
            vm.perfil.layoutListas[$scope.indexLista] = $scope.lista;
        }

        $scope.removeAgend = function (agend) {
            $scope.lista.layoutAgendamentos.splice($scope.lista.layoutAgendamentos.indexOf(agend), 1);
        }

        vm.removeLista = function (index) {
            vm.perfil.layoutListas.splice(index, 1);
        }

        vm.salvaPerfil = function (perfil) {
            vm.validationErrors = [];

            PerfisService.salvaPerfilLista(perfil)
                .then(function () {
                    if ($scope.editar == true) {
                        toastr.success('O perfil foi editado com sucesso', 'Editado');
                    }
                    else {
                        toastr.success('O perfil foi salvo com sucesso', 'Salvo');
                    }
                    
                    $location.path('/Perfis/Listas');
                })
                .catch(function (response) {
                    if (response.status == 400) {
                        _showValidationErrors(vm, response);
                    }
                    else {
                        toastr.error('Aconteceu um erro ao salvar seu perfil, tente novamente após um tempo', 'Erro');
                    }
                });
        }

        vm.openEditaLista = function (lista) {
            selecionaPerfilDist(lista.perfilDistribuicaoId);
            $scope.indexLista = vm.perfil.layoutListas.indexOf(lista);
            $scope.editarLista = true;
            $scope.lista = angular.copy(lista);
            vm.openAddLista();
        }

        vm.openAddLista = function () {
            ngDialog.open({
                template: 'addLista',
                scope: $scope,
                closeByDocument : false
            }).closePromise.then(function () {
                $scope.indexLista = 0;
                $scope.editarLista = false;
                resetaLista();
                $scope.selection = $scope.steps[0];
            });
        }
        $scope.openAddAgend = function () {
            ngDialog.open({
                template: 'addAgend',
                scope: $scope,
                closeByDocument : false
            }).closePromise.then(function () {
                resetaAgend();
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


        $scope.steps = [
          '1: Lista',
          '2: Entrada',
          '3: Agendamentos'
        ];
        $scope.selection = $scope.steps[0];

        $scope.getCurrentStepIndex = function () {
            return _.indexOf($scope.steps, $scope.selection);
        };

        $scope.goToStep = function (index) {
            if (!_.isUndefined($scope.steps[index])) {
                $scope.selection = $scope.steps[index];
            }
        };

        $scope.hasNextStep = function () {
            var stepIndex = $scope.getCurrentStepIndex();
            var nextStep = stepIndex + 1;
            return !_.isUndefined($scope.steps[nextStep]);
        };

        $scope.hasPreviousStep = function () {
            var stepIndex = $scope.getCurrentStepIndex();
            var previousStep = stepIndex - 1;
            return !_.isUndefined($scope.steps[previousStep]);
        };

        $scope.incrementStep = function () {
            if ($scope.hasNextStep()) {
                var stepIndex = $scope.getCurrentStepIndex();
                var nextStep = stepIndex + 1;
                $scope.selection = $scope.steps[nextStep];
            }
        };

        $scope.decrementStep = function () {
            if ($scope.hasPreviousStep()) {
                var stepIndex = $scope.getCurrentStepIndex();
                var previousStep = stepIndex - 1;
                $scope.selection = $scope.steps[previousStep];
            }
        };

        function resetaLista() {
            $scope.lista = {
                id: 0,
                perfilDistribuicaoId: null,
                precoM: null,
                precoF: null,
                valorConsumaM: null,
                valorConsumaF: null,
                exigirRg: false,
                exigirCelular:false,
                listaM: false,
                listaF: false,
                layoutAgendamentos: []
            }
            $scope.perfilSelecionado = '';
        }

        function resetaAgend() {
            $scope.agend = {
                qtdMinutos: 0,
                qtdHoras: 0,
                depoisEvento: true
            };
        }
    }
})();
