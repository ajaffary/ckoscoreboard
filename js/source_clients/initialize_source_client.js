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
let ws;

// get ID from title element
let clientIdElement = document.querySelector('title');
let clientId = clientIdElement.id;

function connectWebSocket(location) {
    ws = new WebSocket(`ws://${wsaddr.localhost}:3000`);

    // client, on connection, transmit ID to server
    ws.onopen = () => {
        const message = {
            type: 'initial',
            senderId: clientId,
        };
        ws.send(JSON.stringify(message));
        console.log('Connected to WebSocket server');
    };

    /* 
    // handle incoming messages from server
    ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log(`Message received: ${data}`);
        console.log(`Message type: ${data.type}`);
        handleMessage(data);
    };
    */
    
    ws.onclose = (event) => {
        console.log('Websocket connection closed:', event);
        // attempt reconnect after a delay
        setTimeout(connectWebSocket, 2000);
    };
    
    ws.onerror = (error) => {
        console.error('Websocket error:', error);

        // close connection before attempting to reconnect after an error
        ws.close();
    };
}

// Initial connection
connectWebSocket();