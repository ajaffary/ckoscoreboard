// code from https://youtu.be/x7WJEmxNlEs?si=pT9pS3H1pd4xZ_BS
// 
// also see https://www.sitepoint.com/build-javascript-countdown-timer-no-dependencies/

// taken from https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/time

// update the countdown every 1000 ms = 1 second
// see https://developer.mozilla.org/en-US/docs/Web/API/Window/setInterval
// setInterval executes a function every x milliseconds
// in this case, we are calling the function updateCountdown every 1 second

// updateCountdown displays the current time remaining, formatted in minutes 
// and seconds, and then decrements the time by 1 second

// setInterval re-executes updateCountdown every 1 second, so the next time
// updateCountdown is called, the time is 1 second less than the previous time
// and so on, until the time is 0

// when should we update localStorage?
// issue is it resets upon refresh
// i want to avoid

const startMinutes = 30;
console.log(startMinutes);

// time in seconds
// this is in global scope so that it can be accessed by the functions below
let time = startMinutes * 60;

// <p> element that displays the time remaining
// this is no longer needed here since i'm updating the minutes and seconds 
// separately
// this is created in shared_elements.js
const gameClock = document.getElementById('game-clock');

// not sure what to do with this yet
// wondering if this will persist after disconnect/browser refresh
let clock = {
    'minutes': 30,
    'seconds': 0
};

// code below from Copilot

// minutes span element
const gameClockMinutes = document.getElementById('game-clock-minutes');

// seconds span element
const gameClockSeconds = document.getElementById('game-clock-seconds');

/**
 * updates clock object
 * updates clock elements on game clock controls page
 * updates local storage on game clock controls page
 * stores time remaining in local storage
 * @param {*} minutes 
 * @param {*} seconds 
 */
function updateGameClock(minutes, seconds) {
    // add a 0 in front of the seconds if it is less than 10
    seconds = seconds < 10 ? '0' + seconds : seconds;
    
    // update the clock object
    // this is sent to the server
    // is this necessary when we have local storage?
    // note: seconds are cleaned up before updating clock values
    // yes keep this to send over websocket message
    // eventually, replace with localstorage entries?
    clock.minutes = minutes;
    clock.seconds = seconds;

    // update the game clock display
    gameClockMinutes.textContent = minutes;
    gameClockSeconds.textContent = seconds;
    
    // will this overwrite upon refresh?
    // yes;  this is a problem.  do not want to overwrite until
    // ready
    window.localStorage.setItem('gameclock', JSON.stringify(clock));
    window.localStorage.setItem('time', time);
}

function updateCountdown() {
    // compute total number of minutes remaining
    const minutes = Math.floor(time / 60);
    // compute number of seconds remaining in the current minute
    let seconds = time % 60;

    // possible to only change this when seconds are 00?
    // yes?
    // compute seconds first
    // if seconds == 00
    // then compute and update minutes
    updateGameClock(minutes, seconds);

    // decrement the time
    time--;

    // need to account for negative time
    // https://www.w3schools.com/howto/howto_js_countdown.asp

    if (time < 0) {
        clearInterval(remaining);
        updateGameClock(0, 0);
    }
}

// do not call updateCountdown here
// this will cause the clock to start immediately
// instead, call updateCountdown when the start button is clicked
// this will allow local storage to persist the game clock state
// updateCountdown();
let remaining = setInterval(updateCountdown, 1000);
clearInterval(remaining);

// inputs to update the game clock
const gameClockMinutesInput = document.getElementById('game-clock-minutes-input');
const gameClockSecondsInput = document.getElementById('game-clock-seconds-input');

/**
 * function to update clock by user input
 * @param {*} minutes 
 * @param {*} seconds 
 * @returns 
 */
function updateGameClockByInput(minutes, seconds) {
    minutes = parseInt(minutes);
    seconds = parseInt(seconds);

    if (isNaN(minutes) || isNaN(seconds) || minutes < 0 || seconds < 0 || seconds >= 60) {
        return;
    }
 
    updateGameClock(minutes, seconds);

    gameClockMinutesInput.value = 0;
    gameClockSecondsInput.value = 0;

    time = minutes * 60 + seconds;
    updateCountdown();
}

function startGameClock() {
    updateCountdown();
    clearInterval(remaining);
    remaining = setInterval(updateCountdown, 1000);
}

function stopGameClock() {
    clearInterval(remaining);
}

function resetGameClock() {
    clearInterval(remaining);
    time = startMinutes * 60;
    // 
    updateCountdown();
}

const updateGameClockButton = document.getElementById('update-game-clock-button');
updateGameClockButton.setAttribute(
    'onclick', 
    'updateGameClockByInput(gameClockMinutesInput.value, gameClockSecondsInput.value)'
);


// so logic is:
// add mutation observer to the timer
// mutation callback function sends a websocket message to the scoreboard server
// add event listener to play/pause button
// even listener callback function is:
// if (jamTimer.innerHTML = '1:00') {
//   invoke observer
// } then close observer when timer resets?
// }


// gameClock: paragraph element that contains the timer data in two span elements
// gameClockMinutes: span element that contains the minutes data
// gameClockSeconds: span element that contains the seconds data
// these are mimicked in all three clients:
/* 
    <p id="game-clock">
        <span id="game-clock-minutes">30</span>:<span id="game-clock-seconds">00</span>
    </p>
*/

// want to send both pieces of data to the scoreboard clients
// send textContent of each span element
// minutesData = gameClockMinutes.textContent
// secondsData = gameClockSeconds.textContent = seconds;
// this is already contained in 'clock' object

// mutation observer should listen for changes to the span elements
// observer.disconnect() will stop the observer

// Mutation callback function
// this function will send a websockets message to the server
// when a mutation is detected
function mCallback(mutations) {
  for (let mutation of mutations) {
    if (mutation.type === 'childList') {
      // confirm Mutation is detected
      console.log(`Mutation Detected: ${mutation.type}.`);
      // execute what happens when Mutation is detected
      // construct a websockets message
      // put this message in a function
      const message = {
        type: 'gameClock',
        senderId: clientId,
        content: clock,
      };
      // send the websockets message
      ws.send(JSON.stringify(message));
      console.log(`Sent message: ${JSON.stringify(message)}`);
    }
  }
}

// Mutation configuration
const config = { 
    attributes: true, 
    childList: true, 
    subtree: true, 
    CharacterData: true 
};

// create a new MutationObserver
// the observer calls mCallback when a mutation is detected
// mCallback sends the clock data to the server
// which happens after every second updates
const observer = new MutationObserver(mCallback);
// no need to start automatically?
// observer.observe(gameClockSeconds, config);

// update these eventListener to send data to the websockets server
const startGameClockButton = document.getElementById('start-game-clock');
/*
from: https://codepen.io/impressivewebs/pen/aXVVjg?editors=0011
btnStart.addEventListener('click', function () {
  // Start observing the list element using
  // the passed in options as qualifiers
  observer.observe(mList, options);
  doLogAndBtn('Observing for mutations: STARTED');
}, false);
*/
function startClockObserver() {
    // updateGateClockButton and resetClockButton update the clock elements
    // before starting the observer, at least according to the order in which
    // the click properties have been assigned
    // therefore add the usual message event listener to those since they
    // only send a single update
    observer.observe(gameClockSeconds, config);
    console.log("Observer started");
}

startGameClockButton.addEventListener('click', startClockObserver);

updateGameClockButton.addEventListener('click', function() {
    // check Copilot code for function that creates messages
    // same message as in mutation observer callback
    const message = {
        type: 'gameClock',
        senderId: clientId,
        content: clock,
    };
    ws.send(JSON.stringify(message));
    console.log(`Sent message: ${JSON.stringify(message)}`);
    }
);

/*
notes: https://www.smashingmagazine.com/2019/04/mutationobserver-api-guide/
- recording old values
    - use this to record mutation updates to target clients
    - this could be a log of what updates were received

- similarly, add an event listener to log each update sent by source client
    - create an array with current state entries
        - this allows flat formatting for import into a spreadsheet
    - create an object with current state entries
        - this allows key:value indexing for easy reference
    - append each state to another structure:
        - object, with keys = current timestamp
        - array, where gametime is included in state array
*/

const stopGameClockButton = document.getElementById('stop-game-clock');
stopGameClockButton.addEventListener('click', function() {
    observer.disconnect();
    console.log("Observer stopped");
    }
);  

const resetGameClockButton = document.getElementById('reset-game-clock');
resetGameClockButton.addEventListener('click', function() {
    const message = {
        type: 'gameClock',
        senderId: clientId,
        content: clock,
    };
    ws.send(JSON.stringify(message));
    console.log(`Sent message: ${JSON.stringify(message)}`);
    }
);


// issue:  I want the observer on the whole time?
// why do I need to start it with a button click?  the button clicks here are
// only meant to update the data
// the date should be sent anytime it changes, which is what the mutation
// observer is observing.  every time it observes, the callack function
// should send a message.

// need to diagnose this behavior
