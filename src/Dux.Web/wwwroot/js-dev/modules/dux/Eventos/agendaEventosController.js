(function () {
    'use strict';

    angular
        .module('dux')
        .controller('agendaEventosController', agendaEventosController);

    agendaEventosController.$inject = ['$state', 'EventoService', '$rootScope'];

    function agendaEventosController($state, EventoService, $rootScope) {
        /* jshint validthis:true */
        var vm = this;

        vm.clickEvento = function (evento) {

            $rootScope.$emit('clickEvento', { evento : evento })
        }

        activate();

        function activate() {
            vm.fetchEventos = function (inicio, final, timezone, callback) {
                var events = {};
                EventoService.EventosCal(inicio, final).then(function (response) {
                    events = response.data;
                    callback(events);
                });
            };

            vm.uiConfig = {
                calendar: {
                    height: 480,                    
                    header: {
                        left: 'today',
                        center: 'title',
                        right: 'prev,next'
                    },
                    eventClick: vm.clickEvento
                }
            };

            vm.eventSources = [vm.fetchEventos];
        }
    }
})();
