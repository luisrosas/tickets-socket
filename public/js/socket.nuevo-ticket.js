var socket = io();

var label = $('#lblNuevoTicket');

socket.on('connect', function () {
    console.log('Conectado con el servidor');
});

socket.on('disconnect', function () {
    console.log('Desconectado del servidor');
})

socket.on('estadoActual', function(data){
    label.html(data.ticket);
});

$('button').on('click', function(){
    socket.emit('siguienteTiket', null, function(data){
        console.log('El siguiente ticket es: ' + data.ticket);
        label.html(data.ticket);
    });
});