(function () {
    'use strict';

    angular
        .module('app')
        .factory('UsuarioService', UsuarioService);

    UsuarioService.$inject = ['$http'];

    function UsuarioService($http) {
        var service = {
            post: function (usuario) {
                $http.post('/api/account', usuario);
            }
        };

        return service;

        function getData() { }
    }
})();