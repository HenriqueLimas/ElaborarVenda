'use strict';

angular.module('elaborarVenda3App.vendas')
    .controller('VendasController', function($scope, $location) {
        $scope.isCollapsed = true;
        $scope.Vendas = [{
                id: 1,
                nome: 'Venda 1',
                valor: 42,
                statusVenda: 'A',
                link: {
                    itens: '#/clientes/0/vendas/1/itens'
                }
            }, {
                id: 2,
                nome: 'Venda 2',
                valor: 42,
                statusVenda: 'A',
                link: {
                    itens: '#/clientes/0/vendas/2/itens'
                }
            }, {
                id: 3,
                nome: 'Venda 3',
                valor: 42,
                statusVenda: 'A',
                link: {
                    itens: '#/clientes/0/vendas/3/itens'
                }
            }

        ];

        $scope.getValorTotalVendas = function() {
            var valTot = 0;
            angular.forEach($scope.Vendas, function(venda) {
                valTot += venda.valor;
            });
            return valTot;
        };

        function getModel() {
            return {
                id: null,
                nome: null,
                valor: null,
                statusVenda: null,
                link: {
                    itens: null
                }
            };
        }

        function getLink(cadastro) {
            return '#/clientes/' + $location.path() + '/vendas/2/itens';
        }
    });