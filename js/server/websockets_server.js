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
const cors = require('cors');
const path = require('path');

const wsaddr = { 
    localhost: 'localhost',
    home:'192.168.1.155',
    cko: '192.168.1.157',
};

const hostname = wsaddr.localhost;

// create express app
const app = express();

// use CORS
app.use(cors());

// server static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// create http server
const server = http.createServer(app);

// attach webSocket server to http server
const wss = new WebSocket.Server({ server });

// create a Map to store connected clients with unique client ids
const clients = new Map(); 
const readyClients = new Set();

const chatClients = ['scoreboard-controls', 'scoreboard-announcers'];
const scoreTargetClients = ['scoreboard-banner', 'scoreboard-announcers']; // 'flip-clock-test-client'
const scoreSourceClients = ['scoreboard-controls', 'game-clock'];
const messageTypes = [
    'scoreUpdate',
    'homeTeamUpdate',
    'awayTeamUpdate',
    'jamNumber',
    'gameSegment',
    'gameClock',
    'timeOut',
    'gameFlipClock',
    'jamFlipClock'
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
            ws.clientId = clientId;
            // update clients Map with new client ID
            clients.set(clientId, ws);
            console.log(`Client ${clientId} has connected.`);
            // console.log(`List of all connected clients: ${clients}`);
        }
        else if (message.type == 'ready') {
            readyClients.add(message.senderId);
            console.log(`Client ${message.senderId} is ready`);
    
            // Notify source clients to send restoreScores
            if (scoreTargetClients.includes(message.senderId)) {
                console.log('target client is ready');
                // now communicate this to the source clients
                for (let sourceClient of scoreSourceClients) {
                    const client = clients.get(sourceClient);
                    if (client && client.readyState === WebSocket.OPEN) {    
                        const notifyMessage = {
                            type: 'restoreStates',
                            senderId: message.senderId,
                            targetId: sourceClient
                        };
                        client.send(JSON.stringify(notifyMessage));
                        console.log(`restoreState message sent to ${sourceClient}`);
                    }
                }
            }
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
            // this means the scoreboard-controls client is sending a score update 
            // send the update to scoreboard-banner client
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
            // this means the scoreboard-controls and scoreboard-announcers 
            // clients are sending a chat message
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
                console.log(`Target ${targetClient} client not available`);
                
                ws.send(JSON.stringify(
                    { 
                        type: 'error', 
                        message: `Target ${targetClient} client not available` 
                    }));                
            }
        }
        // if message type is 'error'
        else if (message.type === 'error') {
            // insert code here
            // this means the server is sending an error message
            // what to do here?
        }
    });

    // handle client disconnect
    ws.on('close', (data) => {
        const clientId = ws.clientId;
        if (clientId) {
            console.log(`Client ${clientId} disconnected`);
            clients.delete(clientId);
            readyClients.delete(clientId);
        } else {
            console.log(
                'A client disconnected without sending an initial message');
        }
    });
}); 

// Main express route to check if server is running
app.get('/', (req, res) => {
    res.send('WebSocket server is running');
});

// check which host to use
app.get('/wsaddr', (req, res) => {
    res.json(wsaddr);
});

// Endpoint to get ready clients
app.get('/readyClients', (req, res) => {
    res.json(Array.from(readyClients));
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://${hostname}:${PORT}`);
});