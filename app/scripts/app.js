'use strict';

angular.module('elaborarVenda3App.clientes', ['restangular', 'ui.sortable']);
angular.module('elaborarVenda3App.itens', ['restangular']);
angular.module('elaborarVenda3App.vendas', ['restangular', 'elaborarVenda3App.clientes', 'elaborarVenda3App.itens']);

angular
    .module('elaborarVenda3App', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngRoute',
        'ui.bootstrap',
        'pasvaz.bindonce',
        'restangular',
        'elaborarVenda3App.vendas',
        'elaborarVenda3App.itens',
        'elaborarVenda3App.clientes'
    ])
    .config(function($routeProvider) {
        $routeProvider
            .when('/clientes', {
                templateUrl: 'views/clientes/clientes.html',
                controller: 'ClientesController'
            })
            .when('/vendas', {
                templateUrl: 'views/vendas/vendas.html',
                controller: 'VendasController'
            })
            .when('/clientes/:id/vendas', {
                templateUrl: 'views/vendas/vendas.html',
                controller: 'VendasController'
            })
            .otherwise({
                redirectTo: '/clientes'
            });
    });