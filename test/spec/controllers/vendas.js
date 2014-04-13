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
        }];

        VendasController = $controller('VendasController', {
            $scope: $scope
        });
    }));

    it('should have vendas on the scope', function() {
        expect($scope.Vendas).toBeDefined();
        expect($scope.Vendas[0].id).toBeDefined();
        expect($scope.Vendas[0].valor).toBeDefined();
    });

    describe('Find item', function() {
        it('should find sales\'s itens', function() {
            expect($scope.existeItens(1)).toBeTruthy();
        })
    });

    describe('Total value', function() {
        it('should correct sum the total value', function() {
            expect($scope.getValorTotalVendas).toBeDefined();
            expect($scope.getValorTotalVendas()).toBe(126);
        });

        it('should correct sum the itens value', function() {
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
            expect($scope.getValorTotalVenda).toBeDefined();
            expect($scope.getValorTotalVenda($scope.Vendas[0])).toBe(70);
            expect($scope.getValorTotalVenda($scope.Vendas[1])).toBe(10);
            expect($scope.getValorTotalVenda($scope.Vendas[2])).toBe(10);
        });

        it('should update the venda value', function() {
            expect($scope.getValorTotalVenda($scope.Vendas[0])).toBe($scope.Vendas[0].valor);
        });
    });

    describe('List itens', function() {
        it('should exist itens objects', function() {
            expect($scope.Itens).toBeDefined();
            expect($scope.Itens[0].vendasId).toBeDefined();
            expect($scope.Itens[0].valor).toBeDefined();
        });
    });

    describe('adding vendas', function() {
        it('should add correctly on sale', function() {
            var oldLength = $scope.Vendas.length;
            expect($scope.newVenda).toBeDefined();
            $scope.newVenda.nome = 'Test';
            $scope.addVenda();
            expect($scope.Vendas.length).toBeGreaterThan(oldLength);
        });

        it('should not insert one sale without name', function() {
            var length = $scope.Vendas.length;
            $scope.newVenda.nome = '';
            $scope.addVenda();
            expect($scope.Vendas.length).toBe(length);
        });
    })
});