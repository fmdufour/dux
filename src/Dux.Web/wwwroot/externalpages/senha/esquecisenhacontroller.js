(function () {
    'use strict';

    angular
        .module('externalPagesModule')
        .controller('esqueciSenhaController', esqueciSenhaController);

    esqueciSenhaController.$inject = ['$location', 'loginService'];

    function esqueciSenhaController($location, loginService) {
        var vm = this;


        vm.enviado = false;

        vm.novaSenha = function () {
            loginService.enviarSenha(vm.email).then(function () {
                vm.enviado = true;
            })
            .catch(function () {
                vm.enviado = false;
            })
        }
    }
})();
