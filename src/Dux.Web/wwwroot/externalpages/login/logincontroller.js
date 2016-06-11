(function () {
    'use strict';

    angular
        .module('externalPagesModule')
        .controller('loginController', loginController);

    loginController.$inject = ['loginService'];

    function loginController(loginService) {
        /* jshint validthis:true */

        var login = this;
        login.authMsg = '';
        
        login.app = {
            name: 'Dux',
            description: 'Gerenciador de Eventos',
            year: ((new Date()).getFullYear())
        };

        login.loginForm = {
            username: '',
            password : ''
        }

        activate();

        login.login = function () {
            loginService.login(login.loginForm).then(function (response) {

                window.location = '/app';

            }).catch(function (response) {
                if (response.status == 400) {
                    login.authMsg = response.error;
                }
                else {
                    login.authMsg = 'Nao foi possível realizar o login';
                }
            });
        }
                

        function activate() {

            
        }        
    }
})();
