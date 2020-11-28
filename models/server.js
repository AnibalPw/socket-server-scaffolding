//Servidor express
const express =  require('express')
const http = require('http')
const socketio = require('socket.io');
const path = require('path');
const cors = require('cors');

const Sockets = require('./socket');

class Server {

    constructor(){

        this.app = express();
        this.port = process.env.PORT;

        //Http server
        this.server = http.createServer( this.app );

        //Configuraciones de socket
        this.io = socketio(this.server, { /* Configuraciones */ });
    }

    middlewares(){
        this.app.use( express.static( path.resolve(  __dirname, '../public' ) ) );

        //Cors
        this.app.use( cors() );
    }

    configurarSockets(){
        new Sockets( this.io );
    }

    
    execute(){
        //Inicializar Middlewares
        this.middlewares();

        //Inicializar Sockets
        this.configurarSockets();

        //Inicializar server
        this.server.listen(this.port, () => {
            console.log('Server corriendo en puerto:', this.port);
        });
    }

}

module.exports = Server;