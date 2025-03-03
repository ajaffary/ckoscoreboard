// scoreboard-timers-client event listeners

// 'gameClock' - client sends game clock update
// TBD


// 'updateJamNumber' - client sends jam number update
// eventlistener sends textcontent
updateJamNumber.addEventListener('click', () => {
    // construct jam number update message
    const message = {
        type: 'jamNumber',
        senderId: clientId,
        // no need to specify targetId
        // server will send only to scoreboard-banner and scoreboard-announcers 
        // clients
        // targetId: targetIdInput.value,
        content: {
            jam: jamNumber.textContent,
        },
    };
    ws.send(JSON.stringify(message));
    console.log(`Sent message: ${JSON.stringify(message)}`);
    // no need for messageInput.value to be cleared here
    // put this with input field below if chat window needed
    // messageInput.value = '';
});


// 'updateTimeoutButton' - client sends time out update
// eventlistener sends textcontent
updateTimeOutButton.addEventListener('click', () => {
    // construct time out update message
    const message = {
        type: 'timeOut',
        senderId: clientId,
        // no need to specify targetId
        // server will send only to scoreboard-banner and scoreboard-announcers 
        // clients
        // targetId: targetIdInput.value,
        content: {
            timeout: timeOut.dataset.status,
        },
    };
    ws.send(JSON.stringify(message));
    console.log(`Sent message: ${JSON.stringify(message)}`);
    // no need for messageInput.value to be cleared here
    // put this with input field below if chat window needed
    // messageInput.value = '';
});


// 'updateGameSegmentButton' - client sends period, halftime, final score update
// eventlistener sends textcontent
updateGameSegmentButton.addEventListener('click', () => {
    // construct game segment update message
    const message = {
        type: 'gameSegment',
        senderId: clientId,
        // no need to specify targetId
        // server will send only to scoreboard-banner and scoreboard-announcers 
        // clients
        // targetId: targetIdInput.value,
        content: {
            segment: gameSegment.textContent,
        },
    };
    ws.send(JSON.stringify(message));
    console.log(`Sent message: ${JSON.stringify(message)}`);
    // no need for messageInput.value to be cleared here
    // put this with input field below if chat window needed
    // messageInput.value = '';
});