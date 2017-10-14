'use strict'

var Chat = require('../models/chat');

function getView(req, res){
    res.render('index')
	//res.status(200).send({message:'Metodo gestArtist del controlador artist'});
}

module.exports = {
	getView
}