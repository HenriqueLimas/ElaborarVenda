'use strict';
/*
 *  CLIENTE Service
 */
var _ = require('lodash');

var Clientes = [{
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
}, {
    id: 12,
    nome: 'Cliente 3',
    links: {
        vendas: '#/clientes/2/vendas'
    }
}];

//Funcao para retornar o cliente

function getCliente(clienteId) {
    return _.find(Clientes, function(cliente) {
        return parseInt(cliente.id) === parseInt(clienteId);
    });
}

exports.getAllClientes = function(req, res) {
    res.send(200, Clientes);
};

exports.getCliente = function(req, res) {
    var cliente = [];
    cliente.push(getCliente(req.params.clienteId));
    res.send(200, cliente);
};

exports.addCliente = function(req, res) {
    Clientes.push(req.body);
    res.send();
};

exports.updateCliente = function(req, res) {
    var cliente, index;

    cliente = _.find(Clientes, function(cliente) {
        return parseInt(cliente.id) === parseInt(req.params.clienteId);
    })

    index = _.indexOf(Clientes, cliente);

    if (index >= 0) {
        Clientes[index] = req.body;
    }
    res.send();
};

exports.removeAll = function(req, res) {
    Clientes = [];
    res.send(Clientes);
};

exports.removeCliente = function(req, res) {
    console.log('Antes', Clientes);
    Clientes = _.reject(Clientes, function(cliente) {
        return parseInt(cliente.id) === parseInt(req.params.clienteId);
    });
    console.log('Depois', Clientes);
    res.send();
};