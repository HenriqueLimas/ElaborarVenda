'use strict';

describe('Service: Clientes', function() {

    // load the service's module
    beforeEach(module('elaborarVenda3App'));

    // instantiate service
    var ClientesService;
    var $httpBackend;

    // model
    var clientesModel;
    var cliente;
    var newCliente;

    beforeEach(inject(function(_ClientesService_, _$httpBackend_) {
        clientesModel = [{
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

        cliente = [{
            id: 1,
            nome: 'Cliente 1',
            links: {
                vendas: '#/clientes/1/vendas'
            }

        }];

        newCliente = {
            id: 3,
            nome: 'Cliente 3',
            links: {
                vendas: '#/clientes/3/vendas'
            }
        };

        ClientesService = _ClientesService_;

        $httpBackend = _$httpBackend_;

        $httpBackend.whenGET('/clientes').respond(201, clientesModel);
        $httpBackend.whenGET('/clientes/1').respond(200, cliente);
        $httpBackend.whenPOST('/clientes').respond(201, newCliente);
        $httpBackend.whenPUT('/clientes?0=%7B%22id%22:1,%22nome%22:%22Cliente+1%22,%22links%22:%7B%22vendas%22:%22%23%2Fclientes%2F1%2Fvendas%22%7D%7D').respond(200, cliente);
        $httpBackend.whenDELETE('/clientes').respond();
        $httpBackend.whenDELETE('/clientes/1').respond();
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });
    describe('getting values', function() {
        it('should get the Client\'s list from server', function() {
            var clientes;

            clientes = ClientesService.getAll();

            $httpBackend.flush();

            expect(clientes).toBeDefined();
            expect(clientes.length).toBe(2);
            expect(clientes[0].id).toBe(1);
            expect(clientes[1].id).toBe(2);

        });

        it('should get one Client by id', function() {
            var cliente;

            cliente = ClientesService.get(1);

            $httpBackend.flush();

            expect(cliente).toBeDefined();
            expect(cliente[0].id).toBe(1);
        });
    });

    describe('adding one Client', function() {
        it('should add the new Client', function() {
            ClientesService.add(newCliente);

            $httpBackend.expectPOST('/clientes');
            $httpBackend.flush();
        });
    });

    describe('updating cliente', function() {
        it('should update the cliente', function() {
            cliente = ClientesService.update(cliente);
            $httpBackend.flush();

            expect(cliente).toBeDefined();
        });
    });

});