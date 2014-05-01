'use strict';

angular.module('elaborarVenda3App.itens')
    .service('ItensService', ['Restangular',
        function Vendas(Restangular) {
            // AngularJS will instantiate a singleton by calling "new" on this function
            return {
                getAll: function() {
                    return Restangular.all('itens').getList().$object;
                },
                get: function(clienteId, vendaId, id) {
                    return Restangular.one('clientes', clienteId).one('vendas', vendaId).one('itens', id).get().$object;
                },
                add: function(newItem) {
                    return Restangular.one('clientes', newItem.clienteId).one('vendas', newItem.vendaId).all('itens').post(newItem);
                },
                update: function(item) {
                    return Restangular.one('clientes', item.clienteId).one('vendas', item.vendaId).one('itens', item.id).put(item);
                },
                remove: function(item) {
                    return Restangular.one('clientes', item.clienteId).one('vendas', item.vendaId).one('itens', item.id).remove();
                }
            };
        }
    ]);