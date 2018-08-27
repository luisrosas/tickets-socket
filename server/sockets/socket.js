const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.on('siguienteTiket', (data, callback) => {
        let siguienteTiket = ticketControl.suguiente();
        callback({
            ticket: siguienteTiket
        });
    });

    client.emit('estadoActual', {
        ticket: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });

    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            });
        }

        let ticketData = ticketControl.atenderTiket(data.escritorio);
        callback(ticketData);

        if (!ticketData.err) {
            // Notifica a la tantalla de los ultimos 4
            client.broadcast.emit('estadoActual', {
                ticket: ticketControl.getUltimoTicket(),
                ultimos4: ticketControl.getUltimos4()
            });
        }
    });

});