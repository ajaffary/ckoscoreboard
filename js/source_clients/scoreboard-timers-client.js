// scoreboard-timers-client event listeners

// 'jamTimerUpdate' - client sends timer update
// handled by WS604 app

// 'gameClock' - client sends game clock update
// TBD

// 'jamNumber' - client sends jam number update
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

// 'timeout' - client sends time out update
// eventlistener sends textcontent

// 'gameSegment' - client sends period, halftime, final score update
// eventlistener sends textcontent

updateGameSegment.addEventListener('click', () => {
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