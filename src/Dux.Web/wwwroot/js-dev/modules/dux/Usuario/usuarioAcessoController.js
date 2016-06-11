(function () {
    'use strict';

    angular
        .module('dux')
        .controller('usuarioAcessoController', usuarioAcessoController);

    usuarioAcessoController.$inject = ['$location', '$scope', 'UserService' , '$stateParams', 'toastr']; 

    function usuarioAcessoController($location, $scope, UserService, $stateParams, toastr) {
        /* jshint validthis:true */
        var vm = this;

        vm.todosAcessos = [];

        vm.perfil = {
            usuarioId: 0,
            acessos: []
        };

        vm.copiarDe = 0;

        activate();

        function activate() {
            var id = $stateParams.id;

            if (!id) {
                $location.path('/Eventos/Agenda');
            }

            UserService.getAcessosUsuario(id).then(function (responseA) {
                UserService.getTodosAcessos().then(function (responseB) {
                    vm.todosAcessos = _.filter(responseB.data, function (obj) { return !_.findWhere(responseA.data, obj); });                    
                    vm.perfil.acessos = responseA.data;
                });
            });

            vm.perfil.usuarioId = id;

            UserService.getUsuario(id).then(function (response) {
                vm.usuario = response.data;
            });
        }


        vm.defineAcessos = function () {
            UserService.defineAcessos(vm.perfil).then(function (response) {
                toastr.success("Os acessos do Usuário foram definidos com sucesso", "Salvo");
            })
            .catch(function (response) {
                toastr.error("Aconteceu algum erro ao definir os acessos desse usuário, tente novamente após algum tempo", "Erro");
            });
        }
    }
})();
