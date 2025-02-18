// scoreboard-scores client methods
// sends score updates to scoreboard-banner and scoreboard-announcers clients
// contains event listeners for score update buttons

// types of messages:
// 'homeScore' - send home team score only
// 'awayScore' - send away team score only
// 'scoreUpdate' - send both teams scores

// messages sent with an eventlistener attached to score update button

// send both team scores
// this element needs to be added to the scoreboard-scores.html file
const updateScoresButton = document.getElementById('both-team-update-score-button');
        
updateScoresButton.addEventListener('click', () => {
    // construct score update message
    const message = {
        type: 'scoreUpdate',
        senderId: clientId,
        // no need to specify targetId
        // server will send only to scoreboard-banner and scoreboard-announcers 
        // clients
        // targetId: targetIdInput.value,
        content: {
            home: homeTeamScore.textContent,
            away: awayTeamScore.textContent,
        },
    };
    ws.send(JSON.stringify(message));
    console.log(`Sent message: ${JSON.stringify(message)}`);
    // no need for messageInput.value to be cleared here
    // put this with input field below if chat window needed
    // messageInput.value = '';
});

// send home team score only
const updateHomeTeamButton = document.getElementById('home-team-update-score-button');
        
updateHomeTeamButton.addEventListener('click', () => {
    // construct score update message
    const message = {
        type: 'homeTeamUpdate',
        senderId: clientId,
        // no need to specify targetId
        // server will send only to scoreboard-banner and scoreboard-announcers 
        // clients
        // targetId: targetIdInput.value,
        content: {
            home: homeTeamScore.textContent,
        },
    };
    ws.send(JSON.stringify(message));
    console.log(`Sent message: ${JSON.stringify(message)}`);
});

// send away team score only
const updateAwayTeamButton = document.getElementById('away-team-update-score-button');
        
updateAwayTeamButton.addEventListener('click', () => {
    // construct score update message
    const message = {
        type: 'awayTeamUpdate',
        senderId: clientId,
        // no need to specify targetId
        // server will send only to scoreboard-banner and scoreboard-announcers 
        // clients
        // targetId: targetIdInput.value,
        content: {
            away: awayTeamScore.textContent,
        },
    };
    ws.send(JSON.stringify(message));
    console.log(`Sent message: ${JSON.stringify(message)}`);
});

// Note: Choosing not to attach event listeners to RESET buttons
// Instead, reset button will reset scores locally
// Use Update Scores to send scores to scoreboard clients
// bothTeamResetButton
// homeTeamResetButton
// awayTeamResetButton



/*
// handle incoming message data
// good to have for announcers to send messages to SK?
// TBD
    ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.type === 'welcome') {
        // clientId = data.clientId;
        console.log(`Assigned Client ID: ${clientId}`);
    } else if (data.type === 'message') {
        const messages = document.getElementById('messages');
        messages.value += `${data.content}\n`;
    } else if (data.type === 'error') {
        alert(data.message);
    }
};
*/