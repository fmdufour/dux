(function () {
    'use strict';

    angular
        .module('dux')
        .controller('distribuicaoController', distribuicaoController);

    distribuicaoController.$inject = ['$location', 'UserService', '$stateParams', 'toastr', 'DistribuicaoService']; 

    function distribuicaoController($location, UserService, $stateParams, toastr, DistribuicaoService) {
        /* jshint validthis:true */
        var vm = this;

        vm.dist = { 
            distribuicoes: [],
            listaId: 0
        };

        

        activate();

        function activate() {

            var id = $stateParams.id;
            var listaId = $stateParams.listaId;

            if (listaId === undefined || listaId == '') {
                $location.path('/Eventos/Agenda');
            }

            DistribuicaoService.getDist(listaId).then(function (response) {
                vm.dist.distribuicoes = response.data;
                vm.dist.listaId = listaId;
            });
        }


        vm.salvaDistribuicao = function () {
            DistribuicaoService.salvaDistribuicao(vm.dist).then(function (response) {
                toastr.success("Os convidados foram distribuídos com sucesso", "Distribuídos");
            })
            .catch(function (response) {
                toastr.error("Ocorreu um erro ao distribuir os convidados, tente novamente após algum tempo", "Erro");
            });
        }
    }
})();
