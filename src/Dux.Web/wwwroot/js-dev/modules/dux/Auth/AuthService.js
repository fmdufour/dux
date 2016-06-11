(function () {
    'use strict';

    angular
        .module('dux')
        .factory('AuthService', AuthService);

    AuthService.$inject = ['$http', '$rootScope', '$q', 'UserService', 'CasaService', 'localStorageService' ];

    function AuthService($http, $rootScope, $q, UserService, CasaService, localStorageService) {


        

        function _fillAuthData() {

            $rootScope.auth = {
                user: {
                    username: '',
                    foto: '',
                    nome: ''
                },
                casa: {
                    nome: ''
                }
            };

            UserService.getUser().then(function (response) {
                $rootScope.auth.user.nome = response.data.nome;
                $rootScope.auth.user.foto = response.data.foto;
            });

            CasaService.getCasaSelec().then(function (response) {
                $rootScope.auth.casa.nome = response.data.nomeCasa;
            })
        }

        function _setCasa(casa) {
            $rootScope.auth.casa.nome = casa.nomeCasa;
        }

        function _refreshToken() {

            var deferred = $q.defer();

            var authData = localStorageService.get('authorizationData');

            if (authData) {

                var data = "grant_type=refresh_token&refresh_token=" + authData.refreshToken + "&client_id=dux&scope=offline_access";

                localStorageService.remove('authorizationData');

                $http = $http || $injector.get('$http');
                $http.post('/connect/token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                    localStorageService.set('authorizationData', { token: response.access_token, username: response.username, refreshToken: response.refresh_token});

                    deferred.resolve(response);

                }).error(function (err, status) {
                    _logOut();
                    deferred.reject(err);
                });
            } else {
                deferred.reject();
            }

            return deferred.promise;
        }


        function _logOut() {
            localStorageService.remove('authorizationData');
            window.location = '/login';
        }


        var service = {            
            fillAuthData: _fillAuthData,
            refreshToken: _refreshToken,
            logOut: _logOut,
            setCasa : _setCasa
        };

        return service;

        
    }
})();