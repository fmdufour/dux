(function () {
    'use strict';

    angular
        .module('dux')
        .controller('criarComissarioController', criarComissarioController);

    criarComissarioController.$inject = ['$location', 'ComissarioService', 'toastr', 'CasaService'];

    function criarComissarioController($location, ComissarioService, toastr, CasaService) {
        
        var vm = this;

        activate();

        function activate() {
            CasaService.getCasas().then(function (response) {
                vm.casasU = response.data;
            });

            resetComissario();
        }

        vm.salvaComissario = function (comissario) {
            ComissarioService.salvaComissario(comissario).then(function (response) {
                toastr.success('O comissário foi criado com sucesso\nUm email foi enviado à ele com o link para o cadastro de senha', 'Criado');
                $location.path('/Comissarios');
            })
            .catch(function (response) {
                if (response.status == 400) {
                    _showValidationErrors(vm, response);
                }
                else {
                    toastr.error('Aconteceu um erro ao criar o comissário, tente novamente após um tempo', 'Erro');
                }
            });

        }


        vm.selecCasa = function (id) {
            var i = vm.comissario.casas.indexOf(id);
            if (i >= 0) {
                vm.comissario.casas.splice(i, 1);
            }
            else {
                vm.comissario.casas.push(id);
            }
        }

        function resetComissario() {
            vm.comissario = {
                nome: '',
                sobrenome: '',
                casas: [],
                email: ''
            };
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

    }
})();
