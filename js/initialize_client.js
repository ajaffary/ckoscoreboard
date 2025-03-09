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

const hostname = wsaddr.cko;

// new Websocket client
let ws;
let reconnectTimeout;
const shouldReconnect = true;

// get ID from title element
let clientIdElement = document.querySelector('title');
let clientId = clientIdElement.id;

const targetClients = ['scoreboard-banner', 'scoreboard-announcers']; 
const sourceClients = ['scoreboard-controls', 'game-clock'];
// target client messages
// trying to keep this in a separate file and javascript is fucking off
function handleMessage(data) {
    if (data.type === 'gameClock') {
        // update game clock
        // redo this later to only update seconds
        // and only update minutes when seconds = 0
        gameClockMinutes.textContent = data.content.minutes;
        gameClockSeconds.textContent = data.content.seconds;
    } else if (data.type === 'scoreUpdate') {
        // update both team scores
        homeTeamScore.textContent = data.content.home;
        awayTeamScore.textContent = data.content.away;
    } else if (data.type === 'homeTeamUpdate') {
        // update home team score only
        homeTeamScore.textContent = data.content.home;
    } else if (data.type === 'awayTeamUpdate') {
        // update away team score only
        awayTeamScore.textContent = data.content.away;
    } else if (data.type === 'jamNumber') {
        // update jam number
        jamNumber.textContent = data.content.jam;
    } else if (data.type === 'timeOut') {
        // update timeout status
        console.log(`Timeout status: ${data.content.timeout}`);
        if (data.content.timeout == 'true') {
            timeOut.style.visibility = 'visible';
        }
        else {
            timeOut.style.visibility = 'hidden';
        }
    } else if (data.type === 'gameSegment') {
        // update game segment
        gameSegment.textContent = data.content.segment;
    } else if (data.type === 'chat') {
        // this should be a chat message only going to scoreboard_announcers
        // as specified by ID in incoming message from scoreboard_controls
        const incomingChat = document.getElementById('incoming-chat');
        incomingChat.value += `${data.senderId}: ${data.content}\n`;
    } else if (data.type === 'error') {
        // alert(data.message);
    } 
}

function connectWebSocket() {
    ws = new WebSocket(`ws://${hostname}:3000`);

    // client, on connection, transmit ID to server
    ws.onopen = () => {
        const message = {
            type: 'initial',
            senderId: clientId,
        };
        ws.send(JSON.stringify(message));
        console.log('Connected to WebSocket server');

        // send ready message to server
        const readyMessage = {
            type: 'ready',
            senderId: clientId,
            // targetId: sourceClients,
        };
        ws.send(JSON.stringify(readyMessage));
        console.log('Sent ready message to server');

        // execute restore functions for different clients
        if (targetClients.includes(clientId)) {
            // scoreboard-bannner: restoreTeamNames()
            // scoreboard-announcers: restoreTeamNames()
            if (localStorage.home) {
                restoreTeamNames();
            }
        } else if (clientId == 'scoreboard-controls') {
            // scoreboard-controls:  restoreSourceStates()
            sendUpdateWhenReady(restoreSourceStates);
        } else if (clientId == 'game-clock') {
            // game-clock: restoreGameClock()
            sendUpdateWhenReady(restoreGameClock);
        };
    };

    /* 
    // handle the message type = restoreStates
    if (sourceClients.includes(clientId)) {
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type == 'restoreStates') {
                for (sourceClient of data.targetId) {
                    if (sourceClient == 'scoreboard-controls') {
                        // scoreboard-controls:  restoreSourceStates()
                        sendUpdateWhenReady(restoreSourceStates);
                    } else if (sourceClient == 'game-clock') {
                        // game-clock: restoreGameClock()
                        sendUpdateWhenReady(restoreGameClock);
                    };    
                }
            }
        };
    }
    */

    if (targetClients.includes(clientId)) {
        // handle incoming messages from server
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log(`Message received: ${data}`);
            console.log(`Message type: ${data.type}`);
            handleMessage(data);
        };
    }    

    ws.onclose = (event) => {
        console.log('Websocket connection closed:', event);
        // attempt reconnect after a delay
        // target clients reconnect every 2 seconds
        if (shouldReconnect) {
            if (targetClients.includes(clientId)) {
                reconnectTimeout = setTimeout(connectWebSocket, 2000);
            }
            // source clients reconnect every 2.5 seconds
            else {
                reconnectTimeout = setTimeout(connectWebSocket, 3000);
            }    
        }
    };
    
    ws.onerror = (error) => {
        console.error('Websocket error:', error);
        // close connection before attempting to reconnect after an error
        ws.close();
    };
}

// Function to stop reconnection attempts
function stopReconnecting() {
    shouldReconnect = false;
    clearTimeout(reconnectTimeout);
}

// Function to send updates to target clients
/**
 * decorator function that checks if target clients are 'ready'
 * then executes restore state function
 * @param {} restoreFunction 
 */
function sendUpdateWhenReady(restoreFunction) {
    // Check if target clients are ready
    fetch(`http://${hostname}:3000/readyClients`)
        .then(response => response.json())
        .then(readyClients => {
            // separate both clients out so banner always receives updates first
            for (let client of targetClients) {
                if (readyClients.includes(client)) {
                    restoreFunction();
                    //ws.send(JSON.stringify(message));
                    console.log(`Update sent to ${client}`);
                } else {
                    console.log(`${client} client is not ready`);
                }    
            }
        })
        .catch(error => {
            console.error('Error fetching ready clients:', error);
        });
}

// Initial connection
connectWebSocket();