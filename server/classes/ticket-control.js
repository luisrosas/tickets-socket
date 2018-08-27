const fs = require('fs');

class Tikect {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {
    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];

        let data = require('../data/data.json');
        
        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
        } else {
            this.reiniciarConteo();
        }
    }

    suguiente() {
        this.ultimo++;
        let ticket = new Tikect(this.ultimo, null);
        this.tickets.push(ticket);
        this.grabarArchivo();

        return `Tikect ${this.ultimo}`;
    }

    getUltimoTicket() {
        return `Tikect ${this.ultimo}`;
    }

    getUltimos4() {
        return this.ultimos4;
    }

    atenderTiket(escritorio) {
        if (this.tickets.length === 0) {
            return {
                err: true,
                mensaje: 'No hay tikects pendientes'
            };
        }

        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift();

        let atenderTiket = new Tikect(numeroTicket, escritorio);
        this.ultimos4.unshift(atenderTiket);

        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1,1); // Borra el ultimo elemento
        }
        console.log('Últimos 4: ', this.ultimos4);

        this.grabarArchivo()

        return {
            err: false,
            ticket: atenderTiket
        };
    }

    reiniciarConteo() {
        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];
        console.log("Se ha reinicializado el programa");
        this.grabarArchivo();
    }

    grabarArchivo() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        }

        fs.writeFileSync('./server/data/data.json', JSON.stringify(jsonData));

        console.log("Se guardo archivo del contador");
    }
}

module.exports = {
    TicketControl
}