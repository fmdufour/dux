(function () {
    'use strict';

    angular
        .module('dux')
        .factory('DistribuicaoService', DistribuicaoService);

    DistribuicaoService.$inject = ['$http'];

    function DistribuicaoService($http) {                

        function _salvaDistribuicao(dist) {
            return $http.post('api/distribuicao', dist);
        }

        function _getDist(id) {
            return $http.get('api/distribuicao/' + id);
        }

        function _getQtdNomes(listaId) {
            return $http.get('api/distribuicao/getqtdnomes/' + listaId);
        }

        var service = {
            salvaDistribuicao: _salvaDistribuicao,
            getDist: _getDist,
            getQtdNomes : _getQtdNomes
        };

        return service;
    }
})();