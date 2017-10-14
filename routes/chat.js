'use strict'

var express = require('express');
var chatController = require('../controllers/chat');
var api = express.Router();

api.get('/', chatController.getView);
//api.get('/index', chatController.getView);

module.exports = api;