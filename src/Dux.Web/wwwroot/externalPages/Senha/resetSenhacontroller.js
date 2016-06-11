(function () {
    'use strict';

    angular
        .module('externalPagesModule')
        .controller('resetSenhaController', resetSenhaController);

    resetSenhaController.$inject = ['$location', 'loginService']; 

    function resetSenhaController($location, loginService) {
        /* jshint validthis:true */
        var vm = this;

        vm.reset = {};

        vm.resetado = false;


        vm.reseta = function () {
            loginService.resetarSenha(vm.reset).then(function () {
                vm.resetado = true;
            })
            .catch(function (response) {
                vm.resetado = false;
                vm.validationErrors = [];
                if (response.status == 400) {
                    _showValidationErrors(vm, response);
                }
                else {
                    vm.validationErrors.push('Erro, tente pedir novamente a recuperação da senha');
                }

            })
        }

        function _showValidationErrors(vm, error) {
            vm.validationErrors = [];
            if (error.data && angular.isObject(error.data)) {
                for (var key in error.data) {
                    vm.validationErrors.push(error.data[key][0]);
                }
            } else {
                vm.validationErrors.push('Erro, tente pedir novamente a recuperação da senha');
            };
        }
    }
})();
