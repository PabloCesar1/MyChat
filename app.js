'use strict'
var express = require('express');
var bodyParser = require('body-parser');
var expressHandlebars = require('express-handlebars'),
var app = express();

//Cargar rutas
var chat_routes = require('./routes/chat');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//Rutas Base
app.use('/', chat_routes);
module.exports = app;