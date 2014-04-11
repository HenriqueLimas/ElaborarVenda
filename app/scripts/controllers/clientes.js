'use strict';

angular.module('elaborarVenda3App.clientes')
    .controller('ClientesController', function($scope) {
        $scope.initNewCliente = function() {
            $scope.newCliente = getModel();
        }

        $scope.initNewCliente();

        $scope.Clientes = [{
            id: 1,
            nome: 'Cliente 1',
            links: {
                vendas: '#/clientes/1/vendas'
            }

        }, {
            id: 2,
            nome: 'Cliente 2',
            links: {
                vendas: '#/clientes/2/vendas'
            }
        }, ];

        $scope.addCliente = function() {
            var newId = $scope.length;
            $scope.newCliente.nome = $scope.newCliente.nome.trim();
            if ($scope.newCliente.nome.length === 0) {
                return;
            }
            $scope.newCliente.id = newId;
            $scope.newCliente.links.vendas = getLink($scope.newCliente.id, 'vendas');
            $scope.Clientes.push($scope.newCliente);

            $scope.initNewCliente();
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
    });