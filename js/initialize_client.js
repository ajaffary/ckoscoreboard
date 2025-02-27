// create a websocket client: see ws_initialize.js and other files

// message type: 'initial' - client connects and sends ID
// it would be better to store these IDs securely
// which requires using some encryption scheme
// which requires some setup and maintenance `
// which I don't have the bandwidth to do, 
// so I am just going to use IDs in h1

// websocket local machine address:
let wsaddr = '192.168.1.159';

// new Websocket client
const ws = new WebSocket(`ws://${wsaddr}:3000`);

// get ID from h1 element
// change this to title element
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