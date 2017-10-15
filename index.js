const mongo = require('mongodb').MongoClient
const client = require('socket.io').listen(4000).sockets
const mongoose = require('mongoose')
const app = require('./app')
const port = process.env.PORT || 5000
var Chat = require('./models/chat')


mongoose.connect('mongodb://pablo95:passtodb@ds121015.mlab.com:21015/mychat', (err, res) => {
    if (err) {
        throw err;
    } else {
        console.log("La base de datos esta corriendo correctmente");
        //----------------------------------------------------------------
        //                                        || Connect to socket.io ||
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
                socket.broadcast.emit('mensaje', {text: 'Un nuevo usuario se ha conectado.'});
            }).sort({ _id: -1 });

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
        app.listen(process.env.PORT || 3000, function () {
            //Corriendo en el puerto...
            console.log("Api Rest server listening in port " + 3000);
        });
    }
});
