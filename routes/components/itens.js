'use strict';

var _ = require('lodash');

var Itens = [{
    id: 1,
    clienteId: 0,
    vendaId: 1,
    produto: 'primeiroProdtuo',
    quantidade: 5,
    valorUnitario: 3.3
}, {
    id: 2,
    clienteId: 0,
    vendaId: 1,
    produto: 'segundoProdtuo',
    quantidade: 4,
    valorUnitario: 3.3
}, {
    id: 3,
    clienteId: 0,
    vendaId: 2,
    produto: 'terceiroProdtuo',
    quantidade: 5,
    valorUnitario: 3.3
}, {
    id: 4,
    clienteId: 0,
    vendaId: 2,
    produto: 'quartoProdtuo',
    quantidade: 4,
    valorUnitario: 3.3
}];

function getItemVenda(itensId) {
    return _.find(Itens, function(item) {
        return parseInt(item.id) === parseInt(itensId);
    });
}
exports.getAllItens = function(req, res) {
    res.send(200, Itens);
};

exports.getItem = function(req, res) {
    res.send(getItemVenda(req.params.itensId));
};

exports.addItens = function(req, res) {
    var item;
    item = req.body;

    if (Itens) {
        Itens.push(item);
    }
    res.send();
};

exports.updateItem = function(req, res) {
    // var indexCliente,
    //     indexVenda,
    //     indexItem = 0,
    //     achou = false;
    // if (Itens) {
    //     for (item in Itens) {
    //         if (item == req.body) {
    //             achou = true;
    //             break;
    //         }
    //         indexItem;
    //     }
    // }
    // if (achou) {
    //     Itens[indexItem] = req.body;
    // }
    res.send();
};

exports.removeAll = function(req, res) {
    Itens = [];
    res.send(200, Itens);
};

exports.removeItem = function(req, res) {
    Itens = _.reject(Itens, function(item) {
        return item.id === req.params.itensId;
    });

    res.send();
};