(function () {
    'use strict';

    angular
        .module('dux')
        .factory('ComissarioService', ComissarioService);

    ComissarioService.$inject = ['$http'];

    function ComissarioService($http) {


        function _getComissarios() {
            return $http.get('api/usuario/getcomissarios');
        }

        function _salvaComissario(comissario) {
            return $http.post('api/usuario/comissario', comissario);
        }

        function _bloquear(id) {
            return $http.post('/api/usuario/comissario/bloquear', '"' + id + '"');
        }

        function _desbloquear(id) {
            return $http.post('/api/usuario/comissario/desbloquear', '"' + id + '"');
        }

        var service = {
            getComissarios: _getComissarios,
            salvaComissario: _salvaComissario,
            bloquear: _bloquear,
            desbloquear : _desbloquear
        };

        return service;
    }
})();