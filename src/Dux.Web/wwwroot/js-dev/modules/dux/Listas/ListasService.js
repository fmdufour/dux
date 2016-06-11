(function () {
    'use strict';

    angular
        .module('dux')
        .factory('ListasService', ListasService);

    ListasService.$inject = ['$http'];

    function ListasService($http) {

        function _getLista(id) {
            return $http.get('api/listas/' + id);
        }

        function _salvaLista(lista) {
            return $http.post('api/listas', lista);
        }

        function _getListas(eventoId) {
            return $http.get('api/listas/getListasEvento/' + eventoId);
        }
       

        var service = {
            getLista: _getLista,
            salvaLista: _salvaLista,
            getListas : _getListas
        };

        return service;
    }
})();