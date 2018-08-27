var socket = io();

var searchParams = new URLSearchParams(window.location.search);
if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');
$('h1').text('Escritorio ' + escritorio);

socket.on('connect', function () {
    console.log('Conectado con el servidor');
});

socket.on('disconnect', function () {
    console.log('Desconectado del servidor');
})

$('button').on('click', function () {
    socket.emit('atenderTicket', {escritorio}, function (data) {
        console.log(data);
        if (data.err) {
            alert(data.mensaje);
        } else {
            console.log('El ticket a atender es: ' + data.ticket.numero);
            $('small').html(data.ticket.numero);
        }
    });
});