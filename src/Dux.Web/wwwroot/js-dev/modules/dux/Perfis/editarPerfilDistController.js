(function () {
    'use strict';

    angular
        .module('dux')
        .controller('editarPerfilDistController', editarPerfilDistController);

    editarPerfilDistController.$inject = ['$stateParams' , 'PerfisService', 'toastr']; 

    function editarPerfilDistController($stateParams, PerfisService, toastr) {
        /* jshint validthis:true */
        var vm = this;
        vm.perfil = {
            nomePerfil: '',
            layoutsDistribuicao : []
        };

        activate();

        function activate() {
            var perfilId = $stateParams.perfilId;

            PerfisService.getEditarDist(perfilId).then(function (response) {
                vm.perfil = response.data;
            });                
        }

        vm.editaPerfil = function (perfil) {
            PerfisService.editaPerfilDist(perfil)
                .then(function () {
                    toastr.success('O perfil foi editado com sucesso', 'Editado');
                })
                .catch(function (response) {
                    if (response.status == 400) {
                        _showValidationErrors(vm, response.data);
                    }
                    else {
                        toastr.error('Aconteceu um erro ao editar seu perfil, tente novamente após um tempo', 'Erro');
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
                vm.validationErrors.push('Não foi possível Editar o perfil');
            };
        }
    }
})();
