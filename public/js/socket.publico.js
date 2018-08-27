var socket = io();
var labelT1 = $('#lblTicket1');
var labelT2 = $('#lblTicket2');
var labelT3 = $('#lblTicket3');
var labelT4 = $('#lblTicket4');
var labelE1 = $('#lblEscritorio1');
var labelE2 = $('#lblEscritorio2');
var labelE3 = $('#lblEscritorio3');
var labelE4 = $('#lblEscritorio4');

var labelsTicket = [labelT1, labelT2, labelT3, labelT4];
var labelsEscritorio = [labelE1, labelE2, labelE3, labelE4];

var audio = new Audio('audio/new-ticket.mp3');

socket.on('connect', function () {
    console.log('Conectado con el servidor');
});

socket.on('disconnect', function () {
    console.log('Desconectado del servidor');
});

socket.on('estadoActual', function(data){
    actualizarPantalla(data.ultimos4);
});

function actualizarPantalla(data){
    audio.play();
    console.log(data.length, data);
    for (var i = 0; i <= data.length -1; i++) {
        labelsTicket
        labelsTicket[i].text('Ticket ' + data[i].numero);
        labelsEscritorio[i].text('Escritorio ' + data[i].escritorio);
    }
}