'use strict';

angular.module('elaborarVenda3App.vendas')
    .filter('filterVenda', function() {
        return function(vendas, clienteId) {
            var result = [];

            angular.forEach(vendas, function(venda) {
                if (parseInt(venda.clienteId) === parseInt(clienteId)) {
                    result.push(venda);
                }
            });

            return result;
        };
    })
    .filter('filterItemVenda', function() {
        return function(itens, vendaId) {
            var result = [];

            angular.forEach(itens, function(item) {
                if (parseInt(item.vendaId) === parseInt(vendaId)) {
                    result.push(item);
                }
            });

            return result;
        };
    })
    .filter('capitalLetter', function() {
        return function(text) {
            var string = '';
            string += text[0].toUpperCase();
            string += text.slice(1);
            return string;
        };
    })
    .controller('VendasController', ['$scope', '$location', '$filter',
        'VendasService',
        'ClientesService',
        'ItensService',
        function($scope, $location, $filter, VendasService, ClientesService, ItensService) {

            function init() {
                if ($location.path().search('clientes') > (-1)) {
                    var path = $location.path(),
                        clienteId = parseInt(path.substring(10));
                    $scope.Clientes = ClientesService.get(clienteId);
                    $scope.Vendas = VendasService.getAll($scope.Clientes.id);
                } else {
                    $scope.Clientes = ClientesService.getAll();

                    $scope.Vendas = VendasService.getAll();
                }
                $scope.isCollapsed = true;
                initNewVenda();
            }

            init();

            $scope.Itens = ItensService.getAll();

            function initNewVenda(clienteId) {
                $scope.newVenda = getModel();
                $scope.newVenda.clienteId = clienteId;
            }

            $scope.initNewVenda = function(clienteId) {
                initNewVenda(clienteId);
            };

            $scope.getValorTotalVendas = function(clienteId) {
                var valTot = 0;
                angular.forEach($scope.Vendas, function(venda) {
                    if (parseInt(venda.clienteId) === parseInt(clienteId)) {
                        valTot += venda.valor;
                    }
                });
                return valTot;
            };

            $scope.getValorTotalVenda = function(venda) {
                var valTot = 0;
                angular.forEach($scope.Itens, function(item) {
                    if (parseInt(item.vendaId) === parseInt(venda.id)) {
                        valTot += item.valorUnitario;
                    }
                });
                venda.valor = valTot;
                return valTot;
            };

            $scope.addVenda = function() {
                var newId = $scope.Vendas.length;
                if ($scope.newVenda.nome.trim() === '') {
                    return;
                }
                $scope.newVenda.id = newId;
                VendasService.add($scope.newVenda);
                $scope.Vendas.push($scope.newVenda);
            };

            $scope.existeVendas = function(id) {
                var existe = false;
                angular.forEach($scope.Vendas, function(venda) {
                    if (parseInt(venda.clienteId) === parseInt(id)) {
                        existe = true;
                        return;
                    }
                });

                return existe;
            };

            $scope.existeItens = function(id) {
                var existe = false;
                angular.forEach($scope.Itens, function(item) {
                    if (parseInt(item.vendaId) === parseInt(id)) {
                        existe = true;
                        return;
                    }

                });
                return existe;
            };

            function getModel() {
                return {
                    id: null,
                    clienteId: null,
                    nome: null,
                    valor: null,
                    statusVenda: null,
                    link: {
                        itens: null
                    }
                };
            }

            //function getLink(cadastro) {
            //     return '#/clientes/' + $location.path() + '/vendas/2/itens';
            // }
        }
    ]);