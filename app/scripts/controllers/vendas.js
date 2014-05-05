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
        return function(itens, clienteId, vendaId) {
            var result = [];

            angular.forEach(itens, function(item) {
                if (parseInt(item.clienteId) === parseInt(clienteId) && parseInt(item.vendaId) === parseInt(vendaId)) {
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

            function initNewItem(venda) {
                $scope.newItem = getItemModel();
                $scope.newItem.clienteId = venda.clienteId;
                $scope.newItem.vendaId = venda.id;
            }

            $scope.initNewVenda = function(clienteId) {
                initNewVenda(clienteId);
            };

            $scope.initNewItem = function(venda) {
                initNewItem(venda);
            };

            $scope.getValorTotalVendas = function(clienteId) {
                var valTot = 0;
                angular.forEach($scope.Vendas, function(venda) {
                    if (parseInt(venda.clienteId) === parseInt(clienteId)) {
                        valTot += (venda.valor) * 1;
                    }
                });

                return valTot;
            };

            $scope.getValorTotalVenda = function(venda) {
                var valTot = 0;
                angular.forEach($scope.Itens, function(item) {
                    if (parseInt(item.clienteId) === parseInt(venda.clienteId) && parseInt(item.vendaId) === parseInt(venda.id)) {
                        valTot += (item.valorUnitario) * 1;
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

            $scope.removeVenda = function(venda) {
                $scope.removeItensVendas(venda);
                $scope.Vendas = _.reject($scope.Vendas, function(data) {
                    return parseInt(data.id) === parseInt(venda.id);
                });
                VendasService.remove(venda);
            };

            $scope.removeItensVendas = function(venda) {
                $scope.Itens = _.reject($scope.Itens, function(item) {
                    return parseInt(item.vendaId) === parseInt(venda.id);
                });

                ItensService.removeAllItemVendas(venda);
            };

            $scope.removeItem = function(item) {
                $scope.Itens = _.reject($scope.Itens, function(data) {
                    return parseInt(data.id) === parseInt(item.id);
                });

                ItensService.removeItem(item);
            };

            $scope.addItem = function() {
                var newId = $scope.Itens.length;
                if ($scope.newItem.produto.trim() === '') {
                    return;
                }
                $scope.newItem.id = newId;
                ItensService.add($scope.newItem);
                $scope.Itens.push($scope.newItem);
            };

            $scope.editVenda = function(venda, event) {
                $scope.selectVenda = angular.copy(venda);
                $('#editVenda').modal('show')
            };

            $scope.saveEdit = function() {
                var oldVenda,
                    index;
                VendasService.update($scope.selectVenda);

                oldVenda = _.find($scope.Vendas, function(data) {
                    return parseInt(data.clienteId) === parseInt($scope.selectVenda.clienteId) && parseInt(data.id) === parseInt($scope.selectVenda.id);
                });

                index = _.indexOf($scope.Vendas, oldVenda);

                if (index >= 0) {
                    $scope.Vendas[index] = $scope.selectVenda;
                }
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

            $scope.existeItens = function(venda) {
                var existe = false;
                angular.forEach($scope.Itens, function(item) {
                    if (parseInt(item.clienteId) === parseInt(venda.clienteId) && parseInt(item.vendaId) === parseInt(venda.id)) {
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

            function getItemModel() {
                return {
                    id: null,
                    clienteId: null,
                    vendaId: null,
                    produto: null,
                    quantidade: null,
                    valorUnitario: null
                };
            }

            //function getLink(cadastro) {
            //     return '#/clientes/' + $location.path() + '/vendas/2/itens';
            // }
        }
    ]);