const scoreboardElements = [
    homeTeamName,
    awayTeamName,
    homeTeamScore,
    awayTeamScore, 
    gameClockMinutes, 
    gameClockSeconds, 
    jamNumber, 
    timeOut,
    gameSegment
]

const scoreboardState = {
	homeTeam: [],
    awayTeam: [],
    home: '00',
	away: '00',
	jam: '0',
	segment: 'Period 1',
	timeout: false,
	gameclock: '30:00'

}

/**
 * restore team names/logo locally at target clients
 */
function restoreTeamNames() {
    for (let team of ['home', 'away']) {
        const teamObj = JSON.parse(localStorage[team]);
        loadLogo(teamObj.team, teamObj.venue, teamObj.format);
    };
}

/**
 * restore scores at source client
 * send scores to target clients
 */
function restoreScores() {
    updateScore(localStorage[homeTeamScore.id], homeTeamScore);
    updateScore(localStorage[awayTeamScore.id], awayTeamScore);
    
    // perform click on updateButton
    // does this work?
    // if not, replace with websocket message function
    document.getElementById("both-team-update-score-button").click();
}

/**
 * restore game clock at source client
 * send clock to target clients
 */
function restoreGameClock() {
    const gameclock = JSON.parse(localStorage.gameclock);
    time = localStorage.time;
    gameClockMinutesInput.value = gameclock.minutes;
    gameClockSecondsInput.value = gameclock.seconds;
    // this updates local element and sends websocket message
    // which re-updates localStorage
    updateGameClockButton.click();
}

/**
 * restore jam number at source client
 * send jam number to target clients
 */
function restoreJamNumber() {
    jamInput.value = localStorage['jam-number'];
    updateJamNumber.click();
}

/**
 * restore timeout at source client
 * send jam number to target clients
 */
function restoreTimeOut() {
    // what to do with boolean from LS?
    // button locally sets LS to boolean
    // eventListener sends ws message
    // so all we need to do is click the button?\
    // no, need to first update timeoutstatus locally
    timeOutStatus(localStorage['time-out']);
    updateTimeOutButton.click();
}

/**
 * restore game segment at source client
 * send game segment to target clients
 */
function restoreGameSegment() {
    // same as timeout
    // status already stored in localStorage
    // just need to click button
    // no dumbass
    // button is sending what's currently in the reset state to localStorage
    // need to updateText first
    updateText(localStorage['game-segment'], gameSegment);
    updateGameSegmentButton.click();
}

/**
 * restore all elements
 * issue:  not all elements are being restored from same sources
 * work out the logic here by writing down what is being replaced where
 * and what needs to be sent to whom from where
 */
function restoreSourceStates() {
    // get the state of the scoreboard from localStorage
    // send data to clients
    console.log("restoreSourceStates function being called.")
    restoreScores();
    restoreJamNumber();
    restoreTimeOut();
    restoreGameSegment();
    restoreGameClock();
}

/*
function readyMessage(data) {
    if (data.type === 'ready') {
        restoreSourceStates();
        restoreGameClock();
    } 
}
*/





// save above data to localStorage
// use setItem() method
// https://medium.com/@joeylee08/localstorage-101-persisting-browser-data-on-the-client-694cea0981b3

// retrieve with getItem() method

// want textContent of corresponding elements to autoupdate upon reconnection

// how to trigger reconnect?
// ws onmessage uses callback associated with message typeof

// need a similar event handler to update all elements
// https://softwareengineering.stackexchange.com/questions/434117/websocket-client-reconnection-best-practices
// 

/*
this is an example of localStorage with current controls
these appear only after the updates have been applied by each button individually
I would like the scoreboard to initialize localStorage with some values
which are already set in the scoreboard_banner HTML file

{
    "home-team-score": "01",
    "jam-number": "1",
    "away-team-score": "01",
    "game-segment": "END OF PERIOD 2"
}
*/

/*
what are all the localStorage properties now?

home-team-score:
jam-number:
away-team-score:
time-out:
game-segment:
gameclock:

these are only stored in the source clients
restoreState() can update local elements

but they are not stored on client side as of now
need a method to do that?
could add to websocket message callbacks?

or, store in state object
and transmit state object upon reconnect

sendState() should send a message with type 'restoreState' 
with { content: state }, where state is the state object

server should forward the content exactly as it has been

client can apply restoreState() to update the same elements

*/

// Possible to use localStorage to restore state by creating a button that
// maps values from localStorage to respective elements
// question:  can I do this locally from each client?
// or do I need to send a message to the server to send a message to all clients?

// I will need to think about this
// perhaps I can put a button on the page to carry this out
// first, write a function to carry this out
// attach that function to a button

// need an eventListener
// event is either reconnect or disconnect
