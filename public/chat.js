//Inicializando o socket no frontend
var socket = io.connect('http://localhost:8080');

// Referenciando os objetos da DOM em variáveis
var message = document.getElementById('message');
var user = document.getElementById('user');
var btn = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');

// Emite evento ao clicar o botão de enviar
btn.addEventListener('click', () => {
  socket.emit('chat', {
      message: message.value,
      user: user.value
  });
  message.value = "";
});

// Emite evento ao clicar o botao enter para enviar a mensagem
  message.addEventListener('keypress', (e) => {
  if(e.key === 'Enter'){
  socket.emit('chat', {
      message: message.value,
      user: user.value
  });
  message.value = "";
 }
});

message.addEventListener('keypress', () => {
    socket.emit('typing', user.value);
})

// Ouve eventos e os mostra na página
socket.on('chat', (data) => {
    //Limpa string associada ao elemento após mensagem ser enviada
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.user + ': </strong>' + data.message + '</p>';
});
socket.on('typing', (data) => {
    feedback.innerHTML = '<p><em>' + data + ' está digitando...</em></p>';
});
