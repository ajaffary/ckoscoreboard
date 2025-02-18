/* 
 Code from https://chatgpt.com/share/6771d56d-e22c-8000-b693-d0cffa8a813e
*/

const express = require('express');
const http = require('http');
const WebSocket = require('ws');

// Create an Express application
const app = express();

// Create an HTTP server
const server = http.createServer(app);

// Attach a WebSocket server to the HTTP server
const wss = new WebSocket.Server({ server });

// Store connected clients
const clients = new Set();

// Handle WebSocket connections
wss.on('connection', (ws) => {
    console.log('New client connected');
    clients.add(ws);

    // Handle incoming messages
    ws.on('message', (message) => {
        console.log(`Received message: ${message}`);

        // Broadcast the message to all connected clients except the sender
        for (const client of clients) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        }
    });

    // Handle client disconnect
    ws.on('close', () => {
        console.log('Client disconnected');
        clients.delete(ws);
    });
});

// Start the HTTP server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});