'use strict';

angular.module('elaborarVenda3App.vendas')
    .service('VendasService', ['Restangular',
        function Vendas(Restangular) {
            // AngularJS will instantiate a singleton by calling "new" on this function
            return {
                getAll: function(clienteId) {
                    if (clienteId) {
                        return Restangular.one('clientes', clienteId).all('vendas').getList().$object;
                    } else {
                        return Restangular.all('vendas').getList().$object;
                    }
                },
                get: function(clienteId, id) {
                    return Restangular.one('clientes', clienteId).one('vendas', id).get().$object;
                },
                add: function(newVenda) {
                    return Restangular.one('clientes', newVenda.clienteId).all('vendas').post(newVenda);
                },
                update: function(venda) {
                    return Restangular.one('clientes', venda.clienteId).one('vendas', venda.id).put(venda);
                },
                remove: function(venda) {
                    return Restangular.one('clientes', venda.clienteId).one('vendas', venda.id).remove();
                }
            };
        }
    ]);