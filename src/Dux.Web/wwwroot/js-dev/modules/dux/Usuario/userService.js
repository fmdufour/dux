(function () {
    'use strict';

    angular
        .module('dux')
        .factory('UserService', UserService);

    UserService.$inject = ['$http'];

    function UserService($http) {
        var _getUser = function () {
            return $http.get('/api/usuario/GetUsuarioLogado');
        }

        function _getUsuario(id){
            return $http.get('/api/usuario/' + id);
        }

        function _getUsuariosDist() {
            return $http.get('/api/usuario/getUsuariosDist');
        }

        function _getUsuarios() {
            return $http.get('/api/usuario');
        }

        function _salvaUsuario(usuario) {
            return $http.post('/api/usuario', usuario);
        }

        function _bloquear(id) {
            return $http.post('/api/usuario/bloquear',  '"' + id + '"');
        }

        function _desbloquear(id) {
            return $http.post('/api/usuario/desbloquear', '"' + id + '"');
        }

        function _getTodosAcessos() {
            return $http.get('/api/usuario/todosAcessos');
        }

        function _getAcessosUsuario(id) {
            return $http.get('/api/usuario/Acessos/' + id);
        }

        function _defineAcessos(perfil) {
            return $http.post('/api/usuario/defineAcessos', perfil);
        }

        var service = {
            getUser: _getUser,
            getUsuariosDist: _getUsuariosDist,
            getUsuarios: _getUsuarios,
            salvaUsuario: _salvaUsuario,
            bloquear: _bloquear,
            desbloquear: _desbloquear,
            getTodosAcessos: _getTodosAcessos,
            getAcessosUsuario: _getAcessosUsuario,
            defineAcessos: _defineAcessos,
            getUsuario : _getUsuario
        };

        return service;
    }
})();