// later: generate React components
// use react websocket library

// sooner:
// chrome does not permit ws connections to localhost
// need to use a secure connection
// see example in copilot

// websocket server app
// npx nodemon js/server/websockets_server.js

const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const wsaddr = { 
    localhost: 'localhost',
    home:'192.168.1.155',
    cko: '192.168.1.157',
};

// create express app
const app = express();


// create http server
const server = http.createServer(app);

// attach webSocket server to http server
const wss = new WebSocket.Server({ server });

// create a Map to store connected clients with unique client ids
const clients = new Map(); 

const chatClients = ['scoreboard-controls', 'scoreboard-announcers'];
const scoreTargetClients = ['scoreboard-banner', 'scoreboard-announcers'];
const messageTypes = [
    'scoreUpdate',
    'homeTeamUpdate',
    'awayTeamUpdate',
    'jamNumber',
    'gameSegment',
    'gameClock',
    'timeOut',
]

// on a new connection, server handles incoming websocket events
// ws is the incoming websocket event (?)
wss.on('connection', (ws) => {
    console.log('A new client connected.');
    // handle messages from clients
    ws.on('message', (data) => { 
        const message = JSON.parse(data);
        console.log(`Received message: ${data}`);
        // check if message type is 'initial'
        if (message.type === 'initial') {
            // this means the scoreboard client is sending its ID
            const clientId = message.senderId;
            // update clients Map with new client ID
            clients.set(clientId, ws);
            console.log(`Client ${clientId} has connected.`);
            // console.log(`List of all connected clients: ${clients}`);
        }
        // if message type is 'homeSkaterName'
        else if (message.type === 'homeSkaterName') {
            // insert code here
            // this means the scoreboard-names client is sending a home skater 
            // name update
            // send the home skater name update to scoreboard-banner client
        }
        // if message type is 'awaySkaterName'
        else if (message.type === 'awaySkaterName') {
            // insert code here
            // this means the scoreboard-names client is sending an away skater 
            // name update
            // send the away skater name update to scoreboard-banner client
        }
        // if message is 'crewName'
        else if (message.type === 'crewName') {
            // insert code here
            // this means the scoreboard-names client is sending a crew name update
            // send the crew name update to scoreboard-banner client
        }
        // if message type is 'loadBanner'
        else if (message.type === 'loadBanner') {
            // insert code here
            // this means the scoreboard-names client is sending a load banner 
            // update
            // send the load banner update to scoreboard-banner client
        }
        // check for valid message type
        else if (messageTypes.includes(message.type)) {
            console.log(`Received ${message.type}`);
            // this means the scoreboard-scores client is sending a score update 
            // for both teams
            // send the score update to scoreboard-banner client
            // and to scoreboard-announcers client
            for (let client of scoreTargetClients) {
                const targetClient = clients.get(client);
                // console.log(targetClient);
                // check if target client is available
                if (targetClient && targetClient.readyState === WebSocket.OPEN) {
                    // send message to target client
                    // reconstruct message object to sanitize data
                    const messageToTarget = {
                        type: message.type,
                        senderId: message.senderId,
                        content: message.content,
                    }
                    targetClient.send(JSON.stringify(messageToTarget));
                    console.log(`Message sent to ${targetClient}: ${messageToTarget}`);
                } else {
                    ws.send(JSON.stringify({ type: 'error', message: 'Target client not available' }));
                }
            }
        }
        // if message type is 'chat'
        else if (message.type === 'chat') {
            console.log(`Received ${message.type}`);
            const targetClient = clients.get(message.targetId);
            // console.log(targetClient);
            // check if target client is available
            if (targetClient && targetClient.readyState === WebSocket.OPEN) {
                // send message to target client
                // reconstruct message object to sanitize data
                const messageToTarget = {
                    type: message.type,
                    senderId: message.senderId,
                    content: message.content,
                }
                targetClient.send(JSON.stringify(messageToTarget));
                console.log(`Message sent to ${targetClient}: ${messageToTarget}`);
            } else {
                ws.send(JSON.stringify({ type: 'error', message: 'Target client not available' }));
            }
            // insert code here
            // this means the scoreboard-controls and scoreboard-announcers 
            // clients are sending a chat message
        }
        // if message type is 'error'
        else if (message.type === 'error') {
            // insert code here
            // this means the server is sending an error message
        }
    });

    // handle client disconnect
    ws.on('close', () => {
        console.log('Client disconnected');
        clients.delete(ws);
    });
}); 

// Main express route to check if server is running
app.get('/', (req, res) => {
    res.send('WebSocket server is running');
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://${wsaddr.localhost}:${PORT}`);
});