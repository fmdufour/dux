(function() {
    'use strict';

    angular
        .module('app.settings')
        .run(settingsRun);

    settingsRun.$inject = ['$rootScope', '$localStorage', 'AuthService', 'UserService'];

    function settingsRun($rootScope, $localStorage, AuthService, UserService) {

      // Global Settings
      // -----------------------------------
      $rootScope.app = {
        name: 'Dux',
        description: 'Gerenciador de Eventos',
        year: ((new Date()).getFullYear()),
        layout: {
          isFixed: true,
          isCollapsed: false,
          isBoxed: false,
          isRTL: false,
          horizontal: false,
          isFloat: false,
          asideHover: false,
          theme: null,
          asideScrollbar: false
        },
        useFullLayout: false,
        hiddenFooter: false,
        offsidebarOpen: false,
        asideToggled: false,
        viewAnimation: 'ng-fadeInUp'
      };


      $rootScope.pesquisa = function () {
          var txt = $('#txtPesquisa').val();
          $rootScope.$broadcast('pesquisa', { pesquisa: txt });
      }

      // Setup the layout mode
      $rootScope.app.layout.horizontal = ($rootScope.$stateParams.layout === 'app-h');


      AuthService.fillAuthData();
      

      // Restore layout settings [*** UNCOMMENT TO ENABLE ***]
      // if( angular.isDefined($localStorage.layout) )
      //   $rootScope.app.layout = $localStorage.layout;
      // else
      //   $localStorage.layout = $rootScope.app.layout;
      //
      // $rootScope.$watch('app.layout', function () {
      //   $localStorage.layout = $rootScope.app.layout;
      // }, true);

      // Close submenu when sidebar change from collapsed to normal
      $rootScope.$watch('app.layout.isCollapsed', function(newValue) {
        if( newValue === false )
          $rootScope.$broadcast('closeSidebarMenu');
      });

    }

})();
