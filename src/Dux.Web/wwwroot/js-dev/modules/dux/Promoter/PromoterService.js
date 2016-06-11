(function () {
    'use strict';

    angular
        .module('dux')
        .factory('PromoterService', PromoterService);

    PromoterService.$inject = ['$http'];

    function PromoterService($http) {

        function _getListas(eventoId){
            return $http.get('api/listas/getListasPromoter/' + eventoId);
        }

        function _addNomes(nomes) {
            return $http.post('api/addnome', nomes);
        }

        function _getNomes(listaId) {
            return $http.get('api/nomelista/promoter/' + listaId);
        }

        var service = {
            getListas: _getListas,
            addNomes: _addNomes,
            getNomes : _getNomes
        };

        return service;
    }
})();