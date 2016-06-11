(function () {
    'use strict';

    angular
        .module('dux')
        .controller('usuarioCriarController', usuarioCriarController);

    usuarioCriarController.$inject = ['$location', 'toastr', 'UserService', 'CasaService']; 

    function usuarioCriarController($location, toastr, UserService, CasaService) {
        /* jshint validthis:true */
        var vm = this;

        vm.casasU = [];

        activate();

        function activate() {
            resetUsuario();

            CasaService.getCasas().then(function (response) {
                vm.casasU = response.data;
            });
        }

        vm.salvaUsuario = function (usuario) {
            UserService.salvaUsuario(usuario).then(function (response) {
                toastr.success('O usuário foi salvo com sucesso\nUm email foi enviado a ele contendo uma senha temporária', 'salvo');
                $location.path('/Usuarios/Consulta');
            })
            .catch(function (response) {
                if (response.status == 400) {
                    _showValidationErrors(vm, response);
                }
                else {
                    toastr.error('Aconteceu um erro ao criar o usuário, tente novamente após um tempo', 'Erro');
                }
            });
             
        }

        vm.selecCasa = function (id) {
            var i = vm.usuario.casas.indexOf(id);
            if (i >= 0) {
                vm.usuario.casas.splice(i, 1);
            }
            else {
                vm.usuario.casas.push(id);
            }
        }

        function resetUsuario() {
            vm.usuario = {
                nome: '',
                sobrenome: '',
                casas : [],
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
