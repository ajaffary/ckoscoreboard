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
const countdown = document.getElementById('countdown');

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

function updateGameClock(minutes, seconds) {
    // add a 0 in front of the seconds if it is less than 10
    seconds = seconds < 10 ? '0' + seconds : seconds;
    
    // update the clock object
    clock.minutes = minutes;
    clock.seconds = seconds;
    // update the game clock display
    gameClockMinutes.textContent = minutes;
    gameClockSeconds.textContent = seconds;
    
    // will this overwrite upon refresh?
    // yes;  this is a problem.  do not want to overwrite until
    // ready
    window.localStorage.setItem('gameclock', JSON.stringify(clock));
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
// or when the game clock is updated by the user
// or when the game clock is reset
// updateCountdown();
let remaining = setInterval(updateCountdown, 1000);
clearInterval(remaining);

// buttons to update the game clock
const gameClockMinutesInput = document.getElementById('game-clock-minutes-input');
const gameClockSecondsInput = document.getElementById('game-clock-seconds-input');

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
    updateCountdown();
}

const updateGameClockButton = document.getElementById('update-game-clock-button');
updateGameClockButton.setAttribute(
    'onclick', 
    'updateGameClockByInput(gameClockMinutesInput.value, gameClockSecondsInput.value)'
);



// update these eventListners to send data to the websockets server

const startGameClockButton = document.getElementById('start-game-clock');
const stopGameClockButton = document.getElementById('stop-game-clock');
const resetGameClockButton = document.getElementById('reset-game-clock');

// startGameClockButton.addEventListener('click', startGameClock());
// stopGameClockButton.addEventListener('click', stopGameClock());  
// resetGameClockButton.addEventListener('click', resetGameClock());
