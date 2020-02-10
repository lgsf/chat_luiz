var express = require('express');
var socket = require('socket.io')

//Setup do aplicativo Express
var app = express();
var server = app.listen(8080, () => {
  console.log('Servidor iniciado e ouvindo na porta 8080');
});

//Servindo arquivos ao Servidor
app.use(express.static('public'));

//Setup do Websockets
var io = socket(server);

//Evento para ouvir conexão
io.on('connection', (socket) => {
  console.log('Conexão com socket iniciada na porta 8080');

// Tratamento do evento de chat no servidor
  socket.on('chat', (data) => {
    io.sockets.emit('chat', data);
  });

  // Tratamento do evento de digitar no servidor
  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', data);
  });
});
