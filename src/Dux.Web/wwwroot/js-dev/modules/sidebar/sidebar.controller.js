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
