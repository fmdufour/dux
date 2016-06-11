(function () {
    'use strict';

    angular
        .module('dux')
        .controller('perfilListaController', perfilListaController);

    perfilListaController.$inject = ['PerfisService', 'ngDialog', 'toastr'];

    function perfilListaController(PerfisService, ngDialog, toastr) {
        
        var vm = this;        

        activate();

        function activate() {
            PerfisService.getPerfisLista().then(function (response) {
                vm.perfis = response.data;
            });
        }

        vm.excluiPerfil = function (perfil) {
            ngDialog.openConfirm({ templateUrl: 'excluirPerfil' }).then(function () {

                PerfisService.excluiPerfilLista(perfil.id).then(function () {

                    vm.perfis.splice(vm.perfis.indexOf(perfil), 1);
                    toastr.success('Perfil Excluido com sucesso', 'Excluido');

                })
                .catch(function () {
                    toastr.error('Ocorreu um erro ao excluir o perfil', 'Erro');
                });

            })
        }
    }
})();
