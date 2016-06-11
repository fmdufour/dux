(function () {
    'use strict';

    angular
        .module('dux')
        .controller('usuarioConsultaController', usuarioConsultaController);

    usuarioConsultaController.$inject = ['$location' , 'UserService' , 'toastr'];

    function usuarioConsultaController($location, UserService, toastr) {
        
        var vm = this;

        activate();

        function activate() {
            UserService.getUsuarios().then(function (response) {
                vm.usuarios = response.data;
            });
        }

        vm.bloquear = function (usuario) {
            UserService.bloquear(usuario.id).then(function (response) {
                toastr.success("O usuário " + usuario.nome + " foi bloqueado.", "Bloqueado");
                usuario.status = 1;
            })
            .catch(function(response){
                toastr.error("Ocorreu um erro ao bloquear o usuário, tente novamente após algum tempo", "Erro");
            });
        }

        vm.desbloquear = function (usuario) {
            UserService.desbloquear(usuario.id).then(function (response) {
                toastr.success("O usuário " + usuario.nome + " foi desbloqueado", "Desbloqueado");
                usuario.status = 0;
            })
            .catch(function(response){
                toastr.error("Ocorreu um erro ao desbloquear o usuário, tente novamente após algum tempo", "Erro");
            });
        }
           
    }
})();
