'use strict';

angular.module('elaborarVenda3App.vendas')
    .controller('VendasController', function($scope, $location) {

        function init() {
            if ($location.path().search('clientes') > (-1)) {
                $scope.Cliente = {
                    nome: 'test'
                };
            }
            $scope.isCollapsed = true;
            $scope.newVenda = getModel()

            $scope.Clientes = [{}, {}];
        }

        init();

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
        }];

        $scope.Itens = [{
            vendasId: 1,
            valor: 10
        }, {
            vendasId: 1,
            valor: 30
        }, {
            vendasId: 1,
            valor: 20
        }, {
            vendasId: 1,
            valor: 10
        }, {
            vendasId: 2,
            valor: 10
        }, {
            vendasId: 3,
            valor: 10
        }];


        $scope.getValorTotalVendas = function() {
            var valTot = 0;
            angular.forEach($scope.Vendas, function(venda) {
                valTot += venda.valor;
            });
            return valTot;
        };

        $scope.getValorTotalVenda = function(venda) {
            var valTot = 0;
            angular.forEach($scope.Itens, function(item) {
                if (item.vendasId === venda.id) {
                    valTot += item.valor;
                }
            });
            venda.valor = valTot;
            return valTot;
        };

        $scope.addVenda = function() {
            if ($scope.newVenda.nome.trim() === '') {
                return;
            }
            $scope.Vendas.push($scope.newVenda);
        };

        $scope.existeItens = function(id) {
            var existe = false;
            angular.forEach($scope.Itens, function(item) {
                if (item.vendasId === id) {
                    existe = true;
                    return;
                }

            });
            return existe;
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