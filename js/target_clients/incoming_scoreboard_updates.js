// ignore this file for now
// JS cannot handle importing

// these message handler methods are shared between scoreboard_banner and 
// scoreboard_announcer clients

/* 
// handle incoming messages from server
ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log(`Message received: ${data}`);
    console.log(`Message type: ${data.type}`);
    handleMessage(data);
};
*/

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
        alert(data.message);
    } 
}