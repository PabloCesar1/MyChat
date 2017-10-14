'use strict'

var Chat = require('../models/chat');

function getView(req, res){
    res.render('index')
}

module.exports = {
	getView
}


   
