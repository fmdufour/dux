(function () {
    'use strict';

    angular
        .module('dux')
        .factory('EventoService', EventoService);

    EventoService.$inject = ['$http'];

    function EventoService($http) {

        function _salvaEvento(evento) {
            return $http.post('api/eventos', evento);
        }

        function _EventosCal(inicio, final) {
            return $http.post('api/eventos/EventosCal', { inicio: inicio, final: final});
        }

        function _getEvento(id) {
            return $http.get('api/eventos/' + id);
        }

        var service = {
            salvaEvento: _salvaEvento,
            EventosCal: _EventosCal,
            getEvento : _getEvento
        };

        return service;
    }
})();