'use strict'
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

//Cargar rutas
var chat_routes = require('./routes/chat');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//Rutas Base
app.use('/api', user_routes);

module.exports = app;