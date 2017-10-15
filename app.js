'use strict'
var express = require('express');
var bodyParser = require('body-parser');
var expressHandlebars = require('express-handlebars')
var path = require('path')
var app = express();

//Cargar rutas
var chat_routes = require('./routes/chat');

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', expressHandlebars({ defaultLayout: 'principal' }));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/', chat_routes);


module.exports = app;


