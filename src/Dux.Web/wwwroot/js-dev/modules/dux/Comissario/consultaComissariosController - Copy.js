(function () {
    'use strict';

    angular
        .module('dux')
        .controller('consultaComissariosController', consultaComissariosController);

    consultaComissariosController.$inject = ['$location', 'ComissarioService', 'toastr'];

    function consultaComissariosController($location, ComissarioService, toastr) {
        
        var vm = this;

        activate();

        function activate() {
            ComissarioService.getComissarios().then(function (response) {
                vm.comissarios = response.data;
            });



        vm.bloquear = function (comissario) {
            ComissarioService.bloquear(comissario.id).then(function (response) {
                toastr.success("O comissário " + comissario.nome + " foi bloqueado.", "Bloqueado");
                comissario.status = 1;
            })
            .catch(function(response){
                toastr.error("Ocorreu um erro ao bloquear o comissário, tente novamente após algum tempo", "Erro");
            });
        }

        vm.desbloquear = function (comissario) {
            ComissarioService.desbloquear(comissario.id).then(function (response) {
                toastr.success("O comissário " + comissario.nome + " foi desbloqueado", "Desbloqueado");
                comissario.status = 0;
            })
            .catch(function(response){
                toastr.error("Ocorreu um erro ao desbloquear o usuário, tente novamente após algum tempo", "Erro");
            });
        }}

           
    }
})();
