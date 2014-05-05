'use strict';

var _ = require('lodash');

var Vendas = [{
    id: 1,
    clienteId: 1,
    nome: 'Venda 1',
    valor: 42,
    statusVenda: 'A',
    link: {
        itens: '#/clientes/0/vendas/1/itens'
    }
}, {
    id: 2,
    clienteId: 1,
    nome: 'Venda 2',
    valor: 42,
    statusVenda: 'A',
    link: {
        itens: '#/clientes/0/vendas/2/itens'
    }
}, {
    id: 3,
    clienteId: 2,
    nome: 'Venda 3',
    valor: 42,
    statusVenda: 'A',
    link: {
        itens: '#/clientes/0/vendas/3/itens'
    }
}];

function getVenda(vendaId) {
    return _.find(Vendas, function(venda) {
        return parseInt(venda.id) === parseInt(vendaId);
    });
}

exports.getAllVendas = function(req, res) {
    res.send(200, Vendas);
};

exports.getAllVendasCliente = function(req, res) {
    var vendasCliente;
    vendasCliente = _.filter(Vendas, function(venda) {
        return parseInt(venda.clienteId) === parseInt(req.params.clienteId);
    });
    res.send(200, vendasCliente);
};



exports.getVenda = function(req, res) {
    res.send(200, getVenda(req.params.vendaId));
};

exports.addVenda = function(req, res) {
    Vendas.push(req.body);

    res.send();
};

exports.updateVenda = function(req, res) {
    var indexVenda,
        venda;

    venda = _.find(Vendas, function(data) {
        return parseInt(data.clienteId) === parseInt(req.params.clienteId) && parseInt(data.id) === parseInt(req.params.vendaId);
    })

    indexVenda = _.indexOf(Vendas, venda);

    if (indexVenda >= 0) {
        console.log(req.body);
        Vendas[indexVenda] = req.body;
    }
    res.send();
};

exports.removeAll = function(req, res) {
    Vendas = [];
    res.send();
};

exports.removeVenda = function(req, res) {
    Vendas = _.reject(Vendas, function(venda) {
        return parseInt(venda.clienteId) === parseInt(req.params.clienteId) && parseInt(venda.id) === parseInt(req.params.vendaId);
    });

    res.send();
};