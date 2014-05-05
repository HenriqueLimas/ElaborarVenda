'use strict';

angular.module('elaborarVenda3App.clientes')
    .controller('ClientesController', ['$scope', 'ClientesService',
        function($scope, ClientesService) {

            $scope.initNewCliente = function() {
                $scope.newCliente = getModel();
            };

            function init() {
                $scope.initNewCliente();
                $scope.selectCliente = getModel();
                $scope.Clientes = ClientesService.getAll();
            }

            init();

            $scope.addCliente = function() {
                var newId = $scope.Clientes.length;
                $scope.newCliente.nome = $scope.newCliente.nome.trim();
                if ($scope.newCliente.nome.length === 0) {
                    return;
                }
                $scope.newCliente.id = newId;
                $scope.newCliente.links.vendas = getLink($scope.newCliente.id, 'vendas');
                ClientesService.add($scope.newCliente);
                $scope.Clientes.push($scope.newCliente);

                $scope.initNewCliente();
            };

            $scope.editCliente = function(cliente) {
                $scope.selectCliente = angular.copy(cliente);
            };

            $scope.saveEdit = function() {
                var oldCliente,
                    index;
                ClientesService.update($scope.selectCliente);

                oldCliente = _.find($scope.Clientes, function(cliente) {
                    return parseInt(cliente.id) === parseInt($scope.selectCliente.id);
                });

                index = _.indexOf($scope.Clientes, oldCliente);

                if (index >= 0) {
                    $scope.Clientes[index] = $scope.selectCliente;
                }
            };

            $scope.removeCliente = function(id) {
                angular.forEach($scope.Clientes, function(cliente) {
                    if (parseInt(cliente.id) === parseInt(id)) {
                        ClientesService.remove(id);
                        init();
                    }
                });
            };

            function getLink(id, cadastro) {
                return '#/clientes' + id + '/' + cadastro;
            }

            function getModel() {
                return {
                    id: null,
                    nome: null,
                    links: {
                        vendas: null
                    }
                };
            }
        }
    ]);