'use strict';

angular.module('elaborarVenda3App.vendas', []);
angular.module('elaborarVenda3App.clientes', []);

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
        'elaborarVenda3App.clientes'
    ])
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
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
                redirectTo: '/'
            });
    });