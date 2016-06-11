(function () {
    'use strict';

    angular
        .module('dux')
        .factory('CasaService', CasaService);

    CasaService.$inject = ['$http'];

    function CasaService($http) {

        function _getCasas() {
            return $http.get('api/casa/getCasas');
        }

        function _getCasaSelec() {
            return $http.get('/api/casa/getcasaselec');
        }

        function _selecionaCasa(casa) {
            return $http.post('api/casa/selecionaCasa', casa);
        }

        var service = {
            getCasas: _getCasas,
            getCasaSelec: _getCasaSelec,
            selecionaCasa: _selecionaCasa
        };

        return service;
    }
})();