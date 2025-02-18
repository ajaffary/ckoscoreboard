// list of clients
// store client IDs in a json file
// do this just for record keeping

// the client IDs will be:
// scoreboard-scores
// scoreboard-timers
// scoreboard-names-source
// scoreboard-banner
// scoreboard-announcer
// scoreboard-names-display

// initial connection:
// stick with obtaining the ID from the client h1 element
// since this identifies the purpose of the client
// communicate this to the server
// server will store clients in a Map
// sends a welcome message to confirm connection


// source clients:
// create event listeners in clients to attach to buttons to send messages
// console.log sent data to retain a history
// Construct message types to send from each client
// note: message can be many formats
// using JSON, set message type to reflect the nature of content being sent
// but hang on:
// all we are doing is updating target elements with source message content
// most of the time this is one element at a time
// the only exception is both team scores
// and possibly jam number auto-update with jam timer
// therefore, rather than create different message types, 
// we can just send the message content under one message type
// where the message content includes target element IDs
// so the client knows where to put the updated values

// what is the model for message content?
// message is an object:
// { targetElementId: targetElementContent }
// for example: { homeTeamScore: 0 }
// or { jamNumber: 1 }
// or { jamTimer: 1:00 }

// multiple target elements:
// { homeTeamScore: 0, awayTeamScore: 0 }
// or { jamNumber: 1, jamTimer: 1:00 }
// client callback can iterate over key-value pairs (see below)
// convert message object to JSON before sending

// examples
// button to send message
const sendButton = document.getElementById('sendButton');

// chat message send field
const messageInput = document.getElementById('messageInput');

// target client ID input field
const targetIdInput = document.getElementById('targetId');

// add event listener to send button
// event type = 'click'
sendButton.addEventListener('click', () => {
    // message template
    const message = {
        // message type
        type: 'sendTo',
        // sender ID
        senderId: clientId,
        // target ID
        targetId: targetIdInput.value,
        // message content
        content: messageInput.value,
    };
    // convert message object to JSON before sending
    ws.send(JSON.stringify(message));
    // clear message input field
    messageInput.value = '';
});

// example update score button
const updateHomeTeamScoreButton = document.getElementById('home-team-update-score-button');

// event listenter to send scores button
updateHomeTeamScoreButton.addEventListener('click', () => {
    // construct message object
    const message = {
        // message type
        type: 'sendTo',
        // sender ID
        senderId: clientId,
        // target ID
        targetId: targetIdInput.value,
        // message content
        content: {
            // elements to update in target client
            home: homeTeamScore.textContent,
            away: awayTeamScore.textContent,
        },
    };
    // convert message object to JSON before sending
    ws.send(JSON.stringify(message));
    messageInput.value = '';
});



// server: 
// differentiate incoming messages by message type
// use conditionals with message types
// determine which client should receive message by type and targetId

// Handle incoming messages from clients
    ws.on('message', (data) => {
        // data is the message as a JSON string
        // perhaps with some WebSocket metadata
        // convert message JSON string to object
        const message = JSON.parse(data);
        console.log(`Received message: ${data}`);
        // check message type
        if (message.type === 'messageType') {
            // determine target client
            const targetClient = clients.get(message.targetId);
            // check if target client is available
            if (targetClient && targetClient.readyState === WebSocket.OPEN) {
                // send message to target client
                // reconstruct message object
                // why is this necessary rather than sending the original
                // data JSON string?                 
                messageToTarget = {
                    type: 'message',
                    from: message.senderId,
                    content: message.content,
                }
                targetClient.send(JSON.stringify(messageToTarget));
                console.log(`Message sent: ${messageToTarget}`);
            } else {
                ws.send(JSON.stringify({ type: 'error', message: 'Target client not available' }));
            }
        }
    });


// target clients:
// update elements per message content & callback instructions
// when (sanitized) message received (onmessage), perform DOM element updates
// console.log score updates together with game clock time

// example

// event is a MessageEvent object:
// https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/message_event

// data is a property of the event object
// that contains the original message data as a (JSON?) string
// https://developer.mozilla.org/en-US/docs/Web/API/MessageEvent/data

// onmessage is the event listener

// how to update DOM elements?
// use document.getElementById() or querySelector() to get target element
// then use element.textContent or innerHTML or value to update element content

ws.onmessage = (event) => {
    // convert message JSON string to object
    const data = JSON.parse(event.data);
    // conditional to check message type
    if (data.type === 'welcome') {
        // set clientId sent from server
        clientId = data.clientId;
        console.log(`Assigned Client ID: ${clientId}`);
    } 
    // generic message type
    else if (data.type === 'message') {
        // this was the textarea element in the example client
        const messages = document.getElementById('messages');
        // update textarea element with message content
        messages.value += `${data.content}\n`;
    } else if (data.type === 'error') {
        alert(data.message);
    }
};

// message object that contains several piece of data as properties
ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.type === 'welcome') {
        clientId = data.clientId;
        console.log(`Assigned Client ID: ${clientId}`);
    } 
    else if (data.type === 'message') {
        const messages = document.getElementById('messages');
        messages.value += `${data.content}\n`;
        // extra properties containing additional data
        // these variables are defined in scoreboard_controls.js
        // this is sloppy and hard to track and should be refactored
        homeTeamScore.textContent = data.content.home;
        awayTeamScore.textContent = data.content.away;
    } else if (data.type === 'error') {
        alert(data.message);
    }
};


// NOTES: https://www.w3schools.com/js/js_json_parse.asp
// A common use of JSON is to exchange data to/from a web server.
// When receiving data from a web server, the data is always a string.
// Parse the data with JSON.parse(), and the data becomes a JavaScript object.