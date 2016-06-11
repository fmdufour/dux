(function () {
    'use strict';

    angular
        .module('dux')
        .controller('criarPerfilDistController', criarPerfilDistController);

    criarPerfilDistController.$inject = ['UserService' , 'PerfisService','toastr' , '$location']; 

    function criarPerfilDistController(UserService, PerfisService, toastr, $location) {
        /* jshint validthis:true */
        var vm = this;
        vm.perfil = {
            nomePerfil: '',
            layoutsDistribuicao : []
        };

        activate();

        function activate() {

            UserService.getUsuariosDist().then(function (response) {
                var usuarios = response.data;

                usuarios.forEach(function (usuario) {
                    vm.distribuicoes.layoutsDistribuicao.push({
                        usuarioId: usuario.id,
                        nome: usuario.nome,
                        qtdNomesM: 0,
                        qtdNomesF: 0
                    });
                })
            });
        }

        vm.salvaPerfil = function (perfil) {
            vm.validationErrors = [];
            PerfisService.salvaPerfilDist(perfil)
                .then(function () {
                    toastr.success('O perfil foi salvo com sucesso', 'Salvo');
                    $location.path('/Distribuicao');
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
