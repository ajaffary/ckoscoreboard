// create a websocket client: see ws_initialize.js and other files

// message type: 'initial' - client connects and sends ID

// it would be better to store these IDs securely
// which requires using some encryption scheme
// which requires some setup and maintenance `
// which I don't have the bandwidth to do, 
// so I am just going to use IDs in h1

// websocket local machine address:
// const ws_addr = require('./server/websockets_server.js');

// let wsaddr = '192.168.1.155';
// Use the wsaddr variable in your client-side code

const wsaddr = { 
    localhost: 'localhost',
    home:'192.168.1.155',
    cko: '192.168.1.157',
};

// new Websocket client
const ws = new WebSocket(`ws://${wsaddr.localhost}:3000`);

// get ID from title element
let clientIdElement = document.querySelector('title');
let clientId = clientIdElement.id;

// client, on connection, transmit ID to server
ws.onopen = () => {
    const message = {
        type: 'initial',
        senderId: clientId,
    };
    ws.send(JSON.stringify(message));
    console.log('Connected to WebSocket server');
};