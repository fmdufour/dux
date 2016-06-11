(function () {
    'use strict';

    angular
        .module('dux')
        .factory('PortariaService', PortariaService);

    PortariaService.$inject = ['$http'];

    function PortariaService($http) {


        function _getNomes(listaId) {
            return $http.get('api/nomeLista/getnomes/' + listaId);
        }

        function _confPresenca(listaId, nomeId) {
            return $http.post('api/nomeLista/confpresenca', { 'listaId': listaId, 'nomeId': nomeId });
        }

        function _getNomesEvento(eventoId) {
            return $http.get('api/nomeLista/getNomesEvento/' + eventoId);
        }

        var service = {
            getNomes: _getNomes,
            confPresenca: _confPresenca,
            getNomesEvento: _getNomesEvento
        };

        return service;
    }
})();