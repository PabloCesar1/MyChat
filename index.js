'use strict'
const mongo = require('mongodb').MongoClient
const client = require('socket.io').listen(4000).sockets
const mongoose = require('mongoose')
const app = require('./app')
const port = process.env.PORT || 3977
var Chat = require('./models/chat')


mongoose.connect('mongodb://localhost:27017/mychat', (err, res) => {
    if (err) {
        throw err;
    } else {
        console.log("La base de datos esta corriendo correctmente");
        //----------------------------------------------------------------
                                                    //Connect to socket.io
        client.on('connection', (socket) => {
            let chat = Chat
            //Function to send status
            var sendStatus = (s) => {
                socket.emit('status', s)
            }
            //Get chats from mongo collection
            chat.find({}, (err, res) => {
                if (err) {
                    throw err
                } 
                socket.emit('output', res)                
            });

            socket.on('input', (data) => {
                let name = data.name
                let message = data.message

                if (name == '' || message == '') {
                    sendStatus('Nombre y mensaje requeridos')
                } else {
                    var data = new Chat({ name: name, message: message })
                    data.save(() => {
                        client.emit('output', [data])
                        sendStatus({
                            message: 'Mensaje enviado',
                            clear: true
                        })
                    })
                }
            })

            socket.on('clear', (data) => {
                chat.remove({}, () => {
                    socket.emit('Borrados')
                })
            })

        })
        //-----------------------------------------------------
        app.listen(port, function () {
            console.log("Api Rest server listening in port " + port);
        });
    }
});

/*
//Connect to mongodb
mongo.connect(url, (err, db) => {
    if (err) {
        throw err
    }
    console.log("Connected correctly to server");
    
    //Connect to socket.io
    client.on('connection', (socket) => {
        let chat = db.collection('chats')
        //Function to send status
        sendStatus = (s) => {
            socket.emit('status', s)
        }
        //Get chats from mongo collection
        chat.find().limit(100).sort({ _id: 1 }).toArray((err, res) => {
            if (err) {
                throw err
            }
            socket.emit('output', res)
        })

        socket.on('input', (data) => {
            let name = data.name
            let message = data.message

            if (name == '' || message == '') {
                sendStatus('Nombre y mensaje requeridos')
            } else {
                chat.insert({ name: name, message: message }, () => {
                    client.emit('output', [data])
                    sendStatus({
                        message: 'Mensaje enviado',
                        clear: true
                    })
                })
            }
        })

        socket.on('clear', (data) => {
            chat.remove({}, () => {
                socket.emit('Borrados')
            })
        })

    })

});*/