(function () {
    'use strict';

    angular
        .module('externalPagesModule')
        .factory('loginService', loginService);

    loginService.$inject = ['$http', '$q', 'localStorageService'];

    function loginService($http, $q, localStorageService) {

        var loginService = {};

        var urlBase = 'http://localhost:5000/';
        

        var _login = function (loginData) {

            var data = "grant_type=password&username=" + loginData.username + "&password=" + loginData.password
                        + "&client_id=dux&scope=offline_access";
            var deferred = $q.defer();

            $http.post('/connect/token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
                localStorageService.set('authorizationData', { token: response.access_token, username: loginData.username, refreshToken: response.refresh_token });
                deferred.resolve(response);
            }).error(function (err, status) {
                deferred.reject(err);
            });

            return deferred.promise;
        };

        var _resetarSenha = function (reset) {
            return $http.post(urlBase + 'api/usuario/resetaSenha', reset);
        }


        var _enviarSenha = function (email) {
            return $http.post(urlBase + 'api/usuario/enviasenha', { Email: email });
        }



        loginService = {
            login: _login,
            enviarSenha: _enviarSenha,
            resetarSenha : _resetarSenha
        };

        return loginService;
    }
})();