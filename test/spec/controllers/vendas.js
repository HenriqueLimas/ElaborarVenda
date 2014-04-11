'use strict';

describe('Controller: VendasController', function() {

    // load the controller's module
    beforeEach(module('elaborarVenda3App'));

    var VendasController,
        $scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, $rootScope) {
        $scope = $rootScope.$new();

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

        VendasController = $controller('VendasController', {
            $scope: $scope
        });
    }));

    it('should have vendas on the scope', function() {
        expect($scope.Vendas).toBeDefined();
        expect($scope.Vendas[0].id).toBeDefined();
        expect($scope.Vendas[0].valor).toBeDefined();
    });

    describe('Total value', function() {
        it('should correct sum the total value', function() {
            expect($scope.getValorTotalVendas).toBeDefined();
            expect($scope.getValorTotalVendas()).toBe(126);
        });
    });
});