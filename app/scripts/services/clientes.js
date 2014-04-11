'use strict';

angular.module('elaborarVenda3App.clientes')
    .service('ClientesService', function ClientesService(Restangular) {
        // AngularJS will instantiate a singleton by calling "new" on this function
        return {
            getAll: function() {
                return Restangular.all('clientes').getList().$object;
            },
            get: function(id) {
                return Restangular.one('clientes', id).get().$object;
            },
            add: function(newCliente) {
                return Restangular.all('clientes').post(newCliente);
            },
            update: function(cliente) {
                return Restangular.one('clientes', cliente.id).put(cliente);
            }
        };
    });