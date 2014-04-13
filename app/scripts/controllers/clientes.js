'use strict';

angular.module('elaborarVenda3App.clientes')
    .controller('ClientesController', function($scope) {

        $scope.initNewCliente = function() {
            $scope.newCliente = getModel();
        }

        function init() {
            $scope.initNewCliente();
            $scope.selectCliente = getModel();
        };

        init();
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

        $scope.editCliente = function(cliente) {
            $scope.selectCliente = angular.copy(cliente);
        }

        $scope.removeCliente = function(id) {
            angular.forEach($scope.Clientes, function(cliente) {
                if (parseInt(cliente.id) === parseInt(id)) {
                    var index = $scope.Clientes.indexOf(cliente);
                    delete $scope.Clientes[index];
                    $scope.Clientes.length -= 1;
                }
            });
        }

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