'use strict'
var express = require('express');
var chatController = require('../controllers/chat');
var api = express.Router();

/*api.get('/prueba', UserController.pruebas);//Necesita autentificacion
api.post('/register', UserController.saveUser);
api.post('/login', UserController.loginUser);
api.put('/update-user/:id',  UserController.updateUser);//Necesita autentificacion y un parametro obligatorio
api.post('/upload-image-user/:id', UserController.uploadImage);//Necesita autentificacion
api.get('/get-image-user/:imageFile',  UserController.getImageFile);//No Necesita autentificacion
*/

module.exports = api;