'use strict';

var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var clientes = require('./components/clientes');
var vendas = require('./components/vendas');
var itens = require('./components/itens');

var assert = require('assert');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, '../views'));
// app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../app')));
app.use(app.router);

//Clientes
app.get('/clientes', clientes.getAllClientes);
app.get('/clientes/:clienteId', clientes.getCliente);
app.post('/clientes', clientes.addCliente);
app.post('/clientes/:clienteId', clientes.updateCliente);
app.put('/clientes/:clienteId', clientes.updateCliente);
app.delete('/clientes', clientes.removeAll);
app.delete('/clientes/:clienteId', clientes.removeCliente);

//Vendas
app.get('/vendas', vendas.getAllVendas);
app.get('/clientes/:clienteId/vendas', vendas.getAllVendasCliente);
app.get('/clientes/:clienteId/vendas/:vendaId', vendas.getVenda);
app.post('/clientes/:clienteId/vendas', vendas.addVenda);
app.post('/clientes/:clienteId/vendas/:vendaId', vendas.updateVenda);
app.put('/clientes/:clienteId/vendas/:vendaId', vendas.updateVenda);
app.delete('/clientes/:clienteId/vendas', vendas.removeAll);
app.delete('/clientes/:clienteId/vendas/:vendaId', vendas.removeVenda);

//Itens
app.get('/itens', itens.getAllItens);
app.get('/clientes/:clienteId/vendas/:vendaId/itens/:itensId', itens.getItem);
app.post('/clientes/:clienteId/vendas/:vendasId/itens', itens.addItens);
app.post('/clientes/:clienteId/vendas/:vendaId/itens/:itensId', itens.updateItem);
app.put('/clientes/:clienteId/vendas/:vendaId/itens/:itensId', itens.updateItem);
app.delete('/clientes/:clienteId/vendas/:vendaId/itens', itens.removeAll);
app.delete('/clientes/:clienteId/vendas/:vendaId/itens/:itensId', itens.removeItem);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});

module.exports = app;