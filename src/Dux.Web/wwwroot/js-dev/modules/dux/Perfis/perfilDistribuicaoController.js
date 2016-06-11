(function () {
    'use strict';

    angular
        .module('dux')
        .controller('perfilDistribuicaoController', perfilDistribuicaoController);

    perfilDistribuicaoController.$inject = ['PerfisService', 'ngDialog', 'toastr'];

    function perfilDistribuicaoController(PerfisService, ngDialog, toastr) {
        var vm = this;        

        activate();

        function activate() {
            PerfisService.getPerfisDistribuicao().then(function (response) {
                vm.perfis = response.data;
            });
        }

        vm.excluiPerfil = function (perfil) {
            ngDialog.openConfirm({ templateUrl: 'excluirPerfil' }).then(function () {

                PerfisService.excluiPerfilDist(perfil.id).then(function () {

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
