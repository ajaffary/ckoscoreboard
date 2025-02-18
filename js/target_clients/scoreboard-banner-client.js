// see scoreboard_target.html for banner layout

// how to organize and generate scoreboard elements?
// hard code HTML vs. generate with Javascript
// issue: keep track of IDs in order to update DOM elements

// handle incoming messages
ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log(`Message received: ${data}`);
    if (data.type === 'updateScore') {
        // update both team scores
        homeTeamScore.textContent = data.content.home;
        awayTeamScore.textContent = data.content.away;
    } else if (data.type === 'homeTeamUpdate') {
        // update home team score only
        homeTeamScore.textContent = data.content.home;
    } else if (data.type === 'awayTeamUpdate') {
        // update away team score only
        awayTeamScore.textContent = data.content.home;
    } else if (data.type === 'error') {
        alert(data.message);
    } 
};

// jam number update

// game clock

// timeout

// period

// final score

// penalty box home

// penalty box away