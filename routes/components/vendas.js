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

var vendasCliente;

function getVenda(vendaId) {
    return _.find(Vendas, function(venda) {
        return parseInt(venda.id) === parseInt(vendaId);
    });
}

exports.getAllVendas = function(req, res) {
    res.send(200, Vendas);
};

exports.getAllVendasCliente = function(req, res) {
    vendasCliente = _.filter(Vendas, function(venda) {
        return parseInt(venda.clienteId) === parseInt(req.params.clienteId);
    });
    res.send(200, vendasCliente);
};



exports.getVenda = function(req, res) {
    res.send(200, getVenda(req.params.vendaId));
};

exports.addVenda = function(req, res) {
    if (vendasCliente) {
        vendasCliente.push(req.body);
    }

    Vendas.push(req.body);

    res.send();
};

exports.updateVenda = function(req, res) {
    var indexVenda,
        indexVendaCliente,
        achou = false;

    if (vendasCliente) {
        indexVendaCliente = 0;
        //Consulta o index da venda do cliente a ser excluida no vetor
        for (var venda in vendasCliente) {
            if (venda.vendaId === req.params.vendaId) {
                achou = true;
                break;
            }
            indexVendaCliente++;
        }
        if (achou) {
            indexVenda = 0;
            achou = false;
            //consulta o index da venda geral a ser excluida
            for (venda in Vendas) {
                if (venda === vendasCliente[indexVendaCliente]) {
                    achou = true;
                    break;
                }
                indexVenda++;
            }
            vendasCliente[indexVendaCliente] = req.body;
            Vendas[indexVenda] = req.body;
        }
    }
    res.send();
};

exports.removeAll = function(req, res) {
    Vendas = [];
    vendasCliente = [];
    res.send(Vendas);
};

exports.removeVenda = function(req, res) {
    vendasCliente = _.reject(vendasCliente, function(venda) {
        return venda.id === req.params.vendaId;
    });

    Vendas = _.reject(Vendas, function(venda) {
        return venda.id === req.params.vendaId;
    });

    res.send();
};