'use strict';

describe('Controller: Clientes', function() {

    // load the controller's module
    beforeEach(module('elaborarVenda3App.clientes'));

    var ClientesController,
        $scope,
        clienteModel;

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, $rootScope) {
        clienteModel = [{
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
        $scope = $rootScope.$new();
        $scope.Clientes = clienteModel;
        ClientesController = $controller('ClientesController', {
            $scope: $scope
        });


    }));

    it('should exists the Client\'s lists', function() {
        expect($scope.Clientes).toBeDefined();
        expect($scope.Clientes[0]).toEqual(jasmine.any(Object));
        expect($scope.Clientes[0].id).toBeDefined();
        expect($scope.Clientes[0].nome).toBeDefined();
        expect($scope.Clientes[0].links.vendas).toBeDefined();
    });

    describe('on selecting a client', function() {
        it('should exist the client to be update', function() {
            $scope.editCliente(clienteModel[0]);
            expect($scope.selectCliente).toBeDefined();
            expect($scope.selectCliente).toEqual(clienteModel[0]);

        });

    });
    describe('adding new client', function() {
        it('should add a new client', function() {
            var oldLength = $scope.Clientes.length;
            expect($scope.addCliente).toBeDefined();
            $scope.newCliente.nome = 'Cliente de Teste';
            $scope.addCliente();
            expect($scope.Clientes.length).toBeGreaterThan(oldLength);
        });

        it('should not insert a client with a blank name', function() {
            var oldLength = $scope.Clientes.length;

            $scope.newCliente.nome = '';
            $scope.addCliente();
            expect($scope.Clientes.length).toBe(oldLength);
        });

        it('should remove blank space from the new name', function() {
            var index = $scope.Clientes.length;

            $scope.newCliente.nome = '  This is a Test ';
            $scope.addCliente();
            expect($scope.Clientes[index].nome).toBe('This is a Test');
        });
    });

    describe('on deleting', function() {
        it('should delete the client by id', function() {
            var oldLength = $scope.Clientes.length;
            $scope.removeCliente(1);
            $scope.$digest();
            expect($scope.Clientes.length).toBe(oldLength - 1);
        });
    });
});