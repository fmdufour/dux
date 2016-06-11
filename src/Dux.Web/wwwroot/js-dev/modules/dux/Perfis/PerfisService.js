(function () {
    'use strict';

    angular
        .module('dux')
        .factory('PerfisService', PerfisService);

    PerfisService.$inject = ['$http'];

    function PerfisService($http) {                

        function _getPerfisDistribuicao() {
            return $http.get('api/perfis/getPerfisDistribuicao');
        }

        function _salvaPerfilDist(perfil) {
            return $http.post('api/perfis/salvaDist', perfil);
        }

        function _getEditarDist(perfilId) {
            return $http.get('api/perfis/getEditarDist/'+ perfilId );
        }

        function _editaPerfilDist(perfil){
            return $http.post('api/perfis/editaPerfilDist', perfil);
        }

        function _excluiPerfilDist(perfilId) {
            return $http.delete('api/perfis/excluiPerfilDist/'+ perfilId);
        }

        function _getPerfisLista() {
            return $http.get('api/perfis/getPerfisLista');
        }

        function _getPerfilLista(id) {
            return $http.get('api/perfis/getPerfilLista/' + id)
        }

        function _salvaPerfilLista(perfil) {
            return $http.post('api/perfis/salvaLista', perfil);
        }

        var service = {
            getPerfisDistribuicao: _getPerfisDistribuicao,
            salvaPerfilDist: _salvaPerfilDist,
            getEditarDist: _getEditarDist,
            editaPerfilDist: _editaPerfilDist,
            excluiPerfilDist: _excluiPerfilDist,
            getPerfisLista: _getPerfisLista,
            getPerfilLista: _getPerfilLista,
            salvaPerfilLista : _salvaPerfilLista
        };

        return service;
    }
})();