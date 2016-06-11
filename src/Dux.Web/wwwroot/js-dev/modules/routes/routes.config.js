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

