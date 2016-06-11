/*!
 * 
 * Angle - Bootstrap Admin App + AngularJS
 * 
 * Version: 3.2.0
 * Author: @themicon_co
 * Website: http://themicon.co
 * License: https://wrapbootstrap.com/help/licenses
 * 
 */

// APP START
// ----------------------------------- 

(function() {
    'use strict';

    angular
        .module('angle', [
            'app.core',
            'app.routes',
            'dux',
            'app.sidebar',
            'app.navsearch',
            'app.preloader',
            'app.loadingbar',
            //'app.translate',
            'app.settings',
            'app.utils'            
        ]);    
})();


(function() {
    'use strict';

    angular
        .module('app.core', [
            'ngRoute',
            'ngAnimate',
            'ngStorage',
            //'ngCookies',
            //'pascalprecht.translate',
            'ui.bootstrap',
            'ui.router',
            'oc.lazyLoad',
            'cfp.loadingBar',
            'ngSanitize',
            'ngResource',
            'ui.utils'
        ]);
})();
(function() {
    'use strict';

    angular
        .module('app.colors', []);
})();
(function() {
    'use strict';

    angular
        .module('app.lazyload', []);
})();
(function() {
    'use strict';

    angular
        .module('dux', ['LocalStorageModule',
                        'ui.calendar',
                        'toastr',
                        'ngDialog',
                        'ngDragDrop']);

})();
(function() {
    'use strict';

    angular
        .module('app.loadingbar', []);
})();
(function() {
    'use strict';

    angular
        .module('app.preloader', []);
})();


(function() {
    'use strict';

    angular
        .module('app.routes', [
            'app.lazyload'
        ]);
})();
(function() {
    'use strict';

    angular
        .module('app.navsearch', []);
})();
(function() {
    'use strict';

    angular
        .module('app.sidebar', ['dux']);
})();
(function() {
    'use strict';

    angular
        .module('app.utils', [
          'app.colors'
          ]);
})();

(function() {
    'use strict';

    angular
        .module('app.settings', []);
})();
(function() {
    'use strict';

    angular
        .module('app.core')
        .config(coreConfig);

    coreConfig.$inject = ['$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$animateProvider'];
    function coreConfig($controllerProvider, $compileProvider, $filterProvider, $provide, $animateProvider){

      var core = angular.module('app.core');
      // registering components after bootstrap
      core.controller = $controllerProvider.register;
      core.directive  = $compileProvider.directive;
      core.filter     = $filterProvider.register;
      core.factory    = $provide.factory;
      core.service    = $provide.service;
      core.constant   = $provide.constant;
      core.value      = $provide.value;

      // Disables animation on items with class .ng-no-animation
      $animateProvider.classNameFilter(/^((?!(ng-no-animation)).)*$/);

    }

})();
/**=========================================================
 * Module: constants.js
 * Define constants to inject across the application
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.core')
        .constant('APP_MEDIAQUERY', {
          'desktopLG':             1200,
          'desktop':                992,
          'tablet':                 768,
          'mobile':                 480
        })
      ;

})();
(function() {
    'use strict';

    angular
        .module('app.core')
        .run(appRun);

    appRun.$inject = ['$rootScope', '$state', '$stateParams',  '$window', '$templateCache', 'Colors'];
    
    function appRun($rootScope, $state, $stateParams, $window, $templateCache, Colors) {
      
      // Set reference to access them from any scope
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
      $rootScope.$storage = $window.localStorage;

      // Uncomment this to disable template cache
      /*$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
          if (typeof(toState) !== 'undefined'){
            $templateCache.remove(toState.templateUrl);
          }
      });*/

      // Allows to use branding color with interpolation
      // {{ colorByName('primary') }}
      $rootScope.colorByName = Colors.byName;

      // cancel click event easily
      $rootScope.cancel = function($event) {
        $event.stopPropagation();
      };

      // Hooks Example
      // ----------------------------------- 

      // Hook not found
      $rootScope.$on('$stateNotFound',
        function(event, unfoundState/*, fromState, fromParams*/) {
            console.log(unfoundState.to); // "lazy.state"
            console.log(unfoundState.toParams); // {a:1, b:2}
            console.log(unfoundState.options); // {inherit:false} + default options
        });
      // Hook error
      $rootScope.$on('$stateChangeError',
        function(event, toState, toParams, fromState, fromParams, error){
          console.log(error);
        });
      // Hook success
      $rootScope.$on('$stateChangeSuccess',
        function(/*event, toState, toParams, fromState, fromParams*/) {
          // display new view from top
          $window.scrollTo(0, 0);
          // Save the route title
          $rootScope.currTitle = $state.current.title;
        });

      // Load a title dynamically
      $rootScope.currTitle = $state.current.title;
      $rootScope.pageTitle = function() {
        var title = $rootScope.app.name + ' - ' + ($rootScope.currTitle || $rootScope.app.description);
        document.title = title;
        return title;
      };      

    }

})();


(function() {
    'use strict';

    angular
        .module('app.colors')
        .constant('APP_COLORS', {
          'primary':                '#5d9cec',
          'success':                '#27c24c',
          'info':                   '#23b7e5',
          'warning':                '#ff902b',
          'danger':                 '#f05050',
          'inverse':                '#131e26',
          'green':                  '#37bc9b',
          'pink':                   '#f532e5',
          'purple':                 '#7266ba',
          'dark':                   '#3a3f51',
          'yellow':                 '#fad732',
          'gray-darker':            '#232735',
          'gray-dark':              '#3a3f51',
          'gray':                   '#dde6e9',
          'gray-light':             '#e4eaec',
          'gray-lighter':           '#edf1f2'
        })
        ;
})();
/**=========================================================
 * Module: colors.js
 * Services to retrieve global colors
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.colors')
        .service('Colors', Colors);

    Colors.$inject = ['APP_COLORS'];
    function Colors(APP_COLORS) {
        this.byName = byName;

        ////////////////

        function byName(name) {
          return (APP_COLORS[name] || '#fff');
        }
    }

})();

(function() {
    'use strict';

    angular
        .module('app.lazyload')
        .config(lazyloadConfig);

    lazyloadConfig.$inject = ['$ocLazyLoadProvider', 'APP_REQUIRES'];
    function lazyloadConfig($ocLazyLoadProvider, APP_REQUIRES){

      // Lazy Load modules configuration
      $ocLazyLoadProvider.config({
        debug: false,
        events: true,
        modules: APP_REQUIRES.modules
      });

    }
})();
(function() {
    'use strict';

    angular
        .module('app.lazyload')
        .constant('APP_REQUIRES', {
          // jQuery based and standalone scripts
          scripts: {
            'modernizr':          ['vendor/modernizr/modernizr.custom.js'],
            'icons':              ['vendor/fontawesome/css/font-awesome.min.css',
                                   'vendor/simple-line-icons/css/simple-line-icons.css']
          },
          // Angular based script (use the right module name)
          modules: [
            // {name: 'toaster', files: ['vendor/angularjs-toaster/toaster.js', 'vendor/angularjs-toaster/toaster.css']}
          ]
        });

})();

(function () {
    'use strict';

    angular.module('dux').filter('data', ['$filter',function($filter){
        return function(input)
        {
            if(input == null){ return ""; } 
 
            var _date = $filter('date')(new Date(input), 'dd/MM/yyyy');
 
            return _date.toUpperCase();
        }
    }]);
})();
(function() {
    'use strict';

    angular
        .module('app.loadingbar')
        .config(loadingbarConfig)
        ;
    loadingbarConfig.$inject = ['cfpLoadingBarProvider'];
    function loadingbarConfig(cfpLoadingBarProvider){
      cfpLoadingBarProvider.includeBar = true;
      cfpLoadingBarProvider.includeSpinner = false;
      cfpLoadingBarProvider.latencyThreshold = 500;
      cfpLoadingBarProvider.parentSelector = '.wrapper > section';
    }
})();
(function() {
    'use strict';

    angular
        .module('app.loadingbar')
        .run(loadingbarRun)
        ;
    loadingbarRun.$inject = ['$rootScope', '$timeout', 'cfpLoadingBar'];
    function loadingbarRun($rootScope, $timeout, cfpLoadingBar){

      // Loading bar transition
      // ----------------------------------- 
      var thBar;
      $rootScope.$on('$stateChangeStart', function() {
          if($('.wrapper > section').length) // check if bar container exists
            thBar = $timeout(function() {
              cfpLoadingBar.start();
            }, 0); // sets a latency Threshold
      });
      $rootScope.$on('$stateChangeSuccess', function(event) {
          event.targetScope.$watch('$viewContentLoaded', function () {
            $timeout.cancel(thBar);
            cfpLoadingBar.complete();
          });
      });

    }

})();
(function() {
    'use strict';

    angular
        .module('app.preloader')
        .directive('preloader', preloader);

    preloader.$inject = ['$animate', '$timeout', '$q'];
    function preloader ($animate, $timeout, $q) {

        var directive = {
            restrict: 'EAC',
            template: 
              '<div class="preloader-progress">' +
                  '<div class="preloader-progress-bar" ' +
                       'ng-style="{width: loadCounter + \'%\'}"></div>' +
              '</div>'
            ,
            link: link
        };
        return directive;

        ///////

        function link(scope, el) {

          scope.loadCounter = 0;

          var counter  = 0,
              timeout;

          // disables scrollbar
          angular.element('body').css('overflow', 'hidden');
          // ensure class is present for styling
          el.addClass('preloader');

          appReady().then(endCounter);

          timeout = $timeout(startCounter);

          ///////

          function startCounter() {

            var remaining = 100 - counter;
            counter = counter + (0.015 * Math.pow(1 - Math.sqrt(remaining), 2));

            scope.loadCounter = parseInt(counter, 10);

            timeout = $timeout(startCounter, 20);
          }

          function endCounter() {

            $timeout.cancel(timeout);

            scope.loadCounter = 100;

            $timeout(function(){
              // animate preloader hiding
              $animate.addClass(el, 'preloader-hidden');
              // retore scrollbar
              angular.element('body').css('overflow', '');
            }, 300);
          }

          function appReady() {
            var deferred = $q.defer();
            var viewsLoaded = 0;
            // if this doesn't sync with the real app ready
            // a custom event must be used instead
            var off = scope.$on('$viewContentLoaded', function () {
              viewsLoaded ++;
              // we know there are at least two views to be loaded 
              // before the app is ready (1-index.html 2-app*.html)
              if ( viewsLoaded === 2) {
                // with resolve this fires only once
                $timeout(function(){
                  deferred.resolve();
                }, 3000);

                off();
              }

            });

            return deferred.promise;
          }

        } //link
    }

})();
/**=========================================================
 * Module: helpers.js
 * Provides helper functions for routes definition
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('app.routes')
        .provider('RouteHelpers', RouteHelpersProvider)
    ;

    RouteHelpersProvider.$inject = ['APP_REQUIRES'];
    function RouteHelpersProvider(APP_REQUIRES) {

        /* jshint validthis:true */
        return {
            // provider access level
            basepath: basepath,
            resolveFor: resolveFor,
            // controller access level
            $get: function () {
                return {
                    basepath: basepath,
                    resolveFor: resolveFor
                };
            }
        };

        // Set here the base of the relative path
        // for all app views
        function basepath(uri) {
            return '/' + uri;
        }

        // Generates a resolve object by passing script names
        // previously configured in constant.APP_REQUIRES
        function resolveFor() {
            var _args = arguments;
            return {
                deps: ['$ocLazyLoad', '$q', function ($ocLL, $q) {
                    // Creates a promise chain for each argument
                    var promise = $q.when(1); // empty promise
                    for (var i = 0, len = _args.length; i < len; i++) {
                        promise = andThen(_args[i]);
                    }
                    return promise;

                    // creates promise to chain dynamically
                    function andThen(_arg) {
                        // also support a function that returns a promise
                        if (typeof _arg === 'function')
                            return promise.then(_arg);
                        else
                            return promise.then(function () {
                                // if is a module, pass the name. If not, pass the array
                                var whatToLoad = getRequired(_arg);
                                // simple error check
                                if (!whatToLoad) return $.error('Route resolve: Bad resource name [' + _arg + ']');
                                // finally, return a promise
                                return $ocLL.load(whatToLoad);
                            });
                    }
                    // check and returns required data
                    // analyze module items with the form [name: '', files: []]
                    // and also simple array of script files (for not angular js)
                    function getRequired(name) {
                        if (APP_REQUIRES.modules)
                            for (var m in APP_REQUIRES.modules)
                                if (APP_REQUIRES.modules[m].name && APP_REQUIRES.modules[m].name === name)
                                    return APP_REQUIRES.modules[m];
                        return APP_REQUIRES.scripts && APP_REQUIRES.scripts[name];
                    }

                }]
            };
        } // resolveFor

    }


})();


/**=========================================================
 * Module: config.js
 * App routes and resources configuration
 =========================================================*/


(function () {
    'use strict';

    angular
        .module('app.routes')
        .config(routesConfig);

    routesConfig.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelpersProvider', '$httpProvider'];
    function routesConfig($stateProvider, $locationProvider, $urlRouterProvider, helper, $httpProvider) {

        // Set the following to true to enable the HTML5 Mode
        // You may have to set <base> tag in index and a routing configuration in your server
        $locationProvider.html5Mode(false);

        // defaults to dashboard
        $urlRouterProvider.otherwise('/Eventos/Agenda');

        // 
        // Application Routes
        // -----------------------------------   
        $stateProvider
          .state('app', {
              //url: '/',
              abstract: true,
              resolve: helper.resolveFor('modernizr', 'icons')
          })
          .state('app.eventosagenda', {
              url: '/Eventos/Agenda',
              title: 'Eventos',
              templateUrl: helper.basepath('Eventos/Agenda'),
              controller: 'agendaEventosController as vm'
          })
          .state('app.eventoscriar', {
              url: '/Eventos/Criar',
              title: 'Criar Evento',
              templateUrl: helper.basepath('Eventos/Criar'),
              controller: 'criarEventoController as vm'
          })
          .state('app.perfis', {
              url: '/Perfis',
              title: 'Perfis',
              templateUrl: helper.basepath('Perfis/Index')
          })
          .state('app.perfislistas', {
              url: '/Perfis/Listas',
              title: 'Perfil de Listas',
              controller: 'perfilListaController as vm',
              templateUrl: helper.basepath('Perfis/Listas')
          })
          .state('app.perfislistacriar', {
              url: '/Perfis/Listas/Criar/:id',
              title: 'Criacao de Perfil de Distribuicao',
              templateUrl: helper.basepath('Perfis/ListasCriar'),
              controller: 'criarPerfilListaController as vm'
          })
          .state('app.perfisdistribuicao', {
              url: '/Perfis/Distribuicao',
              title: 'Perfil de Distribuicao',
              templateUrl: helper.basepath('Perfis/Distribuicao'),
              controller: 'perfilDistribuicaoController as vm'
          })
          .state('app.perfisdistcriar', {
              url: '/Perfis/Distribuicao/Criar',
              title: 'Criacao de Perfil de Distribuicao',
              templateUrl: helper.basepath('Perfis/DistribuicaoCriar'),
              controller: 'criarPerfilDistController as vm'
          })
          .state('app.perfisdisteditar', {
              url: '/Perfis/Distribuicao/Editar/:perfilId',
              title: 'Edicao de Perfil de Distribuicao',
              templateUrl: helper.basepath('Perfis/DistribuicaoEditar'),
              controller: 'editarPerfilDistController as vm'
          })
          .state('app.usuariocasas', {
              url: '/Usuario/Casas',
              title: 'Selecao de Casas',
              templateUrl: helper.basepath('Usuario/SelecaoCasa'),
              controller: "selecaoCasaController as vm"
          })
          .state('app.usuarios', {
              url: '/Usuarios/Consulta',
              title: 'Consulta de Usuarios',
              templateUrl: helper.basepath('Usuario/Consulta'),
              controller: "usuarioConsultaController as vm"
          })
          .state('app.usuariocriar', {
              url: '/Usuario/Criar',
              title: 'Cadastro de Usuarios',
              templateUrl: helper.basepath('Usuario/Criar'),
              controller: "usuarioCriarController as vm"
          })
          .state('app.usuarioacessos', {
              url: '/Usuario/Acessos/:id',
              title: 'Acessos Usuario',
              templateUrl: helper.basepath('Usuario/Acessos'),
              controller: "usuarioAcessoController as vm"
          })
          .state('app.listas', {
              url: '/Evento/:id/Listas/',
              title: 'Listas',
              templateUrl: helper.basepath('Listas/Consulta'),
              controller: "consultaListasController as vm"
          })
          .state('app.listascriar', {
              url: '/Evento/:eventoId/Listas/Criar/:id',
              title: 'Criar Lista',
              templateUrl: helper.basepath('Listas/Criar'),
              controller: "criarListaController as vm"
          })
          .state('app.distribuicao', {
              url: '/Listas/:listaId/Distribuicao/:id',
              title: 'Distribuir Convidados',
              templateUrl: helper.basepath('Distribuicao/Criar'),
              controller: "distribuicaoController as vm"
          })
          .state('app.addnomelistas', {
              url: '/Evento/:eventoId/Listas/Promoter',
              title: 'Minhas Listas',
              templateUrl: helper.basepath('AddNome/Listas'),
              controller: "listasPromoterController as vm"
          })
          .state('app.addnome', {
              url: '/Evento/Listas/:id/Nome',
              title: 'Adicionar Nome Lista',
              templateUrl: helper.basepath('AddNome/Add'),
              controller: 'addNomeController as vm'
          })
          .state('app.portarialistas', {
              url: '/Evento/:id/Portaria/Listas',
              title: 'Listas',
              templateUrl: helper.basepath('Portaria/Listas'),
              controller: "listasPortariaController as vm"
          })
          .state('app.portariaverlista', {
              url: '/Portaria/Lista/:id/Nomes',
              title: 'Portaria',
              templateUrl: helper.basepath('Portaria/Lista'),
              controller: "nomesListaController as vm"
          })
          .state('app.portariaverlistageral', {
              url: '/Evento/:id/Portaria',
              title: 'Portaria',
              templateUrl: helper.basepath('Portaria/ListaGeral'),
              controller: "listaGeralController as vm"
          })
          .state('app.comissarios', {
              url: '/Comissarios',
              title: 'Comissarios',
              templateUrl: helper.basepath('Usuario/Comissarios'),
              controller: "consultaComissariosController as vm"
          })
          .state('app.comissariocriar', {
              url: '/Comissarios/Criar',
              title: 'Criar Comissario',
              templateUrl: helper.basepath('Usuario/CriarComissario'),
              controller: "criarComissarioController as vm"
          });
        
        // 
        // CUSTOM RESOLVES
        //   Add your own resolves properties
        //   following this object extend
        //   method
        // ----------------------------------- 
        // .state('app.someroute', {
        //   url: '/some_url',
        //   templateUrl: 'path_to_template.html',
        //   controller: 'someController',
        //   resolve: angular.extend(
        //     helper.resolveFor(), {
        //     // YOUR RESOLVES GO HERE
        //     }
        //   )
        // })        

        $httpProvider.interceptors.push('authInterceptorService');

    }// routesConfig

})();


/**=========================================================
 * Module: navbar-search.js
 * Navbar search toggler * Auto dismiss on ESC key
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.navsearch')
        .directive('searchOpen', searchOpen)
        .directive('searchDismiss', searchDismiss);

    //
    // directives definition
    // 
    
    function searchOpen () {
        var directive = {
            controller: searchOpenController,
            restrict: 'A'
        };
        return directive;

    }

    function searchDismiss () {
        var directive = {
            controller: searchDismissController,
            restrict: 'A'
        };
        return directive;
        
    }

    //
    // Contrller definition
    // 
    
    searchOpenController.$inject = ['$scope', '$element', 'NavSearch'];
    function searchOpenController ($scope, $element, NavSearch) {
      $element
        .on('click', function (e) { e.stopPropagation(); })
        .on('click', NavSearch.toggle);
    }

    searchDismissController.$inject = ['$scope', '$element', 'NavSearch'];
    function searchDismissController ($scope, $element, NavSearch) {
      
      var inputSelector = '.navbar-form input[type="text"]';

      $(inputSelector)
        .on('click', function (e) { e.stopPropagation(); })
        .on('keyup', function(e) {
          if (e.keyCode === 27) // ESC
            NavSearch.dismiss();
        });
        
      // click anywhere closes the search
      $(document).on('click', NavSearch.dismiss);
      // dismissable options
      $element
        .on('click', function (e) { e.stopPropagation(); })
        .on('click', NavSearch.dismiss);
    }

})();


/**=========================================================
 * Module: nav-search.js
 * Services to share navbar search functions
 =========================================================*/
 
(function() {
    'use strict';

    angular
        .module('app.navsearch')
        .service('NavSearch', NavSearch);

    function NavSearch() {
        this.toggle = toggle;
        this.dismiss = dismiss;

        ////////////////

        var navbarFormSelector = 'form.navbar-form';

        function toggle() {
          var navbarForm = $(navbarFormSelector);

          navbarForm.toggleClass('open');
          
          var isOpen = navbarForm.hasClass('open');
          
          navbarForm.find('input')[isOpen ? 'focus' : 'blur']();
        }

        function dismiss() {
          $(navbarFormSelector)
            .removeClass('open') // Close control
            .find('input[type="text"]').blur() // remove focus
            .val('') // Empty input
            ;
        }        
    }
})();

/**=========================================================
 * Module: sidebar-menu.js
 * Handle sidebar collapsible elements
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.sidebar')
        .controller('SidebarController', SidebarController);

    SidebarController.$inject = ['$rootScope', '$scope', '$state', 'SidebarLoader', 'Utils'];
    function SidebarController($rootScope, $scope, $state, SidebarLoader,  Utils) {

        activate();

        ////////////////

        var eventoSelecionado = {};

        function activate() {
          var collapseList = [];

          // demo: when switch from collapse to hover, close all items
          $rootScope.$watch('app.layout.asideHover', function(oldVal, newVal){
            if ( newVal === false && oldVal === true) {
              closeAllBut(-1);
            }
          });


          // Load menu from json file
          // ----------------------------------- 

          SidebarLoader.getMenu(sidebarReady);
          
          function sidebarReady(items) {
            $scope.menuItems = items;
          }

          $rootScope.$on('clickEvento', function (e, data) {
              if (eventoSelecionado != data.evento) {
                  var headerEvento = $scope.menuItems[0];
                  var opcaoLista = $scope.menuItems[1];
                  var opcaoPortaria = $scope.menuItems[2];
                  var headerPromoter = $scope.menuItems[3];
                  var addNomes = $scope.menuItems[4];
                  var distComiss = $scope.menuItems[5];

                  headerEvento.text = "Evento " + data.evento.title;
                  headerEvento.oculto = false;

                  opcaoLista.oculto = false;
                  opcaoLista.sref = "app.listas";
                  opcaoLista.params = { id: data.evento.id };

                  opcaoPortaria.oculto = false;
                  opcaoPortaria.sref = "app.portarialistas"
                  opcaoPortaria.params = { id: data.evento.id };

                  headerPromoter.oculto = false;

                  addNomes.oculto = false;
                  addNomes.sref = "app.addnomelistas";
                  addNomes.params = { eventoId: data.evento.id };

                  distComiss.oculto = false;
                  distComiss.sref = "app.comissariodistribuir"
                  addNomes.params = { eventoId : data.evento.id }

                  eventoSelecionado = data.evento;
              }
          });

          // Handle sidebar and collapse items
          // ----------------------------------
          
          $scope.getMenuItemPropClasses = function(item) {
            return (item.heading ? 'nav-heading' : '') +
                   (isActive(item) ? ' active' : '') ;
          };

          $scope.addCollapse = function($index, item) {
            collapseList[$index] = $rootScope.app.layout.asideHover ? true : !isActive(item);
          };

          $scope.isCollapse = function($index) {
            return (collapseList[$index]);
          };

          $scope.toggleCollapse = function($index, isParentItem) {

            // collapsed sidebar doesn't toggle drodopwn
            if( Utils.isSidebarCollapsed() || $rootScope.app.layout.asideHover ) return true;

            // make sure the item index exists
            if( angular.isDefined( collapseList[$index] ) ) {
              if ( ! $scope.lastEventFromChild ) {
                collapseList[$index] = !collapseList[$index];
                closeAllBut($index);
              }
            }
            else if ( isParentItem ) {
              closeAllBut(-1);
            }
            
            $scope.lastEventFromChild = isChild($index);

            return true;
          
          };

          // Controller helpers
          // ----------------------------------- 

            // Check item and children active state
            function isActive(item) {

              if(!item) return;

              if( !item.sref || item.sref === '#') {
                var foundActive = false;
                angular.forEach(item.submenu, function(value) {
                  if(isActive(value)) foundActive = true;
                });
                return foundActive;
              }
              else
                return $state.is(item.sref) || $state.includes(item.sref);
            }

            function closeAllBut(index) {
              index += '';
              for(var i in collapseList) {
                if(index < 0 || index.indexOf(i) < 0)
                  collapseList[i] = true;
              }
            }

            function isChild($index) {
              /*jshint -W018*/
              return (typeof $index === 'string') && !($index.indexOf('-') < 0);
            }
        
        } // activate
    }

})();

/**=========================================================
 * Module: sidebar.js
 * Wraps the sidebar and handles collapsed state
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.sidebar')
        .directive('sidebar', sidebar);

    sidebar.$inject = ['$rootScope', '$timeout', '$window', 'Utils'];
    function sidebar ($rootScope, $timeout, $window, Utils) {
        var $win = angular.element($window);
        var directive = {
            // bindToController: true,
            // controller: Controller,
            // controllerAs: 'vm',
            link: link,
            restrict: 'EA',
            template: '<nav class="sidebar" ng-transclude></nav>',
            transclude: true,
            replace: true
            // scope: {}
        };
        return directive;

        function link(scope, element, attrs) {

          var currentState = $rootScope.$state.current.name;
          var $sidebar = element;

          var eventName = Utils.isTouch() ? 'click' : 'mouseenter' ;
          var subNav = $();

          $sidebar.on( eventName, '.nav > li', function() {

            if( Utils.isSidebarCollapsed() || $rootScope.app.layout.asideHover ) {

              subNav.trigger('mouseleave');
              subNav = toggleMenuItem( $(this), $sidebar);

              // Used to detect click and touch events outside the sidebar          
              sidebarAddBackdrop();

            }

          });

          scope.$on('closeSidebarMenu', function() {
            removeFloatingNav();
          });

          // Normalize state when resize to mobile
          $win.on('resize', function() {
            if( ! Utils.isMobile() )
          	asideToggleOff();
          });

          // Adjustment on route changes
          $rootScope.$on('$stateChangeStart', function(event, toState) {
            currentState = toState.name;
            // Hide sidebar automatically on mobile
            asideToggleOff();

            $rootScope.$broadcast('closeSidebarMenu');
          });

      	  // Autoclose when click outside the sidebar
          if ( angular.isDefined(attrs.sidebarAnyclickClose) ) {
            
            var wrapper = $('.wrapper');
            var sbclickEvent = 'click.sidebar';
            
            $rootScope.$watch('app.asideToggled', watchExternalClicks);

          }

          //////

          function watchExternalClicks(newVal) {
            // if sidebar becomes visible
            if ( newVal === true ) {
              $timeout(function(){ // render after current digest cycle
                wrapper.on(sbclickEvent, function(e){
                  // if not child of sidebar
                  if( ! $(e.target).parents('.aside').length ) {
                    asideToggleOff();
                  }
                });
              });
            }
            else {
              // dettach event
              wrapper.off(sbclickEvent);
            }
          }

          function asideToggleOff() {
            $rootScope.app.asideToggled = false;
            if(!scope.$$phase) scope.$apply(); // anti-pattern but sometimes necessary
      	  }
        }
        
        ///////

        function sidebarAddBackdrop() {
          var $backdrop = $('<div/>', { 'class': 'dropdown-backdrop'} );
          $backdrop.insertAfter('.aside-inner').on('click mouseenter', function () {
            removeFloatingNav();
          });
        }

        // Open the collapse sidebar submenu items when on touch devices 
        // - desktop only opens on hover
        function toggleTouchItem($element){
          $element
            .siblings('li')
            .removeClass('open')
            .end()
            .toggleClass('open');
        }

        // Handles hover to open items under collapsed menu
        // ----------------------------------- 
        function toggleMenuItem($listItem, $sidebar) {

          removeFloatingNav();

          var ul = $listItem.children('ul');
          
          if( !ul.length ) return $();
          if( $listItem.hasClass('open') ) {
            toggleTouchItem($listItem);
            return $();
          }

          var $aside = $('.aside');
          var $asideInner = $('.aside-inner'); // for top offset calculation
          // float aside uses extra padding on aside
          var mar = parseInt( $asideInner.css('padding-top'), 0) + parseInt( $aside.css('padding-top'), 0);
          var subNav = ul.clone().appendTo( $aside );
          
          toggleTouchItem($listItem);

          var itemTop = ($listItem.position().top + mar) - $sidebar.scrollTop();
          var vwHeight = $win.height();

          subNav
            .addClass('nav-floating')
            .css({
              position: $rootScope.app.layout.isFixed ? 'fixed' : 'absolute',
              top:      itemTop,
              bottom:   (subNav.outerHeight(true) + itemTop > vwHeight) ? 0 : 'auto'
            });

          subNav.on('mouseleave', function() {
            toggleTouchItem($listItem);
            subNav.remove();
          });

          return subNav;
        }

        function removeFloatingNav() {
          $('.dropdown-backdrop').remove();
          $('.sidebar-subnav.nav-floating').remove();
          $('.sidebar li.open').removeClass('open');
        }
    }


})();


(function() {
    'use strict';

    angular
        .module('app.sidebar')
        .service('SidebarLoader', SidebarLoader);

    SidebarLoader.$inject = ['$http'];
    function SidebarLoader($http) {
        this.getMenu = getMenu;

        ////////////////

        function getMenu(onReady, onError) {
          var menuJson = 'server/sidebar-menu.json',
              menuURL  = menuJson + '?v=' + (new Date().getTime()); // jumps cache
            
          onError = onError || function() { alert('Failure loading menu'); };

          $http
            .get(menuURL)
            .success(onReady)
            .error(onError);
        }
    }
})();
(function() {
    'use strict';

    angular
        .module('app.sidebar')
        .controller('UserBlockController', UserBlockController);

    UserBlockController.$inject = ['$rootScope', '$scope', 'UserService'];
    function UserBlockController($rootScope, $scope, UserService) {

        activate();

        ////////////////

        function activate() {
            

          // Hides/show user avatar on sidebar
          $rootScope.toggleUserBlock = function(){
            $rootScope.$broadcast('toggleUserBlock');
          };

          $rootScope.userBlockVisible = true;

          var detach = $rootScope.$on('toggleUserBlock', function(/*event, args*/) {

            $rootScope.userBlockVisible = ! $rootScope.userBlockVisible;

          });

          $scope.$on('$destroy', detach);
        }
    }
})();

/**=========================================================
 * Module: animate-enabled.js
 * Enable or disables ngAnimate for element with directive
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('animateEnabled', animateEnabled);

    animateEnabled.$inject = ['$animate'];
    function animateEnabled ($animate) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
          scope.$watch(function () {
            return scope.$eval(attrs.animateEnabled, scope);
          }, function (newValue) {
            $animate.enabled(!!newValue, element);
          });
        }
    }

})();

/**=========================================================
 * Module: browser.js
 * Browser detection
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .service('Browser', Browser);

    Browser.$inject = ['$window'];
    function Browser($window) {
      return $window.jQBrowser;
    }

})();

/**=========================================================
 * Module: clear-storage.js
 * Removes a key from the browser storage via element click
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('resetKey', resetKey);

    resetKey.$inject = ['$state', '$localStorage'];
    function resetKey ($state, $localStorage) {
        var directive = {
            link: link,
            restrict: 'A',
            scope: {
              resetKey: '@'
            }
        };
        return directive;

        function link(scope, element) {
          element.on('click', function (e) {
              e.preventDefault();

              if(scope.resetKey) {
                delete $localStorage[scope.resetKey];
                $state.go($state.current, {}, {reload: true});
              }
              else {
                $.error('No storage key specified for reset.');
              }
          });
        }
    }

})();

/**=========================================================
 * Module: fullscreen.js
 * Toggle the fullscreen mode on/off
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('toggleFullscreen', toggleFullscreen);

    toggleFullscreen.$inject = ['Browser'];
    function toggleFullscreen (Browser) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element) {
          // Not supported under IE
          if( Browser.msie ) {
            element.addClass('hide');
          }
          else {
            element.on('click', function (e) {
                e.preventDefault();

                if (screenfull.enabled) {
                  
                  screenfull.toggle();
                  
                  // Switch icon indicator
                  if(screenfull.isFullscreen)
                    $(this).children('em').removeClass('fa-expand').addClass('fa-compress');
                  else
                    $(this).children('em').removeClass('fa-compress').addClass('fa-expand');

                } else {
                  $.error('Fullscreen not enabled');
                }

            });
          }
        }
    }


})();

/**=========================================================
 * Module: load-css.js
 * Request and load into the current page a css file
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('loadCss', loadCss);

    function loadCss () {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
          element.on('click', function (e) {
              if(element.is('a')) e.preventDefault();
              var uri = attrs.loadCss,
                  link;

              if(uri) {
                link = createLink(uri);
                if ( !link ) {
                  $.error('Error creating stylesheet link element.');
                }
              }
              else {
                $.error('No stylesheet location defined.');
              }

          });
        }
        
        function createLink(uri) {
          var linkId = 'autoloaded-stylesheet',
              oldLink = $('#'+linkId).attr('id', linkId + '-old');

          $('head').append($('<link/>').attr({
            'id':   linkId,
            'rel':  'stylesheet',
            'href': uri
          }));

          if( oldLink.length ) {
            oldLink.remove();
          }

          return $('#'+linkId);
        }
    }

})();

/**=========================================================
 * Module: now.js
 * Provides a simple way to display the current time formatted
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('now', now);

    now.$inject = ['dateFilter', '$interval'];
    function now (dateFilter, $interval) {
        var directive = {
            link: link,
            restrict: 'EA'
        };
        return directive;

        function link(scope, element, attrs) {
          var format = attrs.format;

          function updateTime() {
            var dt = dateFilter(new Date(), format);
            element.text(dt);
          }

          updateTime();
          var intervalPromise = $interval(updateTime, 1000);

          scope.$on('$destroy', function(){
            $interval.cancel(intervalPromise);
          });

        }
    }

})();

/**=========================================================
 * Module: table-checkall.js
 * Tables check all checkbox
 =========================================================*/
(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('checkAll', checkAll);

    function checkAll () {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element) {
          element.on('change', function() {
            var $this = $(this),
                index= $this.index() + 1,
                checkbox = $this.find('input[type="checkbox"]'),
                table = $this.parents('table');
            // Make sure to affect only the correct checkbox column
            table.find('tbody > tr > td:nth-child('+index+') input[type="checkbox"]')
              .prop('checked', checkbox[0].checked);

          });
        }
    }

})();

/**=========================================================
 * Module: trigger-resize.js
 * Triggers a window resize event from any element
 =========================================================*/
(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('triggerResize', triggerResize);

    triggerResize.$inject = ['$window', '$timeout'];
    function triggerResize ($window, $timeout) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element) {
          element.on('click', function(){
            $timeout(function(){
              // all IE friendly dispatchEvent
              var evt = document.createEvent('UIEvents');
              evt.initUIEvent('resize', true, false, $window, 0);
              $window.dispatchEvent(evt);
              // modern dispatchEvent way
              // $window.dispatchEvent(new Event('resize'));
            });
          });
        }
    }

})();

/**=========================================================
 * Module: utils.js
 * Utility library to use across the theme
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .service('Utils', Utils);

    Utils.$inject = ['$window', 'APP_MEDIAQUERY'];
    function Utils($window, APP_MEDIAQUERY) {

        var $html = angular.element('html'),
            $win  = angular.element($window),
            $body = angular.element('body');

        return {
          // DETECTION
          support: {
            transition: (function() {
                    var transitionEnd = (function() {

                        var element = document.body || document.documentElement,
                            transEndEventNames = {
                                WebkitTransition: 'webkitTransitionEnd',
                                MozTransition: 'transitionend',
                                OTransition: 'oTransitionEnd otransitionend',
                                transition: 'transitionend'
                            }, name;

                        for (name in transEndEventNames) {
                            if (element.style[name] !== undefined) return transEndEventNames[name];
                        }
                    }());

                    return transitionEnd && { end: transitionEnd };
                })(),
            animation: (function() {

                var animationEnd = (function() {

                    var element = document.body || document.documentElement,
                        animEndEventNames = {
                            WebkitAnimation: 'webkitAnimationEnd',
                            MozAnimation: 'animationend',
                            OAnimation: 'oAnimationEnd oanimationend',
                            animation: 'animationend'
                        }, name;

                    for (name in animEndEventNames) {
                        if (element.style[name] !== undefined) return animEndEventNames[name];
                    }
                }());

                return animationEnd && { end: animationEnd };
            })(),
            requestAnimationFrame: window.requestAnimationFrame ||
                                   window.webkitRequestAnimationFrame ||
                                   window.mozRequestAnimationFrame ||
                                   window.msRequestAnimationFrame ||
                                   window.oRequestAnimationFrame ||
                                   function(callback){ window.setTimeout(callback, 1000/60); },
            /*jshint -W069*/
            touch: (
                ('ontouchstart' in window && navigator.userAgent.toLowerCase().match(/mobile|tablet/)) ||
                (window.DocumentTouch && document instanceof window.DocumentTouch)  ||
                (window.navigator['msPointerEnabled'] && window.navigator['msMaxTouchPoints'] > 0) || //IE 10
                (window.navigator['pointerEnabled'] && window.navigator['maxTouchPoints'] > 0) || //IE >=11
                false
            ),
            mutationobserver: (window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver || null)
          },
          // UTILITIES
          isInView: function(element, options) {
              /*jshint -W106*/
              var $element = $(element);

              if (!$element.is(':visible')) {
                  return false;
              }

              var window_left = $win.scrollLeft(),
                  window_top  = $win.scrollTop(),
                  offset      = $element.offset(),
                  left        = offset.left,
                  top         = offset.top;

              options = $.extend({topoffset:0, leftoffset:0}, options);

              if (top + $element.height() >= window_top && top - options.topoffset <= window_top + $win.height() &&
                  left + $element.width() >= window_left && left - options.leftoffset <= window_left + $win.width()) {
                return true;
              } else {
                return false;
              }
          },
          
          langdirection: $html.attr('dir') === 'rtl' ? 'right' : 'left',

          isTouch: function () {
            return $html.hasClass('touch');
          },

          isSidebarCollapsed: function () {
            return $body.hasClass('aside-collapsed');
          },

          isSidebarToggled: function () {
            return $body.hasClass('aside-toggled');
          },

          isMobile: function () {
            return $win.width() < APP_MEDIAQUERY.tablet;
          }

        };
    }
})();

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
(function () {
    'use strict';

    angular
        .module('dux')
        .controller('selecaoCasaController', selecaoCasaController);

    selecaoCasaController.$inject = ['CasaService', 'AuthService']; 

    function selecaoCasaController(CasaService, AuthService) {
        /* jshint validthis:true */
        var vm = this;

        var casaSelecionada = {};

        activate();

        function activate() {

            CasaService.getCasaSelec().then(function (response) {
                casaSelecionada = response.data;
            });
            
            CasaService.getCasas().then(function (response) {
                vm.casas = response.data;
            });

        }

        vm.selecionaCasa = function (casa) {
            CasaService.selecionaCasa(casa).then(function (response) {
               AuthService.refreshToken().then(function () {
                    AuthService.setCasa(response.data);
                });
            });
        }
    }
})();

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
(function () {
    'use strict';

    angular
        .module('dux')
        .controller('consultaComissariosController', consultaComissariosController);

    consultaComissariosController.$inject = ['$location', 'ComissarioService', 'toastr'];

    function consultaComissariosController($location, ComissarioService, toastr) {
        
        var vm = this;

        activate();

        function activate() {
            ComissarioService.getComissarios().then(function (response) {
                vm.comissarios = response.data;
            });



        vm.bloquear = function (comissario) {
            ComissarioService.bloquear(comissario.id).then(function (response) {
                toastr.success("O comissário " + comissario.nome + " foi bloqueado.", "Bloqueado");
                comissario.status = 1;
            })
            .catch(function(response){
                toastr.error("Ocorreu um erro ao bloquear o comissário, tente novamente após algum tempo", "Erro");
            });
        }

        vm.desbloquear = function (comissario) {
            ComissarioService.desbloquear(comissario.id).then(function (response) {
                toastr.success("O comissário " + comissario.nome + " foi desbloqueado", "Desbloqueado");
                comissario.status = 0;
            })
            .catch(function(response){
                toastr.error("Ocorreu um erro ao desbloquear o usuário, tente novamente após algum tempo", "Erro");
            });
        }}

           
    }
})();

(function () {
    'use strict';

    angular
        .module('dux')
        .controller('criarComissarioController', criarComissarioController);

    criarComissarioController.$inject = ['$location', 'ComissarioService', 'toastr', 'CasaService'];

    function criarComissarioController($location, ComissarioService, toastr, CasaService) {
        
        var vm = this;

        activate();

        function activate() {
            CasaService.getCasas().then(function (response) {
                vm.casasU = response.data;
            });

            resetComissario();
        }

        vm.salvaComissario = function (comissario) {
            ComissarioService.salvaComissario(comissario).then(function (response) {
                toastr.success('O comissário foi criado com sucesso\nUm email foi enviado à ele com o link para o cadastro de senha', 'Criado');
                $location.path('/Comissarios');
            })
            .catch(function (response) {
                if (response.status == 400) {
                    _showValidationErrors(vm, response);
                }
                else {
                    toastr.error('Aconteceu um erro ao criar o comissário, tente novamente após um tempo', 'Erro');
                }
            });

        }


        vm.selecCasa = function (id) {
            var i = vm.comissario.casas.indexOf(id);
            if (i >= 0) {
                vm.comissario.casas.splice(i, 1);
            }
            else {
                vm.comissario.casas.push(id);
            }
        }

        function resetComissario() {
            vm.comissario = {
                nome: '',
                sobrenome: '',
                casas: [],
                email: ''
            };
        }

        function _showValidationErrors(vm, error) {
            vm.validationErrors = [];
            if (error.data && angular.isObject(error.data)) {
                for (var key in error.data) {
                    vm.validationErrors.push(error.data[key][0]);
                }
            } else {
                vm.validationErrors.push('Não foi possível adicionar o perfil');
            };
        }

    }
})();

(function () {
    'use strict';
    angular.module('dux')
        .factory('authInterceptorService', ['$q', '$injector', '$location', 'localStorageService', function ($q, $injector, $location, localStorageService) {

        var authInterceptorServiceFactory = {};
        var $http;

        var _request = function (config) {

            config.headers = config.headers || {};            

            var authData = localStorageService.get('authorizationData');
            if (authData) {
                config.headers.Authorization = 'Bearer ' + authData.token;
            }

            return config;
        }

        var _responseError = function (rejection) {
            var deferred = $q.defer();
            if (rejection.status === 401) {
                var authService = $injector.get('AuthService');
                authService.refreshToken().then(function (response) {
                    _retryHttpRequest(rejection.config, deferred);
                }, function () {
                    authService.logOut();
                    $location.path('/login');
                    deferred.reject(rejection);
                });
            } else {
                deferred.reject(rejection);
            }
            return deferred.promise;
        }

        var _retryHttpRequest = function (config, deferred) {
            $http = $http || $injector.get('$http');
            $http(config).then(function (response) {
                deferred.resolve(response);
            }, function (response) {
                deferred.reject(response);
            });
        }

        authInterceptorServiceFactory.request = _request;
        authInterceptorServiceFactory.responseError = _responseError;

        return authInterceptorServiceFactory;
    }]);
})();
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
(function () {
    'use strict';

    angular
        .module('dux')
        .controller('listaGeralController', listaGeralController);

    listaGeralController.$inject = ['ngDialog', 'toastr', '$location', '$stateParams', '$scope',
                                 'EventoService', 'PortariaService', '$rootScope'];

    function listaGeralController(ngDialog, toastr, $location, $stateParams, $scope, EventoService, PortariaService, $rootScope) {
        /* jshint validthis:true */
        var vm = this;

        vm.nomes = [];
        vm.evento = {};

        activate();


        function activate() {
            var id = $stateParams.id;

            carregaNomes(id);
            carregaEvento(id);

        }


        function carregaNomes(eventoId) {
            PortariaService.getNomesEvento(eventoId).then(function (response) {
                vm.nomes = response.data;
            });
        }

        function carregaEvento(eventoId) {
            EventoService.getEvento(eventoId).then(function (response) {
                vm.evento = response.data;
            })
        }

        $rootScope.$on('pesquisa', function (e, obj) {
            vm.pesquisa = obj.pesquisa;
        });

        vm.confPresenca = function (nome) {
            if (!nome.presencaConf) {
                nome.presencaConf = true;

                PortariaService.confPresenca(nome.listaId, nome.id).then(function (response) {
                    toastr.info("Presença de " + nome.nome + " confirmada", "Presença confirmada");
                })
                .catch(function (response) {
                    nome.presencaConf = false;
                    toastr.error("Ocorreu um erro ao confirmar a presença de " + nome.nome, "Erro");
                })
            }            
        }
    }
})();

(function () {
    'use strict';

    angular
        .module('dux')
        .controller('listasPortariaController', listasPortariaController);

    listasPortariaController.$inject = ['$location', '$stateParams', 'ListasService', 'EventoService'];

    function listasPortariaController($location, $stateParams, ListasService, EventoService) {
        /* jshint validthis:true */
        var vm = this;

        vm.listas = [];

        vm.evento = {};

        activate();



        function activate() {
            vm.eventoId = $stateParams.id;

            if (vm.eventoId == undefined || vm.eventoId == '') {
                $location.path('/Eventos/Agenda')
            }

            EventoService.getEvento(vm.eventoId).then(function (response) {
                vm.evento = response.data;
            });

            ListasService.getListas(vm.eventoId).then(function (response) {
                vm.listas = response.data;
            });




        }
    }
})();

(function () {
    'use strict';

    angular
        .module('dux')
        .controller('nomesListaController', nomesListaController);

    nomesListaController.$inject = ['ngDialog', 'toastr', '$location', '$stateParams', '$scope',
                                 'ListasService', 'PortariaService', '$rootScope'];

    function nomesListaController(ngDialog, toastr, $location, $stateParams, $scope, ListasService, PortariaService, $rootScope) {
        /* jshint validthis:true */
        var vm = this;

        vm.nomes = [];
        vm.lista = {};

        activate();


        function activate() {
            var id = $stateParams.id;

            carregaNomes(id);

            ListasService.getLista(id).then(function (response) {
                vm.lista = response.data;
            });
        }


        function carregaNomes(listaId) {
            PortariaService.getNomes(listaId).then(function (response) {
                vm.nomes = response.data;
            });
        }

        $rootScope.$on('pesquisa', function (e, obj) {
            vm.pesquisa = obj.pesquisa;
        });

        vm.confPresenca = function (nome) {
            if (!nome.presencaConf) {
                nome.presencaConf = true;

                PortariaService.confPresenca(vm.lista.id, nome.id).then(function (response) {
                    toastr.info("Presença de " + nome.nome + " confirmada", "Presença confirmada");
                })
                .catch(function (response) {
                    nome.presencaConf = false;
                    toastr.error("Ocorreu um erro ao confirmar a presença de " + nome.nome, "Erro");
                })
            }            
        }
    }
})();

(function () {
    'use strict';

    angular
        .module('dux')
        .factory('PortariaService', PortariaService);

    PortariaService.$inject = ['$http'];

    function PortariaService($http) {


        function _getNomes(listaId) {
            return $http.get('api/nomeLista/getnomes/' + listaId);
        }

        function _confPresenca(listaId, nomeId) {
            return $http.post('api/nomeLista/confpresenca', { 'listaId': listaId, 'nomeId': nomeId });
        }

        function _getNomesEvento(eventoId) {
            return $http.get('api/nomeLista/getNomesEvento/' + eventoId);
        }

        var service = {
            getNomes: _getNomes,
            confPresenca: _confPresenca,
            getNomesEvento: _getNomesEvento
        };

        return service;
    }
})();
(function () {
    'use strict';

    angular
        .module('dux')
        .controller('distribuicaoController', distribuicaoController);

    distribuicaoController.$inject = ['$location', 'UserService', '$stateParams', 'toastr', 'DistribuicaoService']; 

    function distribuicaoController($location, UserService, $stateParams, toastr, DistribuicaoService) {
        /* jshint validthis:true */
        var vm = this;

        vm.dist = { 
            distribuicoes: [],
            listaId: 0
        };

        

        activate();

        function activate() {

            var id = $stateParams.id;
            var listaId = $stateParams.listaId;

            if (listaId === undefined || listaId == '') {
                $location.path('/Eventos/Agenda');
            }

            DistribuicaoService.getDist(listaId).then(function (response) {
                vm.dist.distribuicoes = response.data;
                vm.dist.listaId = listaId;
            });
        }


        vm.salvaDistribuicao = function () {
            DistribuicaoService.salvaDistribuicao(vm.dist).then(function (response) {
                toastr.success("Os convidados foram distribuídos com sucesso", "Distribuídos");
            })
            .catch(function (response) {
                toastr.error("Ocorreu um erro ao distribuir os convidados, tente novamente após algum tempo", "Erro");
            });
        }
    }
})();

(function () {
    'use strict';

    angular
        .module('dux')
        .factory('DistribuicaoService', DistribuicaoService);

    DistribuicaoService.$inject = ['$http'];

    function DistribuicaoService($http) {                

        function _salvaDistribuicao(dist) {
            return $http.post('api/distribuicao', dist);
        }

        function _getDist(id) {
            return $http.get('api/distribuicao/' + id);
        }

        function _getQtdNomes(listaId) {
            return $http.get('api/distribuicao/getqtdnomes/' + listaId);
        }

        var service = {
            salvaDistribuicao: _salvaDistribuicao,
            getDist: _getDist,
            getQtdNomes : _getQtdNomes
        };

        return service;
    }
})();
(function () {
    'use strict';

    angular
        .module('dux')
        .controller('consultaListasController', consultaListasController);

    consultaListasController.$inject = ['$location', '$stateParams', 'ListasService']; 

    function consultaListasController($location, $stateParams, ListasService) {
        /* jshint validthis:true */
        var vm = this;

        vm.listas = [];

        activate();



        function activate() {
            vm.eventoId = $stateParams.id;

            if (vm.eventoId == undefined || vm.eventoId == '') {
                $location.path('/Eventos/Agenda')
            }

            ListasService.getListas(vm.eventoId).then(function (response) {
                vm.listas = response.data;
            })
        }
    }
})();

(function () {
    'use strict';

    angular
        .module('dux')
        .controller('criarListaController', criarListaController);

    criarListaController.$inject = ['$location', 'PerfisService', 'ListasService', '$stateParams', 'toastr']; 

    function criarListaController($location, PerfisService, ListasService, $stateParams, toastr) {
        /* jshint validthis:true */
        var vm = this;

        vm.lista = {};

        activate();

        function activate() {
            vm.perfilSelecionado = '';
            var id = $stateParams.id;
            var eventoId = $stateParams.eventoId;

            if (eventoId === undefined || eventoId == '') {
                $location.path('/Evento/Listas');
            }

            vm.lista.eventoId = eventoId;

            if (id === undefined || id == '') {
                vm.editar = false;
            }
            else {
                vm.editar = true;

                ListasService.getLista(id).then(function (response) {
                    vm.lista = response.data;
                })
            }

            PerfisService.getPerfisDistribuicao().then(function (response) {
                vm.perfisDist = response.data;
            });
        }

        vm.salvaLista = function () {
            ListasService.salvaLista(vm.lista).then(function (response) {
                if (vm.editar == true) {
                    toastr.success("A lista " + vm.lista.nomeLista + " foi editada com sucesso", "Editado")
                }
                else {
                    toastr.success("A lista " + vm.lista.nomeLista + " foi salva com sucesso", "Salvo")
                }
                $location.path('/Evento/' + vm.eventoId + '/Listas');
            })
            .catch(function (response) {
                if (response.status == 400) {
                    _showValidationErrors(vm, response);
                }
                else {
                    toastr.error('Aconteceu um erro ao salvar sua Lista, tente novamente após um tempo', 'Erro');
                }
            });
        }


        function _showValidationErrors(vm, error) {
            vm.validationErrors = [];
            if (error.data && angular.isObject(error.data)) {
                for (var key in error.data) {
                    vm.validationErrors.push(error.data[key][0]);
                }
            } else {
                vm.validationErrors.push('Não foi possível adicionar o perfil');
            };
        }


        //seleciona perfil distribuicao dropdown lista
        vm.selecionaPerfil = function (perfil) {
            vm.perfilSelecionado = perfil.nomePerfil;
            vm.lista.perfilDistribuicaoId = perfil.id;
        }

        //limpa perfil distribuicao dropdown lista
        vm.limpaPerfil = function () {
            vm.perfilSelecionado = null;
            vm.lista.perfilDistribuicaoId = null;
        }
    }
})();

(function () {
    'use strict';

    angular
        .module('dux')
        .factory('ListasService', ListasService);

    ListasService.$inject = ['$http'];

    function ListasService($http) {

        function _getLista(id) {
            return $http.get('api/listas/' + id);
        }

        function _salvaLista(lista) {
            return $http.post('api/listas', lista);
        }

        function _getListas(eventoId) {
            return $http.get('api/listas/getListasEvento/' + eventoId);
        }
       

        var service = {
            getLista: _getLista,
            salvaLista: _salvaLista,
            getListas : _getListas
        };

        return service;
    }
})();
(function () {
    'use strict';

    angular
        .module('dux')
        .controller('criarPerfilDistController', criarPerfilDistController);

    criarPerfilDistController.$inject = ['UserService' , 'PerfisService','toastr' , '$location']; 

    function criarPerfilDistController(UserService, PerfisService, toastr, $location) {
        /* jshint validthis:true */
        var vm = this;
        vm.perfil = {
            nomePerfil: '',
            layoutsDistribuicao : []
        };

        activate();

        function activate() {

            UserService.getUsuariosDist().then(function (response) {
                var usuarios = response.data;

                usuarios.forEach(function (usuario) {
                    vm.distribuicoes.layoutsDistribuicao.push({
                        usuarioId: usuario.id,
                        nome: usuario.nome,
                        qtdNomesM: 0,
                        qtdNomesF: 0
                    });
                })
            });
        }

        vm.salvaPerfil = function (perfil) {
            vm.validationErrors = [];
            PerfisService.salvaPerfilDist(perfil)
                .then(function () {
                    toastr.success('O perfil foi salvo com sucesso', 'Salvo');
                    $location.path('/Distribuicao');
                })
                .catch(function (response) {
                    if (response.status == 400) {
                        _showValidationErrors(vm, response);
                    }
                    else {
                        toastr.error('Aconteceu um erro ao salvar seu perfil, tente novamente após um tempo', 'Erro');
                    }
                });
        }

        function _showValidationErrors(vm, error) {
            vm.validationErrors = [];
            if (error.data && angular.isObject(error.data)) {
                for (var key in error.data) {
                    vm.validationErrors.push(error.data[key][0]);
                }
            } else {
                vm.validationErrors.push('Não foi possível adicionar o perfil');
            };
        }
    }
})();

(function () {
    'use strict';

    angular
        .module('dux')
        .controller('criarPerfilListaController', criarPerfilListaController);

    criarPerfilListaController.$inject = ['ngDialog', '$scope', 'PerfisService', 'toastr', '$location', '$stateParams'];

    function criarPerfilListaController(ngDialog, $scope, PerfisService, toastr, $location, $stateParams) {
        /* jshint validthis:true */
        var vm = this;

        activate();

        function activate() {
            resetaLista();
            resetaAgend();
            $scope.perfilSelecionado = '';

            vm.perfil = {
                nomePerfil: '',
                observacoes: '',
                layoutListas: []
            };

            var id = $stateParams.id;

            if (id === undefined || id == '') {
                $scope.editar = false;
            }
            else {
                $scope.editar = true;
                PerfisService.getPerfilLista(id).then(function (response) {
                    vm.perfil = response.data;
                })
            }
            PerfisService.getPerfisDistribuicao().then(function (response) {
                $scope.perfisDist = response.data;
            });            
        }

        function selecionaPerfilDist(idPerfil) {
            for (var i = 0; i < $scope.perfisDist.length; i++) {

                var perfilDist = $scope.perfisDist[i];
                if (perfilDist.id == idPerfil) {
                    $scope.perfilSelecionado = perfilDist.nomePerfil;
                }
            }
        }


        //seleciona perfil distribuicao dropdown lista
        $scope.selecionaPerfil = function (perfil) {
            $scope.perfilSelecionado = perfil.nomePerfil;
            $scope.lista.perfilDistribuicaoId = perfil.id;
        }

        //limpa perfil distribuicao dropdown lista
        $scope.limpaPerfil = function () {
            $scope.perfilSelecionado = null;
            $scope.lista.perfilDistribuicaoId = null;
        }

        $scope.addAgendamento = function () {
            $scope.lista.layoutAgendamentos.push($scope.agend);
            resetaAgend();
        }

        $scope.addLista = function () {
            vm.perfil.layoutListas.push($scope.lista);
            resetaLista();
        }

        $scope.editaLista = function () {
            vm.perfil.layoutListas[$scope.indexLista] = $scope.lista;
        }

        $scope.removeAgend = function (agend) {
            $scope.lista.layoutAgendamentos.splice($scope.lista.layoutAgendamentos.indexOf(agend), 1);
        }

        vm.removeLista = function (index) {
            vm.perfil.layoutListas.splice(index, 1);
        }

        vm.salvaPerfil = function (perfil) {
            vm.validationErrors = [];

            PerfisService.salvaPerfilLista(perfil)
                .then(function () {
                    if ($scope.editar == true) {
                        toastr.success('O perfil foi editado com sucesso', 'Editado');
                    }
                    else {
                        toastr.success('O perfil foi salvo com sucesso', 'Salvo');
                    }
                    
                    $location.path('/Perfis/Listas');
                })
                .catch(function (response) {
                    if (response.status == 400) {
                        _showValidationErrors(vm, response);
                    }
                    else {
                        toastr.error('Aconteceu um erro ao salvar seu perfil, tente novamente após um tempo', 'Erro');
                    }
                });
        }

        vm.openEditaLista = function (lista) {
            selecionaPerfilDist(lista.perfilDistribuicaoId);
            $scope.indexLista = vm.perfil.layoutListas.indexOf(lista);
            $scope.editarLista = true;
            $scope.lista = angular.copy(lista);
            vm.openAddLista();
        }

        vm.openAddLista = function () {
            ngDialog.open({
                template: 'addLista',
                scope: $scope,
                closeByDocument : false
            }).closePromise.then(function () {
                $scope.indexLista = 0;
                $scope.editarLista = false;
                resetaLista();
                $scope.selection = $scope.steps[0];
            });
        }
        $scope.openAddAgend = function () {
            ngDialog.open({
                template: 'addAgend',
                scope: $scope,
                closeByDocument : false
            }).closePromise.then(function () {
                resetaAgend();
            });
        }
        

        function _showValidationErrors(vm, error) {
            vm.validationErrors = [];
            if (error.data && angular.isObject(error.data)) {
                for (var key in error.data) {
                    vm.validationErrors.push(error.data[key][0]);
                }
            } else {
                vm.validationErrors.push('Não foi possível adicionar o perfil');
            };
        }


        $scope.steps = [
          '1: Lista',
          '2: Entrada',
          '3: Agendamentos'
        ];
        $scope.selection = $scope.steps[0];

        $scope.getCurrentStepIndex = function () {
            return _.indexOf($scope.steps, $scope.selection);
        };

        $scope.goToStep = function (index) {
            if (!_.isUndefined($scope.steps[index])) {
                $scope.selection = $scope.steps[index];
            }
        };

        $scope.hasNextStep = function () {
            var stepIndex = $scope.getCurrentStepIndex();
            var nextStep = stepIndex + 1;
            return !_.isUndefined($scope.steps[nextStep]);
        };

        $scope.hasPreviousStep = function () {
            var stepIndex = $scope.getCurrentStepIndex();
            var previousStep = stepIndex - 1;
            return !_.isUndefined($scope.steps[previousStep]);
        };

        $scope.incrementStep = function () {
            if ($scope.hasNextStep()) {
                var stepIndex = $scope.getCurrentStepIndex();
                var nextStep = stepIndex + 1;
                $scope.selection = $scope.steps[nextStep];
            }
        };

        $scope.decrementStep = function () {
            if ($scope.hasPreviousStep()) {
                var stepIndex = $scope.getCurrentStepIndex();
                var previousStep = stepIndex - 1;
                $scope.selection = $scope.steps[previousStep];
            }
        };

        function resetaLista() {
            $scope.lista = {
                id: 0,
                perfilDistribuicaoId: null,
                precoM: null,
                precoF: null,
                valorConsumaM: null,
                valorConsumaF: null,
                exigirRg: false,
                exigirCelular:false,
                listaM: false,
                listaF: false,
                layoutAgendamentos: []
            }
            $scope.perfilSelecionado = '';
        }

        function resetaAgend() {
            $scope.agend = {
                qtdMinutos: 0,
                qtdHoras: 0,
                depoisEvento: true
            };
        }
    }
})();

(function () {
    'use strict';

    angular
        .module('dux')
        .controller('editarPerfilDistController', editarPerfilDistController);

    editarPerfilDistController.$inject = ['$stateParams' , 'PerfisService', 'toastr']; 

    function editarPerfilDistController($stateParams, PerfisService, toastr) {
        /* jshint validthis:true */
        var vm = this;
        vm.perfil = {
            nomePerfil: '',
            layoutsDistribuicao : []
        };

        activate();

        function activate() {
            var perfilId = $stateParams.perfilId;

            PerfisService.getEditarDist(perfilId).then(function (response) {
                vm.perfil = response.data;
            });                
        }

        vm.editaPerfil = function (perfil) {
            PerfisService.editaPerfilDist(perfil)
                .then(function () {
                    toastr.success('O perfil foi editado com sucesso', 'Editado');
                })
                .catch(function (response) {
                    if (response.status == 400) {
                        _showValidationErrors(vm, response.data);
                    }
                    else {
                        toastr.error('Aconteceu um erro ao editar seu perfil, tente novamente após um tempo', 'Erro');
                    }
                });
        }

        function _showValidationErrors(vm, error) {
            vm.validationErrors = [];
            if (error.data && angular.isObject(error.data)) {
                for (var key in error.data) {
                    vm.validationErrors.push(error.data[key][0]);
                }
            } else {
                vm.validationErrors.push('Não foi possível Editar o perfil');
            };
        }
    }
})();

(function () {
    'use strict';

    angular
        .module('dux')
        .controller('perfilDistribuicaoController', perfilDistribuicaoController);

    perfilDistribuicaoController.$inject = ['PerfisService', 'ngDialog', 'toastr'];

    function perfilDistribuicaoController(PerfisService, ngDialog, toastr) {
        var vm = this;        

        activate();

        function activate() {
            PerfisService.getPerfisDistribuicao().then(function (response) {
                vm.perfis = response.data;
            });
        }

        vm.excluiPerfil = function (perfil) {
            ngDialog.openConfirm({ templateUrl: 'excluirPerfil' }).then(function () {

                PerfisService.excluiPerfilDist(perfil.id).then(function () {

                    vm.perfis.splice(vm.perfis.indexOf(perfil), 1);
                    toastr.success('Perfil Excluido com sucesso', 'Excluido');

                })
                .catch(function () {
                    toastr.error('Ocorreu um erro ao excluir o perfil', 'Erro');
                });

            })            
        }
    }
})();

(function () {
    'use strict';

    angular
        .module('dux')
        .controller('perfilListaController', perfilListaController);

    perfilListaController.$inject = ['PerfisService', 'ngDialog', 'toastr'];

    function perfilListaController(PerfisService, ngDialog, toastr) {
        
        var vm = this;        

        activate();

        function activate() {
            PerfisService.getPerfisLista().then(function (response) {
                vm.perfis = response.data;
            });
        }

        vm.excluiPerfil = function (perfil) {
            ngDialog.openConfirm({ templateUrl: 'excluirPerfil' }).then(function () {

                PerfisService.excluiPerfilLista(perfil.id).then(function () {

                    vm.perfis.splice(vm.perfis.indexOf(perfil), 1);
                    toastr.success('Perfil Excluido com sucesso', 'Excluido');

                })
                .catch(function () {
                    toastr.error('Ocorreu um erro ao excluir o perfil', 'Erro');
                });

            })
        }
    }
})();

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
(function () {
    'use strict';

    angular
        .module('dux')
        .controller('addNomeController', addNomeController);

    addNomeController.$inject = ['ngDialog', 'toastr', '$location', '$stateParams',
                                 'ListasService', 'PromoterService', 'DistribuicaoService'];

    function addNomeController(ngDialog, toastr, $location, $stateParams, ListasService, PromoterService, DistribuicaoService) {
        /* jshint validthis:true */
        var vm = this;

        activate();

        vm.erros = [];
        vm.form= {
            nomes : [],
            listaId : null
        }

        function activate() {
            var id = $stateParams.id;
            vm.nomesM = 0;
            vm.nomesF = 0;
            vm.blocoNomes = '';
            vm.instrucoes = false;
            vm.exibirErros = false;
            vm.infoLista = false;
            

            PromoterService.getNomes(id).then(function (response) {
                preencheTexto(response.data);
            });

            ListasService.getLista(id).then(function (response) {
                vm.lista = response.data;
                vm.form.listaId = vm.lista.id;

                DistribuicaoService.getQtdNomes(vm.lista.id).then(function (response) {
                    vm.dist = response.data;
                })
            });
        }

        function preencheTexto(nomes) {
            nomes.forEach(function (nome) {
                vm.blocoNomes = vm.blocoNomes + (nome.masculino ? 'M' : 'F')
                 + ' ' + nome.nome + (nome.numCelular ? ' ' + nome.numCelular : '')
                 + (nome.numRg ? ' ' + nome.numRg : '\n');

                nome.masculino ? vm.nomesM++ : vm.nomesF++;
            });
        }


        vm.change = function () {
            var linhas = vm.blocoNomes.split('\n');            
            vm.form.nomes = [];
            vm.erros = [];
            var nomesM = 0;
            var nomesF = 0;

            for (var i = 0; i < linhas.length; i++) {

                if (vm.lista.exigirCelular && vm.lista.exigirRg) {                    
                    var matches = /^(M|F)\s+([^\-0-9]+)\s+(\d+)\s+(\d{4,15})\s*$/i.exec(linhas[i]);

                    if (matches == null) {
                        vm.erros.push('A linha nº ' + (i + 1) + ' não está no formato correto (GÊNERO NOME NºCELULAR NºRG)');
                    }
                    else {
                        matches[1].toUpperCase() == 'M' ? nomesM++ : nomesF++;

                        vm.form.nomes.push({
                            masculino: matches[1].toUpperCase() == 'M' ? true : false,
                            nome : matches[2],
                            numCelular : matches[3],
                            numRg : matches[4]
                        });
                    }
                }
                else if (vm.lista.exigirCelular) {
                    var matches = /^(M|F)\s+([^\-0-9]+)\s+(\d+)\s*$/i.exec(linhas[i]);

                    if (matches == null) {
                        vm.erros.push('A linha nº ' + (i + 1) + ' não está no formato correto');
                    }
                    else {
                        if (/^[1-9]{2}[9]{0,1}[6-9]{1}[0-9]{3}[0-9]{4}$/.test(matches[3]) == false) {
                            vm.erros.push('Na linha nº ' + (i + 1) + ' o número do celular não está no formato correto (nº com DDD)');
                        }
                        else {
                            matches[1].toUpperCase() == 'M' ? nomesM++ : nomesF++;

                            vm.form.nomes.push({
                                masculino: matches[1].toUpperCase() == 'M' ? true : false,
                                nome: matches[2],
                                numCelular: matches[3]
                            });
                        }
                    }
                }
                else if (vm.lista.exigirRg) {
                    var matches = /^(M|F)\s+([^\-0-9]+)\s+(\d{4,15})\s*$/i.exec(linhas[i]);

                    if (matches == null) {
                        vm.erros.push('A linha nº ' + (i + 1) + ' não está no formato correto');
                    }
                    else {
                        matches[1].toUpperCase() == 'M' ? nomesM++ : nomesF++;

                        vm.form.nomes.push({
                            masculino: matches[1].toUpperCase() == 'M' ? true : false,
                            nome: matches[2],
                            numCelular: matches[3]
                        });
                    }
                }
                else {
                    var matches = /^(M|F)\s+([^\-[0-9]+)(\s*|\s+([1-9]{2}[9]{0,1}[6-9]{1}[0-9]{3}[0-9]{4})?)$/i.exec(linhas[i]);

                    if (matches == null) {
                        vm.erros.push('A linha nº ' + (i + 1) + ' não está no formato correto');
                    }
                    else {
                        matches[1].toUpperCase() == 'M' ? nomesM++ : nomesF++;                                                                                                                                                    

                        vm.form.nomes.push({
                            masculino: matches[1].toUpperCase() == 'M'? true : false,
                            nome: matches[2],
                            numCelular: matches[4] == undefined ? null : matches[4]                            
                        });
                    }
                }
            }

            vm.nomesM = angular.copy(nomesM);
            vm.nomesF = angular.copy(nomesF);
        }


        vm.addNomes = function () {
            PromoterService.addNomes(vm.form).then(function(response){
                toastr.success('Os nomes foram adicionados com sucesso', 'Adicionados');
            })
            .catch(function (response) {
                
            })
        }

        vm.mostrarInstrucoes = function () {
            vm.instrucoes = !vm.instrucoes;
        }

        vm.mostrarErros = function () {
            vm.exibirErros = !vm.exibirErros;
        }

        vm.mostrarInfoLista = function () {
            vm.infoLista = !vm.infoLista;
        }
        

    }
})();

(function () {
    'use strict';

    angular
        .module('dux')
        .controller('listasPromoterController', listasPromoterController);

    listasPromoterController.$inject = ['$location', '$stateParams', 'PromoterService', '$state'];

    function listasPromoterController($location, $stateParams, PromoterService) {
        /* jshint validthis:true */
        var vm = this;

        vm.listas = [];

        activate();



        function activate() {
            vm.eventoId = $stateParams.eventoId;

            if (vm.eventoId == undefined || vm.eventoId == '') {
                $location.path('/Eventos/Agenda')
            }

            PromoterService.getListas(vm.eventoId).then(function (response) {
                vm.listas = response.data;
            })
        }
    }
})();

(function () {
    'use strict';

    angular
        .module('dux')
        .factory('PromoterService', PromoterService);

    PromoterService.$inject = ['$http'];

    function PromoterService($http) {

        function _getListas(eventoId){
            return $http.get('api/listas/getListasPromoter/' + eventoId);
        }

        function _addNomes(nomes) {
            return $http.post('api/addnome', nomes);
        }

        function _getNomes(listaId) {
            return $http.get('api/nomelista/promoter/' + listaId);
        }

        var service = {
            getListas: _getListas,
            addNomes: _addNomes,
            getNomes : _getNomes
        };

        return service;
    }
})();
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

(function () {
    'use strict';

    angular
        .module('dux')
        .controller('criarEventoController', criarEventoController);

    criarEventoController.$inject = ['$rootScope', 'PerfisService', 'EventoService', 'toastr', '$location'];

    function criarEventoController($rootScope, PerfisService, EventoService, toastr, $location) {
        
        var vm = this;

        vm.selecCor = function (cor) {
            vm.corSelec = cor;
            vm.evento.corCalendario = cor;
        }

        activate();

        //inicio activate
        function activate() {

            PerfisService.getPerfisLista().then(function (response) {
                vm.perfisLista = response.data;
            })

            vm.calendario = {
                opened : false
            };

            resetaEvento();

            vm.cores = [
                'blue',
                'black',
                'yellow',
                'green',
                'purple',
                'red'
            ];

            vm.selecCor(vm.cores[0]);

            vm.dtaInicio = new Date();
        }
        //final activate

        vm.openCalendario = function(){
            vm.calendario.opened = true;
        }

        function resetaEvento() {
            vm.evento = {
                nomeEvento: ''
            };
        }

        vm.salvaEvento = function (evento) {
            vm.validationErrors = [];
            EventoService.salvaEvento(evento).then(function () {
                toastr.success('O Evento foi criado com sucesso', 'Salvo');
                $location.path('/Eventos/Agenda');
            })
            .catch(function (response) {
                if (response.status == 400) {
                    _showValidationErrors(vm, response);
                }
                else {
                    toastr.error('Aconteceu um erro ao salvar seu Evento, tente novamente após um tempo', 'Erro');
                }
            });
        }

        vm.selecionaPerfilLista = function (perfil) {
            vm.perfilListaSelec = perfil.nomePerfil;
            vm.evento.perfilListaId = perfil.id;
        }

        //limpa perfil lista dropdown
        vm.limpaPerfilLista = function () {
            vm.perfilListaSelec = null;
            vm.evento.perfilListaId = null;
        }

        function _showValidationErrors(vm, error) {
            vm.validationErrors = [];
            if (error.data && angular.isObject(error.data)) {
                for (var key in error.data) {
                    vm.validationErrors.push(error.data[key][0]);
                }
            } else {
                vm.validationErrors.push('Não foi possível adicionar o Evento');
            };
        }
    }
})();

(function () {
    'use strict';

    angular
        .module('dux')
        .controller('eventosController', eventosController);

    eventosController.$inject = ['$scope','$state']; 

    function eventosController($scope,$state) {
        /* jshint validthis:true */
        var vm = this;        

        activate();

        function activate() {

        }
    }
})();

(function () {
    'use strict';

    angular
        .module('dux')
        .factory('EventoService', EventoService);

    EventoService.$inject = ['$http'];

    function EventoService($http) {

        function _salvaEvento(evento) {
            return $http.post('api/eventos', evento);
        }

        function _EventosCal(inicio, final) {
            return $http.post('api/eventos/EventosCal', { inicio: inicio, final: final});
        }

        function _getEvento(id) {
            return $http.get('api/eventos/' + id);
        }

        var service = {
            salvaEvento: _salvaEvento,
            EventosCal: _EventosCal,
            getEvento : _getEvento
        };

        return service;
    }
})();
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
(function () {
    'use strict';

    angular
        .module('dux')
        .controller('usuarioAcessoController', usuarioAcessoController);

    usuarioAcessoController.$inject = ['$location', '$scope', 'UserService' , '$stateParams', 'toastr']; 

    function usuarioAcessoController($location, $scope, UserService, $stateParams, toastr) {
        /* jshint validthis:true */
        var vm = this;

        vm.todosAcessos = [];

        vm.perfil = {
            usuarioId: 0,
            acessos: []
        };

        vm.copiarDe = 0;

        activate();

        function activate() {
            var id = $stateParams.id;

            if (!id) {
                $location.path('/Eventos/Agenda');
            }

            UserService.getAcessosUsuario(id).then(function (responseA) {
                UserService.getTodosAcessos().then(function (responseB) {
                    vm.todosAcessos = _.filter(responseB.data, function (obj) { return !_.findWhere(responseA.data, obj); });                    
                    vm.perfil.acessos = responseA.data;
                });
            });

            vm.perfil.usuarioId = id;

            UserService.getUsuario(id).then(function (response) {
                vm.usuario = response.data;
            });
        }


        vm.defineAcessos = function () {
            UserService.defineAcessos(vm.perfil).then(function (response) {
                toastr.success("Os acessos do Usuário foram definidos com sucesso", "Salvo");
            })
            .catch(function (response) {
                toastr.error("Aconteceu algum erro ao definir os acessos desse usuário, tente novamente após algum tempo", "Erro");
            });
        }
    }
})();

(function () {
    'use strict';

    angular
        .module('dux')
        .controller('usuarioConsultaController', usuarioConsultaController);

    usuarioConsultaController.$inject = ['$location' , 'UserService' , 'toastr'];

    function usuarioConsultaController($location, UserService, toastr) {
        
        var vm = this;

        activate();

        function activate() {
            UserService.getUsuarios().then(function (response) {
                vm.usuarios = response.data;
            });
        }

        vm.bloquear = function (usuario) {
            UserService.bloquear(usuario.id).then(function (response) {
                toastr.success("O usuário " + usuario.nome + " foi bloqueado.", "Bloqueado");
                usuario.status = 1;
            })
            .catch(function(response){
                toastr.error("Ocorreu um erro ao bloquear o usuário, tente novamente após algum tempo", "Erro");
            });
        }

        vm.desbloquear = function (usuario) {
            UserService.desbloquear(usuario.id).then(function (response) {
                toastr.success("O usuário " + usuario.nome + " foi desbloqueado", "Desbloqueado");
                usuario.status = 0;
            })
            .catch(function(response){
                toastr.error("Ocorreu um erro ao desbloquear o usuário, tente novamente após algum tempo", "Erro");
            });
        }
           
    }
})();

(function () {
    'use strict';

    angular
        .module('dux')
        .controller('usuarioCriarController', usuarioCriarController);

    usuarioCriarController.$inject = ['$location', 'toastr', 'UserService', 'CasaService']; 

    function usuarioCriarController($location, toastr, UserService, CasaService) {
        /* jshint validthis:true */
        var vm = this;

        vm.casasU = [];

        activate();

        function activate() {
            resetUsuario();

            CasaService.getCasas().then(function (response) {
                vm.casasU = response.data;
            });
        }

        vm.salvaUsuario = function (usuario) {
            UserService.salvaUsuario(usuario).then(function (response) {
                toastr.success('O usuário foi salvo com sucesso\nUm email foi enviado a ele contendo uma senha temporária', 'salvo');
                $location.path('/Usuarios/Consulta');
            })
            .catch(function (response) {
                if (response.status == 400) {
                    _showValidationErrors(vm, response);
                }
                else {
                    toastr.error('Aconteceu um erro ao criar o usuário, tente novamente após um tempo', 'Erro');
                }
            });
             
        }

        vm.selecCasa = function (id) {
            var i = vm.usuario.casas.indexOf(id);
            if (i >= 0) {
                vm.usuario.casas.splice(i, 1);
            }
            else {
                vm.usuario.casas.push(id);
            }
        }

        function resetUsuario() {
            vm.usuario = {
                nome: '',
                sobrenome: '',
                casas : [],
                email: ''
            };
        }

        function _showValidationErrors(vm, error) {
            vm.validationErrors = [];
            if (error.data && angular.isObject(error.data)) {
                for (var key in error.data) {
                    vm.validationErrors.push(error.data[key][0]);
                }
            } else {
                vm.validationErrors.push('Não foi possível adicionar o perfil');
            };
        }
    }
})();

(function() {
    'use strict';

    angular
        .module('custom', [
            // request the the entire framework
            'angle',
            // or just modules
            'app.core',
            'app.sidebar'
            /*...*/
        ]);
})();

// To run this code, edit file index.html or index.jade and change
// html data-ng-app attribute from angle to myAppName
// ----------------------------------------------------------------------

(function() {
    'use strict';

    angular
        .module('custom')
        .controller('Controller', Controller);

    Controller.$inject = ['$log'];
    function Controller($log) {
        // for controllerAs syntax
        // var vm = this;

        activate();

        ////////////////

        function activate() {
          $log.log('I\'m a line from custom.js');
        }
    }
})();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUuanMiLCJjb3JlL2NvcmUubW9kdWxlLmpzIiwiY29sb3JzL2NvbG9ycy5tb2R1bGUuanMiLCJsYXp5bG9hZC9sYXp5bG9hZC5tb2R1bGUuanMiLCJkdXgvZHV4Lm1vZHVsZS5qcyIsImxvYWRpbmdiYXIvbG9hZGluZ2Jhci5tb2R1bGUuanMiLCJwcmVsb2FkZXIvcHJlbG9hZGVyLm1vZHVsZS5qcyIsInJvdXRlcy9yb3V0ZXMubW9kdWxlLmpzIiwibmF2c2VhcmNoL25hdnNlYXJjaC5tb2R1bGUuanMiLCJzaWRlYmFyL3NpZGViYXIubW9kdWxlLmpzIiwidXRpbHMvdXRpbHMubW9kdWxlLmpzIiwic2V0dGluZ3Mvc2V0dGluZ3MubW9kdWxlLmpzIiwiY29yZS9jb3JlLmNvbmZpZy5qcyIsImNvcmUvY29yZS5jb25zdGFudHMuanMiLCJjb3JlL2NvcmUucnVuLmpzIiwiY29sb3JzL2NvbG9ycy5jb250YW50LmpzIiwiY29sb3JzL2NvbG9ycy5zZXJ2aWNlLmpzIiwibGF6eWxvYWQvbGF6eWxvYWQuY29uZmlnLmpzIiwibGF6eWxvYWQvbGF6eWxvYWQuY29uc3RhbnRzLmpzIiwiZHV4L2R1eC5maWx0ZXJzLmpzIiwibG9hZGluZ2Jhci9sb2FkaW5nYmFyLmNvbmZpZy5qcyIsImxvYWRpbmdiYXIvbG9hZGluZ2Jhci5ydW4uanMiLCJwcmVsb2FkZXIvcHJlbG9hZGVyLmRpcmVjdGl2ZS5qcyIsInJvdXRlcy9yb3V0ZS1oZWxwZXJzLnByb3ZpZGVyLmpzIiwicm91dGVzL3JvdXRlcy5jb25maWcuanMiLCJuYXZzZWFyY2gvbmF2c2VhcmNoLmRpcmVjdGl2ZS5qcyIsIm5hdnNlYXJjaC9uYXZzZWFyY2guc2VydmljZS5qcyIsInNpZGViYXIvc2lkZWJhci5jb250cm9sbGVyLmpzIiwic2lkZWJhci9zaWRlYmFyLmRpcmVjdGl2ZS5qcyIsInNpZGViYXIvc2lkZWJhci5zZXJ2aWNlLmpzIiwic2lkZWJhci9zaWRlYmFyLnVzZXJibG9jay5jb250cm9sbGVyLmpzIiwidXRpbHMvYW5pbWF0ZS1lbmFibGVkLmRpcmVjdGl2ZS5qcyIsInV0aWxzL2Jyb3dzZXIuc2VydmljZS5qcyIsInV0aWxzL2NsZWFyLXN0b3JhZ2UuZGlyZWN0aXZlLmpzIiwidXRpbHMvZnVsbHNjcmVlbi5kaXJlY3RpdmUuanMiLCJ1dGlscy9sb2FkLWNzcy5kaXJlY3RpdmUuanMiLCJ1dGlscy9ub3cuZGlyZWN0aXZlLmpzIiwidXRpbHMvdGFibGUtY2hlY2thbGwuZGlyZWN0aXZlLmpzIiwidXRpbHMvdHJpZ2dlci1yZXNpemUuZGlyZWN0aXZlLmpzIiwidXRpbHMvdXRpbHMuc2VydmljZS5qcyIsInNldHRpbmdzL3NldHRpbmdzLnJ1bi5qcyIsImR1eC9DYXNhL0Nhc2FTZXJ2aWNlLmpzIiwiZHV4L0Nhc2Evc2VsZWNhb0Nhc2FDb250cm9sbGVyLmpzIiwiZHV4L0NvbWlzc2FyaW8vQ29taXNzYXJpb1NlcnZpY2UuanMiLCJkdXgvQ29taXNzYXJpby9jb25zdWx0YUNvbWlzc2FyaW9zQ29udHJvbGxlciAtIENvcHkuanMiLCJkdXgvQ29taXNzYXJpby9jcmlhckNvbWlzc2FyaW9Db250cm9sbGVyLmpzIiwiZHV4L0F1dGgvQXV0aEludGVyY2VwdG9yLmpzIiwiZHV4L0F1dGgvQXV0aFNlcnZpY2UuanMiLCJkdXgvUG9ydGFyaWEvbGlzdGFHZXJhbENvbnRyb2xsZXIuanMiLCJkdXgvUG9ydGFyaWEvbGlzdGFzUG9ydGFyaWFDb250cm9sbGVyLmpzIiwiZHV4L1BvcnRhcmlhL25vbWVzTGlzdGFDb250cm9sbGVyLmpzIiwiZHV4L1BvcnRhcmlhL1BvcnRhcmlhU2VydmljZS5qcyIsImR1eC9EaXN0cmlidWljYW8vZGlzdHJpYnVpY2FvQ29udHJvbGxlci5qcyIsImR1eC9EaXN0cmlidWljYW8vRGlzdHJpYnVpY2FvU2VydmljZS5qcyIsImR1eC9MaXN0YXMvY29uc3VsdGFMaXN0YXNDb250cm9sbGVyLmpzIiwiZHV4L0xpc3Rhcy9jcmlhckxpc3RhQ29udHJvbGxlci5qcyIsImR1eC9MaXN0YXMvTGlzdGFzU2VydmljZS5qcyIsImR1eC9QZXJmaXMvY3JpYXJQZXJmaWxEaXN0Q29udHJvbGxlci5qcyIsImR1eC9QZXJmaXMvY3JpYXJQZXJmaWxMaXN0YUNvbnRyb2xsZXIuanMiLCJkdXgvUGVyZmlzL2VkaXRhclBlcmZpbERpc3RDb250cm9sbGVyLmpzIiwiZHV4L1BlcmZpcy9wZXJmaWxEaXN0cmlidWljYW9Db250cm9sbGVyLmpzIiwiZHV4L1BlcmZpcy9wZXJmaWxMaXN0YUNvbnRyb2xsZXIuanMiLCJkdXgvUGVyZmlzL1BlcmZpc1NlcnZpY2UuanMiLCJkdXgvUHJvbW90ZXIvYWRkTm9tZUNvbnRyb2xsZXIuanMiLCJkdXgvUHJvbW90ZXIvbGlzdGFzUHJvbW90ZXJDb250cm9sbGVyLmpzIiwiZHV4L1Byb21vdGVyL1Byb21vdGVyU2VydmljZS5qcyIsImR1eC9FdmVudG9zL2FnZW5kYUV2ZW50b3NDb250cm9sbGVyLmpzIiwiZHV4L0V2ZW50b3MvY3JpYXJFdmVudG9Db250cm9sbGVyLmpzIiwiZHV4L0V2ZW50b3MvRXZlbnRvc0NvbnRyb2xsZXIuanMiLCJkdXgvRXZlbnRvcy9FdmVudG9TZXJ2aWNlLmpzIiwiZHV4L1VzdWFyaW8vdXNlclNlcnZpY2UuanMiLCJkdXgvVXN1YXJpby91c3VhcmlvQWNlc3NvQ29udHJvbGxlci5qcyIsImR1eC9Vc3VhcmlvL3VzdWFyaW9Db25zdWx0YUNvbnRyb2xsZXIuanMiLCJkdXgvVXN1YXJpby91c3VhcmlvQ3JpYXJDb250cm9sbGVyLmpzIiwiY3VzdG9tLm1vZHVsZS5qcyIsImN1c3RvbS5jb250cm9sbGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7OztBQWNBLENBQUEsV0FBQTtJQUNBOztJQUVBO1NBQ0EsT0FBQSxTQUFBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7O1lBRUE7WUFDQTs7Ozs7QUM1QkEsQ0FBQSxXQUFBO0lBQ0E7O0lBRUE7U0FDQSxPQUFBLFlBQUE7WUFDQTtZQUNBO1lBQ0E7OztZQUdBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBOzs7QUNoQkEsQ0FBQSxXQUFBO0lBQ0E7O0lBRUE7U0FDQSxPQUFBLGNBQUE7O0FDSkEsQ0FBQSxXQUFBO0lBQ0E7O0lBRUE7U0FDQSxPQUFBLGdCQUFBOztBQ0pBLENBQUEsV0FBQTtJQUNBOztJQUVBO1NBQ0EsT0FBQSxPQUFBLENBQUE7d0JBQ0E7d0JBQ0E7d0JBQ0E7d0JBQ0E7OztBQ1JBLENBQUEsV0FBQTtJQUNBOztJQUVBO1NBQ0EsT0FBQSxrQkFBQTs7QUNKQSxDQUFBLFdBQUE7SUFDQTs7SUFFQTtTQUNBLE9BQUEsaUJBQUE7Ozs7QUNKQSxDQUFBLFdBQUE7SUFDQTs7SUFFQTtTQUNBLE9BQUEsY0FBQTtZQUNBOzs7QUNMQSxDQUFBLFdBQUE7SUFDQTs7SUFFQTtTQUNBLE9BQUEsaUJBQUE7O0FDSkEsQ0FBQSxXQUFBO0lBQ0E7O0lBRUE7U0FDQSxPQUFBLGVBQUEsQ0FBQTs7QUNKQSxDQUFBLFdBQUE7SUFDQTs7SUFFQTtTQUNBLE9BQUEsYUFBQTtVQUNBOzs7O0FDTEEsQ0FBQSxXQUFBO0lBQ0E7O0lBRUE7U0FDQSxPQUFBLGdCQUFBOztBQ0pBLENBQUEsV0FBQTtJQUNBOztJQUVBO1NBQ0EsT0FBQTtTQUNBLE9BQUE7O0lBRUEsV0FBQSxVQUFBLENBQUEsdUJBQUEsb0JBQUEsbUJBQUEsWUFBQTtJQUNBLFNBQUEsV0FBQSxxQkFBQSxrQkFBQSxpQkFBQSxVQUFBLGlCQUFBOztNQUVBLElBQUEsT0FBQSxRQUFBLE9BQUE7O01BRUEsS0FBQSxhQUFBLG9CQUFBO01BQ0EsS0FBQSxhQUFBLGlCQUFBO01BQ0EsS0FBQSxhQUFBLGdCQUFBO01BQ0EsS0FBQSxhQUFBLFNBQUE7TUFDQSxLQUFBLGFBQUEsU0FBQTtNQUNBLEtBQUEsYUFBQSxTQUFBO01BQ0EsS0FBQSxhQUFBLFNBQUE7OztNQUdBLGlCQUFBLGdCQUFBOzs7Ozs7Ozs7O0FDaEJBLENBQUEsV0FBQTtJQUNBOztJQUVBO1NBQ0EsT0FBQTtTQUNBLFNBQUEsa0JBQUE7VUFDQSx5QkFBQTtVQUNBLDBCQUFBO1VBQ0EsMEJBQUE7VUFDQSwwQkFBQTs7Ozs7QUNkQSxDQUFBLFdBQUE7SUFDQTs7SUFFQTtTQUNBLE9BQUE7U0FDQSxJQUFBOztJQUVBLE9BQUEsVUFBQSxDQUFBLGNBQUEsVUFBQSxpQkFBQSxXQUFBLGtCQUFBOztJQUVBLFNBQUEsT0FBQSxZQUFBLFFBQUEsY0FBQSxTQUFBLGdCQUFBLFFBQUE7OztNQUdBLFdBQUEsU0FBQTtNQUNBLFdBQUEsZUFBQTtNQUNBLFdBQUEsV0FBQSxRQUFBOzs7Ozs7Ozs7OztNQVdBLFdBQUEsY0FBQSxPQUFBOzs7TUFHQSxXQUFBLFNBQUEsU0FBQSxRQUFBO1FBQ0EsT0FBQTs7Ozs7OztNQU9BLFdBQUEsSUFBQTtRQUNBLFNBQUEsT0FBQSx5Q0FBQTtZQUNBLFFBQUEsSUFBQSxhQUFBO1lBQ0EsUUFBQSxJQUFBLGFBQUE7WUFDQSxRQUFBLElBQUEsYUFBQTs7O01BR0EsV0FBQSxJQUFBO1FBQ0EsU0FBQSxPQUFBLFNBQUEsVUFBQSxXQUFBLFlBQUEsTUFBQTtVQUNBLFFBQUEsSUFBQTs7O01BR0EsV0FBQSxJQUFBO1FBQ0EsOERBQUE7O1VBRUEsUUFBQSxTQUFBLEdBQUE7O1VBRUEsV0FBQSxZQUFBLE9BQUEsUUFBQTs7OztNQUlBLFdBQUEsWUFBQSxPQUFBLFFBQUE7TUFDQSxXQUFBLFlBQUEsV0FBQTtRQUNBLElBQUEsUUFBQSxXQUFBLElBQUEsT0FBQSxTQUFBLFdBQUEsYUFBQSxXQUFBLElBQUE7UUFDQSxTQUFBLFFBQUE7UUFDQSxPQUFBOzs7Ozs7OztBQzdEQSxDQUFBLFdBQUE7SUFDQTs7SUFFQTtTQUNBLE9BQUE7U0FDQSxTQUFBLGNBQUE7VUFDQSwwQkFBQTtVQUNBLDBCQUFBO1VBQ0EsMEJBQUE7VUFDQSwwQkFBQTtVQUNBLDBCQUFBO1VBQ0EsMEJBQUE7VUFDQSwwQkFBQTtVQUNBLDBCQUFBO1VBQ0EsMEJBQUE7VUFDQSwwQkFBQTtVQUNBLDBCQUFBO1VBQ0EsMEJBQUE7VUFDQSwwQkFBQTtVQUNBLDBCQUFBO1VBQ0EsMEJBQUE7VUFDQSwwQkFBQTs7Ozs7Ozs7O0FDaEJBLENBQUEsV0FBQTtJQUNBOztJQUVBO1NBQ0EsT0FBQTtTQUNBLFFBQUEsVUFBQTs7SUFFQSxPQUFBLFVBQUEsQ0FBQTtJQUNBLFNBQUEsT0FBQSxZQUFBO1FBQ0EsS0FBQSxTQUFBOzs7O1FBSUEsU0FBQSxPQUFBLE1BQUE7VUFDQSxRQUFBLFdBQUEsU0FBQTs7Ozs7O0FDbkJBLENBQUEsV0FBQTtJQUNBOztJQUVBO1NBQ0EsT0FBQTtTQUNBLE9BQUE7O0lBRUEsZUFBQSxVQUFBLENBQUEsdUJBQUE7SUFDQSxTQUFBLGVBQUEscUJBQUEsYUFBQTs7O01BR0Esb0JBQUEsT0FBQTtRQUNBLE9BQUE7UUFDQSxRQUFBO1FBQ0EsU0FBQSxhQUFBOzs7OztBQ2RBLENBQUEsV0FBQTtJQUNBOztJQUVBO1NBQ0EsT0FBQTtTQUNBLFNBQUEsZ0JBQUE7O1VBRUEsU0FBQTtZQUNBLHNCQUFBLENBQUE7WUFDQSxzQkFBQSxDQUFBO21DQUNBOzs7VUFHQSxTQUFBOzs7Ozs7O0FDYkEsQ0FBQSxZQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBLE9BQUEsT0FBQSxRQUFBLENBQUEsVUFBQSxTQUFBLFFBQUE7UUFDQSxPQUFBLFNBQUE7UUFDQTtZQUNBLEdBQUEsU0FBQSxLQUFBLEVBQUEsT0FBQTs7WUFFQSxJQUFBLFFBQUEsUUFBQSxRQUFBLElBQUEsS0FBQSxRQUFBOztZQUVBLE9BQUEsTUFBQTs7OztBQ1ZBLENBQUEsV0FBQTtJQUNBOztJQUVBO1NBQ0EsT0FBQTtTQUNBLE9BQUE7O0lBRUEsaUJBQUEsVUFBQSxDQUFBO0lBQ0EsU0FBQSxpQkFBQSxzQkFBQTtNQUNBLHNCQUFBLGFBQUE7TUFDQSxzQkFBQSxpQkFBQTtNQUNBLHNCQUFBLG1CQUFBO01BQ0Esc0JBQUEsaUJBQUE7OztBQ1pBLENBQUEsV0FBQTtJQUNBOztJQUVBO1NBQ0EsT0FBQTtTQUNBLElBQUE7O0lBRUEsY0FBQSxVQUFBLENBQUEsY0FBQSxZQUFBO0lBQ0EsU0FBQSxjQUFBLFlBQUEsVUFBQSxjQUFBOzs7O01BSUEsSUFBQTtNQUNBLFdBQUEsSUFBQSxxQkFBQSxXQUFBO1VBQ0EsR0FBQSxFQUFBLHNCQUFBO1lBQ0EsUUFBQSxTQUFBLFdBQUE7Y0FDQSxjQUFBO2VBQ0E7O01BRUEsV0FBQSxJQUFBLHVCQUFBLFNBQUEsT0FBQTtVQUNBLE1BQUEsWUFBQSxPQUFBLHNCQUFBLFlBQUE7WUFDQSxTQUFBLE9BQUE7WUFDQSxjQUFBOzs7Ozs7O0FDdEJBLENBQUEsV0FBQTtJQUNBOztJQUVBO1NBQ0EsT0FBQTtTQUNBLFVBQUEsYUFBQTs7SUFFQSxVQUFBLFVBQUEsQ0FBQSxZQUFBLFlBQUE7SUFDQSxTQUFBLFdBQUEsVUFBQSxVQUFBLElBQUE7O1FBRUEsSUFBQSxZQUFBO1lBQ0EsVUFBQTtZQUNBO2NBQ0E7a0JBQ0E7dUJBQ0E7Y0FDQTs7WUFFQSxNQUFBOztRQUVBLE9BQUE7Ozs7UUFJQSxTQUFBLEtBQUEsT0FBQSxJQUFBOztVQUVBLE1BQUEsY0FBQTs7VUFFQSxJQUFBLFdBQUE7Y0FDQTs7O1VBR0EsUUFBQSxRQUFBLFFBQUEsSUFBQSxZQUFBOztVQUVBLEdBQUEsU0FBQTs7VUFFQSxXQUFBLEtBQUE7O1VBRUEsVUFBQSxTQUFBOzs7O1VBSUEsU0FBQSxlQUFBOztZQUVBLElBQUEsWUFBQSxNQUFBO1lBQ0EsVUFBQSxXQUFBLFFBQUEsS0FBQSxJQUFBLElBQUEsS0FBQSxLQUFBLFlBQUE7O1lBRUEsTUFBQSxjQUFBLFNBQUEsU0FBQTs7WUFFQSxVQUFBLFNBQUEsY0FBQTs7O1VBR0EsU0FBQSxhQUFBOztZQUVBLFNBQUEsT0FBQTs7WUFFQSxNQUFBLGNBQUE7O1lBRUEsU0FBQSxVQUFBOztjQUVBLFNBQUEsU0FBQSxJQUFBOztjQUVBLFFBQUEsUUFBQSxRQUFBLElBQUEsWUFBQTtlQUNBOzs7VUFHQSxTQUFBLFdBQUE7WUFDQSxJQUFBLFdBQUEsR0FBQTtZQUNBLElBQUEsY0FBQTs7O1lBR0EsSUFBQSxNQUFBLE1BQUEsSUFBQSxzQkFBQSxZQUFBO2NBQ0E7OztjQUdBLEtBQUEsZ0JBQUEsR0FBQTs7Z0JBRUEsU0FBQSxVQUFBO2tCQUNBLFNBQUE7bUJBQ0E7O2dCQUVBOzs7OztZQUtBLE9BQUEsU0FBQTs7Ozs7Ozs7Ozs7O0FDakZBLENBQUEsWUFBQTtJQUNBOztJQUVBO1NBQ0EsT0FBQTtTQUNBLFNBQUEsZ0JBQUE7OztJQUdBLHFCQUFBLFVBQUEsQ0FBQTtJQUNBLFNBQUEscUJBQUEsY0FBQTs7O1FBR0EsT0FBQTs7WUFFQSxVQUFBO1lBQ0EsWUFBQTs7WUFFQSxNQUFBLFlBQUE7Z0JBQ0EsT0FBQTtvQkFDQSxVQUFBO29CQUNBLFlBQUE7Ozs7Ozs7UUFPQSxTQUFBLFNBQUEsS0FBQTtZQUNBLE9BQUEsTUFBQTs7Ozs7UUFLQSxTQUFBLGFBQUE7WUFDQSxJQUFBLFFBQUE7WUFDQSxPQUFBO2dCQUNBLE1BQUEsQ0FBQSxlQUFBLE1BQUEsVUFBQSxPQUFBLElBQUE7O29CQUVBLElBQUEsVUFBQSxHQUFBLEtBQUE7b0JBQ0EsS0FBQSxJQUFBLElBQUEsR0FBQSxNQUFBLE1BQUEsUUFBQSxJQUFBLEtBQUEsS0FBQTt3QkFDQSxVQUFBLFFBQUEsTUFBQTs7b0JBRUEsT0FBQTs7O29CQUdBLFNBQUEsUUFBQSxNQUFBOzt3QkFFQSxJQUFBLE9BQUEsU0FBQTs0QkFDQSxPQUFBLFFBQUEsS0FBQTs7NEJBRUEsT0FBQSxRQUFBLEtBQUEsWUFBQTs7Z0NBRUEsSUFBQSxhQUFBLFlBQUE7O2dDQUVBLElBQUEsQ0FBQSxZQUFBLE9BQUEsRUFBQSxNQUFBLHVDQUFBLE9BQUE7O2dDQUVBLE9BQUEsTUFBQSxLQUFBOzs7Ozs7b0JBTUEsU0FBQSxZQUFBLE1BQUE7d0JBQ0EsSUFBQSxhQUFBOzRCQUNBLEtBQUEsSUFBQSxLQUFBLGFBQUE7Z0NBQ0EsSUFBQSxhQUFBLFFBQUEsR0FBQSxRQUFBLGFBQUEsUUFBQSxHQUFBLFNBQUE7b0NBQ0EsT0FBQSxhQUFBLFFBQUE7d0JBQ0EsT0FBQSxhQUFBLFdBQUEsYUFBQSxRQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEVBLENBQUEsWUFBQTtJQUNBOztJQUVBO1NBQ0EsT0FBQTtTQUNBLE9BQUE7O0lBRUEsYUFBQSxVQUFBLENBQUEsa0JBQUEscUJBQUEsc0JBQUEsd0JBQUE7SUFDQSxTQUFBLGFBQUEsZ0JBQUEsbUJBQUEsb0JBQUEsUUFBQSxlQUFBOzs7O1FBSUEsa0JBQUEsVUFBQTs7O1FBR0EsbUJBQUEsVUFBQTs7Ozs7UUFLQTtXQUNBLE1BQUEsT0FBQTs7Y0FFQSxVQUFBO2NBQ0EsU0FBQSxPQUFBLFdBQUEsYUFBQTs7V0FFQSxNQUFBLHFCQUFBO2NBQ0EsS0FBQTtjQUNBLE9BQUE7Y0FDQSxhQUFBLE9BQUEsU0FBQTtjQUNBLFlBQUE7O1dBRUEsTUFBQSxvQkFBQTtjQUNBLEtBQUE7Y0FDQSxPQUFBO2NBQ0EsYUFBQSxPQUFBLFNBQUE7Y0FDQSxZQUFBOztXQUVBLE1BQUEsY0FBQTtjQUNBLEtBQUE7Y0FDQSxPQUFBO2NBQ0EsYUFBQSxPQUFBLFNBQUE7O1dBRUEsTUFBQSxvQkFBQTtjQUNBLEtBQUE7Y0FDQSxPQUFBO2NBQ0EsWUFBQTtjQUNBLGFBQUEsT0FBQSxTQUFBOztXQUVBLE1BQUEsd0JBQUE7Y0FDQSxLQUFBO2NBQ0EsT0FBQTtjQUNBLGFBQUEsT0FBQSxTQUFBO2NBQ0EsWUFBQTs7V0FFQSxNQUFBLDBCQUFBO2NBQ0EsS0FBQTtjQUNBLE9BQUE7Y0FDQSxhQUFBLE9BQUEsU0FBQTtjQUNBLFlBQUE7O1dBRUEsTUFBQSx1QkFBQTtjQUNBLEtBQUE7Y0FDQSxPQUFBO2NBQ0EsYUFBQSxPQUFBLFNBQUE7Y0FDQSxZQUFBOztXQUVBLE1BQUEsd0JBQUE7Y0FDQSxLQUFBO2NBQ0EsT0FBQTtjQUNBLGFBQUEsT0FBQSxTQUFBO2NBQ0EsWUFBQTs7V0FFQSxNQUFBLG9CQUFBO2NBQ0EsS0FBQTtjQUNBLE9BQUE7Y0FDQSxhQUFBLE9BQUEsU0FBQTtjQUNBLFlBQUE7O1dBRUEsTUFBQSxnQkFBQTtjQUNBLEtBQUE7Y0FDQSxPQUFBO2NBQ0EsYUFBQSxPQUFBLFNBQUE7Y0FDQSxZQUFBOztXQUVBLE1BQUEsb0JBQUE7Y0FDQSxLQUFBO2NBQ0EsT0FBQTtjQUNBLGFBQUEsT0FBQSxTQUFBO2NBQ0EsWUFBQTs7V0FFQSxNQUFBLHNCQUFBO2NBQ0EsS0FBQTtjQUNBLE9BQUE7Y0FDQSxhQUFBLE9BQUEsU0FBQTtjQUNBLFlBQUE7O1dBRUEsTUFBQSxjQUFBO2NBQ0EsS0FBQTtjQUNBLE9BQUE7Y0FDQSxhQUFBLE9BQUEsU0FBQTtjQUNBLFlBQUE7O1dBRUEsTUFBQSxtQkFBQTtjQUNBLEtBQUE7Y0FDQSxPQUFBO2NBQ0EsYUFBQSxPQUFBLFNBQUE7Y0FDQSxZQUFBOztXQUVBLE1BQUEsb0JBQUE7Y0FDQSxLQUFBO2NBQ0EsT0FBQTtjQUNBLGFBQUEsT0FBQSxTQUFBO2NBQ0EsWUFBQTs7V0FFQSxNQUFBLHFCQUFBO2NBQ0EsS0FBQTtjQUNBLE9BQUE7Y0FDQSxhQUFBLE9BQUEsU0FBQTtjQUNBLFlBQUE7O1dBRUEsTUFBQSxlQUFBO2NBQ0EsS0FBQTtjQUNBLE9BQUE7Y0FDQSxhQUFBLE9BQUEsU0FBQTtjQUNBLFlBQUE7O1dBRUEsTUFBQSxzQkFBQTtjQUNBLEtBQUE7Y0FDQSxPQUFBO2NBQ0EsYUFBQSxPQUFBLFNBQUE7Y0FDQSxZQUFBOztXQUVBLE1BQUEsd0JBQUE7Y0FDQSxLQUFBO2NBQ0EsT0FBQTtjQUNBLGFBQUEsT0FBQSxTQUFBO2NBQ0EsWUFBQTs7V0FFQSxNQUFBLDZCQUFBO2NBQ0EsS0FBQTtjQUNBLE9BQUE7Y0FDQSxhQUFBLE9BQUEsU0FBQTtjQUNBLFlBQUE7O1dBRUEsTUFBQSxtQkFBQTtjQUNBLEtBQUE7Y0FDQSxPQUFBO2NBQ0EsYUFBQSxPQUFBLFNBQUE7Y0FDQSxZQUFBOztXQUVBLE1BQUEsdUJBQUE7Y0FDQSxLQUFBO2NBQ0EsT0FBQTtjQUNBLGFBQUEsT0FBQSxTQUFBO2NBQ0EsWUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUFvQkEsY0FBQSxhQUFBLEtBQUE7Ozs7Ozs7Ozs7OztBQ2hMQSxDQUFBLFdBQUE7SUFDQTs7SUFFQTtTQUNBLE9BQUE7U0FDQSxVQUFBLGNBQUE7U0FDQSxVQUFBLGlCQUFBOzs7Ozs7SUFNQSxTQUFBLGNBQUE7UUFDQSxJQUFBLFlBQUE7WUFDQSxZQUFBO1lBQ0EsVUFBQTs7UUFFQSxPQUFBOzs7O0lBSUEsU0FBQSxpQkFBQTtRQUNBLElBQUEsWUFBQTtZQUNBLFlBQUE7WUFDQSxVQUFBOztRQUVBLE9BQUE7Ozs7Ozs7O0lBUUEscUJBQUEsVUFBQSxDQUFBLFVBQUEsWUFBQTtJQUNBLFNBQUEsc0JBQUEsUUFBQSxVQUFBLFdBQUE7TUFDQTtTQUNBLEdBQUEsU0FBQSxVQUFBLEdBQUEsRUFBQSxFQUFBO1NBQ0EsR0FBQSxTQUFBLFVBQUE7OztJQUdBLHdCQUFBLFVBQUEsQ0FBQSxVQUFBLFlBQUE7SUFDQSxTQUFBLHlCQUFBLFFBQUEsVUFBQSxXQUFBOztNQUVBLElBQUEsZ0JBQUE7O01BRUEsRUFBQTtTQUNBLEdBQUEsU0FBQSxVQUFBLEdBQUEsRUFBQSxFQUFBO1NBQ0EsR0FBQSxTQUFBLFNBQUEsR0FBQTtVQUNBLElBQUEsRUFBQSxZQUFBO1lBQ0EsVUFBQTs7OztNQUlBLEVBQUEsVUFBQSxHQUFBLFNBQUEsVUFBQTs7TUFFQTtTQUNBLEdBQUEsU0FBQSxVQUFBLEdBQUEsRUFBQSxFQUFBO1NBQ0EsR0FBQSxTQUFBLFVBQUE7Ozs7Ozs7Ozs7O0FDMURBLENBQUEsV0FBQTtJQUNBOztJQUVBO1NBQ0EsT0FBQTtTQUNBLFFBQUEsYUFBQTs7SUFFQSxTQUFBLFlBQUE7UUFDQSxLQUFBLFNBQUE7UUFDQSxLQUFBLFVBQUE7Ozs7UUFJQSxJQUFBLHFCQUFBOztRQUVBLFNBQUEsU0FBQTtVQUNBLElBQUEsYUFBQSxFQUFBOztVQUVBLFdBQUEsWUFBQTs7VUFFQSxJQUFBLFNBQUEsV0FBQSxTQUFBOztVQUVBLFdBQUEsS0FBQSxTQUFBLFNBQUEsVUFBQTs7O1FBR0EsU0FBQSxVQUFBO1VBQ0EsRUFBQTthQUNBLFlBQUE7YUFDQSxLQUFBLHNCQUFBO2FBQ0EsSUFBQTs7Ozs7Ozs7Ozs7QUM3QkEsQ0FBQSxXQUFBO0lBQ0E7O0lBRUE7U0FDQSxPQUFBO1NBQ0EsV0FBQSxxQkFBQTs7SUFF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SUFBQSxNQUFBLE1BQUE7a0JBQ0E7O2NBRUEsR0FBQSxLQUFBO2dCQUNBLE9BQUEsV0FBQTtnQkFDQSxLQUFBLENBQUEsT0FBQTtrQkFDQSxFQUFBLE1BQUE7OzttQkFHQTtnQkFDQSxFQUFBLE1BQUE7Ozs7OztRQU1BLFNBQUEsV0FBQSxLQUFBO1VBQ0EsSUFBQSxTQUFBO2NBQ0EsVUFBQSxFQUFBLElBQUEsUUFBQSxLQUFBLE1BQUEsU0FBQTs7VUFFQSxFQUFBLFFBQUEsT0FBQSxFQUFBLFdBQUEsS0FBQTtZQUNBLFFBQUE7WUFDQSxRQUFBO1lBQ0EsUUFBQTs7O1VBR0EsSUFBQSxRQUFBLFNBQUE7WUFDQSxRQUFBOzs7VUFHQSxPQUFBLEVBQUEsSUFBQTs7Ozs7Ozs7Ozs7QUMvQ0EsQ0FBQSxXQUFBO0lBQ0E7O0lBRUE7U0FDQSxPQUFBO1NBQ0EsVUFBQSxPQUFBOztJQUVBLElBQUEsVUFBQSxDQUFBLGNBQUE7SUFDQSxTQUFBLEtBQUEsWUFBQSxXQUFBO1FBQ0EsSUFBQSxZQUFBO1lBQ0EsTUFBQTtZQUNBLFVBQUE7O1FBRUEsT0FBQTs7UUFFQSxTQUFBLEtBQUEsT0FBQSxTQUFBLE9BQUE7VUFDQSxJQUFBLFNBQUEsTUFBQTs7VUFFQSxTQUFBLGFBQUE7WUFDQSxJQUFBLEtBQUEsV0FBQSxJQUFBLFFBQUE7WUFDQSxRQUFBLEtBQUE7OztVQUdBO1VBQ0EsSUFBQSxrQkFBQSxVQUFBLFlBQUE7O1VBRUEsTUFBQSxJQUFBLFlBQUEsVUFBQTtZQUNBLFVBQUEsT0FBQTs7Ozs7Ozs7Ozs7O0FDNUJBLENBQUEsV0FBQTtJQUNBOztJQUVBO1NBQ0EsT0FBQTtTQUNBLFVBQUEsWUFBQTs7SUFFQSxTQUFBLFlBQUE7UUFDQSxJQUFBLFlBQUE7WUFDQSxNQUFBO1lBQ0EsVUFBQTs7UUFFQSxPQUFBOztRQUVBLFNBQUEsS0FBQSxPQUFBLFNBQUE7VUFDQSxRQUFBLEdBQUEsVUFBQSxXQUFBO1lBQ0EsSUFBQSxRQUFBLEVBQUE7Z0JBQ0EsT0FBQSxNQUFBLFVBQUE7Z0JBQ0EsV0FBQSxNQUFBLEtBQUE7Z0JB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LE1BQUEsV0FBQTs7d0JBRUEsR0FBQSxLQUFBLE1BQUEsS0FBQTs0QkFDQSxXQUFBLFFBQUEsR0FBQSxpQkFBQSxLQUFBLE9BQUE7NEJBQ0EsTUFBQSxRQUFBOzRCQUNBLFlBQUEsUUFBQSxNQUFBLFlBQUEsT0FBQSxRQUFBOzs7Ozs7WUFNQSxHQUFBLFNBQUEsUUFBQSxLQUFBO1lBQ0EsR0FBQSxTQUFBLFFBQUEsS0FBQTs7OztRQUlBLEdBQUEsV0FBQSxZQUFBO1lBQ0EsZ0JBQUEsU0FBQSxHQUFBLE1BQUEsS0FBQSxTQUFBLFNBQUE7Z0JBQ0EsT0FBQSxRQUFBLDBDQUFBOzthQUVBLE1BQUEsVUFBQSxVQUFBOzs7OztRQUtBLEdBQUEsb0JBQUEsWUFBQTtZQUNBLEdBQUEsYUFBQSxDQUFBLEdBQUE7OztRQUdBLEdBQUEsZUFBQSxZQUFBO1lBQ0EsR0FBQSxjQUFBLENBQUEsR0FBQTs7O1FBR0EsR0FBQSxtQkFBQSxZQUFBO1lBQ0EsR0FBQSxZQUFBLENBQUEsR0FBQTs7Ozs7OztBQ2pLQSxDQUFBLFlBQUE7SUFDQTs7SUFFQTtTQUNBLE9BQUE7U0FDQSxXQUFBLDRCQUFBOztJQUVBLHlCQUFBLFVBQUEsQ0FBQSxhQUFBLGdCQUFBLG1CQUFBOztJQUVBLFNBQUEseUJBQUEsV0FBQSxjQUFBLGlCQUFBOztRQUVBLElBQUEsS0FBQTs7UUFFQSxHQUFBLFNBQUE7O1FBRUE7Ozs7UUFJQSxTQUFBLFdBQUE7WUFDQSxHQUFBLFdBQUEsYUFBQTs7WUFFQSxJQUFBLEdBQUEsWUFBQSxhQUFBLEdBQUEsWUFBQSxJQUFBO2dCQUNBLFVBQUEsS0FBQTs7O1lBR0EsZ0JBQUEsVUFBQSxHQUFBLFVBQUEsS0FBQSxVQUFBLFVBQUE7Z0JBQ0EsR0FBQSxTQUFBLFNBQUE7Ozs7OztBQzNCQSxDQUFBLFlBQUE7SUFDQTs7SUFFQTtTQUNBLE9BQUE7U0FDQSxRQUFBLG1CQUFBOztJQUVBLGdCQUFBLFVBQUEsQ0FBQTs7SUFFQSxTQUFBLGdCQUFBLE9BQUE7O1FBRUEsU0FBQSxXQUFBLFNBQUE7WUFDQSxPQUFBLE1BQUEs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SUFBQSxLQUFBOztRQUVBOztRQUVBLFNBQUEsV0FBQTs7Ozs7O0FDZkEsQ0FBQSxZQUFBO0lBQ0E7O0lBRUE7U0FDQSxPQUFBO1NBQ0EsUUFBQSxpQkFBQTs7SUFFQSxjQUFBLFVBQUEsQ0FBQTs7SUFFQSxTQUFBLGNBQUEsT0FBQTs7UUFFQSxTQUFBLGFBQUEsUUFBQTtZQUNBLE9BQUEsTUFBQSxLQUFBLGVBQUE7OztRQUdBLFNBQUEsWUFBQSxRQUFBLE9BQUE7WUFDQSxPQUFBLE1BQUEsS0FBQSwwQkFBQSxFQUFBLFFBQUEsUUFBQSxPQUFBOzs7UUFHQSxTQUFBLFdBQUEsSUFBQTtZQUNBLE9BQUEsTUFBQSxJQUFBLGlCQUFBOzs7UUFHQSxJQUFBLFVBQUE7WUFDQSxhQUFBO1lBQ0EsWUFBQTtZQUNBLFlBQUE7OztRQUdBLE9BQUE7OztBQzdCQSxDQUFBLFlBQUE7SUFDQTs7SUFFQTtTQUNBLE9BQUE7U0FDQSxRQUFBLGVBQUE7O0lBRUEsWUFBQSxVQUFBLENBQUE7O0lBRUEsU0FBQSxZQUFBLE9BQUE7UUFDQSxJQUFBLFdBQUEsWUFBQTtZQUNBLE9BQUEsTUFBQSxJQUFBOzs7UUFHQSxTQUFBLFlBQUEsR0FBQTtZQUNBLE9BQUEsTUFBQSxJQUFBLGtCQUFBOzs7UUFHQSxTQUFBLG1CQUFBO1lBQ0EsT0FBQSxNQUFBLElBQUE7OztRQUdBLFNBQUEsZUFBQTtZQUNBLE9BQUEsTUFBQSxJQUFBOzs7UUFHQSxTQUFBLGNBQUEsU0FBQTtZQUNBLE9BQUEsTUFBQSxLQUFBLGdCQUFBOzs7UUFHQSxTQUFBLFVBQUEsSUFBQTtZQUNBLE9BQUEsTUFBQSxLQUFBLDBCQUFBLE1BQUEsS0FBQTs7O1FBR0EsU0FBQSxhQUFBLElBQUE7WUFDQSxPQUFBLE1BQUEsS0FBQSw0QkFBQSxNQUFBLEtBQUE7OztRQUdBLFNBQUEsbUJBQUE7WUFDQSxPQUFBLE1BQUEsSUFBQTs7O1FBR0EsU0FBQSxtQkFBQSxJQUFBO1lBQ0EsT0FBQSxNQUFBLElBQUEsMEJBQUE7OztRQUdBLFNBQUEsZUFBQSxRQUFBO1lBQ0EsT0FBQSxN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LE9BQUEsTUFBQSx1RUFBQTs7Ozs7O1FBTUEsR0FBQSxZQUFBLFVBQUEsSUFBQTtZQUNBLElBQUEsSUFBQSxHQUFBLFFBQUEsTUFBQSxRQUFBO1lBQ0EsSUFBQSxLQUFBLEdBQUE7Z0JBQ0EsR0FBQSxRQUFBLE1BQUEsT0FBQSxHQUFBOztpQkFFQTtnQkFDQSxHQUFBLFFBQUEsTUFBQSxLQUFBOzs7O1FBSUEsU0FBQSxlQUFBO1lBQ0EsR0FBQSxVQUFBO2dCQUNBLE1BQUE7Z0JBQ0EsV0FBQTtnQkFDQSxRQUFBO2dCQUNBLE9BQUE7Ozs7UUFJQSxTQUFBLHNCQUFBLElBQUEsT0FBQTtZQUNBLEdBQUEsbUJBQUE7WUFDQSxJQUFBLE1BQUEsUUFBQSxRQUFBLFNBQUEsTUFBQSxPQUFBO2dCQUNBLEtBQUEsSUFBQSxPQUFBLE1BQUEsTUFBQTtvQkFDQSxHQUFBLGlCQUFBLEtBQUEsTUFBQSxLQUFBLEtBQUE7O21CQUVBO2dCQUNBLEdBQUEsaUJBQUEsS0FBQTthQUNBOzs7OztBQ3BFQSxDQUFBLFdBQUE7SUFDQTs7SUFFQTtTQUNBLE9BQUEsVUFBQTs7WUFFQTs7WUFFQTtZQUNBOzs7Ozs7Ozs7QUNKQSxDQUFBLFdBQUE7SUFDQTs7SUFFQTtTQUNBLE9BQUE7U0FDQSxXQUFBLGNBQUE7O0lBRUEsV0FBQSxVQUFBLENBQUE7SUFDQSxTQUFBLFdBQUEsTUFBQTs7OztRQUlBOzs7O1FBSUEsU0FBQSxXQUFBO1VBQ0EsS0FBQSxJQUFBOzs7O0FBSUEiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyohXHJcbiAqIFxyXG4gKiBBbmdsZSAtIEJvb3RzdHJhcCBBZG1pbiBBcHAgKyBBbmd1bGFySlNcclxuICogXHJcbiAqIFZlcnNpb246IDMuMi4wXHJcbiAqIEF1dGhvcjogQHRoZW1pY29uX2NvXHJcbiAqIFdlYnNpdGU6IGh0dHA6Ly90aGVtaWNvbi5jb1xyXG4gKiBMaWNlbnNlOiBodHRwczovL3dyYXBib290c3RyYXAuY29tL2hlbHAvbGljZW5zZXNcclxuICogXHJcbiAqL1xyXG5cclxuLy8gQVBQIFNUQVJUXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIFxyXG5cclxuKGZ1bmN0aW9uKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdhbmdsZScsIFtcclxuICAgICAgICAgICAgJ2FwcC5jb3JlJyxcclxuICAgICAgICAgICAgJ2FwcC5yb3V0ZXMnLFxyXG4gICAgICAgICAgICAnZHV4JyxcclxuICAgICAgICAgICAgJ2FwcC5zaWRlYmFyJyxcclxuICAgICAgICAgICAgJ2FwcC5uYXZzZWFyY2gnLFxyXG4gICAgICAgICAgICAnYXBwLnByZWxvYWRlcicsXHJcbiAgICAgICAgICAgICdhcHAubG9hZGluZ2JhcicsXHJcbiAgICAgICAgICAgIC8vJ2FwcC50cmFuc2xhdGUnLFxyXG4gICAgICAgICAgICAnYXBwLnNldHRpbmdzJyxcclxuICAgICAgICAgICAgJ2FwcC51dGlscycgICAgICAgICAgICBcclxuICAgICAgICBdKTsgICAgXHJcbn0pKCk7XHJcblxyXG4iLCIoZnVuY3Rpb24oKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2FwcC5jb3JlJywgW1xyXG4gICAgICAgICAgICAnbmdSb3V0ZScsXHJcbiAgICAgICAgICAgICduZ0FuaW1hdGUnLFxyXG4gICAgICAgICAgICAnbmdTdG9yYWdlJyxcclxuICAgICAgICAgICAgLy8nbmdDb29raWVzJyxcclxuICAgICAgICAgICAgLy8ncGFzY2FscHJlY2h0LnRyYW5zbGF0ZScsXHJcbiAgICAgICAgICAgICd1aS5ib290c3RyYXAnLFxyXG4gICAgICAgICAgICAndWkucm91dGVyJyxcclxuICAgICAgICAgICAgJ29jLmxhenlMb2FkJyxcclxuICAgICAgICAgICAgJ2NmcC5sb2FkaW5nQmFyJyxcclxuICAgICAgICAgICAgJ25nU2FuaXRpemUnLFxyXG4gICAgICAgICAgICAnbmdSZXNvdXJjZScsXHJcbiAgICAgICAgICAgICd1aS51dGlscydcclxuICAgICAgICBdKTtcclxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2FwcC5jb2xvcnMnLCBbXSk7XHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdhcHAubGF6eWxvYWQnLCBbXSk7XHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdkdXgnLCBbJ0xvY2FsU3RvcmFnZU1vZHVsZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS5jYWxlbmRhcicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICd0b2FzdHInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnbmdEaWFsb2cnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnbmdEcmFnRHJvcCddKTtcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdhcHAubG9hZGluZ2JhcicsIFtdKTtcclxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2FwcC5wcmVsb2FkZXInLCBbXSk7XHJcbn0pKCk7XHJcblxyXG4iLCIoZnVuY3Rpb24oKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2FwcC5yb3V0ZXMnLCBbXHJcbiAgICAgICAgICAgICdhcHAubGF6eWxvYWQnXHJcbiAgICAgICAgXSk7XHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdhcHAubmF2c2VhcmNoJywgW10pO1xyXG59KSgpOyIsIihmdW5jdGlvbigpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnYXBwLnNpZGViYXInLCBbJ2R1eCddKTtcclxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2FwcC51dGlscycsIFtcclxuICAgICAgICAgICdhcHAuY29sb3JzJ1xyXG4gICAgICAgICAgXSk7XHJcbn0pKCk7XHJcbiIsIihmdW5jdGlvbigpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnYXBwLnNldHRpbmdzJywgW10pO1xyXG59KSgpOyIsIihmdW5jdGlvbigpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnYXBwLmNvcmUnKVxyXG4gICAgICAgIC5jb25maWcoY29yZUNvbmZpZyk7XHJcblxyXG4gICAgY29yZUNvbmZpZy4kaW5qZWN0ID0gWyckY29udHJvbGxlclByb3ZpZGVyJywgJyRjb21waWxlUHJvdmlkZXInLCAnJGZpbHRlclByb3ZpZGVyJywgJyRwcm92aWRlJywgJyRhbmltYXRlUHJvdmlkZXInXTtcclxuICAgIGZ1bmN0aW9uIGNvcmVDb25maWcoJGNvbnRyb2xsZXJQcm92aWRlciwgJGNvbXBpbGVQcm92aWRlciwgJGZpbHRlclByb3ZpZGVyLCAkcHJvdmlkZSwgJGFuaW1hdGVQcm92aWRlcil7XHJcblxyXG4gICAgICB2YXIgY29yZSA9IGFuZ3VsYXIubW9kdWxlKCdhcHAuY29yZScpO1xyXG4gICAgICAvLyByZWdpc3RlcmluZyBjb21wb25lbnRzIGFmdGVyIGJvb3RzdHJhcFxyXG4gICAgICBjb3JlLmNvbnRyb2xsZXIgPSAkY29udHJvbGxlclByb3ZpZGVyLnJlZ2lzdGVyO1xyXG4gICAgICBjb3JlLmRpcmVjdGl2ZSAgPSAkY29tcGlsZVByb3ZpZGVyLmRpcmVjdGl2ZTtcclxuICAgICAgY29yZS5maWx0ZXIgICAgID0gJGZpbHRlclByb3ZpZGVyLnJlZ2lzdGVyO1xyXG4gICAgICBjb3JlLmZhY3RvcnkgICAgPSAkcHJvdmlkZS5mYWN0b3J5O1xyXG4gICAgICBjb3JlLnNlcnZpY2UgICAgPSAkcHJvdmlkZS5zZXJ2aWNlO1xyXG4gICAgICBjb3JlLmNvbnN0YW50ICAgPSAkcHJvdmlkZS5jb25zdGFudDtcclxuICAgICAgY29yZS52YWx1ZSAgICAgID0gJHByb3ZpZGUudmFsdWU7XHJcblxyXG4gICAgICAvLyBEaXNhYmxlcyBhbmltYXRpb24gb24gaXRlbXMgd2l0aCBjbGFzcyAubmctbm8tYW5pbWF0aW9uXHJcbiAgICAgICRhbmltYXRlUHJvdmlkZXIuY2xhc3NOYW1lRmlsdGVyKC9eKCg/IShuZy1uby1hbmltYXRpb24pKS4pKiQvKTtcclxuXHJcbiAgICB9XHJcblxyXG59KSgpOyIsIi8qKj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gKiBNb2R1bGU6IGNvbnN0YW50cy5qc1xyXG4gKiBEZWZpbmUgY29uc3RhbnRzIHRvIGluamVjdCBhY3Jvc3MgdGhlIGFwcGxpY2F0aW9uXHJcbiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xyXG5cclxuKGZ1bmN0aW9uKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdhcHAuY29yZScpXHJcbiAgICAgICAgLmNvbnN0YW50KCdBUFBfTUVESUFRVUVSWScsIHtcclxuICAgICAgICAgICdkZXNrdG9wTEcnOiAgICAgICAgICAgICAxMjAwLFxyXG4gICAgICAgICAgJ2Rlc2t0b3AnOiAgICAgICAgICAgICAgICA5OTIsXHJcbiAgICAgICAgICAndGFibGV0JzogICAgICAgICAgICAgICAgIDc2OCxcclxuICAgICAgICAgICdtb2JpbGUnOiAgICAgICAgICAgICAgICAgNDgwXHJcbiAgICAgICAgfSlcclxuICAgICAgO1xyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2FwcC5jb3JlJylcclxuICAgICAgICAucnVuKGFwcFJ1bik7XHJcblxyXG4gICAgYXBwUnVuLiRpbmplY3QgPSBbJyRyb290U2NvcGUnLCAnJHN0YXRlJywgJyRzdGF0ZVBhcmFtcycsICAnJHdpbmRvdycsICckdGVtcGxhdGVDYWNoZScsICdDb2xvcnMnXTtcclxuICAgIFxyXG4gICAgZnVuY3Rpb24gYXBwUnVuKCRyb290U2NvcGUsICRzdGF0ZSwgJHN0YXRlUGFyYW1zLCAkd2luZG93LCAkdGVtcGxhdGVDYWNoZSwgQ29sb3JzKSB7XHJcbiAgICAgIFxyXG4gICAgICAvLyBTZXQgcmVmZXJlbmNlIHRvIGFjY2VzcyB0aGVtIGZyb20gYW55IHNjb3BlXHJcbiAgICAgICRyb290U2NvcGUuJHN0YXRlID0gJHN0YXRlO1xyXG4gICAgICAkcm9vdFNjb3BlLiRzdGF0ZVBhcmFtcyA9ICRzdGF0ZVBhcmFtcztcclxuICAgICAgJHJvb3RTY29wZS4kc3RvcmFnZSA9ICR3aW5kb3cubG9jYWxTdG9yYWdlO1xyXG5cclxuICAgICAgLy8gVW5jb21tZW50IHRoaXMgdG8gZGlzYWJsZSB0ZW1wbGF0ZSBjYWNoZVxyXG4gICAgICAvKiRyb290U2NvcGUuJG9uKCckc3RhdGVDaGFuZ2VTdGFydCcsIGZ1bmN0aW9uKGV2ZW50LCB0b1N0YXRlLCB0b1BhcmFtcywgZnJvbVN0YXRlLCBmcm9tUGFyYW1zKSB7XHJcbiAgICAgICAgICBpZiAodHlwZW9mKHRvU3RhdGUpICE9PSAndW5kZWZpbmVkJyl7XHJcbiAgICAgICAgICAgICR0ZW1wbGF0ZUNhY2hlLnJlbW92ZSh0b1N0YXRlLnRlbXBsYXRlVXJsKTtcclxuICAgICAgICAgIH1cclxuICAgICAgfSk7Ki9cclxuXHJcbiAgICAgIC8vIEFsbG93cyB0byB1c2UgYnJhbmRpbmcgY29sb3Igd2l0aCBpbnRlcnBvbGF0aW9uXHJcbiAgICAgIC8vIHt7IGNvbG9yQnlOYW1lKCdwcmltYXJ5JykgfX1cclxuICAgICAgJHJvb3RTY29wZS5jb2xvckJ5TmFtZSA9IENvbG9ycy5ieU5hbWU7XHJcblxyXG4gICAgICAvLyBjYW5jZWwgY2xpY2sgZXZlbnQgZWFzaWx5XHJcbiAgICAgICRyb290U2NvcGUuY2FuY2VsID0gZnVuY3Rpb24oJGV2ZW50KSB7XHJcbiAgICAgICAgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgLy8gSG9va3MgRXhhbXBsZVxyXG4gICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBcclxuXHJcbiAgICAgIC8vIEhvb2sgbm90IGZvdW5kXHJcbiAgICAgICRyb290U2NvcGUuJG9uKCckc3RhdGVOb3RGb3VuZCcsXHJcbiAgICAgICAgZnVuY3Rpb24oZXZlbnQsIHVuZm91bmRTdGF0ZS8qLCBmcm9tU3RhdGUsIGZyb21QYXJhbXMqLykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh1bmZvdW5kU3RhdGUudG8pOyAvLyBcImxhenkuc3RhdGVcIlxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh1bmZvdW5kU3RhdGUudG9QYXJhbXMpOyAvLyB7YToxLCBiOjJ9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHVuZm91bmRTdGF0ZS5vcHRpb25zKTsgLy8ge2luaGVyaXQ6ZmFsc2V9ICsgZGVmYXVsdCBvcHRpb25zXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIC8vIEhvb2sgZXJyb3JcclxuICAgICAgJHJvb3RTY29wZS4kb24oJyRzdGF0ZUNoYW5nZUVycm9yJyxcclxuICAgICAgICBmdW5jdGlvbihldmVudCwgdG9TdGF0ZSwgdG9QYXJhbXMsIGZyb21TdGF0ZSwgZnJvbVBhcmFtcywgZXJyb3Ipe1xyXG4gICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAvLyBIb29rIHN1Y2Nlc3NcclxuICAgICAgJHJvb3RTY29wZS4kb24oJyRzdGF0ZUNoYW5nZVN1Y2Nlc3MnLFxyXG4gICAgICAgIGZ1bmN0aW9uKC8qZXZlbnQsIHRvU3RhdGUsIHRvUGFyYW1zLCBmcm9tU3RhdGUsIGZyb21QYXJhbXMqLykge1xyXG4gICAgICAgICAgLy8gZGlzcGxheSBuZXcgdmlldyBmcm9tIHRvcFxyXG4gICAgICAgICAgJHdpbmRvdy5zY3JvbGxUbygwLCAwKTtcclxuICAgICAgICAgIC8vIFNhdmUgdGhlIHJvdXRlIHRpdGxlXHJcbiAgICAgICAgICAkcm9vdFNjb3BlLmN1cnJUaXRsZSA9ICRzdGF0ZS5jdXJyZW50LnRpdGxlO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gTG9hZCBhIHRpdGxlIGR5bmFtaWNhbGx5XHJcbiAgICAgICRyb290U2NvcGUuY3VyclRpdGxlID0gJHN0YXRlLmN1cnJlbnQudGl0bGU7XHJcbiAgICAgICRyb290U2NvcGUucGFnZVRpdGxlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIHRpdGxlID0gJHJvb3RTY29wZS5hcHAubmFtZSArICcgLSAnICsgKCRyb290U2NvcGUuY3VyclRpdGxlIHx8ICRyb290U2NvcGUuYXBwLmRlc2NyaXB0aW9uKTtcclxuICAgICAgICBkb2N1bWVudC50aXRsZSA9IHRpdGxlO1xyXG4gICAgICAgIHJldHVybiB0aXRsZTtcclxuICAgICAgfTsgICAgICBcclxuXHJcbiAgICB9XHJcblxyXG59KSgpO1xyXG5cclxuIiwiKGZ1bmN0aW9uKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdhcHAuY29sb3JzJylcclxuICAgICAgICAuY29uc3RhbnQoJ0FQUF9DT0xPUlMnLCB7XHJcbiAgICAgICAgICAncHJpbWFyeSc6ICAgICAgICAgICAgICAgICcjNWQ5Y2VjJyxcclxuICAgICAgICAgICdzdWNjZXNzJzogICAgICAgICAgICAgICAgJyMyN2MyNGMnLFxyXG4gICAgICAgICAgJ2luZm8nOiAgICAgICAgICAgICAgICAgICAnIzIzYjdlNScsXHJcbiAgICAgICAgICAnd2FybmluZyc6ICAgICAgICAgICAgICAgICcjZmY5MDJiJyxcclxuICAgICAgICAgICdkYW5nZXInOiAgICAgICAgICAgICAgICAgJyNmMDUwNTAnLFxyXG4gICAgICAgICAgJ2ludmVyc2UnOiAgICAgICAgICAgICAgICAnIzEzMWUyNicsXHJcbiAgICAgICAgICAnZ3JlZW4nOiAgICAgICAgICAgICAgICAgICcjMzdiYzliJyxcclxuICAgICAgICAgICdwaW5rJzogICAgICAgICAgICAgICAgICAgJyNmNTMyZTUnLFxyXG4gICAgICAgICAgJ3B1cnBsZSc6ICAgICAgICAgICAgICAgICAnIzcyNjZiYScsXHJcbiAgICAgICAgICAnZGFyayc6ICAgICAgICAgICAgICAgICAgICcjM2EzZjUxJyxcclxuICAgICAgICAgICd5ZWxsb3cnOiAgICAgICAgICAgICAgICAgJyNmYWQ3MzInLFxyXG4gICAgICAgICAgJ2dyYXktZGFya2VyJzogICAgICAgICAgICAnIzIzMjczNScsXHJcbiAgICAgICAgICAnZ3JheS1kYXJrJzogICAgICAgICAgICAgICcjM2EzZjUxJyxcclxuICAgICAgICAgICdncmF5JzogICAgICAgICAgICAgICAgICAgJyNkZGU2ZTknLFxyXG4gICAgICAgICAgJ2dyYXktbGlnaHQnOiAgICAgICAgICAgICAnI2U0ZWFlYycsXHJcbiAgICAgICAgICAnZ3JheS1saWdodGVyJzogICAgICAgICAgICcjZWRmMWYyJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgO1xyXG59KSgpOyIsIi8qKj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogTW9kdWxlOiBjb2xvcnMuanNcbiAqIFNlcnZpY2VzIHRvIHJldHJpZXZlIGdsb2JhbCBjb2xvcnNcbiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuXG4oZnVuY3Rpb24oKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgYW5ndWxhclxuICAgICAgICAubW9kdWxlKCdhcHAuY29sb3JzJylcbiAgICAgICAgLnNlcnZpY2UoJ0NvbG9ycycsIENvbG9ycyk7XG5cbiAgICBDb2xvcnMuJGluamVjdCA9IFsnQVBQX0NPTE9SUyddO1xuICAgIGZ1bmN0aW9uIENvbG9ycyhBUFBfQ09MT1JTKSB7XG4gICAgICAgIHRoaXMuYnlOYW1lID0gYnlOYW1lO1xuXG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy9cblxuICAgICAgICBmdW5jdGlvbiBieU5hbWUobmFtZSkge1xuICAgICAgICAgIHJldHVybiAoQVBQX0NPTE9SU1tuYW1lXSB8fCAnI2ZmZicpO1xuICAgICAgICB9XG4gICAgfVxuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdhcHAubGF6eWxvYWQnKVxyXG4gICAgICAgIC5jb25maWcobGF6eWxvYWRDb25maWcpO1xyXG5cclxuICAgIGxhenlsb2FkQ29uZmlnLiRpbmplY3QgPSBbJyRvY0xhenlMb2FkUHJvdmlkZXInLCAnQVBQX1JFUVVJUkVTJ107XHJcbiAgICBmdW5jdGlvbiBsYXp5bG9hZENvbmZpZygkb2NMYXp5TG9hZFByb3ZpZGVyLCBBUFBfUkVRVUlSRVMpe1xyXG5cclxuICAgICAgLy8gTGF6eSBMb2FkIG1vZHVsZXMgY29uZmlndXJhdGlvblxyXG4gICAgICAkb2NMYXp5TG9hZFByb3ZpZGVyLmNvbmZpZyh7XHJcbiAgICAgICAgZGVidWc6IGZhbHNlLFxyXG4gICAgICAgIGV2ZW50czogdHJ1ZSxcclxuICAgICAgICBtb2R1bGVzOiBBUFBfUkVRVUlSRVMubW9kdWxlc1xyXG4gICAgICB9KTtcclxuXHJcbiAgICB9XHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdhcHAubGF6eWxvYWQnKVxyXG4gICAgICAgIC5jb25zdGFudCgnQVBQX1JFUVVJUkVTJywge1xyXG4gICAgICAgICAgLy8galF1ZXJ5IGJhc2VkIGFuZCBzdGFuZGFsb25lIHNjcmlwdHNcclxuICAgICAgICAgIHNjcmlwdHM6IHtcclxuICAgICAgICAgICAgJ21vZGVybml6cic6ICAgICAgICAgIFsndmVuZG9yL21vZGVybml6ci9tb2Rlcm5penIuY3VzdG9tLmpzJ10sXHJcbiAgICAgICAgICAgICdpY29ucyc6ICAgICAgICAgICAgICBbJ3ZlbmRvci9mb250YXdlc29tZS9jc3MvZm9udC1hd2Vzb21lLm1pbi5jc3MnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd2ZW5kb3Ivc2ltcGxlLWxpbmUtaWNvbnMvY3NzL3NpbXBsZS1saW5lLWljb25zLmNzcyddXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgLy8gQW5ndWxhciBiYXNlZCBzY3JpcHQgKHVzZSB0aGUgcmlnaHQgbW9kdWxlIG5hbWUpXHJcbiAgICAgICAgICBtb2R1bGVzOiBbXHJcbiAgICAgICAgICAgIC8vIHtuYW1lOiAndG9hc3RlcicsIGZpbGVzOiBbJ3ZlbmRvci9hbmd1bGFyanMtdG9hc3Rlci90b2FzdGVyLmpzJywgJ3ZlbmRvci9hbmd1bGFyanMtdG9hc3Rlci90b2FzdGVyLmNzcyddfVxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH0pO1xyXG5cclxufSkoKTtcclxuIiwiKGZ1bmN0aW9uICgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyLm1vZHVsZSgnZHV4JykuZmlsdGVyKCdkYXRhJywgWyckZmlsdGVyJyxmdW5jdGlvbigkZmlsdGVyKXtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oaW5wdXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihpbnB1dCA9PSBudWxsKXsgcmV0dXJuIFwiXCI7IH0gXHJcbiBcclxuICAgICAgICAgICAgdmFyIF9kYXRlID0gJGZpbHRlcignZGF0ZScpKG5ldyBEYXRlKGlucHV0KSwgJ2RkL01NL3l5eXknKTtcclxuIFxyXG4gICAgICAgICAgICByZXR1cm4gX2RhdGUudG9VcHBlckNhc2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XSk7XHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdhcHAubG9hZGluZ2JhcicpXHJcbiAgICAgICAgLmNvbmZpZyhsb2FkaW5nYmFyQ29uZmlnKVxyXG4gICAgICAgIDtcclxuICAgIGxvYWRpbmdiYXJDb25maWcuJGluamVjdCA9IFsnY2ZwTG9hZGluZ0JhclByb3ZpZGVyJ107XHJcbiAgICBmdW5jdGlvbiBsb2FkaW5nYmFyQ29uZmlnKGNmcExvYWRpbmdCYXJQcm92aWRlcil7XHJcbiAgICAgIGNmcExvYWRpbmdCYXJQcm92aWRlci5pbmNsdWRlQmFyID0gdHJ1ZTtcclxuICAgICAgY2ZwTG9hZGluZ0JhclByb3ZpZGVyLmluY2x1ZGVTcGlubmVyID0gZmFsc2U7XHJcbiAgICAgIGNmcExvYWRpbmdCYXJQcm92aWRlci5sYXRlbmN5VGhyZXNob2xkID0gNTAwO1xyXG4gICAgICBjZnBMb2FkaW5nQmFyUHJvdmlkZXIucGFyZW50U2VsZWN0b3IgPSAnLndyYXBwZXIgPiBzZWN0aW9uJztcclxuICAgIH1cclxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2FwcC5sb2FkaW5nYmFyJylcclxuICAgICAgICAucnVuKGxvYWRpbmdiYXJSdW4pXHJcbiAgICAgICAgO1xyXG4gICAgbG9hZGluZ2JhclJ1bi4kaW5qZWN0ID0gWyckcm9vdFNjb3BlJywgJyR0aW1lb3V0JywgJ2NmcExvYWRpbmdCYXInXTtcclxuICAgIGZ1bmN0aW9uIGxvYWRpbmdiYXJSdW4oJHJvb3RTY29wZSwgJHRpbWVvdXQsIGNmcExvYWRpbmdCYXIpe1xyXG5cclxuICAgICAgLy8gTG9hZGluZyBiYXIgdHJhbnNpdGlvblxyXG4gICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBcclxuICAgICAgdmFyIHRoQmFyO1xyXG4gICAgICAkcm9vdFNjb3BlLiRvbignJHN0YXRlQ2hhbmdlU3RhcnQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIGlmKCQoJy53cmFwcGVyID4gc2VjdGlvbicpLmxlbmd0aCkgLy8gY2hlY2sgaWYgYmFyIGNvbnRhaW5lciBleGlzdHNcclxuICAgICAgICAgICAgdGhCYXIgPSAkdGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICBjZnBMb2FkaW5nQmFyLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgIH0sIDApOyAvLyBzZXRzIGEgbGF0ZW5jeSBUaHJlc2hvbGRcclxuICAgICAgfSk7XHJcbiAgICAgICRyb290U2NvcGUuJG9uKCckc3RhdGVDaGFuZ2VTdWNjZXNzJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAgIGV2ZW50LnRhcmdldFNjb3BlLiR3YXRjaCgnJHZpZXdDb250ZW50TG9hZGVkJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkdGltZW91dC5jYW5jZWwodGhCYXIpO1xyXG4gICAgICAgICAgICBjZnBMb2FkaW5nQmFyLmNvbXBsZXRlKCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2FwcC5wcmVsb2FkZXInKVxyXG4gICAgICAgIC5kaXJlY3RpdmUoJ3ByZWxvYWRlcicsIHByZWxvYWRlcik7XHJcblxyXG4gICAgcHJlbG9hZGVyLiRpbmplY3QgPSBbJyRhbmltYXRlJywgJyR0aW1lb3V0JywgJyRxJ107XHJcbiAgICBmdW5jdGlvbiBwcmVsb2FkZXIgKCRhbmltYXRlLCAkdGltZW91dCwgJHEpIHtcclxuXHJcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IHtcclxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdFQUMnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZTogXHJcbiAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJwcmVsb2FkZXItcHJvZ3Jlc3NcIj4nICtcclxuICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJwcmVsb2FkZXItcHJvZ3Jlc3MtYmFyXCIgJyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgJ25nLXN0eWxlPVwie3dpZHRoOiBsb2FkQ291bnRlciArIFxcJyVcXCd9XCI+PC9kaXY+JyArXHJcbiAgICAgICAgICAgICAgJzwvZGl2PidcclxuICAgICAgICAgICAgLFxyXG4gICAgICAgICAgICBsaW5rOiBsaW5rXHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xyXG5cclxuICAgICAgICAvLy8vLy8vXHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGxpbmsoc2NvcGUsIGVsKSB7XHJcblxyXG4gICAgICAgICAgc2NvcGUubG9hZENvdW50ZXIgPSAwO1xyXG5cclxuICAgICAgICAgIHZhciBjb3VudGVyICA9IDAsXHJcbiAgICAgICAgICAgICAgdGltZW91dDtcclxuXHJcbiAgICAgICAgICAvLyBkaXNhYmxlcyBzY3JvbGxiYXJcclxuICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudCgnYm9keScpLmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XHJcbiAgICAgICAgICAvLyBlbnN1cmUgY2xhc3MgaXMgcHJlc2VudCBmb3Igc3R5bGluZ1xyXG4gICAgICAgICAgZWwuYWRkQ2xhc3MoJ3ByZWxvYWRlcicpO1xyXG5cclxuICAgICAgICAgIGFwcFJlYWR5KCkudGhlbihlbmRDb3VudGVyKTtcclxuXHJcbiAgICAgICAgICB0aW1lb3V0ID0gJHRpbWVvdXQoc3RhcnRDb3VudGVyKTtcclxuXHJcbiAgICAgICAgICAvLy8vLy8vXHJcblxyXG4gICAgICAgICAgZnVuY3Rpb24gc3RhcnRDb3VudGVyKCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIHJlbWFpbmluZyA9IDEwMCAtIGNvdW50ZXI7XHJcbiAgICAgICAgICAgIGNvdW50ZXIgPSBjb3VudGVyICsgKDAuMDE1ICogTWF0aC5wb3coMSAtIE1hdGguc3FydChyZW1haW5pbmcpLCAyKSk7XHJcblxyXG4gICAgICAgICAgICBzY29wZS5sb2FkQ291bnRlciA9IHBhcnNlSW50KGNvdW50ZXIsIDEwKTtcclxuXHJcbiAgICAgICAgICAgIHRpbWVvdXQgPSAkdGltZW91dChzdGFydENvdW50ZXIsIDIwKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBmdW5jdGlvbiBlbmRDb3VudGVyKCkge1xyXG5cclxuICAgICAgICAgICAgJHRpbWVvdXQuY2FuY2VsKHRpbWVvdXQpO1xyXG5cclxuICAgICAgICAgICAgc2NvcGUubG9hZENvdW50ZXIgPSAxMDA7XHJcblxyXG4gICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgIC8vIGFuaW1hdGUgcHJlbG9hZGVyIGhpZGluZ1xyXG4gICAgICAgICAgICAgICRhbmltYXRlLmFkZENsYXNzKGVsLCAncHJlbG9hZGVyLWhpZGRlbicpO1xyXG4gICAgICAgICAgICAgIC8vIHJldG9yZSBzY3JvbGxiYXJcclxuICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoJ2JvZHknKS5jc3MoJ292ZXJmbG93JywgJycpO1xyXG4gICAgICAgICAgICB9LCAzMDApO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGZ1bmN0aW9uIGFwcFJlYWR5KCkge1xyXG4gICAgICAgICAgICB2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xyXG4gICAgICAgICAgICB2YXIgdmlld3NMb2FkZWQgPSAwO1xyXG4gICAgICAgICAgICAvLyBpZiB0aGlzIGRvZXNuJ3Qgc3luYyB3aXRoIHRoZSByZWFsIGFwcCByZWFkeVxyXG4gICAgICAgICAgICAvLyBhIGN1c3RvbSBldmVudCBtdXN0IGJlIHVzZWQgaW5zdGVhZFxyXG4gICAgICAgICAgICB2YXIgb2ZmID0gc2NvcGUuJG9uKCckdmlld0NvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgdmlld3NMb2FkZWQgKys7XHJcbiAgICAgICAgICAgICAgLy8gd2Uga25vdyB0aGVyZSBhcmUgYXQgbGVhc3QgdHdvIHZpZXdzIHRvIGJlIGxvYWRlZCBcclxuICAgICAgICAgICAgICAvLyBiZWZvcmUgdGhlIGFwcCBpcyByZWFkeSAoMS1pbmRleC5odG1sIDItYXBwKi5odG1sKVxyXG4gICAgICAgICAgICAgIGlmICggdmlld3NMb2FkZWQgPT09IDIpIHtcclxuICAgICAgICAgICAgICAgIC8vIHdpdGggcmVzb2x2ZSB0aGlzIGZpcmVzIG9ubHkgb25jZVxyXG4gICAgICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgfSwgMzAwMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgb2ZmKCk7XHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSAvL2xpbmtcclxuICAgIH1cclxuXHJcbn0pKCk7IiwiLyoqPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAqIE1vZHVsZTogaGVscGVycy5qc1xyXG4gKiBQcm92aWRlcyBoZWxwZXIgZnVuY3Rpb25zIGZvciByb3V0ZXMgZGVmaW5pdGlvblxyXG4gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cclxuXHJcbihmdW5jdGlvbiAoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2FwcC5yb3V0ZXMnKVxyXG4gICAgICAgIC5wcm92aWRlcignUm91dGVIZWxwZXJzJywgUm91dGVIZWxwZXJzUHJvdmlkZXIpXHJcbiAgICA7XHJcblxyXG4gICAgUm91dGVIZWxwZXJzUHJvdmlkZXIuJGluamVjdCA9IFsnQVBQX1JFUVVJUkVTJ107XHJcbiAgICBmdW5jdGlvbiBSb3V0ZUhlbHBlcnNQcm92aWRlcihBUFBfUkVRVUlSRVMpIHtcclxuXHJcbiAgICAgICAgLyoganNoaW50IHZhbGlkdGhpczp0cnVlICovXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgLy8gcHJvdmlkZXIgYWNjZXNzIGxldmVsXHJcbiAgICAgICAgICAgIGJhc2VwYXRoOiBiYXNlcGF0aCxcclxuICAgICAgICAgICAgcmVzb2x2ZUZvcjogcmVzb2x2ZUZvcixcclxuICAgICAgICAgICAgLy8gY29udHJvbGxlciBhY2Nlc3MgbGV2ZWxcclxuICAgICAgICAgICAgJGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICBiYXNlcGF0aDogYmFzZXBhdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZUZvcjogcmVzb2x2ZUZvclxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIFNldCBoZXJlIHRoZSBiYXNlIG9mIHRoZSByZWxhdGl2ZSBwYXRoXHJcbiAgICAgICAgLy8gZm9yIGFsbCBhcHAgdmlld3NcclxuICAgICAgICBmdW5jdGlvbiBiYXNlcGF0aCh1cmkpIHtcclxuICAgICAgICAgICAgcmV0dXJuICcvJyArIHVyaTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEdlbmVyYXRlcyBhIHJlc29sdmUgb2JqZWN0IGJ5IHBhc3Npbmcgc2NyaXB0IG5hbWVzXHJcbiAgICAgICAgLy8gcHJldmlvdXNseSBjb25maWd1cmVkIGluIGNvbnN0YW50LkFQUF9SRVFVSVJFU1xyXG4gICAgICAgIGZ1bmN0aW9uIHJlc29sdmVGb3IoKSB7XHJcbiAgICAgICAgICAgIHZhciBfYXJncyA9IGFyZ3VtZW50cztcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGRlcHM6IFsnJG9jTGF6eUxvYWQnLCAnJHEnLCBmdW5jdGlvbiAoJG9jTEwsICRxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQ3JlYXRlcyBhIHByb21pc2UgY2hhaW4gZm9yIGVhY2ggYXJndW1lbnRcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcHJvbWlzZSA9ICRxLndoZW4oMSk7IC8vIGVtcHR5IHByb21pc2VcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gX2FyZ3MubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvbWlzZSA9IGFuZFRoZW4oX2FyZ3NbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJvbWlzZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY3JlYXRlcyBwcm9taXNlIHRvIGNoYWluIGR5bmFtaWNhbGx5XHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gYW5kVGhlbihfYXJnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFsc28gc3VwcG9ydCBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhIHByb21pc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBfYXJnID09PSAnZnVuY3Rpb24nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb21pc2UudGhlbihfYXJnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb21pc2UudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgaXMgYSBtb2R1bGUsIHBhc3MgdGhlIG5hbWUuIElmIG5vdCwgcGFzcyB0aGUgYXJyYXlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgd2hhdFRvTG9hZCA9IGdldFJlcXVpcmVkKF9hcmcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNpbXBsZSBlcnJvciBjaGVja1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghd2hhdFRvTG9hZCkgcmV0dXJuICQuZXJyb3IoJ1JvdXRlIHJlc29sdmU6IEJhZCByZXNvdXJjZSBuYW1lIFsnICsgX2FyZyArICddJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZmluYWxseSwgcmV0dXJuIGEgcHJvbWlzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkb2NMTC5sb2FkKHdoYXRUb0xvYWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNoZWNrIGFuZCByZXR1cm5zIHJlcXVpcmVkIGRhdGFcclxuICAgICAgICAgICAgICAgICAgICAvLyBhbmFseXplIG1vZHVsZSBpdGVtcyB3aXRoIHRoZSBmb3JtIFtuYW1lOiAnJywgZmlsZXM6IFtdXVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGFuZCBhbHNvIHNpbXBsZSBhcnJheSBvZiBzY3JpcHQgZmlsZXMgKGZvciBub3QgYW5ndWxhciBqcylcclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBnZXRSZXF1aXJlZChuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChBUFBfUkVRVUlSRVMubW9kdWxlcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIG0gaW4gQVBQX1JFUVVJUkVTLm1vZHVsZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKEFQUF9SRVFVSVJFUy5tb2R1bGVzW21dLm5hbWUgJiYgQVBQX1JFUVVJUkVTLm1vZHVsZXNbbV0ubmFtZSA9PT0gbmFtZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEFQUF9SRVFVSVJFUy5tb2R1bGVzW21dO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gQVBQX1JFUVVJUkVTLnNjcmlwdHMgJiYgQVBQX1JFUVVJUkVTLnNjcmlwdHNbbmFtZV07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSAvLyByZXNvbHZlRm9yXHJcblxyXG4gICAgfVxyXG5cclxuXHJcbn0pKCk7XHJcblxyXG4iLCIvKio9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICogTW9kdWxlOiBjb25maWcuanNcclxuICogQXBwIHJvdXRlcyBhbmQgcmVzb3VyY2VzIGNvbmZpZ3VyYXRpb25cclxuID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSovXHJcblxyXG5cclxuKGZ1bmN0aW9uICgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnYXBwLnJvdXRlcycpXHJcbiAgICAgICAgLmNvbmZpZyhyb3V0ZXNDb25maWcpO1xyXG5cclxuICAgIHJvdXRlc0NvbmZpZy4kaW5qZWN0ID0gWyckc3RhdGVQcm92aWRlcicsICckbG9jYXRpb25Qcm92aWRlcicsICckdXJsUm91dGVyUHJvdmlkZXInLCAnUm91dGVIZWxwZXJzUHJvdmlkZXInLCAnJGh0dHBQcm92aWRlciddO1xyXG4gICAgZnVuY3Rpb24gcm91dGVzQ29uZmlnKCRzdGF0ZVByb3ZpZGVyLCAkbG9jYXRpb25Qcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyLCBoZWxwZXIsICRodHRwUHJvdmlkZXIpIHtcclxuXHJcbiAgICAgICAgLy8gU2V0IHRoZSBmb2xsb3dpbmcgdG8gdHJ1ZSB0byBlbmFibGUgdGhlIEhUTUw1IE1vZGVcclxuICAgICAgICAvLyBZb3UgbWF5IGhhdmUgdG8gc2V0IDxiYXNlPiB0YWcgaW4gaW5kZXggYW5kIGEgcm91dGluZyBjb25maWd1cmF0aW9uIGluIHlvdXIgc2VydmVyXHJcbiAgICAgICAgJGxvY2F0aW9uUHJvdmlkZXIuaHRtbDVNb2RlKGZhbHNlKTtcclxuXHJcbiAgICAgICAgLy8gZGVmYXVsdHMgdG8gZGFzaGJvYXJkXHJcbiAgICAgICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnL0V2ZW50b3MvQWdlbmRhJyk7XHJcblxyXG4gICAgICAgIC8vIFxyXG4gICAgICAgIC8vIEFwcGxpY2F0aW9uIFJvdXRlc1xyXG4gICAgICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICAgXHJcbiAgICAgICAgJHN0YXRlUHJvdmlkZXJcclxuICAgICAgICAgIC5zdGF0ZSgnYXBwJywge1xyXG4gICAgICAgICAgICAgIC8vdXJsOiAnLycsXHJcbiAgICAgICAgICAgICAgYWJzdHJhY3Q6IHRydWUsXHJcbiAgICAgICAgICAgICAgcmVzb2x2ZTogaGVscGVyLnJlc29sdmVGb3IoJ21vZGVybml6cicsICdpY29ucycpXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLnN0YXRlKCdhcHAuZXZlbnRvc2FnZW5kYScsIHtcclxuICAgICAgICAgICAgICB1cmw6ICcvRXZlbnRvcy9BZ2VuZGEnLFxyXG4gICAgICAgICAgICAgIHRpdGxlOiAnRXZlbnRvcycsXHJcbiAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGhlbHBlci5iYXNlcGF0aCgnRXZlbnRvcy9BZ2VuZGEnKSxcclxuICAgICAgICAgICAgICBjb250cm9sbGVyOiAnYWdlbmRhRXZlbnRvc0NvbnRyb2xsZXIgYXMgdm0nXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLnN0YXRlKCdhcHAuZXZlbnRvc2NyaWFyJywge1xyXG4gICAgICAgICAgICAgIHVybDogJy9FdmVudG9zL0NyaWFyJyxcclxuICAgICAgICAgICAgICB0aXRsZTogJ0NyaWFyIEV2ZW50bycsXHJcbiAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGhlbHBlci5iYXNlcGF0aCgnRXZlbnRvcy9DcmlhcicpLFxyXG4gICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdjcmlhckV2ZW50b0NvbnRyb2xsZXIgYXMgdm0nXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLnN0YXRlKCdhcHAucGVyZmlzJywge1xyXG4gICAgICAgICAgICAgIHVybDogJy9QZXJmaXMnLFxyXG4gICAgICAgICAgICAgIHRpdGxlOiAnUGVyZmlzJyxcclxuICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogaGVscGVyLmJhc2VwYXRoKCdQZXJmaXMvSW5kZXgnKVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5zdGF0ZSgnYXBwLnBlcmZpc2xpc3RhcycsIHtcclxuICAgICAgICAgICAgICB1cmw6ICcvUGVyZmlzL0xpc3RhcycsXHJcbiAgICAgICAgICAgICAgdGl0bGU6ICdQZXJmaWwgZGUgTGlzdGFzJyxcclxuICAgICAgICAgICAgICBjb250cm9sbGVyOiAncGVyZmlsTGlzdGFDb250cm9sbGVyIGFzIHZtJyxcclxuICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogaGVscGVyLmJhc2VwYXRoKCdQZXJmaXMvTGlzdGFzJylcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuc3RhdGUoJ2FwcC5wZXJmaXNsaXN0YWNyaWFyJywge1xyXG4gICAgICAgICAgICAgIHVybDogJy9QZXJmaXMvTGlzdGFzL0NyaWFyLzppZCcsXHJcbiAgICAgICAgICAgICAgdGl0bGU6ICdDcmlhY2FvIGRlIFBlcmZpbCBkZSBEaXN0cmlidWljYW8nLFxyXG4gICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBoZWxwZXIuYmFzZXBhdGgoJ1BlcmZpcy9MaXN0YXNDcmlhcicpLFxyXG4gICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdjcmlhclBlcmZpbExpc3RhQ29udHJvbGxlciBhcyB2bSdcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuc3RhdGUoJ2FwcC5wZXJmaXNkaXN0cmlidWljYW8nLCB7XHJcbiAgICAgICAgICAgICAgdXJsOiAnL1BlcmZpcy9EaXN0cmlidWljYW8nLFxyXG4gICAgICAgICAgICAgIHRpdGxlOiAnUGVyZmlsIGRlIERpc3RyaWJ1aWNhbycsXHJcbiAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGhlbHBlci5iYXNlcGF0aCgnUGVyZmlzL0Rpc3RyaWJ1aWNhbycpLFxyXG4gICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdwZXJmaWxEaXN0cmlidWljYW9Db250cm9sbGVyIGFzIHZtJ1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5zdGF0ZSgnYXBwLnBlcmZpc2Rpc3RjcmlhcicsIHtcclxuICAgICAgICAgICAgICB1cmw6ICcvUGVyZmlzL0Rpc3RyaWJ1aWNhby9DcmlhcicsXHJcbiAgICAgICAgICAgICAgdGl0bGU6ICdDcmlhY2FvIGRlIFBlcmZpbCBkZSBEaXN0cmlidWljYW8nLFxyXG4gICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBoZWxwZXIuYmFzZXBhdGgoJ1BlcmZpcy9EaXN0cmlidWljYW9DcmlhcicpLFxyXG4gICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdjcmlhclBlcmZpbERpc3RDb250cm9sbGVyIGFzIHZtJ1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5zdGF0ZSgnYXBwLnBlcmZpc2Rpc3RlZGl0YXInLCB7XHJcbiAgICAgICAgICAgICAgdXJsOiAnL1BlcmZpcy9EaXN0cmlidWljYW8vRWRpdGFyLzpwZXJmaWxJZCcsXHJcbiAgICAgICAgICAgICAgdGl0bGU6ICdFZGljYW8gZGUgUGVyZmlsIGRlIERpc3RyaWJ1aWNhbycsXHJcbiAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGhlbHBlci5iYXNlcGF0aCgnUGVyZmlzL0Rpc3RyaWJ1aWNhb0VkaXRhcicpLFxyXG4gICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdlZGl0YXJQZXJmaWxEaXN0Q29udHJvbGxlciBhcyB2bSdcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuc3RhdGUoJ2FwcC51c3VhcmlvY2FzYXMnLCB7XHJcbiAgICAgICAgICAgICAgdXJsOiAnL1VzdWFyaW8vQ2FzYXMnLFxyXG4gICAgICAgICAgICAgIHRpdGxlOiAnU2VsZWNhbyBkZSBDYXNhcycsXHJcbiAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGhlbHBlci5iYXNlcGF0aCgnVXN1YXJpby9TZWxlY2FvQ2FzYScpLFxyXG4gICAgICAgICAgICAgIGNvbnRyb2xsZXI6IFwic2VsZWNhb0Nhc2FDb250cm9sbGVyIGFzIHZtXCJcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuc3RhdGUoJ2FwcC51c3VhcmlvcycsIHtcclxuICAgICAgICAgICAgICB1cmw6ICcvVXN1YXJpb3MvQ29uc3VsdGEnLFxyXG4gICAgICAgICAgICAgIHRpdGxlOiAnQ29uc3VsdGEgZGUgVXN1YXJpb3MnLFxyXG4gICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBoZWxwZXIuYmFzZXBhdGgoJ1VzdWFyaW8vQ29uc3VsdGEnKSxcclxuICAgICAgICAgICAgICBjb250cm9sbGVyOiBcInVzdWFyaW9Db25zdWx0YUNvbnRyb2xsZXIgYXMgdm1cIlxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5zdGF0ZSgnYXBwLnVzdWFyaW9jcmlhcicsIHtcclxuICAgICAgICAgICAgICB1cmw6ICcvVXN1YXJpby9DcmlhcicsXHJcbiAgICAgICAgICAgICAgdGl0bGU6ICdDYWRhc3RybyBkZSBVc3VhcmlvcycsXHJcbiAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGhlbHBlci5iYXNlcGF0aCgnVXN1YXJpby9DcmlhcicpLFxyXG4gICAgICAgICAgICAgIGNvbnRyb2xsZXI6IFwidXN1YXJpb0NyaWFyQ29udHJvbGxlciBhcyB2bVwiXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLnN0YXRlKCdhcHAudXN1YXJpb2FjZXNzb3MnLCB7XHJcbiAgICAgICAgICAgICAgdXJsOiAnL1VzdWFyaW8vQWNlc3Nvcy86aWQnLFxyXG4gICAgICAgICAgICAgIHRpdGxlOiAnQWNlc3NvcyBVc3VhcmlvJyxcclxuICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogaGVscGVyLmJhc2VwYXRoKCdVc3VhcmlvL0FjZXNzb3MnKSxcclxuICAgICAgICAgICAgICBjb250cm9sbGVyOiBcInVzdWFyaW9BY2Vzc29Db250cm9sbGVyIGFzIHZtXCJcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuc3RhdGUoJ2FwcC5saXN0YXMnLCB7XHJcbiAgICAgICAgICAgICAgdXJsOiAnL0V2ZW50by86aWQvTGlzdGFzLycsXHJcbiAgICAgICAgICAgICAgdGl0bGU6ICdMaXN0YXMnLFxyXG4gICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBoZWxwZXIuYmFzZXBhdGgoJ0xpc3Rhcy9Db25zdWx0YScpLFxyXG4gICAgICAgICAgICAgIGNvbnRyb2xsZXI6IFwiY29uc3VsdGFMaXN0YXNDb250cm9sbGVyIGFzIHZtXCJcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuc3RhdGUoJ2FwcC5saXN0YXNjcmlhcicsIHtcclxuICAgICAgICAgICAgICB1cmw6ICcvRXZlbnRvLzpldmVudG9JZC9MaXN0YXMvQ3JpYXIvOmlkJyxcclxuICAgICAgICAgICAgICB0aXRsZTogJ0NyaWFyIExpc3RhJyxcclxuICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogaGVscGVyLmJhc2VwYXRoKCdMaXN0YXMvQ3JpYXInKSxcclxuICAgICAgICAgICAgICBjb250cm9sbGVyOiBcImNyaWFyTGlzdGFDb250cm9sbGVyIGFzIHZtXCJcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuc3RhdGUoJ2FwcC5kaXN0cmlidWljYW8nLCB7XHJcbiAgICAgICAgICAgICAgdXJsOiAnL0xpc3Rhcy86bGlzdGFJZC9EaXN0cmlidWljYW8vOmlkJyxcclxuICAgICAgICAgICAgICB0aXRsZTogJ0Rpc3RyaWJ1aXIgQ29udmlkYWRvcycsXHJcbiAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGhlbHBlci5iYXNlcGF0aCgnRGlzdHJpYnVpY2FvL0NyaWFyJyksXHJcbiAgICAgICAgICAgICAgY29udHJvbGxlcjogXCJkaXN0cmlidWljYW9Db250cm9sbGVyIGFzIHZtXCJcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuc3RhdGUoJ2FwcC5hZGRub21lbGlzdGFzJywge1xyXG4gICAgICAgICAgICAgIHVybDogJy9FdmVudG8vOmV2ZW50b0lkL0xpc3Rhcy9Qcm9tb3RlcicsXHJcbiAgICAgICAgICAgICAgdGl0bGU6ICdNaW5oYXMgTGlzdGFzJyxcclxuICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogaGVscGVyLmJhc2VwYXRoKCdBZGROb21lL0xpc3RhcycpLFxyXG4gICAgICAgICAgICAgIGNvbnRyb2xsZXI6IFwibGlzdGFzUHJvbW90ZXJDb250cm9sbGVyIGFzIHZtXCJcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuc3RhdGUoJ2FwcC5hZGRub21lJywge1xyXG4gICAgICAgICAgICAgIHVybDogJy9FdmVudG8vTGlzdGFzLzppZC9Ob21lJyxcclxuICAgICAgICAgICAgICB0aXRsZTogJ0FkaWNpb25hciBOb21lIExpc3RhJyxcclxuICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogaGVscGVyLmJhc2VwYXRoKCdBZGROb21lL0FkZCcpLFxyXG4gICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdhZGROb21lQ29udHJvbGxlciBhcyB2bSdcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuc3RhdGUoJ2FwcC5wb3J0YXJpYWxpc3RhcycsIHtcclxuICAgICAgICAgICAgICB1cmw6ICcvRXZlbnRvLzppZC9Qb3J0YXJpYS9MaXN0YXMnLFxyXG4gICAgICAgICAgICAgIHRpdGxlOiAnTGlzdGFzJyxcclxuICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogaGVscGVyLmJhc2VwYXRoKCdQb3J0YXJpYS9MaXN0YXMnKSxcclxuICAgICAgICAgICAgICBjb250cm9sbGVyOiBcImxpc3Rhc1BvcnRhcmlhQ29udHJvbGxlciBhcyB2bVwiXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLnN0YXRlKCdhcHAucG9ydGFyaWF2ZXJsaXN0YScsIHtcclxuICAgICAgICAgICAgICB1cmw6ICcvUG9ydGFyaWEvTGlzdGEvOmlkL05vbWVzJyxcclxuICAgICAgICAgICAgICB0aXRsZTogJ1BvcnRhcmlhJyxcclxuICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogaGVscGVyLmJhc2VwYXRoKCdQb3J0YXJpYS9MaXN0YScpLFxyXG4gICAgICAgICAgICAgIGNvbnRyb2xsZXI6IFwibm9tZXNMaXN0YUNvbnRyb2xsZXIgYXMgdm1cIlxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5zdGF0ZSgnYXBwLnBvcnRhcmlhdmVybGlzdGFnZXJhbCcsIHtcclxuICAgICAgICAgICAgICB1cmw6ICcvRXZlbnRvLzppZC9Qb3J0YXJpYScsXHJcbiAgICAgICAgICAgICAgdGl0bGU6ICdQb3J0YXJpYScsXHJcbiAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGhlbHBlci5iYXNlcGF0aCgnUG9ydGFyaWEvTGlzdGFHZXJhbCcpLFxyXG4gICAgICAgICAgICAgIGNvbnRyb2xsZXI6IFwibGlzdGFHZXJhbENvbnRyb2xsZXIgYXMgdm1cIlxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5zdGF0ZSgnYXBwLmNvbWlzc2FyaW9zJywge1xyXG4gICAgICAgICAgICAgIHVybDogJy9Db21pc3NhcmlvcycsXHJcbiAgICAgICAgICAgICAgdGl0bGU6ICdDb21pc3NhcmlvcycsXHJcbiAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGhlbHBlci5iYXNlcGF0aCgnVXN1YXJpby9Db21pc3NhcmlvcycpLFxyXG4gICAgICAgICAgICAgIGNvbnRyb2xsZXI6IFwiY29uc3VsdGFDb21pc3Nhcmlvc0NvbnRyb2xsZXIgYXMgdm1cIlxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5zdGF0ZSgnYXBwLmNvbWlzc2FyaW9jcmlhcicsIHtcclxuICAgICAgICAgICAgICB1cmw6ICcvQ29taXNzYXJpb3MvQ3JpYXInLFxyXG4gICAgICAgICAgICAgIHRpdGxlOiAnQ3JpYXIgQ29taXNzYXJpbycsXHJcbiAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGhlbHBlci5iYXNlcGF0aCgnVXN1YXJpby9DcmlhckNvbWlzc2FyaW8nKSxcclxuICAgICAgICAgICAgICBjb250cm9sbGVyOiBcImNyaWFyQ29taXNzYXJpb0NvbnRyb2xsZXIgYXMgdm1cIlxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gXHJcbiAgICAgICAgLy8gQ1VTVE9NIFJFU09MVkVTXHJcbiAgICAgICAgLy8gICBBZGQgeW91ciBvd24gcmVzb2x2ZXMgcHJvcGVydGllc1xyXG4gICAgICAgIC8vICAgZm9sbG93aW5nIHRoaXMgb2JqZWN0IGV4dGVuZFxyXG4gICAgICAgIC8vICAgbWV0aG9kXHJcbiAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gXHJcbiAgICAgICAgLy8gLnN0YXRlKCdhcHAuc29tZXJvdXRlJywge1xyXG4gICAgICAgIC8vICAgdXJsOiAnL3NvbWVfdXJsJyxcclxuICAgICAgICAvLyAgIHRlbXBsYXRlVXJsOiAncGF0aF90b190ZW1wbGF0ZS5odG1sJyxcclxuICAgICAgICAvLyAgIGNvbnRyb2xsZXI6ICdzb21lQ29udHJvbGxlcicsXHJcbiAgICAgICAgLy8gICByZXNvbHZlOiBhbmd1bGFyLmV4dGVuZChcclxuICAgICAgICAvLyAgICAgaGVscGVyLnJlc29sdmVGb3IoKSwge1xyXG4gICAgICAgIC8vICAgICAvLyBZT1VSIFJFU09MVkVTIEdPIEhFUkVcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vICAgKVxyXG4gICAgICAgIC8vIH0pICAgICAgICBcclxuXHJcbiAgICAgICAgJGh0dHBQcm92aWRlci5pbnRlcmNlcHRvcnMucHVzaCgnYXV0aEludGVyY2VwdG9yU2VydmljZScpO1xyXG5cclxuICAgIH0vLyByb3V0ZXNDb25maWdcclxuXHJcbn0pKCk7XHJcblxyXG4iLCIvKio9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIE1vZHVsZTogbmF2YmFyLXNlYXJjaC5qc1xuICogTmF2YmFyIHNlYXJjaCB0b2dnbGVyICogQXV0byBkaXNtaXNzIG9uIEVTQyBrZXlcbiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuXG4oZnVuY3Rpb24oKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgYW5ndWxhclxuICAgICAgICAubW9kdWxlKCdhcHAubmF2c2VhcmNoJylcbiAgICAgICAgLmRpcmVjdGl2ZSgnc2VhcmNoT3BlbicsIHNlYXJjaE9wZW4pXG4gICAgICAgIC5kaXJlY3RpdmUoJ3NlYXJjaERpc21pc3MnLCBzZWFyY2hEaXNtaXNzKTtcblxuICAgIC8vXG4gICAgLy8gZGlyZWN0aXZlcyBkZWZpbml0aW9uXG4gICAgLy8gXG4gICAgXG4gICAgZnVuY3Rpb24gc2VhcmNoT3BlbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSB7XG4gICAgICAgICAgICBjb250cm9sbGVyOiBzZWFyY2hPcGVuQ29udHJvbGxlcixcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnQSdcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNlYXJjaERpc21pc3MgKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0ge1xuICAgICAgICAgICAgY29udHJvbGxlcjogc2VhcmNoRGlzbWlzc0NvbnRyb2xsZXIsXG4gICAgICAgICAgICByZXN0cmljdDogJ0EnXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgICAgIFxuICAgIH1cblxuICAgIC8vXG4gICAgLy8gQ29udHJsbGVyIGRlZmluaXRpb25cbiAgICAvLyBcbiAgICBcbiAgICBzZWFyY2hPcGVuQ29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJGVsZW1lbnQnLCAnTmF2U2VhcmNoJ107XG4gICAgZnVuY3Rpb24gc2VhcmNoT3BlbkNvbnRyb2xsZXIgKCRzY29wZSwgJGVsZW1lbnQsIE5hdlNlYXJjaCkge1xuICAgICAgJGVsZW1lbnRcbiAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7IGUuc3RvcFByb3BhZ2F0aW9uKCk7IH0pXG4gICAgICAgIC5vbignY2xpY2snLCBOYXZTZWFyY2gudG9nZ2xlKTtcbiAgICB9XG5cbiAgICBzZWFyY2hEaXNtaXNzQ29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJGVsZW1lbnQnLCAnTmF2U2VhcmNoJ107XG4gICAgZnVuY3Rpb24gc2VhcmNoRGlzbWlzc0NvbnRyb2xsZXIgKCRzY29wZSwgJGVsZW1lbnQsIE5hdlNlYXJjaCkge1xuICAgICAgXG4gICAgICB2YXIgaW5wdXRTZWxlY3RvciA9ICcubmF2YmFyLWZvcm0gaW5wdXRbdHlwZT1cInRleHRcIl0nO1xuXG4gICAgICAkKGlucHV0U2VsZWN0b3IpXG4gICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkgeyBlLnN0b3BQcm9wYWdhdGlvbigpOyB9KVxuICAgICAgICAub24oJ2tleXVwJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgIGlmIChlLmtleUNvZGUgPT09IDI3KSAvLyBFU0NcbiAgICAgICAgICAgIE5hdlNlYXJjaC5kaXNtaXNzKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgIC8vIGNsaWNrIGFueXdoZXJlIGNsb3NlcyB0aGUgc2VhcmNoXG4gICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCBOYXZTZWFyY2guZGlzbWlzcyk7XG4gICAgICAvLyBkaXNtaXNzYWJsZSBvcHRpb25zXG4gICAgICAkZWxlbWVudFxuICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHsgZS5zdG9wUHJvcGFnYXRpb24oKTsgfSlcbiAgICAgICAgLm9uKCdjbGljaycsIE5hdlNlYXJjaC5kaXNtaXNzKTtcbiAgICB9XG5cbn0pKCk7XG5cbiIsIi8qKj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogTW9kdWxlOiBuYXYtc2VhcmNoLmpzXG4gKiBTZXJ2aWNlcyB0byBzaGFyZSBuYXZiYXIgc2VhcmNoIGZ1bmN0aW9uc1xuID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG4gXG4oZnVuY3Rpb24oKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgYW5ndWxhclxuICAgICAgICAubW9kdWxlKCdhcHAubmF2c2VhcmNoJylcbiAgICAgICAgLnNlcnZpY2UoJ05hdlNlYXJjaCcsIE5hdlNlYXJjaCk7XG5cbiAgICBmdW5jdGlvbiBOYXZTZWFyY2goKSB7XG4gICAgICAgIHRoaXMudG9nZ2xlID0gdG9nZ2xlO1xuICAgICAgICB0aGlzLmRpc21pc3MgPSBkaXNtaXNzO1xuXG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy9cblxuICAgICAgICB2YXIgbmF2YmFyRm9ybVNlbGVjdG9yID0gJ2Zvcm0ubmF2YmFyLWZvcm0nO1xuXG4gICAgICAgIGZ1bmN0aW9uIHRvZ2dsZSgpIHtcbiAgICAgICAgICB2YXIgbmF2YmFyRm9ybSA9ICQobmF2YmFyRm9ybVNlbGVjdG9yKTtcblxuICAgICAgICAgIG5hdmJhckZvcm0udG9nZ2xlQ2xhc3MoJ29wZW4nKTtcbiAgICAgICAgICBcbiAgICAgICAgICB2YXIgaXNPcGVuID0gbmF2YmFyRm9ybS5oYXNDbGFzcygnb3BlbicpO1xuICAgICAgICAgIFxuICAgICAgICAgIG5hdmJhckZvcm0uZmluZCgnaW5wdXQnKVtpc09wZW4gPyAnZm9jdXMnIDogJ2JsdXInXSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gZGlzbWlzcygpIHtcbiAgICAgICAgICAkKG5hdmJhckZvcm1TZWxlY3RvcilcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnb3BlbicpIC8vIENsb3NlIGNvbnRyb2xcbiAgICAgICAgICAgIC5maW5kKCdpbnB1dFt0eXBlPVwidGV4dFwiXScpLmJsdXIoKSAvLyByZW1vdmUgZm9jdXNcbiAgICAgICAgICAgIC52YWwoJycpIC8vIEVtcHR5IGlucHV0XG4gICAgICAgICAgICA7XG4gICAgICAgIH0gICAgICAgIFxuICAgIH1cbn0pKCk7XG4iLCIvKio9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICogTW9kdWxlOiBzaWRlYmFyLW1lbnUuanNcclxuICogSGFuZGxlIHNpZGViYXIgY29sbGFwc2libGUgZWxlbWVudHNcclxuID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSovXHJcblxyXG4oZnVuY3Rpb24oKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2FwcC5zaWRlYmFyJylcclxuICAgICAgICAuY29udHJvbGxlcignU2lkZWJhckNvbnRyb2xsZXInLCBTaWRlYmFyQ29udHJvbGxlcik7XHJcblxyXG4gICAgU2lkZWJhckNvbnRyb2xsZXIuJGluamVjdCA9IFsnJHJvb3RTY29wZScsICckc2NvcGUnLCAnJHN0YXRlJywgJ1NpZGViYXJMb2FkZXInLCAnVXRpbHMnXTtcclxuICAgIGZ1bmN0aW9uIFNpZGViYXJDb250cm9sbGVyKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCBTaWRlYmFyTG9hZGVyLCAgVXRpbHMpIHtcclxuXHJcbiAgICAgICAgYWN0aXZhdGUoKTtcclxuXHJcbiAgICAgICAgLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICAgICAgICB2YXIgZXZlbnRvU2VsZWNpb25hZG8gPSB7fTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gYWN0aXZhdGUoKSB7XHJcbiAgICAgICAgICB2YXIgY29sbGFwc2VMaXN0ID0gW107XHJcblxyXG4gICAgICAgICAgLy8gZGVtbzogd2hlbiBzd2l0Y2ggZnJvbSBjb2xsYXBzZSB0byBob3ZlciwgY2xvc2UgYWxsIGl0ZW1zXHJcbiAgICAgICAgICAkcm9vdFNjb3BlLiR3YXRjaCgnYXBwLmxheW91dC5hc2lkZUhvdmVyJywgZnVuY3Rpb24ob2xkVmFsLCBuZXdWYWwpe1xyXG4gICAgICAgICAgICBpZiAoIG5ld1ZhbCA9PT0gZmFsc2UgJiYgb2xkVmFsID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgY2xvc2VBbGxCdXQoLTEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgLy8gTG9hZCBtZW51IGZyb20ganNvbiBmaWxlXHJcbiAgICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBcclxuXHJcbiAgICAgICAgICBTaWRlYmFyTG9hZGVyLmdldE1lbnUoc2lkZWJhclJlYWR5KTtcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgZnVuY3Rpb24gc2lkZWJhclJlYWR5KGl0ZW1zKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5tZW51SXRlbXMgPSBpdGVtcztcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAkcm9vdFNjb3BlLiRvbignY2xpY2tFdmVudG8nLCBmdW5jdGlvbiAoZSwgZGF0YSkge1xyXG4gICAgICAgICAgICAgIGlmIChldmVudG9TZWxlY2lvbmFkbyAhPSBkYXRhLmV2ZW50bykge1xyXG4gICAgICAgICAgICAgICAgICB2YXIgaGVhZGVyRXZlbnRvID0gJHNjb3BlLm1lbnVJdGVtc1swXTtcclxuICAgICAgICAgICAgICAgICAgdmFyIG9wY2FvTGlzdGEgPSAkc2NvcGUubWVudUl0ZW1zWzFdO1xyXG4gICAgICAgICAgICAgICAgICB2YXIgb3BjYW9Qb3J0YXJpYSA9ICRzY29wZS5tZW51SXRlbXNbMl07XHJcbiAgICAgICAgICAgICAgICAgIHZhciBoZWFkZXJQcm9tb3RlciA9ICRzY29wZS5tZW51SXRlbXNbM107XHJcbiAgICAgICAgICAgICAgICAgIHZhciBhZGROb21lcyA9ICRzY29wZS5tZW51SXRlbXNbNF07XHJcbiAgICAgICAgICAgICAgICAgIHZhciBkaXN0Q29taXNzID0gJHNjb3BlLm1lbnVJdGVtc1s1XTtcclxuXHJcbiAgICAgICAgICAgICAgICAgIGhlYWRlckV2ZW50by50ZXh0ID0gXCJFdmVudG8gXCIgKyBkYXRhLmV2ZW50by50aXRsZTtcclxuICAgICAgICAgICAgICAgICAgaGVhZGVyRXZlbnRvLm9jdWx0byA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgb3BjYW9MaXN0YS5vY3VsdG8gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgb3BjYW9MaXN0YS5zcmVmID0gXCJhcHAubGlzdGFzXCI7XHJcbiAgICAgICAgICAgICAgICAgIG9wY2FvTGlzdGEucGFyYW1zID0geyBpZDogZGF0YS5ldmVudG8uaWQgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgIG9wY2FvUG9ydGFyaWEub2N1bHRvID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgIG9wY2FvUG9ydGFyaWEuc3JlZiA9IFwiYXBwLnBvcnRhcmlhbGlzdGFzXCJcclxuICAgICAgICAgICAgICAgICAgb3BjYW9Qb3J0YXJpYS5wYXJhbXMgPSB7IGlkOiBkYXRhLmV2ZW50by5pZCB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgaGVhZGVyUHJvbW90ZXIub2N1bHRvID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgICBhZGROb21lcy5vY3VsdG8gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgYWRkTm9tZXMuc3JlZiA9IFwiYXBwLmFkZG5vbWVsaXN0YXNcIjtcclxuICAgICAgICAgICAgICAgICAgYWRkTm9tZXMucGFyYW1zID0geyBldmVudG9JZDogZGF0YS5ldmVudG8uaWQgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgIGRpc3RDb21pc3Mub2N1bHRvID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgIGRpc3RDb21pc3Muc3JlZiA9IFwiYXBwLmNvbWlzc2FyaW9kaXN0cmlidWlyXCJcclxuICAgICAgICAgICAgICAgICAgYWRkTm9tZXMucGFyYW1zID0geyBldmVudG9JZCA6IGRhdGEuZXZlbnRvLmlkIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgIGV2ZW50b1NlbGVjaW9uYWRvID0gZGF0YS5ldmVudG87XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgLy8gSGFuZGxlIHNpZGViYXIgYW5kIGNvbGxhcHNlIGl0ZW1zXHJcbiAgICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgICBcclxuICAgICAgICAgICRzY29wZS5nZXRNZW51SXRlbVByb3BDbGFzc2VzID0gZnVuY3Rpb24oaXRlbSkge1xyXG4gICAgICAgICAgICByZXR1cm4gKGl0ZW0uaGVhZGluZyA/ICduYXYtaGVhZGluZycgOiAnJykgK1xyXG4gICAgICAgICAgICAgICAgICAgKGlzQWN0aXZlKGl0ZW0pID8gJyBhY3RpdmUnIDogJycpIDtcclxuICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgJHNjb3BlLmFkZENvbGxhcHNlID0gZnVuY3Rpb24oJGluZGV4LCBpdGVtKSB7XHJcbiAgICAgICAgICAgIGNvbGxhcHNlTGlzdFskaW5kZXhdID0gJHJvb3RTY29wZS5hcHAubGF5b3V0LmFzaWRlSG92ZXIgPyB0cnVlIDogIWlzQWN0aXZlKGl0ZW0pO1xyXG4gICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAkc2NvcGUuaXNDb2xsYXBzZSA9IGZ1bmN0aW9uKCRpbmRleCkge1xyXG4gICAgICAgICAgICByZXR1cm4gKGNvbGxhcHNlTGlzdFskaW5kZXhdKTtcclxuICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgJHNjb3BlLnRvZ2dsZUNvbGxhcHNlID0gZnVuY3Rpb24oJGluZGV4LCBpc1BhcmVudEl0ZW0pIHtcclxuXHJcbiAgICAgICAgICAgIC8vIGNvbGxhcHNlZCBzaWRlYmFyIGRvZXNuJ3QgdG9nZ2xlIGRyb2RvcHduXHJcbiAgICAgICAgICAgIGlmKCBVdGlscy5pc1NpZGViYXJDb2xsYXBzZWQoKSB8fCAkcm9vdFNjb3BlLmFwcC5sYXlvdXQuYXNpZGVIb3ZlciApIHJldHVybiB0cnVlO1xyXG5cclxuICAgICAgICAgICAgLy8gbWFrZSBzdXJlIHRoZSBpdGVtIGluZGV4IGV4aXN0c1xyXG4gICAgICAgICAgICBpZiggYW5ndWxhci5pc0RlZmluZWQoIGNvbGxhcHNlTGlzdFskaW5kZXhdICkgKSB7XHJcbiAgICAgICAgICAgICAgaWYgKCAhICRzY29wZS5sYXN0RXZlbnRGcm9tQ2hpbGQgKSB7XHJcbiAgICAgICAgICAgICAgICBjb2xsYXBzZUxpc3RbJGluZGV4XSA9ICFjb2xsYXBzZUxpc3RbJGluZGV4XTtcclxuICAgICAgICAgICAgICAgIGNsb3NlQWxsQnV0KCRpbmRleCk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKCBpc1BhcmVudEl0ZW0gKSB7XHJcbiAgICAgICAgICAgICAgY2xvc2VBbGxCdXQoLTEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAkc2NvcGUubGFzdEV2ZW50RnJvbUNoaWxkID0gaXNDaGlsZCgkaW5kZXgpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgLy8gQ29udHJvbGxlciBoZWxwZXJzXHJcbiAgICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBcclxuXHJcbiAgICAgICAgICAgIC8vIENoZWNrIGl0ZW0gYW5kIGNoaWxkcmVuIGFjdGl2ZSBzdGF0ZVxyXG4gICAgICAgICAgICBmdW5jdGlvbiBpc0FjdGl2ZShpdGVtKSB7XHJcblxyXG4gICAgICAgICAgICAgIGlmKCFpdGVtKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgIGlmKCAhaXRlbS5zcmVmIHx8IGl0ZW0uc3JlZiA9PT0gJyMnKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZm91bmRBY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChpdGVtLnN1Ym1lbnUsIGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgIGlmKGlzQWN0aXZlKHZhbHVlKSkgZm91bmRBY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZm91bmRBY3RpdmU7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHJldHVybiAkc3RhdGUuaXMoaXRlbS5zcmVmKSB8fCAkc3RhdGUuaW5jbHVkZXMoaXRlbS5zcmVmKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gY2xvc2VBbGxCdXQoaW5kZXgpIHtcclxuICAgICAgICAgICAgICBpbmRleCArPSAnJztcclxuICAgICAgICAgICAgICBmb3IodmFyIGkgaW4gY29sbGFwc2VMaXN0KSB7XHJcbiAgICAgICAgICAgICAgICBpZihpbmRleCA8IDAgfHwgaW5kZXguaW5kZXhPZihpKSA8IDApXHJcbiAgICAgICAgICAgICAgICAgIGNvbGxhcHNlTGlzdFtpXSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBpc0NoaWxkKCRpbmRleCkge1xyXG4gICAgICAgICAgICAgIC8qanNoaW50IC1XMDE4Ki9cclxuICAgICAgICAgICAgICByZXR1cm4gKHR5cGVvZiAkaW5kZXggPT09ICdzdHJpbmcnKSAmJiAhKCRpbmRleC5pbmRleE9mKCctJykgPCAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIH0gLy8gYWN0aXZhdGVcclxuICAgIH1cclxuXHJcbn0pKCk7XHJcbiIsIi8qKj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gKiBNb2R1bGU6IHNpZGViYXIuanNcclxuICogV3JhcHMgdGhlIHNpZGViYXIgYW5kIGhhbmRsZXMgY29sbGFwc2VkIHN0YXRlXHJcbiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xyXG5cclxuKGZ1bmN0aW9uKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdhcHAuc2lkZWJhcicpXHJcbiAgICAgICAgLmRpcmVjdGl2ZSgnc2lkZWJhcicsIHNpZGViYXIpO1xyXG5cclxuICAgIHNpZGViYXIuJGluamVjdCA9IFsnJHJvb3RTY29wZScsICckdGltZW91dCcsICckd2luZG93JywgJ1V0aWxzJ107XHJcbiAgICBmdW5jdGlvbiBzaWRlYmFyICgkcm9vdFNjb3BlLCAkdGltZW91dCwgJHdpbmRvdywgVXRpbHMpIHtcclxuICAgICAgICB2YXIgJHdpbiA9IGFuZ3VsYXIuZWxlbWVudCgkd2luZG93KTtcclxuICAgICAgICB2YXIgZGlyZWN0aXZlID0ge1xyXG4gICAgICAgICAgICAvLyBiaW5kVG9Db250cm9sbGVyOiB0cnVlLFxyXG4gICAgICAgICAgICAvLyBjb250cm9sbGVyOiBDb250cm9sbGVyLFxyXG4gICAgICAgICAgICAvLyBjb250cm9sbGVyQXM6ICd2bScsXHJcbiAgICAgICAgICAgIGxpbms6IGxpbmssXHJcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRUEnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJzxuYXYgY2xhc3M9XCJzaWRlYmFyXCIgbmctdHJhbnNjbHVkZT48L25hdj4nLFxyXG4gICAgICAgICAgICB0cmFuc2NsdWRlOiB0cnVlLFxyXG4gICAgICAgICAgICByZXBsYWNlOiB0cnVlXHJcbiAgICAgICAgICAgIC8vIHNjb3BlOiB7fVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gbGluayhzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcclxuXHJcbiAgICAgICAgICB2YXIgY3VycmVudFN0YXRlID0gJHJvb3RTY29wZS4kc3RhdGUuY3VycmVudC5uYW1lO1xyXG4gICAgICAgICAgdmFyICRzaWRlYmFyID0gZWxlbWVudDtcclxuXHJcbiAgICAgICAgICB2YXIgZXZlbnROYW1lID0gVXRpbHMuaXNUb3VjaCgpID8gJ2NsaWNrJyA6ICdtb3VzZWVudGVyJyA7XHJcbiAgICAgICAgICB2YXIgc3ViTmF2ID0gJCgpO1xyXG5cclxuICAgICAgICAgICRzaWRlYmFyLm9uKCBldmVudE5hbWUsICcubmF2ID4gbGknLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGlmKCBVdGlscy5pc1NpZGViYXJDb2xsYXBzZWQoKSB8fCAkcm9vdFNjb3BlLmFwcC5sYXlvdXQuYXNpZGVIb3ZlciApIHtcclxuXHJcbiAgICAgICAgICAgICAgc3ViTmF2LnRyaWdnZXIoJ21vdXNlbGVhdmUnKTtcclxuICAgICAgICAgICAgICBzdWJOYXYgPSB0b2dnbGVNZW51SXRlbSggJCh0aGlzKSwgJHNpZGViYXIpO1xyXG5cclxuICAgICAgICAgICAgICAvLyBVc2VkIHRvIGRldGVjdCBjbGljayBhbmQgdG91Y2ggZXZlbnRzIG91dHNpZGUgdGhlIHNpZGViYXIgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgc2lkZWJhckFkZEJhY2tkcm9wKCk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgc2NvcGUuJG9uKCdjbG9zZVNpZGViYXJNZW51JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJlbW92ZUZsb2F0aW5nTmF2KCk7XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAvLyBOb3JtYWxpemUgc3RhdGUgd2hlbiByZXNpemUgdG8gbW9iaWxlXHJcbiAgICAgICAgICAkd2luLm9uKCdyZXNpemUnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYoICEgVXRpbHMuaXNNb2JpbGUoKSApXHJcbiAgICAgICAgICBcdGFzaWRlVG9nZ2xlT2ZmKCk7XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAvLyBBZGp1c3RtZW50IG9uIHJvdXRlIGNoYW5nZXNcclxuICAgICAgICAgICRyb290U2NvcGUuJG9uKCckc3RhdGVDaGFuZ2VTdGFydCcsIGZ1bmN0aW9uKGV2ZW50LCB0b1N0YXRlKSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRTdGF0ZSA9IHRvU3RhdGUubmFtZTtcclxuICAgICAgICAgICAgLy8gSGlkZSBzaWRlYmFyIGF1dG9tYXRpY2FsbHkgb24gbW9iaWxlXHJcbiAgICAgICAgICAgIGFzaWRlVG9nZ2xlT2ZmKCk7XHJcblxyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ2Nsb3NlU2lkZWJhck1lbnUnKTtcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgXHQgIC8vIEF1dG9jbG9zZSB3aGVuIGNsaWNrIG91dHNpZGUgdGhlIHNpZGViYXJcclxuICAgICAgICAgIGlmICggYW5ndWxhci5pc0RlZmluZWQoYXR0cnMuc2lkZWJhckFueWNsaWNrQ2xvc2UpICkge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIHdyYXBwZXIgPSAkKCcud3JhcHBlcicpO1xyXG4gICAgICAgICAgICB2YXIgc2JjbGlja0V2ZW50ID0gJ2NsaWNrLnNpZGViYXInO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kd2F0Y2goJ2FwcC5hc2lkZVRvZ2dsZWQnLCB3YXRjaEV4dGVybmFsQ2xpY2tzKTtcclxuXHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8vLy8vXHJcblxyXG4gICAgICAgICAgZnVuY3Rpb24gd2F0Y2hFeHRlcm5hbENsaWNrcyhuZXdWYWwpIHtcclxuICAgICAgICAgICAgLy8gaWYgc2lkZWJhciBiZWNvbWVzIHZpc2libGVcclxuICAgICAgICAgICAgaWYgKCBuZXdWYWwgPT09IHRydWUgKSB7XHJcbiAgICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKXsgLy8gcmVuZGVyIGFmdGVyIGN1cnJlbnQgZGlnZXN0IGN5Y2xlXHJcbiAgICAgICAgICAgICAgICB3cmFwcGVyLm9uKHNiY2xpY2tFdmVudCwgZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgICAgIC8vIGlmIG5vdCBjaGlsZCBvZiBzaWRlYmFyXHJcbiAgICAgICAgICAgICAgICAgIGlmKCAhICQoZS50YXJnZXQpLnBhcmVudHMoJy5hc2lkZScpLmxlbmd0aCApIHtcclxuICAgICAgICAgICAgICAgICAgICBhc2lkZVRvZ2dsZU9mZigpO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAvLyBkZXR0YWNoIGV2ZW50XHJcbiAgICAgICAgICAgICAgd3JhcHBlci5vZmYoc2JjbGlja0V2ZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGZ1bmN0aW9uIGFzaWRlVG9nZ2xlT2ZmKCkge1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLmFwcC5hc2lkZVRvZ2dsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYoIXNjb3BlLiQkcGhhc2UpIHNjb3BlLiRhcHBseSgpOyAvLyBhbnRpLXBhdHRlcm4gYnV0IHNvbWV0aW1lcyBuZWNlc3NhcnlcclxuICAgICAgXHQgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8vLy8vL1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBzaWRlYmFyQWRkQmFja2Ryb3AoKSB7XHJcbiAgICAgICAgICB2YXIgJGJhY2tkcm9wID0gJCgnPGRpdi8+JywgeyAnY2xhc3MnOiAnZHJvcGRvd24tYmFja2Ryb3AnfSApO1xyXG4gICAgICAgICAgJGJhY2tkcm9wLmluc2VydEFmdGVyKCcuYXNpZGUtaW5uZXInKS5vbignY2xpY2sgbW91c2VlbnRlcicsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmVtb3ZlRmxvYXRpbmdOYXYoKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gT3BlbiB0aGUgY29sbGFwc2Ugc2lkZWJhciBzdWJtZW51IGl0ZW1zIHdoZW4gb24gdG91Y2ggZGV2aWNlcyBcclxuICAgICAgICAvLyAtIGRlc2t0b3Agb25seSBvcGVucyBvbiBob3ZlclxyXG4gICAgICAgIGZ1bmN0aW9uIHRvZ2dsZVRvdWNoSXRlbSgkZWxlbWVudCl7XHJcbiAgICAgICAgICAkZWxlbWVudFxyXG4gICAgICAgICAgICAuc2libGluZ3MoJ2xpJylcclxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdvcGVuJylcclxuICAgICAgICAgICAgLmVuZCgpXHJcbiAgICAgICAgICAgIC50b2dnbGVDbGFzcygnb3BlbicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gSGFuZGxlcyBob3ZlciB0byBvcGVuIGl0ZW1zIHVuZGVyIGNvbGxhcHNlZCBtZW51XHJcbiAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gXHJcbiAgICAgICAgZnVuY3Rpb24gdG9nZ2xlTWVudUl0ZW0oJGxpc3RJdGVtLCAkc2lkZWJhcikge1xyXG5cclxuICAgICAgICAgIHJlbW92ZUZsb2F0aW5nTmF2KCk7XHJcblxyXG4gICAgICAgICAgdmFyIHVsID0gJGxpc3RJdGVtLmNoaWxkcmVuKCd1bCcpO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICBpZiggIXVsLmxlbmd0aCApIHJldHVybiAkKCk7XHJcbiAgICAgICAgICBpZiggJGxpc3RJdGVtLmhhc0NsYXNzKCdvcGVuJykgKSB7XHJcbiAgICAgICAgICAgIHRvZ2dsZVRvdWNoSXRlbSgkbGlzdEl0ZW0pO1xyXG4gICAgICAgICAgICByZXR1cm4gJCgpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHZhciAkYXNpZGUgPSAkKCcuYXNpZGUnKTtcclxuICAgICAgICAgIHZhciAkYXNpZGVJbm5lciA9ICQoJy5hc2lkZS1pbm5lcicpOyAvLyBmb3IgdG9wIG9mZnNldCBjYWxjdWxhdGlvblxyXG4gICAgICAgICAgLy8gZmxvYXQgYXNpZGUgdXNlcyBleHRyYSBwYWRkaW5nIG9uIGFzaWRlXHJcbiAgICAgICAgICB2YXIgbWFyID0gcGFyc2VJbnQoICRhc2lkZUlubmVyLmNzcygncGFkZGluZy10b3AnKSwgMCkgKyBwYXJzZUludCggJGFzaWRlLmNzcygncGFkZGluZy10b3AnKSwgMCk7XHJcbiAgICAgICAgICB2YXIgc3ViTmF2ID0gdWwuY2xvbmUoKS5hcHBlbmRUbyggJGFzaWRlICk7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIHRvZ2dsZVRvdWNoSXRlbSgkbGlzdEl0ZW0pO1xyXG5cclxuICAgICAgICAgIHZhciBpdGVtVG9wID0gKCRsaXN0SXRlbS5wb3NpdGlvbigpLnRvcCArIG1hcikgLSAkc2lkZWJhci5zY3JvbGxUb3AoKTtcclxuICAgICAgICAgIHZhciB2d0hlaWdodCA9ICR3aW4uaGVpZ2h0KCk7XHJcblxyXG4gICAgICAgICAgc3ViTmF2XHJcbiAgICAgICAgICAgIC5hZGRDbGFzcygnbmF2LWZsb2F0aW5nJylcclxuICAgICAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgICAgcG9zaXRpb246ICRyb290U2NvcGUuYXBwLmxheW91dC5pc0ZpeGVkID8gJ2ZpeGVkJyA6ICdhYnNvbHV0ZScsXHJcbiAgICAgICAgICAgICAgdG9wOiAgICAgIGl0ZW1Ub3AsXHJcbiAgICAgICAgICAgICAgYm90dG9tOiAgIChzdWJOYXYub3V0ZXJIZWlnaHQodHJ1ZSkgKyBpdGVtVG9wID4gdndIZWlnaHQpID8gMCA6ICdhdXRvJ1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICBzdWJOYXYub24oJ21vdXNlbGVhdmUnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdG9nZ2xlVG91Y2hJdGVtKCRsaXN0SXRlbSk7XHJcbiAgICAgICAgICAgIHN1Yk5hdi5yZW1vdmUoKTtcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgIHJldHVybiBzdWJOYXY7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiByZW1vdmVGbG9hdGluZ05hdigpIHtcclxuICAgICAgICAgICQoJy5kcm9wZG93bi1iYWNrZHJvcCcpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgJCgnLnNpZGViYXItc3VibmF2Lm5hdi1mbG9hdGluZycpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgJCgnLnNpZGViYXIgbGkub3BlbicpLnJlbW92ZUNsYXNzKCdvcGVuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbn0pKCk7XHJcblxyXG4iLCIoZnVuY3Rpb24oKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2FwcC5zaWRlYmFyJylcclxuICAgICAgICAuc2VydmljZSgnU2lkZWJhckxvYWRlcicsIFNpZGViYXJMb2FkZXIpO1xyXG5cclxuICAgIFNpZGViYXJMb2FkZXIuJGluamVjdCA9IFsnJGh0dHAnXTtcclxuICAgIGZ1bmN0aW9uIFNpZGViYXJMb2FkZXIoJGh0dHApIHtcclxuICAgICAgICB0aGlzLmdldE1lbnUgPSBnZXRNZW51O1xyXG5cclxuICAgICAgICAvLy8vLy8vLy8vLy8vLy8vXHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGdldE1lbnUob25SZWFkeSwgb25FcnJvcikge1xyXG4gICAgICAgICAgdmFyIG1lbnVKc29uID0gJ3NlcnZlci9zaWRlYmFyLW1lbnUuanNvbicsXHJcbiAgICAgICAgICAgICAgbWVudVVSTCAgPSBtZW51SnNvbiArICc/dj0nICsgKG5ldyBEYXRlKCkuZ2V0VGltZSgpKTsgLy8ganVtcHMgY2FjaGVcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICBvbkVycm9yID0gb25FcnJvciB8fCBmdW5jdGlvbigpIHsgYWxlcnQoJ0ZhaWx1cmUgbG9hZGluZyBtZW51Jyk7IH07XHJcblxyXG4gICAgICAgICAgJGh0dHBcclxuICAgICAgICAgICAgLmdldChtZW51VVJMKVxyXG4gICAgICAgICAgICAuc3VjY2VzcyhvblJlYWR5KVxyXG4gICAgICAgICAgICAuZXJyb3Iob25FcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KSgpOyIsIihmdW5jdGlvbigpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoJ2FwcC5zaWRlYmFyJylcbiAgICAgICAgLmNvbnRyb2xsZXIoJ1VzZXJCbG9ja0NvbnRyb2xsZXInLCBVc2VyQmxvY2tDb250cm9sbGVyKTtcblxuICAgIFVzZXJCbG9ja0NvbnRyb2xsZXIuJGluamVjdCA9IFsnJHJvb3RTY29wZScsICckc2NvcGUnLCAnVXNlclNlcnZpY2UnXTtcbiAgICBmdW5jdGlvbiBVc2VyQmxvY2tDb250cm9sbGVyKCRyb290U2NvcGUsICRzY29wZSwgVXNlclNlcnZpY2UpIHtcblxuICAgICAgICBhY3RpdmF0ZSgpO1xuXG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy9cblxuICAgICAgICBmdW5jdGlvbiBhY3RpdmF0ZSgpIHtcbiAgICAgICAgICAgIFxuXG4gICAgICAgICAgLy8gSGlkZXMvc2hvdyB1c2VyIGF2YXRhciBvbiBzaWRlYmFyXG4gICAgICAgICAgJHJvb3RTY29wZS50b2dnbGVVc2VyQmxvY2sgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCd0b2dnbGVVc2VyQmxvY2snKTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgJHJvb3RTY29wZS51c2VyQmxvY2tWaXNpYmxlID0gdHJ1ZTtcblxuICAgICAgICAgIHZhciBkZXRhY2ggPSAkcm9vdFNjb3BlLiRvbigndG9nZ2xlVXNlckJsb2NrJywgZnVuY3Rpb24oLypldmVudCwgYXJncyovKSB7XG5cbiAgICAgICAgICAgICRyb290U2NvcGUudXNlckJsb2NrVmlzaWJsZSA9ICEgJHJvb3RTY29wZS51c2VyQmxvY2tWaXNpYmxlO1xuXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAkc2NvcGUuJG9uKCckZGVzdHJveScsIGRldGFjaCk7XG4gICAgICAgIH1cbiAgICB9XG59KSgpO1xuIiwiLyoqPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBNb2R1bGU6IGFuaW1hdGUtZW5hYmxlZC5qc1xuICogRW5hYmxlIG9yIGRpc2FibGVzIG5nQW5pbWF0ZSBmb3IgZWxlbWVudCB3aXRoIGRpcmVjdGl2ZVxuID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG5cbihmdW5jdGlvbigpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoJ2FwcC51dGlscycpXG4gICAgICAgIC5kaXJlY3RpdmUoJ2FuaW1hdGVFbmFibGVkJywgYW5pbWF0ZUVuYWJsZWQpO1xuXG4gICAgYW5pbWF0ZUVuYWJsZWQuJGluamVjdCA9IFsnJGFuaW1hdGUnXTtcbiAgICBmdW5jdGlvbiBhbmltYXRlRW5hYmxlZCAoJGFuaW1hdGUpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IHtcbiAgICAgICAgICAgIGxpbms6IGxpbmssXG4gICAgICAgICAgICByZXN0cmljdDogJ0EnXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG5cbiAgICAgICAgZnVuY3Rpb24gbGluayhzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICBzY29wZS4kd2F0Y2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHNjb3BlLiRldmFsKGF0dHJzLmFuaW1hdGVFbmFibGVkLCBzY29wZSk7XG4gICAgICAgICAgfSwgZnVuY3Rpb24gKG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICAkYW5pbWF0ZS5lbmFibGVkKCEhbmV3VmFsdWUsIGVsZW1lbnQpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG59KSgpO1xuIiwiLyoqPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAqIE1vZHVsZTogYnJvd3Nlci5qc1xyXG4gKiBCcm93c2VyIGRldGVjdGlvblxyXG4gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cclxuXHJcbihmdW5jdGlvbigpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnYXBwLnV0aWxzJylcclxuICAgICAgICAuc2VydmljZSgnQnJvd3NlcicsIEJyb3dzZXIpO1xyXG5cclxuICAgIEJyb3dzZXIuJGluamVjdCA9IFsnJHdpbmRvdyddO1xyXG4gICAgZnVuY3Rpb24gQnJvd3Nlcigkd2luZG93KSB7XHJcbiAgICAgIHJldHVybiAkd2luZG93LmpRQnJvd3NlcjtcclxuICAgIH1cclxuXHJcbn0pKCk7XHJcbiIsIi8qKj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogTW9kdWxlOiBjbGVhci1zdG9yYWdlLmpzXG4gKiBSZW1vdmVzIGEga2V5IGZyb20gdGhlIGJyb3dzZXIgc3RvcmFnZSB2aWEgZWxlbWVudCBjbGlja1xuID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG5cbihmdW5jdGlvbigpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoJ2FwcC51dGlscycpXG4gICAgICAgIC5kaXJlY3RpdmUoJ3Jlc2V0S2V5JywgcmVzZXRLZXkpO1xuXG4gICAgcmVzZXRLZXkuJGluamVjdCA9IFsnJHN0YXRlJywgJyRsb2NhbFN0b3JhZ2UnXTtcbiAgICBmdW5jdGlvbiByZXNldEtleSAoJHN0YXRlLCAkbG9jYWxTdG9yYWdlKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSB7XG4gICAgICAgICAgICBsaW5rOiBsaW5rLFxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdBJyxcbiAgICAgICAgICAgIHNjb3BlOiB7XG4gICAgICAgICAgICAgIHJlc2V0S2V5OiAnQCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcblxuICAgICAgICBmdW5jdGlvbiBsaW5rKHNjb3BlLCBlbGVtZW50KSB7XG4gICAgICAgICAgZWxlbWVudC5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgaWYoc2NvcGUucmVzZXRLZXkpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgJGxvY2FsU3RvcmFnZVtzY29wZS5yZXNldEtleV07XG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKCRzdGF0ZS5jdXJyZW50LCB7fSwge3JlbG9hZDogdHJ1ZX0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICQuZXJyb3IoJ05vIHN0b3JhZ2Uga2V5IHNwZWNpZmllZCBmb3IgcmVzZXQuJyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxufSkoKTtcbiIsIi8qKj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogTW9kdWxlOiBmdWxsc2NyZWVuLmpzXG4gKiBUb2dnbGUgdGhlIGZ1bGxzY3JlZW4gbW9kZSBvbi9vZmZcbiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuXG4oZnVuY3Rpb24oKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgYW5ndWxhclxuICAgICAgICAubW9kdWxlKCdhcHAudXRpbHMnKVxuICAgICAgICAuZGlyZWN0aXZlKCd0b2dnbGVGdWxsc2NyZWVuJywgdG9nZ2xlRnVsbHNjcmVlbik7XG5cbiAgICB0b2dnbGVGdWxsc2NyZWVuLiRpbmplY3QgPSBbJ0Jyb3dzZXInXTtcbiAgICBmdW5jdGlvbiB0b2dnbGVGdWxsc2NyZWVuIChCcm93c2VyKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSB7XG4gICAgICAgICAgICBsaW5rOiBsaW5rLFxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdBJ1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuXG4gICAgICAgIGZ1bmN0aW9uIGxpbmsoc2NvcGUsIGVsZW1lbnQpIHtcbiAgICAgICAgICAvLyBOb3Qgc3VwcG9ydGVkIHVuZGVyIElFXG4gICAgICAgICAgaWYoIEJyb3dzZXIubXNpZSApIHtcbiAgICAgICAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoJ2hpZGUnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBlbGVtZW50Lm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHNjcmVlbmZ1bGwuZW5hYmxlZCkge1xuICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICBzY3JlZW5mdWxsLnRvZ2dsZSgpO1xuICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAvLyBTd2l0Y2ggaWNvbiBpbmRpY2F0b3JcbiAgICAgICAgICAgICAgICAgIGlmKHNjcmVlbmZ1bGwuaXNGdWxsc2NyZWVuKVxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmNoaWxkcmVuKCdlbScpLnJlbW92ZUNsYXNzKCdmYS1leHBhbmQnKS5hZGRDbGFzcygnZmEtY29tcHJlc3MnKTtcbiAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5jaGlsZHJlbignZW0nKS5yZW1vdmVDbGFzcygnZmEtY29tcHJlc3MnKS5hZGRDbGFzcygnZmEtZXhwYW5kJyk7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgJC5lcnJvcignRnVsbHNjcmVlbiBub3QgZW5hYmxlZCcpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG5cbn0pKCk7XG4iLCIvKio9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIE1vZHVsZTogbG9hZC1jc3MuanNcbiAqIFJlcXVlc3QgYW5kIGxvYWQgaW50byB0aGUgY3VycmVudCBwYWdlIGEgY3NzIGZpbGVcbiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuXG4oZnVuY3Rpb24oKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgYW5ndWxhclxuICAgICAgICAubW9kdWxlKCdhcHAudXRpbHMnKVxuICAgICAgICAuZGlyZWN0aXZlKCdsb2FkQ3NzJywgbG9hZENzcyk7XG5cbiAgICBmdW5jdGlvbiBsb2FkQ3NzICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IHtcbiAgICAgICAgICAgIGxpbms6IGxpbmssXG4gICAgICAgICAgICByZXN0cmljdDogJ0EnXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG5cbiAgICAgICAgZnVuY3Rpb24gbGluayhzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICBlbGVtZW50Lm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgIGlmKGVsZW1lbnQuaXMoJ2EnKSkgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICB2YXIgdXJpID0gYXR0cnMubG9hZENzcyxcbiAgICAgICAgICAgICAgICAgIGxpbms7XG5cbiAgICAgICAgICAgICAgaWYodXJpKSB7XG4gICAgICAgICAgICAgICAgbGluayA9IGNyZWF0ZUxpbmsodXJpKTtcbiAgICAgICAgICAgICAgICBpZiAoICFsaW5rICkge1xuICAgICAgICAgICAgICAgICAgJC5lcnJvcignRXJyb3IgY3JlYXRpbmcgc3R5bGVzaGVldCBsaW5rIGVsZW1lbnQuJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICQuZXJyb3IoJ05vIHN0eWxlc2hlZXQgbG9jYXRpb24gZGVmaW5lZC4nKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGZ1bmN0aW9uIGNyZWF0ZUxpbmsodXJpKSB7XG4gICAgICAgICAgdmFyIGxpbmtJZCA9ICdhdXRvbG9hZGVkLXN0eWxlc2hlZXQnLFxuICAgICAgICAgICAgICBvbGRMaW5rID0gJCgnIycrbGlua0lkKS5hdHRyKCdpZCcsIGxpbmtJZCArICctb2xkJyk7XG5cbiAgICAgICAgICAkKCdoZWFkJykuYXBwZW5kKCQoJzxsaW5rLz4nKS5hdHRyKHtcbiAgICAgICAgICAgICdpZCc6ICAgbGlua0lkLFxuICAgICAgICAgICAgJ3JlbCc6ICAnc3R5bGVzaGVldCcsXG4gICAgICAgICAgICAnaHJlZic6IHVyaVxuICAgICAgICAgIH0pKTtcblxuICAgICAgICAgIGlmKCBvbGRMaW5rLmxlbmd0aCApIHtcbiAgICAgICAgICAgIG9sZExpbmsucmVtb3ZlKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuICQoJyMnK2xpbmtJZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbn0pKCk7XG4iLCIvKio9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIE1vZHVsZTogbm93LmpzXG4gKiBQcm92aWRlcyBhIHNpbXBsZSB3YXkgdG8gZGlzcGxheSB0aGUgY3VycmVudCB0aW1lIGZvcm1hdHRlZFxuID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG5cbihmdW5jdGlvbigpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoJ2FwcC51dGlscycpXG4gICAgICAgIC5kaXJlY3RpdmUoJ25vdycsIG5vdyk7XG5cbiAgICBub3cuJGluamVjdCA9IFsnZGF0ZUZpbHRlcicsICckaW50ZXJ2YWwnXTtcbiAgICBmdW5jdGlvbiBub3cgKGRhdGVGaWx0ZXIsICRpbnRlcnZhbCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0ge1xuICAgICAgICAgICAgbGluazogbGluayxcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRUEnXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG5cbiAgICAgICAgZnVuY3Rpb24gbGluayhzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICB2YXIgZm9ybWF0ID0gYXR0cnMuZm9ybWF0O1xuXG4gICAgICAgICAgZnVuY3Rpb24gdXBkYXRlVGltZSgpIHtcbiAgICAgICAgICAgIHZhciBkdCA9IGRhdGVGaWx0ZXIobmV3IERhdGUoKSwgZm9ybWF0KTtcbiAgICAgICAgICAgIGVsZW1lbnQudGV4dChkdCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdXBkYXRlVGltZSgpO1xuICAgICAgICAgIHZhciBpbnRlcnZhbFByb21pc2UgPSAkaW50ZXJ2YWwodXBkYXRlVGltZSwgMTAwMCk7XG5cbiAgICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICRpbnRlcnZhbC5jYW5jZWwoaW50ZXJ2YWxQcm9taXNlKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICB9XG4gICAgfVxuXG59KSgpO1xuIiwiLyoqPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBNb2R1bGU6IHRhYmxlLWNoZWNrYWxsLmpzXG4gKiBUYWJsZXMgY2hlY2sgYWxsIGNoZWNrYm94XG4gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cbihmdW5jdGlvbigpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoJ2FwcC51dGlscycpXG4gICAgICAgIC5kaXJlY3RpdmUoJ2NoZWNrQWxsJywgY2hlY2tBbGwpO1xuXG4gICAgZnVuY3Rpb24gY2hlY2tBbGwgKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0ge1xuICAgICAgICAgICAgbGluazogbGluayxcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnQSdcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcblxuICAgICAgICBmdW5jdGlvbiBsaW5rKHNjb3BlLCBlbGVtZW50KSB7XG4gICAgICAgICAgZWxlbWVudC5vbignY2hhbmdlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpLFxuICAgICAgICAgICAgICAgIGluZGV4PSAkdGhpcy5pbmRleCgpICsgMSxcbiAgICAgICAgICAgICAgICBjaGVja2JveCA9ICR0aGlzLmZpbmQoJ2lucHV0W3R5cGU9XCJjaGVja2JveFwiXScpLFxuICAgICAgICAgICAgICAgIHRhYmxlID0gJHRoaXMucGFyZW50cygndGFibGUnKTtcbiAgICAgICAgICAgIC8vIE1ha2Ugc3VyZSB0byBhZmZlY3Qgb25seSB0aGUgY29ycmVjdCBjaGVja2JveCBjb2x1bW5cbiAgICAgICAgICAgIHRhYmxlLmZpbmQoJ3Rib2R5ID4gdHIgPiB0ZDpudGgtY2hpbGQoJytpbmRleCsnKSBpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nKVxuICAgICAgICAgICAgICAucHJvcCgnY2hlY2tlZCcsIGNoZWNrYm94WzBdLmNoZWNrZWQpO1xuXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbn0pKCk7XG4iLCIvKio9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICogTW9kdWxlOiB0cmlnZ2VyLXJlc2l6ZS5qc1xyXG4gKiBUcmlnZ2VycyBhIHdpbmRvdyByZXNpemUgZXZlbnQgZnJvbSBhbnkgZWxlbWVudFxyXG4gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cclxuKGZ1bmN0aW9uKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdhcHAudXRpbHMnKVxyXG4gICAgICAgIC5kaXJlY3RpdmUoJ3RyaWdnZXJSZXNpemUnLCB0cmlnZ2VyUmVzaXplKTtcclxuXHJcbiAgICB0cmlnZ2VyUmVzaXplLiRpbmplY3QgPSBbJyR3aW5kb3cnLCAnJHRpbWVvdXQnXTtcclxuICAgIGZ1bmN0aW9uIHRyaWdnZXJSZXNpemUgKCR3aW5kb3csICR0aW1lb3V0KSB7XHJcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IHtcclxuICAgICAgICAgICAgbGluazogbGluayxcclxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdBJ1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gbGluayhzY29wZSwgZWxlbWVudCkge1xyXG4gICAgICAgICAgZWxlbWVudC5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgIC8vIGFsbCBJRSBmcmllbmRseSBkaXNwYXRjaEV2ZW50XHJcbiAgICAgICAgICAgICAgdmFyIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdVSUV2ZW50cycpO1xyXG4gICAgICAgICAgICAgIGV2dC5pbml0VUlFdmVudCgncmVzaXplJywgdHJ1ZSwgZmFsc2UsICR3aW5kb3csIDApO1xyXG4gICAgICAgICAgICAgICR3aW5kb3cuZGlzcGF0Y2hFdmVudChldnQpO1xyXG4gICAgICAgICAgICAgIC8vIG1vZGVybiBkaXNwYXRjaEV2ZW50IHdheVxyXG4gICAgICAgICAgICAgIC8vICR3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ3Jlc2l6ZScpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59KSgpO1xyXG4iLCIvKio9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIE1vZHVsZTogdXRpbHMuanNcbiAqIFV0aWxpdHkgbGlicmFyeSB0byB1c2UgYWNyb3NzIHRoZSB0aGVtZVxuID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG5cbihmdW5jdGlvbigpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoJ2FwcC51dGlscycpXG4gICAgICAgIC5zZXJ2aWNlKCdVdGlscycsIFV0aWxzKTtcblxuICAgIFV0aWxzLiRpbmplY3QgPSBbJyR3aW5kb3cnLCAnQVBQX01FRElBUVVFUlknXTtcbiAgICBmdW5jdGlvbiBVdGlscygkd2luZG93LCBBUFBfTUVESUFRVUVSWSkge1xuXG4gICAgICAgIHZhciAkaHRtbCA9IGFuZ3VsYXIuZWxlbWVudCgnaHRtbCcpLFxuICAgICAgICAgICAgJHdpbiAgPSBhbmd1bGFyLmVsZW1lbnQoJHdpbmRvdyksXG4gICAgICAgICAgICAkYm9keSA9IGFuZ3VsYXIuZWxlbWVudCgnYm9keScpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgLy8gREVURUNUSU9OXG4gICAgICAgICAgc3VwcG9ydDoge1xuICAgICAgICAgICAgdHJhbnNpdGlvbjogKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdHJhbnNpdGlvbkVuZCA9IChmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5ib2R5IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc0VuZEV2ZW50TmFtZXMgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFdlYmtpdFRyYW5zaXRpb246ICd3ZWJraXRUcmFuc2l0aW9uRW5kJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTW96VHJhbnNpdGlvbjogJ3RyYW5zaXRpb25lbmQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPVHJhbnNpdGlvbjogJ29UcmFuc2l0aW9uRW5kIG90cmFuc2l0aW9uZW5kJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbjogJ3RyYW5zaXRpb25lbmQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgbmFtZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChuYW1lIGluIHRyYW5zRW5kRXZlbnROYW1lcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LnN0eWxlW25hbWVdICE9PSB1bmRlZmluZWQpIHJldHVybiB0cmFuc0VuZEV2ZW50TmFtZXNbbmFtZV07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0oKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRyYW5zaXRpb25FbmQgJiYgeyBlbmQ6IHRyYW5zaXRpb25FbmQgfTtcbiAgICAgICAgICAgICAgICB9KSgpLFxuICAgICAgICAgICAgYW5pbWF0aW9uOiAoZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgYW5pbWF0aW9uRW5kID0gKGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuYm9keSB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBhbmltRW5kRXZlbnROYW1lcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBXZWJraXRBbmltYXRpb246ICd3ZWJraXRBbmltYXRpb25FbmQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1vekFuaW1hdGlvbjogJ2FuaW1hdGlvbmVuZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgT0FuaW1hdGlvbjogJ29BbmltYXRpb25FbmQgb2FuaW1hdGlvbmVuZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uOiAnYW5pbWF0aW9uZW5kJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgbmFtZTtcblxuICAgICAgICAgICAgICAgICAgICBmb3IgKG5hbWUgaW4gYW5pbUVuZEV2ZW50TmFtZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LnN0eWxlW25hbWVdICE9PSB1bmRlZmluZWQpIHJldHVybiBhbmltRW5kRXZlbnROYW1lc1tuYW1lXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0oKSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gYW5pbWF0aW9uRW5kICYmIHsgZW5kOiBhbmltYXRpb25FbmQgfTtcbiAgICAgICAgICAgIH0pKCksXG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWU6IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5tc1JlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cub1JlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbihjYWxsYmFjayl7IHdpbmRvdy5zZXRUaW1lb3V0KGNhbGxiYWNrLCAxMDAwLzYwKTsgfSxcbiAgICAgICAgICAgIC8qanNoaW50IC1XMDY5Ki9cbiAgICAgICAgICAgIHRvdWNoOiAoXG4gICAgICAgICAgICAgICAgKCdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdyAmJiBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkubWF0Y2goL21vYmlsZXx0YWJsZXQvKSkgfHxcbiAgICAgICAgICAgICAgICAod2luZG93LkRvY3VtZW50VG91Y2ggJiYgZG9jdW1lbnQgaW5zdGFuY2VvZiB3aW5kb3cuRG9jdW1lbnRUb3VjaCkgIHx8XG4gICAgICAgICAgICAgICAgKHdpbmRvdy5uYXZpZ2F0b3JbJ21zUG9pbnRlckVuYWJsZWQnXSAmJiB3aW5kb3cubmF2aWdhdG9yWydtc01heFRvdWNoUG9pbnRzJ10gPiAwKSB8fCAvL0lFIDEwXG4gICAgICAgICAgICAgICAgKHdpbmRvdy5uYXZpZ2F0b3JbJ3BvaW50ZXJFbmFibGVkJ10gJiYgd2luZG93Lm5hdmlnYXRvclsnbWF4VG91Y2hQb2ludHMnXSA+IDApIHx8IC8vSUUgPj0xMVxuICAgICAgICAgICAgICAgIGZhbHNlXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgbXV0YXRpb25vYnNlcnZlcjogKHdpbmRvdy5NdXRhdGlvbk9ic2VydmVyIHx8IHdpbmRvdy5XZWJLaXRNdXRhdGlvbk9ic2VydmVyIHx8IHdpbmRvdy5Nb3pNdXRhdGlvbk9ic2VydmVyIHx8IG51bGwpXG4gICAgICAgICAgfSxcbiAgICAgICAgICAvLyBVVElMSVRJRVNcbiAgICAgICAgICBpc0luVmlldzogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgICAgICAgICAvKmpzaGludCAtVzEwNiovXG4gICAgICAgICAgICAgIHZhciAkZWxlbWVudCA9ICQoZWxlbWVudCk7XG5cbiAgICAgICAgICAgICAgaWYgKCEkZWxlbWVudC5pcygnOnZpc2libGUnKSkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgdmFyIHdpbmRvd19sZWZ0ID0gJHdpbi5zY3JvbGxMZWZ0KCksXG4gICAgICAgICAgICAgICAgICB3aW5kb3dfdG9wICA9ICR3aW4uc2Nyb2xsVG9wKCksXG4gICAgICAgICAgICAgICAgICBvZmZzZXQgICAgICA9ICRlbGVtZW50Lm9mZnNldCgpLFxuICAgICAgICAgICAgICAgICAgbGVmdCAgICAgICAgPSBvZmZzZXQubGVmdCxcbiAgICAgICAgICAgICAgICAgIHRvcCAgICAgICAgID0gb2Zmc2V0LnRvcDtcblxuICAgICAgICAgICAgICBvcHRpb25zID0gJC5leHRlbmQoe3RvcG9mZnNldDowLCBsZWZ0b2Zmc2V0OjB9LCBvcHRpb25zKTtcblxuICAgICAgICAgICAgICBpZiAodG9wICsgJGVsZW1lbnQuaGVpZ2h0KCkgPj0gd2luZG93X3RvcCAmJiB0b3AgLSBvcHRpb25zLnRvcG9mZnNldCA8PSB3aW5kb3dfdG9wICsgJHdpbi5oZWlnaHQoKSAmJlxuICAgICAgICAgICAgICAgICAgbGVmdCArICRlbGVtZW50LndpZHRoKCkgPj0gd2luZG93X2xlZnQgJiYgbGVmdCAtIG9wdGlvbnMubGVmdG9mZnNldCA8PSB3aW5kb3dfbGVmdCArICR3aW4ud2lkdGgoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXG4gICAgICAgICAgbGFuZ2RpcmVjdGlvbjogJGh0bWwuYXR0cignZGlyJykgPT09ICdydGwnID8gJ3JpZ2h0JyA6ICdsZWZ0JyxcblxuICAgICAgICAgIGlzVG91Y2g6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiAkaHRtbC5oYXNDbGFzcygndG91Y2gnKTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgaXNTaWRlYmFyQ29sbGFwc2VkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gJGJvZHkuaGFzQ2xhc3MoJ2FzaWRlLWNvbGxhcHNlZCcpO1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBpc1NpZGViYXJUb2dnbGVkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gJGJvZHkuaGFzQ2xhc3MoJ2FzaWRlLXRvZ2dsZWQnKTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgaXNNb2JpbGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiAkd2luLndpZHRoKCkgPCBBUFBfTUVESUFRVUVSWS50YWJsZXQ7XG4gICAgICAgICAgfVxuXG4gICAgICAgIH07XG4gICAgfVxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnYXBwLnNldHRpbmdzJylcclxuICAgICAgICAucnVuKHNldHRpbmdzUnVuKTtcclxuXHJcbiAgICBzZXR0aW5nc1J1bi4kaW5qZWN0ID0gWyckcm9vdFNjb3BlJywgJyRsb2NhbFN0b3JhZ2UnLCAnQXV0aFNlcnZpY2UnLCAnVXNlclNlcnZpY2UnXTtcclxuXHJcbiAgICBmdW5jdGlvbiBzZXR0aW5nc1J1bigkcm9vdFNjb3BlLCAkbG9jYWxTdG9yYWdlLCBBdXRoU2VydmljZSwgVXNlclNlcnZpY2UpIHtcclxuXHJcbiAgICAgIC8vIEdsb2JhbCBTZXR0aW5nc1xyXG4gICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAkcm9vdFNjb3BlLmFwcCA9IHtcclxuICAgICAgICBuYW1lOiAnRHV4JyxcclxuICAgICAgICBkZXNjcmlwdGlvbjogJ0dlcmVuY2lhZG9yIGRlIEV2ZW50b3MnLFxyXG4gICAgICAgIHllYXI6ICgobmV3IERhdGUoKSkuZ2V0RnVsbFllYXIoKSksXHJcbiAgICAgICAgbGF5b3V0OiB7XHJcbiAgICAgICAgICBpc0ZpeGVkOiB0cnVlLFxyXG4gICAgICAgICAgaXNDb2xsYXBzZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgaXNCb3hlZDogZmFsc2UsXHJcbiAgICAgICAgICBpc1JUTDogZmFsc2UsXHJcbiAgICAgICAgICBob3Jpem9udGFsOiBmYWxzZSxcclxuICAgICAgICAgIGlzRmxvYXQ6IGZhbHNlLFxyXG4gICAgICAgICAgYXNpZGVIb3ZlcjogZmFsc2UsXHJcbiAgICAgICAgICB0aGVtZTogbnVsbCxcclxuICAgICAgICAgIGFzaWRlU2Nyb2xsYmFyOiBmYWxzZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdXNlRnVsbExheW91dDogZmFsc2UsXHJcbiAgICAgICAgaGlkZGVuRm9vdGVyOiBmYWxzZSxcclxuICAgICAgICBvZmZzaWRlYmFyT3BlbjogZmFsc2UsXHJcbiAgICAgICAgYXNpZGVUb2dnbGVkOiBmYWxzZSxcclxuICAgICAgICB2aWV3QW5pbWF0aW9uOiAnbmctZmFkZUluVXAnXHJcbiAgICAgIH07XHJcblxyXG5cclxuICAgICAgJHJvb3RTY29wZS5wZXNxdWlzYSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIHZhciB0eHQgPSAkKCcjdHh0UGVzcXVpc2EnKS52YWwoKTtcclxuICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgncGVzcXVpc2EnLCB7IHBlc3F1aXNhOiB0eHQgfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFNldHVwIHRoZSBsYXlvdXQgbW9kZVxyXG4gICAgICAkcm9vdFNjb3BlLmFwcC5sYXlvdXQuaG9yaXpvbnRhbCA9ICgkcm9vdFNjb3BlLiRzdGF0ZVBhcmFtcy5sYXlvdXQgPT09ICdhcHAtaCcpO1xyXG5cclxuXHJcbiAgICAgIEF1dGhTZXJ2aWNlLmZpbGxBdXRoRGF0YSgpO1xyXG4gICAgICBcclxuXHJcbiAgICAgIC8vIFJlc3RvcmUgbGF5b3V0IHNldHRpbmdzIFsqKiogVU5DT01NRU5UIFRPIEVOQUJMRSAqKipdXHJcbiAgICAgIC8vIGlmKCBhbmd1bGFyLmlzRGVmaW5lZCgkbG9jYWxTdG9yYWdlLmxheW91dCkgKVxyXG4gICAgICAvLyAgICRyb290U2NvcGUuYXBwLmxheW91dCA9ICRsb2NhbFN0b3JhZ2UubGF5b3V0O1xyXG4gICAgICAvLyBlbHNlXHJcbiAgICAgIC8vICAgJGxvY2FsU3RvcmFnZS5sYXlvdXQgPSAkcm9vdFNjb3BlLmFwcC5sYXlvdXQ7XHJcbiAgICAgIC8vXHJcbiAgICAgIC8vICRyb290U2NvcGUuJHdhdGNoKCdhcHAubGF5b3V0JywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAvLyAgICRsb2NhbFN0b3JhZ2UubGF5b3V0ID0gJHJvb3RTY29wZS5hcHAubGF5b3V0O1xyXG4gICAgICAvLyB9LCB0cnVlKTtcclxuXHJcbiAgICAgIC8vIENsb3NlIHN1Ym1lbnUgd2hlbiBzaWRlYmFyIGNoYW5nZSBmcm9tIGNvbGxhcHNlZCB0byBub3JtYWxcclxuICAgICAgJHJvb3RTY29wZS4kd2F0Y2goJ2FwcC5sYXlvdXQuaXNDb2xsYXBzZWQnLCBmdW5jdGlvbihuZXdWYWx1ZSkge1xyXG4gICAgICAgIGlmKCBuZXdWYWx1ZSA9PT0gZmFsc2UgKVxyXG4gICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdjbG9zZVNpZGViYXJNZW51Jyk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbn0pKCk7XHJcbiIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2R1eCcpXHJcbiAgICAgICAgLmZhY3RvcnkoJ0Nhc2FTZXJ2aWNlJywgQ2FzYVNlcnZpY2UpO1xyXG5cclxuICAgIENhc2FTZXJ2aWNlLiRpbmplY3QgPSBbJyRodHRwJ107XHJcblxyXG4gICAgZnVuY3Rpb24gQ2FzYVNlcnZpY2UoJGh0dHApIHtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gX2dldENhc2FzKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCdhcGkvY2FzYS9nZXRDYXNhcycpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gX2dldENhc2FTZWxlYygpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCgnL2FwaS9jYXNhL2dldGNhc2FzZWxlYycpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gX3NlbGVjaW9uYUNhc2EoY2FzYSkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdCgnYXBpL2Nhc2Evc2VsZWNpb25hQ2FzYScsIGNhc2EpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIHNlcnZpY2UgPSB7XHJcbiAgICAgICAgICAgIGdldENhc2FzOiBfZ2V0Q2FzYXMsXHJcbiAgICAgICAgICAgIGdldENhc2FTZWxlYzogX2dldENhc2FTZWxlYyxcclxuICAgICAgICAgICAgc2VsZWNpb25hQ2FzYTogX3NlbGVjaW9uYUNhc2FcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gc2VydmljZTtcclxuICAgIH1cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdkdXgnKVxyXG4gICAgICAgIC5jb250cm9sbGVyKCdzZWxlY2FvQ2FzYUNvbnRyb2xsZXInLCBzZWxlY2FvQ2FzYUNvbnRyb2xsZXIpO1xyXG5cclxuICAgIHNlbGVjYW9DYXNhQ29udHJvbGxlci4kaW5qZWN0ID0gWydDYXNhU2VydmljZScsICdBdXRoU2VydmljZSddOyBcclxuXHJcbiAgICBmdW5jdGlvbiBzZWxlY2FvQ2FzYUNvbnRyb2xsZXIoQ2FzYVNlcnZpY2UsIEF1dGhTZXJ2aWNlKSB7XHJcbiAgICAgICAgLyoganNoaW50IHZhbGlkdGhpczp0cnVlICovXHJcbiAgICAgICAgdmFyIHZtID0gdGhpcztcclxuXHJcbiAgICAgICAgdmFyIGNhc2FTZWxlY2lvbmFkYSA9IHt9O1xyXG5cclxuICAgICAgICBhY3RpdmF0ZSgpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBhY3RpdmF0ZSgpIHtcclxuXHJcbiAgICAgICAgICAgIENhc2FTZXJ2aWNlLmdldENhc2FTZWxlYygpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNhU2VsZWNpb25hZGEgPSByZXNwb25zZS5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIENhc2FTZXJ2aWNlLmdldENhc2FzKCkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIHZtLmNhc2FzID0gcmVzcG9uc2UuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdm0uc2VsZWNpb25hQ2FzYSA9IGZ1bmN0aW9uIChjYXNhKSB7XHJcbiAgICAgICAgICAgIENhc2FTZXJ2aWNlLnNlbGVjaW9uYUNhc2EoY2FzYSkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgQXV0aFNlcnZpY2UucmVmcmVzaFRva2VuKCkudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgQXV0aFNlcnZpY2Uuc2V0Q2FzYShyZXNwb25zZS5kYXRhKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pKCk7XHJcbiIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2R1eCcpXHJcbiAgICAgICAgLmZhY3RvcnkoJ0NvbWlzc2FyaW9TZXJ2aWNlJywgQ29taXNzYXJpb1NlcnZpY2UpO1xyXG5cclxuICAgIENvbWlzc2FyaW9TZXJ2aWNlLiRpbmplY3QgPSBbJyRodHRwJ107XHJcblxyXG4gICAgZnVuY3Rpb24gQ29taXNzYXJpb1NlcnZpY2UoJGh0dHApIHtcclxuXHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIF9nZXRDb21pc3NhcmlvcygpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCgnYXBpL3VzdWFyaW8vZ2V0Y29taXNzYXJpb3MnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIF9zYWx2YUNvbWlzc2FyaW8oY29taXNzYXJpbykge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdCgnYXBpL3VzdWFyaW8vY29taXNzYXJpbycsIGNvbWlzc2FyaW8pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gX2Jsb3F1ZWFyKGlkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KCcvYXBpL3VzdWFyaW8vY29taXNzYXJpby9ibG9xdWVhcicsICdcIicgKyBpZCArICdcIicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gX2Rlc2Jsb3F1ZWFyKGlkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KCcvYXBpL3VzdWFyaW8vY29taXNzYXJpby9kZXNibG9xdWVhcicsICdcIicgKyBpZCArICdcIicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIHNlcnZpY2UgPSB7XHJcbiAgICAgICAgICAgIGdldENvbWlzc2FyaW9zOiBfZ2V0Q29taXNzYXJpb3MsXHJcbiAgICAgICAgICAgIHNhbHZhQ29taXNzYXJpbzogX3NhbHZhQ29taXNzYXJpbyxcclxuICAgICAgICAgICAgYmxvcXVlYXI6IF9ibG9xdWVhcixcclxuICAgICAgICAgICAgZGVzYmxvcXVlYXIgOiBfZGVzYmxvcXVlYXJcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gc2VydmljZTtcclxuICAgIH1cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdkdXgnKVxyXG4gICAgICAgIC5jb250cm9sbGVyKCdjb25zdWx0YUNvbWlzc2FyaW9zQ29udHJvbGxlcicsIGNvbnN1bHRhQ29taXNzYXJpb3NDb250cm9sbGVyKTtcclxuXHJcbiAgICBjb25zdWx0YUNvbWlzc2FyaW9zQ29udHJvbGxlci4kaW5qZWN0ID0gWyckbG9jYXRpb24nLCAnQ29taXNzYXJpb1NlcnZpY2UnLCAndG9hc3RyJ107XHJcblxyXG4gICAgZnVuY3Rpb24gY29uc3VsdGFDb21pc3Nhcmlvc0NvbnRyb2xsZXIoJGxvY2F0aW9uLCBDb21pc3NhcmlvU2VydmljZSwgdG9hc3RyKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIHZtID0gdGhpcztcclxuXHJcbiAgICAgICAgYWN0aXZhdGUoKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gYWN0aXZhdGUoKSB7XHJcbiAgICAgICAgICAgIENvbWlzc2FyaW9TZXJ2aWNlLmdldENvbWlzc2FyaW9zKCkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIHZtLmNvbWlzc2FyaW9zID0gcmVzcG9uc2UuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgdm0uYmxvcXVlYXIgPSBmdW5jdGlvbiAoY29taXNzYXJpbykge1xyXG4gICAgICAgICAgICBDb21pc3NhcmlvU2VydmljZS5ibG9xdWVhcihjb21pc3NhcmlvLmlkKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgdG9hc3RyLnN1Y2Nlc3MoXCJPIGNvbWlzc8OhcmlvIFwiICsgY29taXNzYXJpby5ub21lICsgXCIgZm9pIGJsb3F1ZWFkby5cIiwgXCJCbG9xdWVhZG9cIik7XHJcbiAgICAgICAgICAgICAgICBjb21pc3NhcmlvLnN0YXR1cyA9IDE7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbihyZXNwb25zZSl7XHJcbiAgICAgICAgICAgICAgICB0b2FzdHIuZXJyb3IoXCJPY29ycmV1IHVtIGVycm8gYW8gYmxvcXVlYXIgbyBjb21pc3PDoXJpbywgdGVudGUgbm92YW1lbnRlIGFww7NzIGFsZ3VtIHRlbXBvXCIsIFwiRXJyb1wiKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2bS5kZXNibG9xdWVhciA9IGZ1bmN0aW9uIChjb21pc3NhcmlvKSB7XHJcbiAgICAgICAgICAgIENvbWlzc2FyaW9TZXJ2aWNlLmRlc2Jsb3F1ZWFyKGNvbWlzc2FyaW8uaWQpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICB0b2FzdHIuc3VjY2VzcyhcIk8gY29taXNzw6FyaW8gXCIgKyBjb21pc3NhcmlvLm5vbWUgKyBcIiBmb2kgZGVzYmxvcXVlYWRvXCIsIFwiRGVzYmxvcXVlYWRvXCIpO1xyXG4gICAgICAgICAgICAgICAgY29taXNzYXJpby5zdGF0dXMgPSAwO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24ocmVzcG9uc2Upe1xyXG4gICAgICAgICAgICAgICAgdG9hc3RyLmVycm9yKFwiT2NvcnJldSB1bSBlcnJvIGFvIGRlc2Jsb3F1ZWFyIG8gdXN1w6FyaW8sIHRlbnRlIG5vdmFtZW50ZSBhcMOzcyBhbGd1bSB0ZW1wb1wiLCBcIkVycm9cIik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH19XHJcblxyXG4gICAgICAgICAgIFxyXG4gICAgfVxyXG59KSgpO1xyXG4iLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdkdXgnKVxyXG4gICAgICAgIC5jb250cm9sbGVyKCdjcmlhckNvbWlzc2FyaW9Db250cm9sbGVyJywgY3JpYXJDb21pc3NhcmlvQ29udHJvbGxlcik7XHJcblxyXG4gICAgY3JpYXJDb21pc3NhcmlvQ29udHJvbGxlci4kaW5qZWN0ID0gWyckbG9jYXRpb24nLCAnQ29taXNzYXJpb1NlcnZpY2UnLCAndG9hc3RyJywgJ0Nhc2FTZXJ2aWNlJ107XHJcblxyXG4gICAgZnVuY3Rpb24gY3JpYXJDb21pc3NhcmlvQ29udHJvbGxlcigkbG9jYXRpb24sIENvbWlzc2FyaW9TZXJ2aWNlLCB0b2FzdHIsIENhc2FTZXJ2aWNlKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIHZtID0gdGhpcztcclxuXHJcbiAgICAgICAgYWN0aXZhdGUoKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gYWN0aXZhdGUoKSB7XHJcbiAgICAgICAgICAgIENhc2FTZXJ2aWNlLmdldENhc2FzKCkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIHZtLmNhc2FzVSA9IHJlc3BvbnNlLmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmVzZXRDb21pc3NhcmlvKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2bS5zYWx2YUNvbWlzc2FyaW8gPSBmdW5jdGlvbiAoY29taXNzYXJpbykge1xyXG4gICAgICAgICAgICBDb21pc3NhcmlvU2VydmljZS5zYWx2YUNvbWlzc2FyaW8oY29taXNzYXJpbykudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIHRvYXN0ci5zdWNjZXNzKCdPIGNvbWlzc8OhcmlvIGZvaSBjcmlhZG8gY29tIHN1Y2Vzc29cXG5VbSBlbWFpbCBmb2kgZW52aWFkbyDDoCBlbGUgY29tIG8gbGluayBwYXJhIG8gY2FkYXN0cm8gZGUgc2VuaGEnLCAnQ3JpYWRvJyk7XHJcbiAgICAgICAgICAgICAgICAkbG9jYXRpb24ucGF0aCgnL0NvbWlzc2FyaW9zJyk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT0gNDAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3Nob3dWYWxpZGF0aW9uRXJyb3JzKHZtLCByZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0b2FzdHIuZXJyb3IoJ0Fjb250ZWNldSB1bSBlcnJvIGFvIGNyaWFyIG8gY29taXNzw6FyaW8sIHRlbnRlIG5vdmFtZW50ZSBhcMOzcyB1bSB0ZW1wbycsICdFcnJvJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICB2bS5zZWxlY0Nhc2EgPSBmdW5jdGlvbiAoaWQpIHtcclxuICAgICAgICAgICAgdmFyIGkgPSB2bS5jb21pc3NhcmlvLmNhc2FzLmluZGV4T2YoaWQpO1xyXG4gICAgICAgICAgICBpZiAoaSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB2bS5jb21pc3NhcmlvLmNhc2FzLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZtLmNvbWlzc2FyaW8uY2FzYXMucHVzaChpZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHJlc2V0Q29taXNzYXJpbygpIHtcclxuICAgICAgICAgICAgdm0uY29taXNzYXJpbyA9IHtcclxuICAgICAgICAgICAgICAgIG5vbWU6ICcnLFxyXG4gICAgICAgICAgICAgICAgc29icmVub21lOiAnJyxcclxuICAgICAgICAgICAgICAgIGNhc2FzOiBbXSxcclxuICAgICAgICAgICAgICAgIGVtYWlsOiAnJ1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gX3Nob3dWYWxpZGF0aW9uRXJyb3JzKHZtLCBlcnJvcikge1xyXG4gICAgICAgICAgICB2bS52YWxpZGF0aW9uRXJyb3JzID0gW107XHJcbiAgICAgICAgICAgIGlmIChlcnJvci5kYXRhICYmIGFuZ3VsYXIuaXNPYmplY3QoZXJyb3IuZGF0YSkpIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBlcnJvci5kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdm0udmFsaWRhdGlvbkVycm9ycy5wdXNoKGVycm9yLmRhdGFba2V5XVswXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2bS52YWxpZGF0aW9uRXJyb3JzLnB1c2goJ07Do28gZm9pIHBvc3PDrXZlbCBhZGljaW9uYXIgbyBwZXJmaWwnKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59KSgpO1xyXG4iLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG4gICAgYW5ndWxhci5tb2R1bGUoJ2R1eCcpXHJcbiAgICAgICAgLmZhY3RvcnkoJ2F1dGhJbnRlcmNlcHRvclNlcnZpY2UnLCBbJyRxJywgJyRpbmplY3RvcicsICckbG9jYXRpb24nLCAnbG9jYWxTdG9yYWdlU2VydmljZScsIGZ1bmN0aW9uICgkcSwgJGluamVjdG9yLCAkbG9jYXRpb24sIGxvY2FsU3RvcmFnZVNlcnZpY2UpIHtcclxuXHJcbiAgICAgICAgdmFyIGF1dGhJbnRlcmNlcHRvclNlcnZpY2VGYWN0b3J5ID0ge307XHJcbiAgICAgICAgdmFyICRodHRwO1xyXG5cclxuICAgICAgICB2YXIgX3JlcXVlc3QgPSBmdW5jdGlvbiAoY29uZmlnKSB7XHJcblxyXG4gICAgICAgICAgICBjb25maWcuaGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzIHx8IHt9OyAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgdmFyIGF1dGhEYXRhID0gbG9jYWxTdG9yYWdlU2VydmljZS5nZXQoJ2F1dGhvcml6YXRpb25EYXRhJyk7XHJcbiAgICAgICAgICAgIGlmIChhdXRoRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgY29uZmlnLmhlYWRlcnMuQXV0aG9yaXphdGlvbiA9ICdCZWFyZXIgJyArIGF1dGhEYXRhLnRva2VuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gY29uZmlnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIF9yZXNwb25zZUVycm9yID0gZnVuY3Rpb24gKHJlamVjdGlvbikge1xyXG4gICAgICAgICAgICB2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xyXG4gICAgICAgICAgICBpZiAocmVqZWN0aW9uLnN0YXR1cyA9PT0gNDAxKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYXV0aFNlcnZpY2UgPSAkaW5qZWN0b3IuZ2V0KCdBdXRoU2VydmljZScpO1xyXG4gICAgICAgICAgICAgICAgYXV0aFNlcnZpY2UucmVmcmVzaFRva2VuKCkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBfcmV0cnlIdHRwUmVxdWVzdChyZWplY3Rpb24uY29uZmlnLCBkZWZlcnJlZCk7XHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXV0aFNlcnZpY2UubG9nT3V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoJy9sb2dpbicpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdChyZWplY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QocmVqZWN0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBfcmV0cnlIdHRwUmVxdWVzdCA9IGZ1bmN0aW9uIChjb25maWcsIGRlZmVycmVkKSB7XHJcbiAgICAgICAgICAgICRodHRwID0gJGh0dHAgfHwgJGluamVjdG9yLmdldCgnJGh0dHAnKTtcclxuICAgICAgICAgICAgJGh0dHAoY29uZmlnKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhdXRoSW50ZXJjZXB0b3JTZXJ2aWNlRmFjdG9yeS5yZXF1ZXN0ID0gX3JlcXVlc3Q7XHJcbiAgICAgICAgYXV0aEludGVyY2VwdG9yU2VydmljZUZhY3RvcnkucmVzcG9uc2VFcnJvciA9IF9yZXNwb25zZUVycm9yO1xyXG5cclxuICAgICAgICByZXR1cm4gYXV0aEludGVyY2VwdG9yU2VydmljZUZhY3Rvcnk7XHJcbiAgICB9XSk7XHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnZHV4JylcclxuICAgICAgICAuZmFjdG9yeSgnQXV0aFNlcnZpY2UnLCBBdXRoU2VydmljZSk7XHJcblxyXG4gICAgQXV0aFNlcnZpY2UuJGluamVjdCA9IFsnJGh0dHAnLCAnJHJvb3RTY29wZScsICckcScsICdVc2VyU2VydmljZScsICdDYXNhU2VydmljZScsICdsb2NhbFN0b3JhZ2VTZXJ2aWNlJyBdO1xyXG5cclxuICAgIGZ1bmN0aW9uIEF1dGhTZXJ2aWNlKCRodHRwLCAkcm9vdFNjb3BlLCAkcSwgVXNlclNlcnZpY2UsIENhc2FTZXJ2aWNlLCBsb2NhbFN0b3JhZ2VTZXJ2aWNlKSB7XHJcblxyXG5cclxuICAgICAgICBcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gX2ZpbGxBdXRoRGF0YSgpIHtcclxuXHJcbiAgICAgICAgICAgICRyb290U2NvcGUuYXV0aCA9IHtcclxuICAgICAgICAgICAgICAgIHVzZXI6IHtcclxuICAgICAgICAgICAgICAgICAgICB1c2VybmFtZTogJycsXHJcbiAgICAgICAgICAgICAgICAgICAgZm90bzogJycsXHJcbiAgICAgICAgICAgICAgICAgICAgbm9tZTogJydcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBjYXNhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9tZTogJydcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIFVzZXJTZXJ2aWNlLmdldFVzZXIoKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS5hdXRoLnVzZXIubm9tZSA9IHJlc3BvbnNlLmRhdGEubm9tZTtcclxuICAgICAgICAgICAgICAgICRyb290U2NvcGUuYXV0aC51c2VyLmZvdG8gPSByZXNwb25zZS5kYXRhLmZvdG87XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgQ2FzYVNlcnZpY2UuZ2V0Q2FzYVNlbGVjKCkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgICRyb290U2NvcGUuYXV0aC5jYXNhLm5vbWUgPSByZXNwb25zZS5kYXRhLm5vbWVDYXNhO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gX3NldENhc2EoY2FzYSkge1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLmF1dGguY2FzYS5ub21lID0gY2FzYS5ub21lQ2FzYTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIF9yZWZyZXNoVG9rZW4oKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGF1dGhEYXRhID0gbG9jYWxTdG9yYWdlU2VydmljZS5nZXQoJ2F1dGhvcml6YXRpb25EYXRhJyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoYXV0aERhdGEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IFwiZ3JhbnRfdHlwZT1yZWZyZXNoX3Rva2VuJnJlZnJlc2hfdG9rZW49XCIgKyBhdXRoRGF0YS5yZWZyZXNoVG9rZW4gKyBcIiZjbGllbnRfaWQ9ZHV4JnNjb3BlPW9mZmxpbmVfYWNjZXNzXCI7XHJcblxyXG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlU2VydmljZS5yZW1vdmUoJ2F1dGhvcml6YXRpb25EYXRhJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJGh0dHAgPSAkaHR0cCB8fCAkaW5qZWN0b3IuZ2V0KCckaHR0cCcpO1xyXG4gICAgICAgICAgICAgICAgJGh0dHAucG9zdCgnL2Nvbm5lY3QvdG9rZW4nLCBkYXRhLCB7IGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnIH0gfSkuc3VjY2VzcyhmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlU2VydmljZS5zZXQoJ2F1dGhvcml6YXRpb25EYXRhJywgeyB0b2tlbjogcmVzcG9uc2UuYWNjZXNzX3Rva2VuLCB1c2VybmFtZTogcmVzcG9uc2UudXNlcm5hbWUsIHJlZnJlc2hUb2tlbjogcmVzcG9uc2UucmVmcmVzaF90b2tlbn0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KS5lcnJvcihmdW5jdGlvbiAoZXJyLCBzdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBfbG9nT3V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBmdW5jdGlvbiBfbG9nT3V0KCkge1xyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2VTZXJ2aWNlLnJlbW92ZSgnYXV0aG9yaXphdGlvbkRhdGEnKTtcclxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gJy9sb2dpbic7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgdmFyIHNlcnZpY2UgPSB7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGZpbGxBdXRoRGF0YTogX2ZpbGxBdXRoRGF0YSxcclxuICAgICAgICAgICAgcmVmcmVzaFRva2VuOiBfcmVmcmVzaFRva2VuLFxyXG4gICAgICAgICAgICBsb2dPdXQ6IF9sb2dPdXQsXHJcbiAgICAgICAgICAgIHNldENhc2EgOiBfc2V0Q2FzYVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiBzZXJ2aWNlO1xyXG5cclxuICAgICAgICBcclxuICAgIH1cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdkdXgnKVxyXG4gICAgICAgIC5jb250cm9sbGVyKCdsaXN0YUdlcmFsQ29udHJvbGxlcicsIGxpc3RhR2VyYWxDb250cm9sbGVyKTtcclxuXHJcbiAgICBsaXN0YUdlcmFsQ29udHJvbGxlci4kaW5qZWN0ID0gWyduZ0RpYWxvZycsICd0b2FzdHInLCAnJGxvY2F0aW9uJywgJyRzdGF0ZVBhcmFtcycsICckc2NvcGUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnRXZlbnRvU2VydmljZScsICdQb3J0YXJpYVNlcnZpY2UnLCAnJHJvb3RTY29wZSddO1xyXG5cclxuICAgIGZ1bmN0aW9uIGxpc3RhR2VyYWxDb250cm9sbGVyKG5nRGlhbG9nLCB0b2FzdHIsICRsb2NhdGlvbiwgJHN0YXRlUGFyYW1zLCAkc2NvcGUsIEV2ZW50b1NlcnZpY2UsIFBvcnRhcmlhU2VydmljZSwgJHJvb3RTY29wZSkge1xyXG4gICAgICAgIC8qIGpzaGludCB2YWxpZHRoaXM6dHJ1ZSAqL1xyXG4gICAgICAgIHZhciB2bSA9IHRoaXM7XHJcblxyXG4gICAgICAgIHZtLm5vbWVzID0gW107XHJcbiAgICAgICAgdm0uZXZlbnRvID0ge307XHJcblxyXG4gICAgICAgIGFjdGl2YXRlKCk7XHJcblxyXG5cclxuICAgICAgICBmdW5jdGlvbiBhY3RpdmF0ZSgpIHtcclxuICAgICAgICAgICAgdmFyIGlkID0gJHN0YXRlUGFyYW1zLmlkO1xyXG5cclxuICAgICAgICAgICAgY2FycmVnYU5vbWVzKGlkKTtcclxuICAgICAgICAgICAgY2FycmVnYUV2ZW50byhpZCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNhcnJlZ2FOb21lcyhldmVudG9JZCkge1xyXG4gICAgICAgICAgICBQb3J0YXJpYVNlcnZpY2UuZ2V0Tm9tZXNFdmVudG8oZXZlbnRvSWQpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICB2bS5ub21lcyA9IHJlc3BvbnNlLmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY2FycmVnYUV2ZW50byhldmVudG9JZCkge1xyXG4gICAgICAgICAgICBFdmVudG9TZXJ2aWNlLmdldEV2ZW50byhldmVudG9JZCkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIHZtLmV2ZW50byA9IHJlc3BvbnNlLmRhdGE7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkcm9vdFNjb3BlLiRvbigncGVzcXVpc2EnLCBmdW5jdGlvbiAoZSwgb2JqKSB7XHJcbiAgICAgICAgICAgIHZtLnBlc3F1aXNhID0gb2JqLnBlc3F1aXNhO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB2bS5jb25mUHJlc2VuY2EgPSBmdW5jdGlvbiAobm9tZSkge1xyXG4gICAgICAgICAgICBpZiAoIW5vbWUucHJlc2VuY2FDb25mKSB7XHJcbiAgICAgICAgICAgICAgICBub21lLnByZXNlbmNhQ29uZiA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgUG9ydGFyaWFTZXJ2aWNlLmNvbmZQcmVzZW5jYShub21lLmxpc3RhSWQsIG5vbWUuaWQpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9hc3RyLmluZm8oXCJQcmVzZW7Dp2EgZGUgXCIgKyBub21lLm5vbWUgKyBcIiBjb25maXJtYWRhXCIsIFwiUHJlc2Vuw6dhIGNvbmZpcm1hZGFcIik7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vbWUucHJlc2VuY2FDb25mID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9hc3RyLmVycm9yKFwiT2NvcnJldSB1bSBlcnJvIGFvIGNvbmZpcm1hciBhIHByZXNlbsOnYSBkZSBcIiArIG5vbWUubm9tZSwgXCJFcnJvXCIpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSkoKTtcclxuIiwiKGZ1bmN0aW9uICgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnZHV4JylcclxuICAgICAgICAuY29udHJvbGxlcignbGlzdGFzUG9ydGFyaWFDb250cm9sbGVyJywgbGlzdGFzUG9ydGFyaWFDb250cm9sbGVyKTtcclxuXHJcbiAgICBsaXN0YXNQb3J0YXJpYUNvbnRyb2xsZXIuJGluamVjdCA9IFsnJGxvY2F0aW9uJywgJyRzdGF0ZVBhcmFtcycsICdMaXN0YXNTZXJ2aWNlJywgJ0V2ZW50b1NlcnZpY2UnXTtcclxuXHJcbiAgICBmdW5jdGlvbiBsaXN0YXNQb3J0YXJpYUNvbnRyb2xsZXIoJGxvY2F0aW9uLCAkc3RhdGVQYXJhbXMsIExpc3Rhc1NlcnZpY2UsIEV2ZW50b1NlcnZpY2UpIHtcclxuICAgICAgICAvKiBqc2hpbnQgdmFsaWR0aGlzOnRydWUgKi9cclxuICAgICAgICB2YXIgdm0gPSB0aGlzO1xyXG5cclxuICAgICAgICB2bS5saXN0YXMgPSBbXTtcclxuXHJcbiAgICAgICAgdm0uZXZlbnRvID0ge307XHJcblxyXG4gICAgICAgIGFjdGl2YXRlKCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gYWN0aXZhdGUoKSB7XHJcbiAgICAgICAgICAgIHZtLmV2ZW50b0lkID0gJHN0YXRlUGFyYW1zLmlkO1xyXG5cclxuICAgICAgICAgICAgaWYgKHZtLmV2ZW50b0lkID09IHVuZGVmaW5lZCB8fCB2bS5ldmVudG9JZCA9PSAnJykge1xyXG4gICAgICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoJy9FdmVudG9zL0FnZW5kYScpXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIEV2ZW50b1NlcnZpY2UuZ2V0RXZlbnRvKHZtLmV2ZW50b0lkKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgdm0uZXZlbnRvID0gcmVzcG9uc2UuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBMaXN0YXNTZXJ2aWNlLmdldExpc3Rhcyh2bS5ldmVudG9JZCkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIHZtLmxpc3RhcyA9IHJlc3BvbnNlLmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pKCk7XHJcbiIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2R1eCcpXHJcbiAgICAgICAgLmNvbnRyb2xsZXIoJ25vbWVzTGlzdGFDb250cm9sbGVyJywgbm9tZXNMaXN0YUNvbnRyb2xsZXIpO1xyXG5cclxuICAgIG5vbWVzTGlzdGFDb250cm9sbGVyLiRpbmplY3QgPSBbJ25nRGlhbG9nJywgJ3RvYXN0cicsICckbG9jYXRpb24nLCAnJHN0YXRlUGFyYW1zJywgJyRzY29wZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdMaXN0YXNTZXJ2aWNlJywgJ1BvcnRhcmlhU2VydmljZScsICckcm9vdFNjb3BlJ107XHJcblxyXG4gICAgZnVuY3Rpb24gbm9tZXNMaXN0YUNvbnRyb2xsZXIobmdEaWFsb2csIHRvYXN0ciwgJGxvY2F0aW9uLCAkc3RhdGVQYXJhbXMsICRzY29wZSwgTGlzdGFzU2VydmljZSwgUG9ydGFyaWFTZXJ2aWNlLCAkcm9vdFNjb3BlKSB7XHJcbiAgICAgICAgLyoganNoaW50IHZhbGlkdGhpczp0cnVlICovXHJcbiAgICAgICAgdmFyIHZtID0gdGhpcztcclxuXHJcbiAgICAgICAgdm0ubm9tZXMgPSBbXTtcclxuICAgICAgICB2bS5saXN0YSA9IHt9O1xyXG5cclxuICAgICAgICBhY3RpdmF0ZSgpO1xyXG5cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gYWN0aXZhdGUoKSB7XHJcbiAgICAgICAgICAgIHZhciBpZCA9ICRzdGF0ZVBhcmFtcy5pZDtcclxuXHJcbiAgICAgICAgICAgIGNhcnJlZ2FOb21lcyhpZCk7XHJcblxyXG4gICAgICAgICAgICBMaXN0YXNTZXJ2aWNlLmdldExpc3RhKGlkKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgdm0ubGlzdGEgPSByZXNwb25zZS5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBmdW5jdGlvbiBjYXJyZWdhTm9tZXMobGlzdGFJZCkge1xyXG4gICAgICAgICAgICBQb3J0YXJpYVNlcnZpY2UuZ2V0Tm9tZXMobGlzdGFJZCkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIHZtLm5vbWVzID0gcmVzcG9uc2UuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkcm9vdFNjb3BlLiRvbigncGVzcXVpc2EnLCBmdW5jdGlvbiAoZSwgb2JqKSB7XHJcbiAgICAgICAgICAgIHZtLnBlc3F1aXNhID0gb2JqLnBlc3F1aXNhO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB2bS5jb25mUHJlc2VuY2EgPSBmdW5jdGlvbiAobm9tZSkge1xyXG4gICAgICAgICAgICBpZiAoIW5vbWUucHJlc2VuY2FDb25mKSB7XHJcbiAgICAgICAgICAgICAgICBub21lLnByZXNlbmNhQ29uZiA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgUG9ydGFyaWFTZXJ2aWNlLmNvbmZQcmVzZW5jYSh2bS5saXN0YS5pZCwgbm9tZS5pZCkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICB0b2FzdHIuaW5mbyhcIlByZXNlbsOnYSBkZSBcIiArIG5vbWUubm9tZSArIFwiIGNvbmZpcm1hZGFcIiwgXCJQcmVzZW7Dp2EgY29uZmlybWFkYVwiKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9tZS5wcmVzZW5jYUNvbmYgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0b2FzdHIuZXJyb3IoXCJPY29ycmV1IHVtIGVycm8gYW8gY29uZmlybWFyIGEgcHJlc2Vuw6dhIGRlIFwiICsgbm9tZS5ub21lLCBcIkVycm9cIik7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KSgpO1xyXG4iLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdkdXgnKVxyXG4gICAgICAgIC5mYWN0b3J5KCdQb3J0YXJpYVNlcnZpY2UnLCBQb3J0YXJpYVNlcnZpY2UpO1xyXG5cclxuICAgIFBvcnRhcmlhU2VydmljZS4kaW5qZWN0ID0gWyckaHR0cCddO1xyXG5cclxuICAgIGZ1bmN0aW9uIFBvcnRhcmlhU2VydmljZSgkaHR0cCkge1xyXG5cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gX2dldE5vbWVzKGxpc3RhSWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCgnYXBpL25vbWVMaXN0YS9nZXRub21lcy8nICsgbGlzdGFJZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBfY29uZlByZXNlbmNhKGxpc3RhSWQsIG5vbWVJZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdCgnYXBpL25vbWVMaXN0YS9jb25mcHJlc2VuY2EnLCB7ICdsaXN0YUlkJzogbGlzdGFJZCwgJ25vbWVJZCc6IG5vbWVJZCB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIF9nZXROb21lc0V2ZW50byhldmVudG9JZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCdhcGkvbm9tZUxpc3RhL2dldE5vbWVzRXZlbnRvLycgKyBldmVudG9JZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgc2VydmljZSA9IHtcclxuICAgICAgICAgICAgZ2V0Tm9tZXM6IF9nZXROb21lcyxcclxuICAgICAgICAgICAgY29uZlByZXNlbmNhOiBfY29uZlByZXNlbmNhLFxyXG4gICAgICAgICAgICBnZXROb21lc0V2ZW50bzogX2dldE5vbWVzRXZlbnRvXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHNlcnZpY2U7XHJcbiAgICB9XHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnZHV4JylcclxuICAgICAgICAuY29udHJvbGxlcignZGlzdHJpYnVpY2FvQ29udHJvbGxlcicsIGRpc3RyaWJ1aWNhb0NvbnRyb2xsZXIpO1xyXG5cclxuICAgIGRpc3RyaWJ1aWNhb0NvbnRyb2xsZXIuJGluamVjdCA9IFsnJGxvY2F0aW9uJywgJ1VzZXJTZXJ2aWNlJywgJyRzdGF0ZVBhcmFtcycsICd0b2FzdHInLCAnRGlzdHJpYnVpY2FvU2VydmljZSddOyBcclxuXHJcbiAgICBmdW5jdGlvbiBkaXN0cmlidWljYW9Db250cm9sbGVyKCRsb2NhdGlvbiwgVXNlclNlcnZpY2UsICRzdGF0ZVBhcmFtcywgdG9hc3RyLCBEaXN0cmlidWljYW9TZXJ2aWNlKSB7XHJcbiAgICAgICAgLyoganNoaW50IHZhbGlkdGhpczp0cnVlICovXHJcbiAgICAgICAgdmFyIHZtID0gdGhpcztcclxuXHJcbiAgICAgICAgdm0uZGlzdCA9IHsgXHJcbiAgICAgICAgICAgIGRpc3RyaWJ1aWNvZXM6IFtdLFxyXG4gICAgICAgICAgICBsaXN0YUlkOiAwXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIGFjdGl2YXRlKCk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGFjdGl2YXRlKCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIGlkID0gJHN0YXRlUGFyYW1zLmlkO1xyXG4gICAgICAgICAgICB2YXIgbGlzdGFJZCA9ICRzdGF0ZVBhcmFtcy5saXN0YUlkO1xyXG5cclxuICAgICAgICAgICAgaWYgKGxpc3RhSWQgPT09IHVuZGVmaW5lZCB8fCBsaXN0YUlkID09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAkbG9jYXRpb24ucGF0aCgnL0V2ZW50b3MvQWdlbmRhJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIERpc3RyaWJ1aWNhb1NlcnZpY2UuZ2V0RGlzdChsaXN0YUlkKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgdm0uZGlzdC5kaXN0cmlidWljb2VzID0gcmVzcG9uc2UuZGF0YTtcclxuICAgICAgICAgICAgICAgIHZtLmRpc3QubGlzdGFJZCA9IGxpc3RhSWQ7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHZtLnNhbHZhRGlzdHJpYnVpY2FvID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBEaXN0cmlidWljYW9TZXJ2aWNlLnNhbHZhRGlzdHJpYnVpY2FvKHZtLmRpc3QpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICB0b2FzdHIuc3VjY2VzcyhcIk9zIGNvbnZpZGFkb3MgZm9yYW0gZGlzdHJpYnXDrWRvcyBjb20gc3VjZXNzb1wiLCBcIkRpc3RyaWJ1w61kb3NcIik7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIHRvYXN0ci5lcnJvcihcIk9jb3JyZXUgdW0gZXJybyBhbyBkaXN0cmlidWlyIG9zIGNvbnZpZGFkb3MsIHRlbnRlIG5vdmFtZW50ZSBhcMOzcyBhbGd1bSB0ZW1wb1wiLCBcIkVycm9cIik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSkoKTtcclxuIiwiKGZ1bmN0aW9uICgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnZHV4JylcclxuICAgICAgICAuZmFjdG9yeSgnRGlzdHJpYnVpY2FvU2VydmljZScsIERpc3RyaWJ1aWNhb1NlcnZpY2UpO1xyXG5cclxuICAgIERpc3RyaWJ1aWNhb1NlcnZpY2UuJGluamVjdCA9IFsnJGh0dHAnXTtcclxuXHJcbiAgICBmdW5jdGlvbiBEaXN0cmlidWljYW9TZXJ2aWNlKCRodHRwKSB7ICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICBmdW5jdGlvbiBfc2FsdmFEaXN0cmlidWljYW8oZGlzdCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdCgnYXBpL2Rpc3RyaWJ1aWNhbycsIGRpc3QpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gX2dldERpc3QoaWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCgnYXBpL2Rpc3RyaWJ1aWNhby8nICsgaWQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gX2dldFF0ZE5vbWVzKGxpc3RhSWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCgnYXBpL2Rpc3RyaWJ1aWNhby9nZXRxdGRub21lcy8nICsgbGlzdGFJZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgc2VydmljZSA9IHtcclxuICAgICAgICAgICAgc2FsdmFEaXN0cmlidWljYW86IF9zYWx2YURpc3RyaWJ1aWNhbyxcclxuICAgICAgICAgICAgZ2V0RGlzdDogX2dldERpc3QsXHJcbiAgICAgICAgICAgIGdldFF0ZE5vbWVzIDogX2dldFF0ZE5vbWVzXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHNlcnZpY2U7XHJcbiAgICB9XHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnZHV4JylcclxuICAgICAgICAuY29udHJvbGxlcignY29uc3VsdGFMaXN0YXNDb250cm9sbGVyJywgY29uc3VsdGFMaXN0YXNDb250cm9sbGVyKTtcclxuXHJcbiAgICBjb25zdWx0YUxpc3Rhc0NvbnRyb2xsZXIuJGluamVjdCA9IFsnJGxvY2F0aW9uJywgJyRzdGF0ZVBhcmFtcycsICdMaXN0YXNTZXJ2aWNlJ107IFxyXG5cclxuICAgIGZ1bmN0aW9uIGNvbnN1bHRhTGlzdGFzQ29udHJvbGxlcigkbG9jYXRpb24sICRzdGF0ZVBhcmFtcywgTGlzdGFzU2VydmljZSkge1xyXG4gICAgICAgIC8qIGpzaGludCB2YWxpZHRoaXM6dHJ1ZSAqL1xyXG4gICAgICAgIHZhciB2bSA9IHRoaXM7XHJcblxyXG4gICAgICAgIHZtLmxpc3RhcyA9IFtdO1xyXG5cclxuICAgICAgICBhY3RpdmF0ZSgpO1xyXG5cclxuXHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGFjdGl2YXRlKCkge1xyXG4gICAgICAgICAgICB2bS5ldmVudG9JZCA9ICRzdGF0ZVBhcmFtcy5pZDtcclxuXHJcbiAgICAgICAgICAgIGlmICh2bS5ldmVudG9JZCA9PSB1bmRlZmluZWQgfHwgdm0uZXZlbnRvSWQgPT0gJycpIHtcclxuICAgICAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKCcvRXZlbnRvcy9BZ2VuZGEnKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBMaXN0YXNTZXJ2aWNlLmdldExpc3Rhcyh2bS5ldmVudG9JZCkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIHZtLmxpc3RhcyA9IHJlc3BvbnNlLmRhdGE7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KSgpO1xyXG4iLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdkdXgnKVxyXG4gICAgICAgIC5jb250cm9sbGVyKCdjcmlhckxpc3RhQ29udHJvbGxlcicsIGNyaWFyTGlzdGFDb250cm9sbGVyKTtcclxuXHJcbiAgICBjcmlhckxpc3RhQ29udHJvbGxlci4kaW5qZWN0ID0gWyckbG9jYXRpb24nLCAnUGVyZmlzU2VydmljZScsICdMaXN0YXNTZXJ2aWNlJywgJyRzdGF0ZVBhcmFtcycsICd0b2FzdHInXTsgXHJcblxyXG4gICAgZnVuY3Rpb24gY3JpYXJMaXN0YUNvbnRyb2xsZXIoJGxvY2F0aW9uLCBQZXJmaXNTZXJ2aWNlLCBMaXN0YXNTZXJ2aWNlLCAkc3RhdGVQYXJhbXMsIHRvYXN0cikge1xyXG4gICAgICAgIC8qIGpzaGludCB2YWxpZHRoaXM6dHJ1ZSAqL1xyXG4gICAgICAgIHZhciB2bSA9IHRoaXM7XHJcblxyXG4gICAgICAgIHZtLmxpc3RhID0ge307XHJcblxyXG4gICAgICAgIGFjdGl2YXRlKCk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGFjdGl2YXRlKCkge1xyXG4gICAgICAgICAgICB2bS5wZXJmaWxTZWxlY2lvbmFkbyA9ICcnO1xyXG4gICAgICAgICAgICB2YXIgaWQgPSAkc3RhdGVQYXJhbXMuaWQ7XHJcbiAgICAgICAgICAgIHZhciBldmVudG9JZCA9ICRzdGF0ZVBhcmFtcy5ldmVudG9JZDtcclxuXHJcbiAgICAgICAgICAgIGlmIChldmVudG9JZCA9PT0gdW5kZWZpbmVkIHx8IGV2ZW50b0lkID09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAkbG9jYXRpb24ucGF0aCgnL0V2ZW50by9MaXN0YXMnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdm0ubGlzdGEuZXZlbnRvSWQgPSBldmVudG9JZDtcclxuXHJcbiAgICAgICAgICAgIGlmIChpZCA9PT0gdW5kZWZpbmVkIHx8IGlkID09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICB2bS5lZGl0YXIgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZtLmVkaXRhciA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgTGlzdGFzU2VydmljZS5nZXRMaXN0YShpZCkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICB2bS5saXN0YSA9IHJlc3BvbnNlLmRhdGE7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBQZXJmaXNTZXJ2aWNlLmdldFBlcmZpc0Rpc3RyaWJ1aWNhbygpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICB2bS5wZXJmaXNEaXN0ID0gcmVzcG9uc2UuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2bS5zYWx2YUxpc3RhID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBMaXN0YXNTZXJ2aWNlLnNhbHZhTGlzdGEodm0ubGlzdGEpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodm0uZWRpdGFyID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0b2FzdHIuc3VjY2VzcyhcIkEgbGlzdGEgXCIgKyB2bS5saXN0YS5ub21lTGlzdGEgKyBcIiBmb2kgZWRpdGFkYSBjb20gc3VjZXNzb1wiLCBcIkVkaXRhZG9cIilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRvYXN0ci5zdWNjZXNzKFwiQSBsaXN0YSBcIiArIHZtLmxpc3RhLm5vbWVMaXN0YSArIFwiIGZvaSBzYWx2YSBjb20gc3VjZXNzb1wiLCBcIlNhbHZvXCIpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAkbG9jYXRpb24ucGF0aCgnL0V2ZW50by8nICsgdm0uZXZlbnRvSWQgKyAnL0xpc3RhcycpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09IDQwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIF9zaG93VmFsaWRhdGlvbkVycm9ycyh2bSwgcmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9hc3RyLmVycm9yKCdBY29udGVjZXUgdW0gZXJybyBhbyBzYWx2YXIgc3VhIExpc3RhLCB0ZW50ZSBub3ZhbWVudGUgYXDDs3MgdW0gdGVtcG8nLCAnRXJybycpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBmdW5jdGlvbiBfc2hvd1ZhbGlkYXRpb25FcnJvcnModm0sIGVycm9yKSB7XHJcbiAgICAgICAgICAgIHZtLnZhbGlkYXRpb25FcnJvcnMgPSBbXTtcclxuICAgICAgICAgICAgaWYgKGVycm9yLmRhdGEgJiYgYW5ndWxhci5pc09iamVjdChlcnJvci5kYXRhKSkge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIGVycm9yLmRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICB2bS52YWxpZGF0aW9uRXJyb3JzLnB1c2goZXJyb3IuZGF0YVtrZXldWzBdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZtLnZhbGlkYXRpb25FcnJvcnMucHVzaCgnTsOjbyBmb2kgcG9zc8OtdmVsIGFkaWNpb25hciBvIHBlcmZpbCcpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8vc2VsZWNpb25hIHBlcmZpbCBkaXN0cmlidWljYW8gZHJvcGRvd24gbGlzdGFcclxuICAgICAgICB2bS5zZWxlY2lvbmFQZXJmaWwgPSBmdW5jdGlvbiAocGVyZmlsKSB7XHJcbiAgICAgICAgICAgIHZtLnBlcmZpbFNlbGVjaW9uYWRvID0gcGVyZmlsLm5vbWVQZXJmaWw7XHJcbiAgICAgICAgICAgIHZtLmxpc3RhLnBlcmZpbERpc3RyaWJ1aWNhb0lkID0gcGVyZmlsLmlkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9saW1wYSBwZXJmaWwgZGlzdHJpYnVpY2FvIGRyb3Bkb3duIGxpc3RhXHJcbiAgICAgICAgdm0ubGltcGFQZXJmaWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZtLnBlcmZpbFNlbGVjaW9uYWRvID0gbnVsbDtcclxuICAgICAgICAgICAgdm0ubGlzdGEucGVyZmlsRGlzdHJpYnVpY2FvSWQgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSkoKTtcclxuIiwiKGZ1bmN0aW9uICgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnZHV4JylcclxuICAgICAgICAuZmFjdG9yeSgnTGlzdGFzU2VydmljZScsIExpc3Rhc1NlcnZpY2UpO1xyXG5cclxuICAgIExpc3Rhc1NlcnZpY2UuJGluamVjdCA9IFsnJGh0dHAnXTtcclxuXHJcbiAgICBmdW5jdGlvbiBMaXN0YXNTZXJ2aWNlKCRodHRwKSB7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIF9nZXRMaXN0YShpZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCdhcGkvbGlzdGFzLycgKyBpZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBfc2FsdmFMaXN0YShsaXN0YSkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdCgnYXBpL2xpc3RhcycsIGxpc3RhKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIF9nZXRMaXN0YXMoZXZlbnRvSWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCgnYXBpL2xpc3Rhcy9nZXRMaXN0YXNFdmVudG8vJyArIGV2ZW50b0lkKTtcclxuICAgICAgICB9XHJcbiAgICAgICBcclxuXHJcbiAgICAgICAgdmFyIHNlcnZpY2UgPSB7XHJcbiAgICAgICAgICAgIGdldExpc3RhOiBfZ2V0TGlzdGEsXHJcbiAgICAgICAgICAgIHNhbHZhTGlzdGE6IF9zYWx2YUxpc3RhLFxyXG4gICAgICAgICAgICBnZXRMaXN0YXMgOiBfZ2V0TGlzdGFzXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHNlcnZpY2U7XHJcbiAgICB9XHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnZHV4JylcclxuICAgICAgICAuY29udHJvbGxlcignY3JpYXJQZXJmaWxEaXN0Q29udHJvbGxlcicsIGNyaWFyUGVyZmlsRGlzdENvbnRyb2xsZXIpO1xyXG5cclxuICAgIGNyaWFyUGVyZmlsRGlzdENvbnRyb2xsZXIuJGluamVjdCA9IFsnVXNlclNlcnZpY2UnICwgJ1BlcmZpc1NlcnZpY2UnLCd0b2FzdHInICwgJyRsb2NhdGlvbiddOyBcclxuXHJcbiAgICBmdW5jdGlvbiBjcmlhclBlcmZpbERpc3RDb250cm9sbGVyKFVzZXJTZXJ2aWNlLCBQZXJmaXNTZXJ2aWNlLCB0b2FzdHIsICRsb2NhdGlvbikge1xyXG4gICAgICAgIC8qIGpzaGludCB2YWxpZHRoaXM6dHJ1ZSAqL1xyXG4gICAgICAgIHZhciB2bSA9IHRoaXM7XHJcbiAgICAgICAgdm0ucGVyZmlsID0ge1xyXG4gICAgICAgICAgICBub21lUGVyZmlsOiAnJyxcclxuICAgICAgICAgICAgbGF5b3V0c0Rpc3RyaWJ1aWNhbyA6IFtdXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgYWN0aXZhdGUoKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gYWN0aXZhdGUoKSB7XHJcblxyXG4gICAgICAgICAgICBVc2VyU2VydmljZS5nZXRVc3Vhcmlvc0Rpc3QoKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHVzdWFyaW9zID0gcmVzcG9uc2UuZGF0YTtcclxuXHJcbiAgICAgICAgICAgICAgICB1c3Vhcmlvcy5mb3JFYWNoKGZ1bmN0aW9uICh1c3VhcmlvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdm0uZGlzdHJpYnVpY29lcy5sYXlvdXRzRGlzdHJpYnVpY2FvLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1c3VhcmlvSWQ6IHVzdWFyaW8uaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vbWU6IHVzdWFyaW8ubm9tZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcXRkTm9tZXNNOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBxdGROb21lc0Y6IDBcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdm0uc2FsdmFQZXJmaWwgPSBmdW5jdGlvbiAocGVyZmlsKSB7XHJcbiAgICAgICAgICAgIHZtLnZhbGlkYXRpb25FcnJvcnMgPSBbXTtcclxuICAgICAgICAgICAgUGVyZmlzU2VydmljZS5zYWx2YVBlcmZpbERpc3QocGVyZmlsKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRvYXN0ci5zdWNjZXNzKCdPIHBlcmZpbCBmb2kgc2Fsdm8gY29tIHN1Y2Vzc28nLCAnU2Fsdm8nKTtcclxuICAgICAgICAgICAgICAgICAgICAkbG9jYXRpb24ucGF0aCgnL0Rpc3RyaWJ1aWNhbycpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09IDQwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfc2hvd1ZhbGlkYXRpb25FcnJvcnModm0sIHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvYXN0ci5lcnJvcignQWNvbnRlY2V1IHVtIGVycm8gYW8gc2FsdmFyIHNldSBwZXJmaWwsIHRlbnRlIG5vdmFtZW50ZSBhcMOzcyB1bSB0ZW1wbycsICdFcnJvJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBfc2hvd1ZhbGlkYXRpb25FcnJvcnModm0sIGVycm9yKSB7XHJcbiAgICAgICAgICAgIHZtLnZhbGlkYXRpb25FcnJvcnMgPSBbXTtcclxuICAgICAgICAgICAgaWYgKGVycm9yLmRhdGEgJiYgYW5ndWxhci5pc09iamVjdChlcnJvci5kYXRhKSkge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIGVycm9yLmRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICB2bS52YWxpZGF0aW9uRXJyb3JzLnB1c2goZXJyb3IuZGF0YVtrZXldWzBdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZtLnZhbGlkYXRpb25FcnJvcnMucHVzaCgnTsOjbyBmb2kgcG9zc8OtdmVsIGFkaWNpb25hciBvIHBlcmZpbCcpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSkoKTtcclxuIiwiKGZ1bmN0aW9uICgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnZHV4JylcclxuICAgICAgICAuY29udHJvbGxlcignY3JpYXJQZXJmaWxMaXN0YUNvbnRyb2xsZXInLCBjcmlhclBlcmZpbExpc3RhQ29udHJvbGxlcik7XHJcblxyXG4gICAgY3JpYXJQZXJmaWxMaXN0YUNvbnRyb2xsZXIuJGluamVjdCA9IFsnbmdEaWFsb2cnLCAnJHNjb3BlJywgJ1BlcmZpc1NlcnZpY2UnLCAndG9hc3RyJywgJyRsb2NhdGlvbicsICckc3RhdGVQYXJhbXMnXTtcclxuXHJcbiAgICBmdW5jdGlvbiBjcmlhclBlcmZpbExpc3RhQ29udHJvbGxlcihuZ0RpYWxvZywgJHNjb3BlLCBQZXJmaXNTZXJ2aWNlLCB0b2FzdHIsICRsb2NhdGlvbiwgJHN0YXRlUGFyYW1zKSB7XHJcbiAgICAgICAgLyoganNoaW50IHZhbGlkdGhpczp0cnVlICovXHJcbiAgICAgICAgdmFyIHZtID0gdGhpcztcclxuXHJcbiAgICAgICAgYWN0aXZhdGUoKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gYWN0aXZhdGUoKSB7XHJcbiAgICAgICAgICAgIHJlc2V0YUxpc3RhKCk7XHJcbiAgICAgICAgICAgIHJlc2V0YUFnZW5kKCk7XHJcbiAgICAgICAgICAgICRzY29wZS5wZXJmaWxTZWxlY2lvbmFkbyA9ICcnO1xyXG5cclxuICAgICAgICAgICAgdm0ucGVyZmlsID0ge1xyXG4gICAgICAgICAgICAgICAgbm9tZVBlcmZpbDogJycsXHJcbiAgICAgICAgICAgICAgICBvYnNlcnZhY29lczogJycsXHJcbiAgICAgICAgICAgICAgICBsYXlvdXRMaXN0YXM6IFtdXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB2YXIgaWQgPSAkc3RhdGVQYXJhbXMuaWQ7XHJcblxyXG4gICAgICAgICAgICBpZiAoaWQgPT09IHVuZGVmaW5lZCB8fCBpZCA9PSAnJykge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLmVkaXRhciA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLmVkaXRhciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBQZXJmaXNTZXJ2aWNlLmdldFBlcmZpbExpc3RhKGlkKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZtLnBlcmZpbCA9IHJlc3BvbnNlLmRhdGE7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFBlcmZpc1NlcnZpY2UuZ2V0UGVyZmlzRGlzdHJpYnVpY2FvKCkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5wZXJmaXNEaXN0ID0gcmVzcG9uc2UuZGF0YTtcclxuICAgICAgICAgICAgfSk7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBzZWxlY2lvbmFQZXJmaWxEaXN0KGlkUGVyZmlsKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgJHNjb3BlLnBlcmZpc0Rpc3QubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgcGVyZmlsRGlzdCA9ICRzY29wZS5wZXJmaXNEaXN0W2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKHBlcmZpbERpc3QuaWQgPT0gaWRQZXJmaWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUucGVyZmlsU2VsZWNpb25hZG8gPSBwZXJmaWxEaXN0Lm5vbWVQZXJmaWw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvL3NlbGVjaW9uYSBwZXJmaWwgZGlzdHJpYnVpY2FvIGRyb3Bkb3duIGxpc3RhXHJcbiAgICAgICAgJHNjb3BlLnNlbGVjaW9uYVBlcmZpbCA9IGZ1bmN0aW9uIChwZXJmaWwpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnBlcmZpbFNlbGVjaW9uYWRvID0gcGVyZmlsLm5vbWVQZXJmaWw7XHJcbiAgICAgICAgICAgICRzY29wZS5saXN0YS5wZXJmaWxEaXN0cmlidWljYW9JZCA9IHBlcmZpbC5pZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vbGltcGEgcGVyZmlsIGRpc3RyaWJ1aWNhbyBkcm9wZG93biBsaXN0YVxyXG4gICAgICAgICRzY29wZS5saW1wYVBlcmZpbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnBlcmZpbFNlbGVjaW9uYWRvID0gbnVsbDtcclxuICAgICAgICAgICAgJHNjb3BlLmxpc3RhLnBlcmZpbERpc3RyaWJ1aWNhb0lkID0gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRzY29wZS5hZGRBZ2VuZGFtZW50byA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmxpc3RhLmxheW91dEFnZW5kYW1lbnRvcy5wdXNoKCRzY29wZS5hZ2VuZCk7XHJcbiAgICAgICAgICAgIHJlc2V0YUFnZW5kKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkc2NvcGUuYWRkTGlzdGEgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZtLnBlcmZpbC5sYXlvdXRMaXN0YXMucHVzaCgkc2NvcGUubGlzdGEpO1xyXG4gICAgICAgICAgICByZXNldGFMaXN0YSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJHNjb3BlLmVkaXRhTGlzdGEgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZtLnBlcmZpbC5sYXlvdXRMaXN0YXNbJHNjb3BlLmluZGV4TGlzdGFdID0gJHNjb3BlLmxpc3RhO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJHNjb3BlLnJlbW92ZUFnZW5kID0gZnVuY3Rpb24gKGFnZW5kKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5saXN0YS5sYXlvdXRBZ2VuZGFtZW50b3Muc3BsaWNlKCRzY29wZS5saXN0YS5sYXlvdXRBZ2VuZGFtZW50b3MuaW5kZXhPZihhZ2VuZCksIDEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdm0ucmVtb3ZlTGlzdGEgPSBmdW5jdGlvbiAoaW5kZXgpIHtcclxuICAgICAgICAgICAgdm0ucGVyZmlsLmxheW91dExpc3Rhcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdm0uc2FsdmFQZXJmaWwgPSBmdW5jdGlvbiAocGVyZmlsKSB7XHJcbiAgICAgICAgICAgIHZtLnZhbGlkYXRpb25FcnJvcnMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIFBlcmZpc1NlcnZpY2Uuc2FsdmFQZXJmaWxMaXN0YShwZXJmaWwpXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCRzY29wZS5lZGl0YXIgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b2FzdHIuc3VjY2VzcygnTyBwZXJmaWwgZm9pIGVkaXRhZG8gY29tIHN1Y2Vzc28nLCAnRWRpdGFkbycpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9hc3RyLnN1Y2Nlc3MoJ08gcGVyZmlsIGZvaSBzYWx2byBjb20gc3VjZXNzbycsICdTYWx2bycpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAkbG9jYXRpb24ucGF0aCgnL1BlcmZpcy9MaXN0YXMnKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PSA0MDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3Nob3dWYWxpZGF0aW9uRXJyb3JzKHZtLCByZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b2FzdHIuZXJyb3IoJ0Fjb250ZWNldSB1bSBlcnJvIGFvIHNhbHZhciBzZXUgcGVyZmlsLCB0ZW50ZSBub3ZhbWVudGUgYXDDs3MgdW0gdGVtcG8nLCAnRXJybycpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdm0ub3BlbkVkaXRhTGlzdGEgPSBmdW5jdGlvbiAobGlzdGEpIHtcclxuICAgICAgICAgICAgc2VsZWNpb25hUGVyZmlsRGlzdChsaXN0YS5wZXJmaWxEaXN0cmlidWljYW9JZCk7XHJcbiAgICAgICAgICAgICRzY29wZS5pbmRleExpc3RhID0gdm0ucGVyZmlsLmxheW91dExpc3Rhcy5pbmRleE9mKGxpc3RhKTtcclxuICAgICAgICAgICAgJHNjb3BlLmVkaXRhckxpc3RhID0gdHJ1ZTtcclxuICAgICAgICAgICAgJHNjb3BlLmxpc3RhID0gYW5ndWxhci5jb3B5KGxpc3RhKTtcclxuICAgICAgICAgICAgdm0ub3BlbkFkZExpc3RhKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2bS5vcGVuQWRkTGlzdGEgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIG5nRGlhbG9nLm9wZW4oe1xyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6ICdhZGRMaXN0YScsXHJcbiAgICAgICAgICAgICAgICBzY29wZTogJHNjb3BlLFxyXG4gICAgICAgICAgICAgICAgY2xvc2VCeURvY3VtZW50IDogZmFsc2VcclxuICAgICAgICAgICAgfSkuY2xvc2VQcm9taXNlLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLmluZGV4TGlzdGEgPSAwO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLmVkaXRhckxpc3RhID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICByZXNldGFMaXN0YSgpO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGlvbiA9ICRzY29wZS5zdGVwc1swXTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICRzY29wZS5vcGVuQWRkQWdlbmQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIG5nRGlhbG9nLm9wZW4oe1xyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6ICdhZGRBZ2VuZCcsXHJcbiAgICAgICAgICAgICAgICBzY29wZTogJHNjb3BlLFxyXG4gICAgICAgICAgICAgICAgY2xvc2VCeURvY3VtZW50IDogZmFsc2VcclxuICAgICAgICAgICAgfSkuY2xvc2VQcm9taXNlLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmVzZXRhQWdlbmQoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG5cclxuICAgICAgICBmdW5jdGlvbiBfc2hvd1ZhbGlkYXRpb25FcnJvcnModm0sIGVycm9yKSB7XHJcbiAgICAgICAgICAgIHZtLnZhbGlkYXRpb25FcnJvcnMgPSBbXTtcclxuICAgICAgICAgICAgaWYgKGVycm9yLmRhdGEgJiYgYW5ndWxhci5pc09iamVjdChlcnJvci5kYXRhKSkge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIGVycm9yLmRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICB2bS52YWxpZGF0aW9uRXJyb3JzLnB1c2goZXJyb3IuZGF0YVtrZXldWzBdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZtLnZhbGlkYXRpb25FcnJvcnMucHVzaCgnTsOjbyBmb2kgcG9zc8OtdmVsIGFkaWNpb25hciBvIHBlcmZpbCcpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICRzY29wZS5zdGVwcyA9IFtcclxuICAgICAgICAgICcxOiBMaXN0YScsXHJcbiAgICAgICAgICAnMjogRW50cmFkYScsXHJcbiAgICAgICAgICAnMzogQWdlbmRhbWVudG9zJ1xyXG4gICAgICAgIF07XHJcbiAgICAgICAgJHNjb3BlLnNlbGVjdGlvbiA9ICRzY29wZS5zdGVwc1swXTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmdldEN1cnJlbnRTdGVwSW5kZXggPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfLmluZGV4T2YoJHNjb3BlLnN0ZXBzLCAkc2NvcGUuc2VsZWN0aW9uKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuZ29Ub1N0ZXAgPSBmdW5jdGlvbiAoaW5kZXgpIHtcclxuICAgICAgICAgICAgaWYgKCFfLmlzVW5kZWZpbmVkKCRzY29wZS5zdGVwc1tpbmRleF0pKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuc2VsZWN0aW9uID0gJHNjb3BlLnN0ZXBzW2luZGV4XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5oYXNOZXh0U3RlcCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHN0ZXBJbmRleCA9ICRzY29wZS5nZXRDdXJyZW50U3RlcEluZGV4KCk7XHJcbiAgICAgICAgICAgIHZhciBuZXh0U3RlcCA9IHN0ZXBJbmRleCArIDE7XHJcbiAgICAgICAgICAgIHJldHVybiAhXy5pc1VuZGVmaW5lZCgkc2NvcGUuc3RlcHNbbmV4dFN0ZXBdKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuaGFzUHJldmlvdXNTdGVwID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgc3RlcEluZGV4ID0gJHNjb3BlLmdldEN1cnJlbnRTdGVwSW5kZXgoKTtcclxuICAgICAgICAgICAgdmFyIHByZXZpb3VzU3RlcCA9IHN0ZXBJbmRleCAtIDE7XHJcbiAgICAgICAgICAgIHJldHVybiAhXy5pc1VuZGVmaW5lZCgkc2NvcGUuc3RlcHNbcHJldmlvdXNTdGVwXSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmluY3JlbWVudFN0ZXAgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICgkc2NvcGUuaGFzTmV4dFN0ZXAoKSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0ZXBJbmRleCA9ICRzY29wZS5nZXRDdXJyZW50U3RlcEluZGV4KCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgbmV4dFN0ZXAgPSBzdGVwSW5kZXggKyAxO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGlvbiA9ICRzY29wZS5zdGVwc1tuZXh0U3RlcF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuZGVjcmVtZW50U3RlcCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKCRzY29wZS5oYXNQcmV2aW91c1N0ZXAoKSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0ZXBJbmRleCA9ICRzY29wZS5nZXRDdXJyZW50U3RlcEluZGV4KCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgcHJldmlvdXNTdGVwID0gc3RlcEluZGV4IC0gMTtcclxuICAgICAgICAgICAgICAgICRzY29wZS5zZWxlY3Rpb24gPSAkc2NvcGUuc3RlcHNbcHJldmlvdXNTdGVwXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHJlc2V0YUxpc3RhKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUubGlzdGEgPSB7XHJcbiAgICAgICAgICAgICAgICBpZDogMCxcclxuICAgICAgICAgICAgICAgIHBlcmZpbERpc3RyaWJ1aWNhb0lkOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgcHJlY29NOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgcHJlY29GOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgdmFsb3JDb25zdW1hTTogbnVsbCxcclxuICAgICAgICAgICAgICAgIHZhbG9yQ29uc3VtYUY6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBleGlnaXJSZzogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBleGlnaXJDZWx1bGFyOmZhbHNlLFxyXG4gICAgICAgICAgICAgICAgbGlzdGFNOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGxpc3RhRjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBsYXlvdXRBZ2VuZGFtZW50b3M6IFtdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgJHNjb3BlLnBlcmZpbFNlbGVjaW9uYWRvID0gJyc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiByZXNldGFBZ2VuZCgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmFnZW5kID0ge1xyXG4gICAgICAgICAgICAgICAgcXRkTWludXRvczogMCxcclxuICAgICAgICAgICAgICAgIHF0ZEhvcmFzOiAwLFxyXG4gICAgICAgICAgICAgICAgZGVwb2lzRXZlbnRvOiB0cnVlXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KSgpO1xyXG4iLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdkdXgnKVxyXG4gICAgICAgIC5jb250cm9sbGVyKCdlZGl0YXJQZXJmaWxEaXN0Q29udHJvbGxlcicsIGVkaXRhclBlcmZpbERpc3RDb250cm9sbGVyKTtcclxuXHJcbiAgICBlZGl0YXJQZXJmaWxEaXN0Q29udHJvbGxlci4kaW5qZWN0ID0gWyckc3RhdGVQYXJhbXMnICwgJ1BlcmZpc1NlcnZpY2UnLCAndG9hc3RyJ107IFxyXG5cclxuICAgIGZ1bmN0aW9uIGVkaXRhclBlcmZpbERpc3RDb250cm9sbGVyKCRzdGF0ZVBhcmFtcywgUGVyZmlzU2VydmljZSwgdG9hc3RyKSB7XHJcbiAgICAgICAgLyoganNoaW50IHZhbGlkdGhpczp0cnVlICovXHJcbiAgICAgICAgdmFyIHZtID0gdGhpcztcclxuICAgICAgICB2bS5wZXJmaWwgPSB7XHJcbiAgICAgICAgICAgIG5vbWVQZXJmaWw6ICcnLFxyXG4gICAgICAgICAgICBsYXlvdXRzRGlzdHJpYnVpY2FvIDogW11cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBhY3RpdmF0ZSgpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBhY3RpdmF0ZSgpIHtcclxuICAgICAgICAgICAgdmFyIHBlcmZpbElkID0gJHN0YXRlUGFyYW1zLnBlcmZpbElkO1xyXG5cclxuICAgICAgICAgICAgUGVyZmlzU2VydmljZS5nZXRFZGl0YXJEaXN0KHBlcmZpbElkKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgdm0ucGVyZmlsID0gcmVzcG9uc2UuZGF0YTtcclxuICAgICAgICAgICAgfSk7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdm0uZWRpdGFQZXJmaWwgPSBmdW5jdGlvbiAocGVyZmlsKSB7XHJcbiAgICAgICAgICAgIFBlcmZpc1NlcnZpY2UuZWRpdGFQZXJmaWxEaXN0KHBlcmZpbClcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0b2FzdHIuc3VjY2VzcygnTyBwZXJmaWwgZm9pIGVkaXRhZG8gY29tIHN1Y2Vzc28nLCAnRWRpdGFkbycpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09IDQwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfc2hvd1ZhbGlkYXRpb25FcnJvcnModm0sIHJlc3BvbnNlLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9hc3RyLmVycm9yKCdBY29udGVjZXUgdW0gZXJybyBhbyBlZGl0YXIgc2V1IHBlcmZpbCwgdGVudGUgbm92YW1lbnRlIGFww7NzIHVtIHRlbXBvJywgJ0Vycm8nKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIF9zaG93VmFsaWRhdGlvbkVycm9ycyh2bSwgZXJyb3IpIHtcclxuICAgICAgICAgICAgdm0udmFsaWRhdGlvbkVycm9ycyA9IFtdO1xyXG4gICAgICAgICAgICBpZiAoZXJyb3IuZGF0YSAmJiBhbmd1bGFyLmlzT2JqZWN0KGVycm9yLmRhdGEpKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gZXJyb3IuZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZtLnZhbGlkYXRpb25FcnJvcnMucHVzaChlcnJvci5kYXRhW2tleV1bMF0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdm0udmFsaWRhdGlvbkVycm9ycy5wdXNoKCdOw6NvIGZvaSBwb3Nzw612ZWwgRWRpdGFyIG8gcGVyZmlsJyk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KSgpO1xyXG4iLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdkdXgnKVxyXG4gICAgICAgIC5jb250cm9sbGVyKCdwZXJmaWxEaXN0cmlidWljYW9Db250cm9sbGVyJywgcGVyZmlsRGlzdHJpYnVpY2FvQ29udHJvbGxlcik7XHJcblxyXG4gICAgcGVyZmlsRGlzdHJpYnVpY2FvQ29udHJvbGxlci4kaW5qZWN0ID0gWydQZXJmaXNTZXJ2aWNlJywgJ25nRGlhbG9nJywgJ3RvYXN0ciddO1xyXG5cclxuICAgIGZ1bmN0aW9uIHBlcmZpbERpc3RyaWJ1aWNhb0NvbnRyb2xsZXIoUGVyZmlzU2VydmljZSwgbmdEaWFsb2csIHRvYXN0cikge1xyXG4gICAgICAgIHZhciB2bSA9IHRoaXM7ICAgICAgICBcclxuXHJcbiAgICAgICAgYWN0aXZhdGUoKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gYWN0aXZhdGUoKSB7XHJcbiAgICAgICAgICAgIFBlcmZpc1NlcnZpY2UuZ2V0UGVyZmlzRGlzdHJpYnVpY2FvKCkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIHZtLnBlcmZpcyA9IHJlc3BvbnNlLmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdm0uZXhjbHVpUGVyZmlsID0gZnVuY3Rpb24gKHBlcmZpbCkge1xyXG4gICAgICAgICAgICBuZ0RpYWxvZy5vcGVuQ29uZmlybSh7IHRlbXBsYXRlVXJsOiAnZXhjbHVpclBlcmZpbCcgfSkudGhlbihmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgUGVyZmlzU2VydmljZS5leGNsdWlQZXJmaWxEaXN0KHBlcmZpbC5pZCkudGhlbihmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZtLnBlcmZpcy5zcGxpY2Uodm0ucGVyZmlzLmluZGV4T2YocGVyZmlsKSwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9hc3RyLnN1Y2Nlc3MoJ1BlcmZpbCBFeGNsdWlkbyBjb20gc3VjZXNzbycsICdFeGNsdWlkbycpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRvYXN0ci5lcnJvcignT2NvcnJldSB1bSBlcnJvIGFvIGV4Y2x1aXIgbyBwZXJmaWwnLCAnRXJybycpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9KSAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSkoKTtcclxuIiwiKGZ1bmN0aW9uICgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnZHV4JylcclxuICAgICAgICAuY29udHJvbGxlcigncGVyZmlsTGlzdGFDb250cm9sbGVyJywgcGVyZmlsTGlzdGFDb250cm9sbGVyKTtcclxuXHJcbiAgICBwZXJmaWxMaXN0YUNvbnRyb2xsZXIuJGluamVjdCA9IFsnUGVyZmlzU2VydmljZScsICduZ0RpYWxvZycsICd0b2FzdHInXTtcclxuXHJcbiAgICBmdW5jdGlvbiBwZXJmaWxMaXN0YUNvbnRyb2xsZXIoUGVyZmlzU2VydmljZSwgbmdEaWFsb2csIHRvYXN0cikge1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciB2bSA9IHRoaXM7ICAgICAgICBcclxuXHJcbiAgICAgICAgYWN0aXZhdGUoKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gYWN0aXZhdGUoKSB7XHJcbiAgICAgICAgICAgIFBlcmZpc1NlcnZpY2UuZ2V0UGVyZmlzTGlzdGEoKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgdm0ucGVyZmlzID0gcmVzcG9uc2UuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2bS5leGNsdWlQZXJmaWwgPSBmdW5jdGlvbiAocGVyZmlsKSB7XHJcbiAgICAgICAgICAgIG5nRGlhbG9nLm9wZW5Db25maXJtKHsgdGVtcGxhdGVVcmw6ICdleGNsdWlyUGVyZmlsJyB9KS50aGVuKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBQZXJmaXNTZXJ2aWNlLmV4Y2x1aVBlcmZpbExpc3RhKHBlcmZpbC5pZCkudGhlbihmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZtLnBlcmZpcy5zcGxpY2Uodm0ucGVyZmlzLmluZGV4T2YocGVyZmlsKSwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9hc3RyLnN1Y2Nlc3MoJ1BlcmZpbCBFeGNsdWlkbyBjb20gc3VjZXNzbycsICdFeGNsdWlkbycpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRvYXN0ci5lcnJvcignT2NvcnJldSB1bSBlcnJvIGFvIGV4Y2x1aXIgbyBwZXJmaWwnLCAnRXJybycpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSkoKTtcclxuIiwiKGZ1bmN0aW9uICgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnZHV4JylcclxuICAgICAgICAuZmFjdG9yeSgnUGVyZmlzU2VydmljZScsIFBlcmZpc1NlcnZpY2UpO1xyXG5cclxuICAgIFBlcmZpc1NlcnZpY2UuJGluamVjdCA9IFsnJGh0dHAnXTtcclxuXHJcbiAgICBmdW5jdGlvbiBQZXJmaXNTZXJ2aWNlKCRodHRwKSB7ICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICBmdW5jdGlvbiBfZ2V0UGVyZmlzRGlzdHJpYnVpY2FvKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCdhcGkvcGVyZmlzL2dldFBlcmZpc0Rpc3RyaWJ1aWNhbycpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gX3NhbHZhUGVyZmlsRGlzdChwZXJmaWwpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoJ2FwaS9wZXJmaXMvc2FsdmFEaXN0JywgcGVyZmlsKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIF9nZXRFZGl0YXJEaXN0KHBlcmZpbElkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoJ2FwaS9wZXJmaXMvZ2V0RWRpdGFyRGlzdC8nKyBwZXJmaWxJZCApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gX2VkaXRhUGVyZmlsRGlzdChwZXJmaWwpe1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdCgnYXBpL3BlcmZpcy9lZGl0YVBlcmZpbERpc3QnLCBwZXJmaWwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gX2V4Y2x1aVBlcmZpbERpc3QocGVyZmlsSWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmRlbGV0ZSgnYXBpL3BlcmZpcy9leGNsdWlQZXJmaWxEaXN0LycrIHBlcmZpbElkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIF9nZXRQZXJmaXNMaXN0YSgpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCgnYXBpL3BlcmZpcy9nZXRQZXJmaXNMaXN0YScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gX2dldFBlcmZpbExpc3RhKGlkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoJ2FwaS9wZXJmaXMvZ2V0UGVyZmlsTGlzdGEvJyArIGlkKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gX3NhbHZhUGVyZmlsTGlzdGEocGVyZmlsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KCdhcGkvcGVyZmlzL3NhbHZhTGlzdGEnLCBwZXJmaWwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIHNlcnZpY2UgPSB7XHJcbiAgICAgICAgICAgIGdldFBlcmZpc0Rpc3RyaWJ1aWNhbzogX2dldFBlcmZpc0Rpc3RyaWJ1aWNhbyxcclxuICAgICAgICAgICAgc2FsdmFQZXJmaWxEaXN0OiBfc2FsdmFQZXJmaWxEaXN0LFxyXG4gICAgICAgICAgICBnZXRFZGl0YXJEaXN0OiBfZ2V0RWRpdGFyRGlzdCxcclxuICAgICAgICAgICAgZWRpdGFQZXJmaWxEaXN0OiBfZWRpdGFQZXJmaWxEaXN0LFxyXG4gICAgICAgICAgICBleGNsdWlQZXJmaWxEaXN0OiBfZXhjbHVpUGVyZmlsRGlzdCxcclxuICAgICAgICAgICAgZ2V0UGVyZmlzTGlzdGE6IF9nZXRQZXJmaXNMaXN0YSxcclxuICAgICAgICAgICAgZ2V0UGVyZmlsTGlzdGE6IF9nZXRQZXJmaWxMaXN0YSxcclxuICAgICAgICAgICAgc2FsdmFQZXJmaWxMaXN0YSA6IF9zYWx2YVBlcmZpbExpc3RhXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHNlcnZpY2U7XHJcbiAgICB9XHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnZHV4JylcclxuICAgICAgICAuY29udHJvbGxlcignYWRkTm9tZUNvbnRyb2xsZXInLCBhZGROb21lQ29udHJvbGxlcik7XHJcblxyXG4gICAgYWRkTm9tZUNvbnRyb2xsZXIuJGluamVjdCA9IFsnbmdEaWFsb2cnLCAndG9hc3RyJywgJyRsb2NhdGlvbicsICckc3RhdGVQYXJhbXMnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnTGlzdGFzU2VydmljZScsICdQcm9tb3RlclNlcnZpY2UnLCAnRGlzdHJpYnVpY2FvU2VydmljZSddO1xyXG5cclxuICAgIGZ1bmN0aW9uIGFkZE5vbWVDb250cm9sbGVyKG5nRGlhbG9nLCB0b2FzdHIsICRsb2NhdGlvbiwgJHN0YXRlUGFyYW1zLCBMaXN0YXNTZXJ2aWNlLCBQcm9tb3RlclNlcnZpY2UsIERpc3RyaWJ1aWNhb1NlcnZpY2UpIHtcclxuICAgICAgICAvKiBqc2hpbnQgdmFsaWR0aGlzOnRydWUgKi9cclxuICAgICAgICB2YXIgdm0gPSB0aGlzO1xyXG5cclxuICAgICAgICBhY3RpdmF0ZSgpO1xyXG5cclxuICAgICAgICB2bS5lcnJvcyA9IFtdO1xyXG4gICAgICAgIHZtLmZvcm09IHtcclxuICAgICAgICAgICAgbm9tZXMgOiBbXSxcclxuICAgICAgICAgICAgbGlzdGFJZCA6IG51bGxcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGFjdGl2YXRlKCkge1xyXG4gICAgICAgICAgICB2YXIgaWQgPSAkc3RhdGVQYXJhbXMuaWQ7XHJcbiAgICAgICAgICAgIHZtLm5vbWVzTSA9IDA7XHJcbiAgICAgICAgICAgIHZtLm5vbWVzRiA9IDA7XHJcbiAgICAgICAgICAgIHZtLmJsb2NvTm9tZXMgPSAnJztcclxuICAgICAgICAgICAgdm0uaW5zdHJ1Y29lcyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB2bS5leGliaXJFcnJvcyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB2bS5pbmZvTGlzdGEgPSBmYWxzZTtcclxuICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICBQcm9tb3RlclNlcnZpY2UuZ2V0Tm9tZXMoaWQpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICBwcmVlbmNoZVRleHRvKHJlc3BvbnNlLmRhdGEpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIExpc3Rhc1NlcnZpY2UuZ2V0TGlzdGEoaWQpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICB2bS5saXN0YSA9IHJlc3BvbnNlLmRhdGE7XHJcbiAgICAgICAgICAgICAgICB2bS5mb3JtLmxpc3RhSWQgPSB2bS5saXN0YS5pZDtcclxuXHJcbiAgICAgICAgICAgICAgICBEaXN0cmlidWljYW9TZXJ2aWNlLmdldFF0ZE5vbWVzKHZtLmxpc3RhLmlkKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZtLmRpc3QgPSByZXNwb25zZS5kYXRhO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBwcmVlbmNoZVRleHRvKG5vbWVzKSB7XHJcbiAgICAgICAgICAgIG5vbWVzLmZvckVhY2goZnVuY3Rpb24gKG5vbWUpIHtcclxuICAgICAgICAgICAgICAgIHZtLmJsb2NvTm9tZXMgPSB2bS5ibG9jb05vbWVzICsgKG5vbWUubWFzY3VsaW5vID8gJ00nIDogJ0YnKVxyXG4gICAgICAgICAgICAgICAgICsgJyAnICsgbm9tZS5ub21lICsgKG5vbWUubnVtQ2VsdWxhciA/ICcgJyArIG5vbWUubnVtQ2VsdWxhciA6ICcnKVxyXG4gICAgICAgICAgICAgICAgICsgKG5vbWUubnVtUmcgPyAnICcgKyBub21lLm51bVJnIDogJ1xcbicpO1xyXG5cclxuICAgICAgICAgICAgICAgIG5vbWUubWFzY3VsaW5vID8gdm0ubm9tZXNNKysgOiB2bS5ub21lc0YrKztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgdm0uY2hhbmdlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgbGluaGFzID0gdm0uYmxvY29Ob21lcy5zcGxpdCgnXFxuJyk7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZtLmZvcm0ubm9tZXMgPSBbXTtcclxuICAgICAgICAgICAgdm0uZXJyb3MgPSBbXTtcclxuICAgICAgICAgICAgdmFyIG5vbWVzTSA9IDA7XHJcbiAgICAgICAgICAgIHZhciBub21lc0YgPSAwO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaW5oYXMubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodm0ubGlzdGEuZXhpZ2lyQ2VsdWxhciAmJiB2bS5saXN0YS5leGlnaXJSZykgeyAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1hdGNoZXMgPSAvXihNfEYpXFxzKyhbXlxcLTAtOV0rKVxccysoXFxkKylcXHMrKFxcZHs0LDE1fSlcXHMqJC9pLmV4ZWMobGluaGFzW2ldKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1hdGNoZXMgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2bS5lcnJvcy5wdXNoKCdBIGxpbmhhIG7CuiAnICsgKGkgKyAxKSArICcgbsOjbyBlc3TDoSBubyBmb3JtYXRvIGNvcnJldG8gKEfDik5FUk8gTk9NRSBOwrpDRUxVTEFSIE7CulJHKScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hlc1sxXS50b1VwcGVyQ2FzZSgpID09ICdNJyA/IG5vbWVzTSsrIDogbm9tZXNGKys7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2bS5mb3JtLm5vbWVzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFzY3VsaW5vOiBtYXRjaGVzWzFdLnRvVXBwZXJDYXNlKCkgPT0gJ00nID8gdHJ1ZSA6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9tZSA6IG1hdGNoZXNbMl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBudW1DZWx1bGFyIDogbWF0Y2hlc1szXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bVJnIDogbWF0Y2hlc1s0XVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh2bS5saXN0YS5leGlnaXJDZWx1bGFyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1hdGNoZXMgPSAvXihNfEYpXFxzKyhbXlxcLTAtOV0rKVxccysoXFxkKylcXHMqJC9pLmV4ZWMobGluaGFzW2ldKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1hdGNoZXMgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2bS5lcnJvcy5wdXNoKCdBIGxpbmhhIG7CuiAnICsgKGkgKyAxKSArICcgbsOjbyBlc3TDoSBubyBmb3JtYXRvIGNvcnJldG8nKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgvXlsxLTldezJ9WzldezAsMX1bNi05XXsxfVswLTldezN9WzAtOV17NH0kLy50ZXN0KG1hdGNoZXNbM10pID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2bS5lcnJvcy5wdXNoKCdOYSBsaW5oYSBuwrogJyArIChpICsgMSkgKyAnIG8gbsO6bWVybyBkbyBjZWx1bGFyIG7Do28gZXN0w6Egbm8gZm9ybWF0byBjb3JyZXRvIChuwrogY29tIERERCknKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoZXNbMV0udG9VcHBlckNhc2UoKSA9PSAnTScgPyBub21lc00rKyA6IG5vbWVzRisrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZtLmZvcm0ubm9tZXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFzY3VsaW5vOiBtYXRjaGVzWzFdLnRvVXBwZXJDYXNlKCkgPT0gJ00nID8gdHJ1ZSA6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vbWU6IG1hdGNoZXNbMl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVtQ2VsdWxhcjogbWF0Y2hlc1szXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh2bS5saXN0YS5leGlnaXJSZykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtYXRjaGVzID0gL14oTXxGKVxccysoW15cXC0wLTldKylcXHMrKFxcZHs0LDE1fSlcXHMqJC9pLmV4ZWMobGluaGFzW2ldKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1hdGNoZXMgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2bS5lcnJvcy5wdXNoKCdBIGxpbmhhIG7CuiAnICsgKGkgKyAxKSArICcgbsOjbyBlc3TDoSBubyBmb3JtYXRvIGNvcnJldG8nKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoZXNbMV0udG9VcHBlckNhc2UoKSA9PSAnTScgPyBub21lc00rKyA6IG5vbWVzRisrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdm0uZm9ybS5ub21lcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hc2N1bGlubzogbWF0Y2hlc1sxXS50b1VwcGVyQ2FzZSgpID09ICdNJyA/IHRydWUgOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vbWU6IG1hdGNoZXNbMl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBudW1DZWx1bGFyOiBtYXRjaGVzWzNdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtYXRjaGVzID0gL14oTXxGKVxccysoW15cXC1bMC05XSspKFxccyp8XFxzKyhbMS05XXsyfVs5XXswLDF9WzYtOV17MX1bMC05XXszfVswLTldezR9KT8pJC9pLmV4ZWMobGluaGFzW2ldKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1hdGNoZXMgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2bS5lcnJvcy5wdXNoKCdBIGxpbmhhIG7CuiAnICsgKGkgKyAxKSArICcgbsOjbyBlc3TDoSBubyBmb3JtYXRvIGNvcnJldG8nKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoZXNbMV0udG9VcHBlckNhc2UoKSA9PSAnTScgPyBub21lc00rKyA6IG5vbWVzRisrOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtLmZvcm0ubm9tZXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXNjdWxpbm86IG1hdGNoZXNbMV0udG9VcHBlckNhc2UoKSA9PSAnTSc/IHRydWUgOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vbWU6IG1hdGNoZXNbMl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBudW1DZWx1bGFyOiBtYXRjaGVzWzRdID09IHVuZGVmaW5lZCA/IG51bGwgOiBtYXRjaGVzWzRdICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZtLm5vbWVzTSA9IGFuZ3VsYXIuY29weShub21lc00pO1xyXG4gICAgICAgICAgICB2bS5ub21lc0YgPSBhbmd1bGFyLmNvcHkobm9tZXNGKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICB2bS5hZGROb21lcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgUHJvbW90ZXJTZXJ2aWNlLmFkZE5vbWVzKHZtLmZvcm0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xyXG4gICAgICAgICAgICAgICAgdG9hc3RyLnN1Y2Nlc3MoJ09zIG5vbWVzIGZvcmFtIGFkaWNpb25hZG9zIGNvbSBzdWNlc3NvJywgJ0FkaWNpb25hZG9zJyk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdm0ubW9zdHJhckluc3RydWNvZXMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZtLmluc3RydWNvZXMgPSAhdm0uaW5zdHJ1Y29lcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZtLm1vc3RyYXJFcnJvcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdm0uZXhpYmlyRXJyb3MgPSAhdm0uZXhpYmlyRXJyb3M7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2bS5tb3N0cmFySW5mb0xpc3RhID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2bS5pbmZvTGlzdGEgPSAhdm0uaW5mb0xpc3RhO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuXHJcbiAgICB9XHJcbn0pKCk7XHJcbiIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2R1eCcpXHJcbiAgICAgICAgLmNvbnRyb2xsZXIoJ2xpc3Rhc1Byb21vdGVyQ29udHJvbGxlcicsIGxpc3Rhc1Byb21vdGVyQ29udHJvbGxlcik7XHJcblxyXG4gICAgbGlzdGFzUHJvbW90ZXJDb250cm9sbGVyLiRpbmplY3QgPSBbJyRsb2NhdGlvbicsICckc3RhdGVQYXJhbXMnLCAnUHJvbW90ZXJTZXJ2aWNlJywgJyRzdGF0ZSddO1xyXG5cclxuICAgIGZ1bmN0aW9uIGxpc3Rhc1Byb21vdGVyQ29udHJvbGxlcigkbG9jYXRpb24sICRzdGF0ZVBhcmFtcywgUHJvbW90ZXJTZXJ2aWNlKSB7XHJcbiAgICAgICAgLyoganNoaW50IHZhbGlkdGhpczp0cnVlICovXHJcbiAgICAgICAgdmFyIHZtID0gdGhpcztcclxuXHJcbiAgICAgICAgdm0ubGlzdGFzID0gW107XHJcblxyXG4gICAgICAgIGFjdGl2YXRlKCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gYWN0aXZhdGUoKSB7XHJcbiAgICAgICAgICAgIHZtLmV2ZW50b0lkID0gJHN0YXRlUGFyYW1zLmV2ZW50b0lkO1xyXG5cclxuICAgICAgICAgICAgaWYgKHZtLmV2ZW50b0lkID09IHVuZGVmaW5lZCB8fCB2bS5ldmVudG9JZCA9PSAnJykge1xyXG4gICAgICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoJy9FdmVudG9zL0FnZW5kYScpXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIFByb21vdGVyU2VydmljZS5nZXRMaXN0YXModm0uZXZlbnRvSWQpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICB2bS5saXN0YXMgPSByZXNwb25zZS5kYXRhO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSkoKTtcclxuIiwiKGZ1bmN0aW9uICgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnZHV4JylcclxuICAgICAgICAuZmFjdG9yeSgnUHJvbW90ZXJTZXJ2aWNlJywgUHJvbW90ZXJTZXJ2aWNlKTtcclxuXHJcbiAgICBQcm9tb3RlclNlcnZpY2UuJGluamVjdCA9IFsnJGh0dHAnXTtcclxuXHJcbiAgICBmdW5jdGlvbiBQcm9tb3RlclNlcnZpY2UoJGh0dHApIHtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gX2dldExpc3RhcyhldmVudG9JZCl7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoJ2FwaS9saXN0YXMvZ2V0TGlzdGFzUHJvbW90ZXIvJyArIGV2ZW50b0lkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIF9hZGROb21lcyhub21lcykge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdCgnYXBpL2FkZG5vbWUnLCBub21lcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBfZ2V0Tm9tZXMobGlzdGFJZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCdhcGkvbm9tZWxpc3RhL3Byb21vdGVyLycgKyBsaXN0YUlkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBzZXJ2aWNlID0ge1xyXG4gICAgICAgICAgICBnZXRMaXN0YXM6IF9nZXRMaXN0YXMsXHJcbiAgICAgICAgICAgIGFkZE5vbWVzOiBfYWRkTm9tZXMsXHJcbiAgICAgICAgICAgIGdldE5vbWVzIDogX2dldE5vbWVzXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHNlcnZpY2U7XHJcbiAgICB9XHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnZHV4JylcclxuICAgICAgICAuY29udHJvbGxlcignYWdlbmRhRXZlbnRvc0NvbnRyb2xsZXInLCBhZ2VuZGFFdmVudG9zQ29udHJvbGxlcik7XHJcblxyXG4gICAgYWdlbmRhRXZlbnRvc0NvbnRyb2xsZXIuJGluamVjdCA9IFsnJHN0YXRlJywgJ0V2ZW50b1NlcnZpY2UnLCAnJHJvb3RTY29wZSddO1xyXG5cclxuICAgIGZ1bmN0aW9uIGFnZW5kYUV2ZW50b3NDb250cm9sbGVyKCRzdGF0ZSwgRXZlbnRvU2VydmljZSwgJHJvb3RTY29wZSkge1xyXG4gICAgICAgIC8qIGpzaGludCB2YWxpZHRoaXM6dHJ1ZSAqL1xyXG4gICAgICAgIHZhciB2bSA9IHRoaXM7XHJcblxyXG4gICAgICAgIHZtLmNsaWNrRXZlbnRvID0gZnVuY3Rpb24gKGV2ZW50bykge1xyXG5cclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kZW1pdCgnY2xpY2tFdmVudG8nLCB7IGV2ZW50byA6IGV2ZW50byB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYWN0aXZhdGUoKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gYWN0aXZhdGUoKSB7XHJcbiAgICAgICAgICAgIHZtLmZldGNoRXZlbnRvcyA9IGZ1bmN0aW9uIChpbmljaW8sIGZpbmFsLCB0aW1lem9uZSwgY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIHZhciBldmVudHMgPSB7fTtcclxuICAgICAgICAgICAgICAgIEV2ZW50b1NlcnZpY2UuRXZlbnRvc0NhbChpbmljaW8sIGZpbmFsKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50cyA9IHJlc3BvbnNlLmRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soZXZlbnRzKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdm0udWlDb25maWcgPSB7XHJcbiAgICAgICAgICAgICAgICBjYWxlbmRhcjoge1xyXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogNDgwLCAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6ICd0b2RheScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbnRlcjogJ3RpdGxlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHQ6ICdwcmV2LG5leHQnXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBldmVudENsaWNrOiB2bS5jbGlja0V2ZW50b1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdm0uZXZlbnRTb3VyY2VzID0gW3ZtLmZldGNoRXZlbnRvc107XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KSgpO1xyXG4iLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdkdXgnKVxyXG4gICAgICAgIC5jb250cm9sbGVyKCdjcmlhckV2ZW50b0NvbnRyb2xsZXInLCBjcmlhckV2ZW50b0NvbnRyb2xsZXIpO1xyXG5cclxuICAgIGNyaWFyRXZlbnRvQ29udHJvbGxlci4kaW5qZWN0ID0gWyckcm9vdFNjb3BlJywgJ1BlcmZpc1NlcnZpY2UnLCAnRXZlbnRvU2VydmljZScsICd0b2FzdHInLCAnJGxvY2F0aW9uJ107XHJcblxyXG4gICAgZnVuY3Rpb24gY3JpYXJFdmVudG9Db250cm9sbGVyKCRyb290U2NvcGUsIFBlcmZpc1NlcnZpY2UsIEV2ZW50b1NlcnZpY2UsIHRvYXN0ciwgJGxvY2F0aW9uKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIHZtID0gdGhpcztcclxuXHJcbiAgICAgICAgdm0uc2VsZWNDb3IgPSBmdW5jdGlvbiAoY29yKSB7XHJcbiAgICAgICAgICAgIHZtLmNvclNlbGVjID0gY29yO1xyXG4gICAgICAgICAgICB2bS5ldmVudG8uY29yQ2FsZW5kYXJpbyA9IGNvcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGFjdGl2YXRlKCk7XHJcblxyXG4gICAgICAgIC8vaW5pY2lvIGFjdGl2YXRlXHJcbiAgICAgICAgZnVuY3Rpb24gYWN0aXZhdGUoKSB7XHJcblxyXG4gICAgICAgICAgICBQZXJmaXNTZXJ2aWNlLmdldFBlcmZpc0xpc3RhKCkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIHZtLnBlcmZpc0xpc3RhID0gcmVzcG9uc2UuZGF0YTtcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHZtLmNhbGVuZGFyaW8gPSB7XHJcbiAgICAgICAgICAgICAgICBvcGVuZWQgOiBmYWxzZVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgcmVzZXRhRXZlbnRvKCk7XHJcblxyXG4gICAgICAgICAgICB2bS5jb3JlcyA9IFtcclxuICAgICAgICAgICAgICAgICdibHVlJyxcclxuICAgICAgICAgICAgICAgICdibGFjaycsXHJcbiAgICAgICAgICAgICAgICAneWVsbG93JyxcclxuICAgICAgICAgICAgICAgICdncmVlbicsXHJcbiAgICAgICAgICAgICAgICAncHVycGxlJyxcclxuICAgICAgICAgICAgICAgICdyZWQnXHJcbiAgICAgICAgICAgIF07XHJcblxyXG4gICAgICAgICAgICB2bS5zZWxlY0Nvcih2bS5jb3Jlc1swXSk7XHJcblxyXG4gICAgICAgICAgICB2bS5kdGFJbmljaW8gPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL2ZpbmFsIGFjdGl2YXRlXHJcblxyXG4gICAgICAgIHZtLm9wZW5DYWxlbmRhcmlvID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdm0uY2FsZW5kYXJpby5vcGVuZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gcmVzZXRhRXZlbnRvKCkge1xyXG4gICAgICAgICAgICB2bS5ldmVudG8gPSB7XHJcbiAgICAgICAgICAgICAgICBub21lRXZlbnRvOiAnJ1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdm0uc2FsdmFFdmVudG8gPSBmdW5jdGlvbiAoZXZlbnRvKSB7XHJcbiAgICAgICAgICAgIHZtLnZhbGlkYXRpb25FcnJvcnMgPSBbXTtcclxuICAgICAgICAgICAgRXZlbnRvU2VydmljZS5zYWx2YUV2ZW50byhldmVudG8pLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdG9hc3RyLnN1Y2Nlc3MoJ08gRXZlbnRvIGZvaSBjcmlhZG8gY29tIHN1Y2Vzc28nLCAnU2Fsdm8nKTtcclxuICAgICAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKCcvRXZlbnRvcy9BZ2VuZGEnKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PSA0MDApIHtcclxuICAgICAgICAgICAgICAgICAgICBfc2hvd1ZhbGlkYXRpb25FcnJvcnModm0sIHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRvYXN0ci5lcnJvcignQWNvbnRlY2V1IHVtIGVycm8gYW8gc2FsdmFyIHNldSBFdmVudG8sIHRlbnRlIG5vdmFtZW50ZSBhcMOzcyB1bSB0ZW1wbycsICdFcnJvJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdm0uc2VsZWNpb25hUGVyZmlsTGlzdGEgPSBmdW5jdGlvbiAocGVyZmlsKSB7XHJcbiAgICAgICAgICAgIHZtLnBlcmZpbExpc3RhU2VsZWMgPSBwZXJmaWwubm9tZVBlcmZpbDtcclxuICAgICAgICAgICAgdm0uZXZlbnRvLnBlcmZpbExpc3RhSWQgPSBwZXJmaWwuaWQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2xpbXBhIHBlcmZpbCBsaXN0YSBkcm9wZG93blxyXG4gICAgICAgIHZtLmxpbXBhUGVyZmlsTGlzdGEgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZtLnBlcmZpbExpc3RhU2VsZWMgPSBudWxsO1xyXG4gICAgICAgICAgICB2bS5ldmVudG8ucGVyZmlsTGlzdGFJZCA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBfc2hvd1ZhbGlkYXRpb25FcnJvcnModm0sIGVycm9yKSB7XHJcbiAgICAgICAgICAgIHZtLnZhbGlkYXRpb25FcnJvcnMgPSBbXTtcclxuICAgICAgICAgICAgaWYgKGVycm9yLmRhdGEgJiYgYW5ndWxhci5pc09iamVjdChlcnJvci5kYXRhKSkge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIGVycm9yLmRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICB2bS52YWxpZGF0aW9uRXJyb3JzLnB1c2goZXJyb3IuZGF0YVtrZXldWzBdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZtLnZhbGlkYXRpb25FcnJvcnMucHVzaCgnTsOjbyBmb2kgcG9zc8OtdmVsIGFkaWNpb25hciBvIEV2ZW50bycpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSkoKTtcclxuIiwiKGZ1bmN0aW9uICgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnZHV4JylcclxuICAgICAgICAuY29udHJvbGxlcignZXZlbnRvc0NvbnRyb2xsZXInLCBldmVudG9zQ29udHJvbGxlcik7XHJcblxyXG4gICAgZXZlbnRvc0NvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywnJHN0YXRlJ107IFxyXG5cclxuICAgIGZ1bmN0aW9uIGV2ZW50b3NDb250cm9sbGVyKCRzY29wZSwkc3RhdGUpIHtcclxuICAgICAgICAvKiBqc2hpbnQgdmFsaWR0aGlzOnRydWUgKi9cclxuICAgICAgICB2YXIgdm0gPSB0aGlzOyAgICAgICAgXHJcblxyXG4gICAgICAgIGFjdGl2YXRlKCk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGFjdGl2YXRlKCkge1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pKCk7XHJcbiIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2R1eCcpXHJcbiAgICAgICAgLmZhY3RvcnkoJ0V2ZW50b1NlcnZpY2UnLCBFdmVudG9TZXJ2aWNlKTtcclxuXHJcbiAgICBFdmVudG9TZXJ2aWNlLiRpbmplY3QgPSBbJyRodHRwJ107XHJcblxyXG4gICAgZnVuY3Rpb24gRXZlbnRvU2VydmljZSgkaHR0cCkge1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBfc2FsdmFFdmVudG8oZXZlbnRvKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KCdhcGkvZXZlbnRvcycsIGV2ZW50byk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBfRXZlbnRvc0NhbChpbmljaW8sIGZpbmFsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KCdhcGkvZXZlbnRvcy9FdmVudG9zQ2FsJywgeyBpbmljaW86IGluaWNpbywgZmluYWw6IGZpbmFsfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBfZ2V0RXZlbnRvKGlkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoJ2FwaS9ldmVudG9zLycgKyBpZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgc2VydmljZSA9IHtcclxuICAgICAgICAgICAgc2FsdmFFdmVudG86IF9zYWx2YUV2ZW50byxcclxuICAgICAgICAgICAgRXZlbnRvc0NhbDogX0V2ZW50b3NDYWwsXHJcbiAgICAgICAgICAgIGdldEV2ZW50byA6IF9nZXRFdmVudG9cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gc2VydmljZTtcclxuICAgIH1cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdkdXgnKVxyXG4gICAgICAgIC5mYWN0b3J5KCdVc2VyU2VydmljZScsIFVzZXJTZXJ2aWNlKTtcclxuXHJcbiAgICBVc2VyU2VydmljZS4kaW5qZWN0ID0gWyckaHR0cCddO1xyXG5cclxuICAgIGZ1bmN0aW9uIFVzZXJTZXJ2aWNlKCRodHRwKSB7XHJcbiAgICAgICAgdmFyIF9nZXRVc2VyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvYXBpL3VzdWFyaW8vR2V0VXN1YXJpb0xvZ2FkbycpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gX2dldFVzdWFyaW8oaWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvYXBpL3VzdWFyaW8vJyArIGlkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIF9nZXRVc3Vhcmlvc0Rpc3QoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoJy9hcGkvdXN1YXJpby9nZXRVc3Vhcmlvc0Rpc3QnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIF9nZXRVc3VhcmlvcygpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCgnL2FwaS91c3VhcmlvJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBfc2FsdmFVc3VhcmlvKHVzdWFyaW8pIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoJy9hcGkvdXN1YXJpbycsIHVzdWFyaW8pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gX2Jsb3F1ZWFyKGlkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KCcvYXBpL3VzdWFyaW8vYmxvcXVlYXInLCAgJ1wiJyArIGlkICsgJ1wiJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBfZGVzYmxvcXVlYXIoaWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoJy9hcGkvdXN1YXJpby9kZXNibG9xdWVhcicsICdcIicgKyBpZCArICdcIicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gX2dldFRvZG9zQWNlc3NvcygpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCgnL2FwaS91c3VhcmlvL3RvZG9zQWNlc3NvcycpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gX2dldEFjZXNzb3NVc3VhcmlvKGlkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoJy9hcGkvdXN1YXJpby9BY2Vzc29zLycgKyBpZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBfZGVmaW5lQWNlc3NvcyhwZXJmaWwpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoJy9hcGkvdXN1YXJpby9kZWZpbmVBY2Vzc29zJywgcGVyZmlsKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBzZXJ2aWNlID0ge1xyXG4gICAgICAgICAgICBnZXRVc2VyOiBfZ2V0VXNlcixcclxuICAgICAgICAgICAgZ2V0VXN1YXJpb3NEaXN0OiBfZ2V0VXN1YXJpb3NEaXN0LFxyXG4gICAgICAgICAgICBnZXRVc3VhcmlvczogX2dldFVzdWFyaW9zLFxyXG4gICAgICAgICAgICBzYWx2YVVzdWFyaW86IF9zYWx2YVVzdWFyaW8sXHJcbiAgICAgICAgICAgIGJsb3F1ZWFyOiBfYmxvcXVlYXIsXHJcbiAgICAgICAgICAgIGRlc2Jsb3F1ZWFyOiBfZGVzYmxvcXVlYXIsXHJcbiAgICAgICAgICAgIGdldFRvZG9zQWNlc3NvczogX2dldFRvZG9zQWNlc3NvcyxcclxuICAgICAgICAgICAgZ2V0QWNlc3Nvc1VzdWFyaW86IF9nZXRBY2Vzc29zVXN1YXJpbyxcclxuICAgICAgICAgICAgZGVmaW5lQWNlc3NvczogX2RlZmluZUFjZXNzb3MsXHJcbiAgICAgICAgICAgIGdldFVzdWFyaW8gOiBfZ2V0VXN1YXJpb1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiBzZXJ2aWNlO1xyXG4gICAgfVxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2R1eCcpXHJcbiAgICAgICAgLmNvbnRyb2xsZXIoJ3VzdWFyaW9BY2Vzc29Db250cm9sbGVyJywgdXN1YXJpb0FjZXNzb0NvbnRyb2xsZXIpO1xyXG5cclxuICAgIHVzdWFyaW9BY2Vzc29Db250cm9sbGVyLiRpbmplY3QgPSBbJyRsb2NhdGlvbicsICckc2NvcGUnLCAnVXNlclNlcnZpY2UnICwgJyRzdGF0ZVBhcmFtcycsICd0b2FzdHInXTsgXHJcblxyXG4gICAgZnVuY3Rpb24gdXN1YXJpb0FjZXNzb0NvbnRyb2xsZXIoJGxvY2F0aW9uLCAkc2NvcGUsIFVzZXJTZXJ2aWNlLCAkc3RhdGVQYXJhbXMsIHRvYXN0cikge1xyXG4gICAgICAgIC8qIGpzaGludCB2YWxpZHRoaXM6dHJ1ZSAqL1xyXG4gICAgICAgIHZhciB2bSA9IHRoaXM7XHJcblxyXG4gICAgICAgIHZtLnRvZG9zQWNlc3NvcyA9IFtdO1xyXG5cclxuICAgICAgICB2bS5wZXJmaWwgPSB7XHJcbiAgICAgICAgICAgIHVzdWFyaW9JZDogMCxcclxuICAgICAgICAgICAgYWNlc3NvczogW11cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB2bS5jb3BpYXJEZSA9IDA7XHJcblxyXG4gICAgICAgIGFjdGl2YXRlKCk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGFjdGl2YXRlKCkge1xyXG4gICAgICAgICAgICB2YXIgaWQgPSAkc3RhdGVQYXJhbXMuaWQ7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWlkKSB7XHJcbiAgICAgICAgICAgICAgICAkbG9jYXRpb24ucGF0aCgnL0V2ZW50b3MvQWdlbmRhJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIFVzZXJTZXJ2aWNlLmdldEFjZXNzb3NVc3VhcmlvKGlkKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZUEpIHtcclxuICAgICAgICAgICAgICAgIFVzZXJTZXJ2aWNlLmdldFRvZG9zQWNlc3NvcygpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlQikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZtLnRvZG9zQWNlc3NvcyA9IF8uZmlsdGVyKHJlc3BvbnNlQi5kYXRhLCBmdW5jdGlvbiAob2JqKSB7IHJldHVybiAhXy5maW5kV2hlcmUocmVzcG9uc2VBLmRhdGEsIG9iaik7IH0pOyAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdm0ucGVyZmlsLmFjZXNzb3MgPSByZXNwb25zZUEuZGF0YTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHZtLnBlcmZpbC51c3VhcmlvSWQgPSBpZDtcclxuXHJcbiAgICAgICAgICAgIFVzZXJTZXJ2aWNlLmdldFVzdWFyaW8oaWQpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICB2bS51c3VhcmlvID0gcmVzcG9uc2UuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgdm0uZGVmaW5lQWNlc3NvcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgVXNlclNlcnZpY2UuZGVmaW5lQWNlc3Nvcyh2bS5wZXJmaWwpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICB0b2FzdHIuc3VjY2VzcyhcIk9zIGFjZXNzb3MgZG8gVXN1w6FyaW8gZm9yYW0gZGVmaW5pZG9zIGNvbSBzdWNlc3NvXCIsIFwiU2Fsdm9cIik7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIHRvYXN0ci5lcnJvcihcIkFjb250ZWNldSBhbGd1bSBlcnJvIGFvIGRlZmluaXIgb3MgYWNlc3NvcyBkZXNzZSB1c3XDoXJpbywgdGVudGUgbm92YW1lbnRlIGFww7NzIGFsZ3VtIHRlbXBvXCIsIFwiRXJyb1wiKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KSgpO1xyXG4iLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdkdXgnKVxyXG4gICAgICAgIC5jb250cm9sbGVyKCd1c3VhcmlvQ29uc3VsdGFDb250cm9sbGVyJywgdXN1YXJpb0NvbnN1bHRhQ29udHJvbGxlcik7XHJcblxyXG4gICAgdXN1YXJpb0NvbnN1bHRhQ29udHJvbGxlci4kaW5qZWN0ID0gWyckbG9jYXRpb24nICwgJ1VzZXJTZXJ2aWNlJyAsICd0b2FzdHInXTtcclxuXHJcbiAgICBmdW5jdGlvbiB1c3VhcmlvQ29uc3VsdGFDb250cm9sbGVyKCRsb2NhdGlvbiwgVXNlclNlcnZpY2UsIHRvYXN0cikge1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciB2bSA9IHRoaXM7XHJcblxyXG4gICAgICAgIGFjdGl2YXRlKCk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGFjdGl2YXRlKCkge1xyXG4gICAgICAgICAgICBVc2VyU2VydmljZS5nZXRVc3VhcmlvcygpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICB2bS51c3VhcmlvcyA9IHJlc3BvbnNlLmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdm0uYmxvcXVlYXIgPSBmdW5jdGlvbiAodXN1YXJpbykge1xyXG4gICAgICAgICAgICBVc2VyU2VydmljZS5ibG9xdWVhcih1c3VhcmlvLmlkKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgdG9hc3RyLnN1Y2Nlc3MoXCJPIHVzdcOhcmlvIFwiICsgdXN1YXJpby5ub21lICsgXCIgZm9pIGJsb3F1ZWFkby5cIiwgXCJCbG9xdWVhZG9cIik7XHJcbiAgICAgICAgICAgICAgICB1c3VhcmlvLnN0YXR1cyA9IDE7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbihyZXNwb25zZSl7XHJcbiAgICAgICAgICAgICAgICB0b2FzdHIuZXJyb3IoXCJPY29ycmV1IHVtIGVycm8gYW8gYmxvcXVlYXIgbyB1c3XDoXJpbywgdGVudGUgbm92YW1lbnRlIGFww7NzIGFsZ3VtIHRlbXBvXCIsIFwiRXJyb1wiKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2bS5kZXNibG9xdWVhciA9IGZ1bmN0aW9uICh1c3VhcmlvKSB7XHJcbiAgICAgICAgICAgIFVzZXJTZXJ2aWNlLmRlc2Jsb3F1ZWFyKHVzdWFyaW8uaWQpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICB0b2FzdHIuc3VjY2VzcyhcIk8gdXN1w6FyaW8gXCIgKyB1c3VhcmlvLm5vbWUgKyBcIiBmb2kgZGVzYmxvcXVlYWRvXCIsIFwiRGVzYmxvcXVlYWRvXCIpO1xyXG4gICAgICAgICAgICAgICAgdXN1YXJpby5zdGF0dXMgPSAwO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24ocmVzcG9uc2Upe1xyXG4gICAgICAgICAgICAgICAgdG9hc3RyLmVycm9yKFwiT2NvcnJldSB1bSBlcnJvIGFvIGRlc2Jsb3F1ZWFyIG8gdXN1w6FyaW8sIHRlbnRlIG5vdmFtZW50ZSBhcMOzcyBhbGd1bSB0ZW1wb1wiLCBcIkVycm9cIik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAgICBcclxuICAgIH1cclxufSkoKTtcclxuIiwiKGZ1bmN0aW9uICgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnZHV4JylcclxuICAgICAgICAuY29udHJvbGxlcigndXN1YXJpb0NyaWFyQ29udHJvbGxlcicsIHVzdWFyaW9DcmlhckNvbnRyb2xsZXIpO1xyXG5cclxuICAgIHVzdWFyaW9DcmlhckNvbnRyb2xsZXIuJGluamVjdCA9IFsnJGxvY2F0aW9uJywgJ3RvYXN0cicsICdVc2VyU2VydmljZScsICdDYXNhU2VydmljZSddOyBcclxuXHJcbiAgICBmdW5jdGlvbiB1c3VhcmlvQ3JpYXJDb250cm9sbGVyKCRsb2NhdGlvbiwgdG9hc3RyLCBVc2VyU2VydmljZSwgQ2FzYVNlcnZpY2UpIHtcclxuICAgICAgICAvKiBqc2hpbnQgdmFsaWR0aGlzOnRydWUgKi9cclxuICAgICAgICB2YXIgdm0gPSB0aGlzO1xyXG5cclxuICAgICAgICB2bS5jYXNhc1UgPSBbXTtcclxuXHJcbiAgICAgICAgYWN0aXZhdGUoKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gYWN0aXZhdGUoKSB7XHJcbiAgICAgICAgICAgIHJlc2V0VXN1YXJpbygpO1xyXG5cclxuICAgICAgICAgICAgQ2FzYVNlcnZpY2UuZ2V0Q2FzYXMoKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgdm0uY2FzYXNVID0gcmVzcG9uc2UuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2bS5zYWx2YVVzdWFyaW8gPSBmdW5jdGlvbiAodXN1YXJpbykge1xyXG4gICAgICAgICAgICBVc2VyU2VydmljZS5zYWx2YVVzdWFyaW8odXN1YXJpbykudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIHRvYXN0ci5zdWNjZXNzKCdPIHVzdcOhcmlvIGZvaSBzYWx2byBjb20gc3VjZXNzb1xcblVtIGVtYWlsIGZvaSBlbnZpYWRvIGEgZWxlIGNvbnRlbmRvIHVtYSBzZW5oYSB0ZW1wb3LDoXJpYScsICdzYWx2bycpO1xyXG4gICAgICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoJy9Vc3Vhcmlvcy9Db25zdWx0YScpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09IDQwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIF9zaG93VmFsaWRhdGlvbkVycm9ycyh2bSwgcmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9hc3RyLmVycm9yKCdBY29udGVjZXUgdW0gZXJybyBhbyBjcmlhciBvIHVzdcOhcmlvLCB0ZW50ZSBub3ZhbWVudGUgYXDDs3MgdW0gdGVtcG8nLCAnRXJybycpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdm0uc2VsZWNDYXNhID0gZnVuY3Rpb24gKGlkKSB7XHJcbiAgICAgICAgICAgIHZhciBpID0gdm0udXN1YXJpby5jYXNhcy5pbmRleE9mKGlkKTtcclxuICAgICAgICAgICAgaWYgKGkgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgdm0udXN1YXJpby5jYXNhcy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2bS51c3VhcmlvLmNhc2FzLnB1c2goaWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiByZXNldFVzdWFyaW8oKSB7XHJcbiAgICAgICAgICAgIHZtLnVzdWFyaW8gPSB7XHJcbiAgICAgICAgICAgICAgICBub21lOiAnJyxcclxuICAgICAgICAgICAgICAgIHNvYnJlbm9tZTogJycsXHJcbiAgICAgICAgICAgICAgICBjYXNhcyA6IFtdLFxyXG4gICAgICAgICAgICAgICAgZW1haWw6ICcnXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBfc2hvd1ZhbGlkYXRpb25FcnJvcnModm0sIGVycm9yKSB7XHJcbiAgICAgICAgICAgIHZtLnZhbGlkYXRpb25FcnJvcnMgPSBbXTtcclxuICAgICAgICAgICAgaWYgKGVycm9yLmRhdGEgJiYgYW5ndWxhci5pc09iamVjdChlcnJvci5kYXRhKSkge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIGVycm9yLmRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICB2bS52YWxpZGF0aW9uRXJyb3JzLnB1c2goZXJyb3IuZGF0YVtrZXldWzBdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZtLnZhbGlkYXRpb25FcnJvcnMucHVzaCgnTsOjbyBmb2kgcG9zc8OtdmVsIGFkaWNpb25hciBvIHBlcmZpbCcpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSkoKTtcclxuIiwiKGZ1bmN0aW9uKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdjdXN0b20nLCBbXHJcbiAgICAgICAgICAgIC8vIHJlcXVlc3QgdGhlIHRoZSBlbnRpcmUgZnJhbWV3b3JrXHJcbiAgICAgICAgICAgICdhbmdsZScsXHJcbiAgICAgICAgICAgIC8vIG9yIGp1c3QgbW9kdWxlc1xyXG4gICAgICAgICAgICAnYXBwLmNvcmUnLFxyXG4gICAgICAgICAgICAnYXBwLnNpZGViYXInXHJcbiAgICAgICAgICAgIC8qLi4uKi9cclxuICAgICAgICBdKTtcclxufSkoKTsiLCJcclxuLy8gVG8gcnVuIHRoaXMgY29kZSwgZWRpdCBmaWxlIGluZGV4Lmh0bWwgb3IgaW5kZXguamFkZSBhbmQgY2hhbmdlXHJcbi8vIGh0bWwgZGF0YS1uZy1hcHAgYXR0cmlidXRlIGZyb20gYW5nbGUgdG8gbXlBcHBOYW1lXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbihmdW5jdGlvbigpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnY3VzdG9tJylcclxuICAgICAgICAuY29udHJvbGxlcignQ29udHJvbGxlcicsIENvbnRyb2xsZXIpO1xyXG5cclxuICAgIENvbnRyb2xsZXIuJGluamVjdCA9IFsnJGxvZyddO1xyXG4gICAgZnVuY3Rpb24gQ29udHJvbGxlcigkbG9nKSB7XHJcbiAgICAgICAgLy8gZm9yIGNvbnRyb2xsZXJBcyBzeW50YXhcclxuICAgICAgICAvLyB2YXIgdm0gPSB0aGlzO1xyXG5cclxuICAgICAgICBhY3RpdmF0ZSgpO1xyXG5cclxuICAgICAgICAvLy8vLy8vLy8vLy8vLy8vXHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGFjdGl2YXRlKCkge1xyXG4gICAgICAgICAgJGxvZy5sb2coJ0lcXCdtIGEgbGluZSBmcm9tIGN1c3RvbS5qcycpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSkoKTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
