'use strict';

angular.module('elaborarVenda3App.clientes')
    .service('ClientesService', ['Restangular',
        function ClientesService(Restangular) {

            return {
                getAll: function() {
                    return Restangular.all('clientes').getList().$object;
                },
                get: function(id) {
                    return Restangular.one('clientes', id).getList().$object;
                },
                add: function(newCliente) {
                    return Restangular.all('clientes').post(newCliente);
                },
                update: function(cliente) {
                    return Restangular.one('clientes', cliente.id).customPUT(cliente);
                },
                remove: function(id) {
                    return Restangular.one('clientes', id).remove();
                }
            };
        }
    ]);