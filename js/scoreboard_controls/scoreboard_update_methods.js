/* 

!! CLEAN THIS UP !!

This file contains functions to LOCALLY update:
- home team scores
- away team scores
- both scores
- jam number
- game segment
- game clock timer
- timeout message

And (some) variables to access:
- Elements containing the data
- Buttons to change the data and/or send the updates to websockets server

*/

/**
 * Update Team Score when 'Update Score' button is clicked
 * @param {string} newScore: new score to be updated
 * @param {element} teamScore: element that contains team score
 * @returns 
 */
function updateScore(newScore=0, teamScore=0) {
    if (newScore.toString().length === 1) {
        teamScore.textContent = '0' + newScore.toString();
    }
    else if (newScore.toString().length > 3) {}
    else {
        teamScore.textContent = newScore;
    }
    // window.localStorage.setItem(teamScore.getAttribute("id"), teamScore.textContent);
    
    return teamScore.textContent;
}

/**
 * Add or Subtract from Team Score
 * @param {element} teamScore: element that contains team score 
 * @param {string} increment: amount to be added or subtracted from score
 */
function addToScore(teamScore, increment) {
    let currentScore = Number(teamScore.textContent);
    let newScore = currentScore + increment;
    if (newScore <= 0) {
        teamScore.textContent = '00'
    }
    else updateScore(newScore, teamScore);
}

/**
 * Update Team Score by user input
 * @param {number} teamInput: number input by user
 * @param {element} teamScore: element that contains team score
 */
function updateScoreByInput(teamInput, teamScore) {
    let toNumber = Number(teamInput.value);
    let teamId = teamScore.getAttribute("id");
    if (Number.isNaN(toNumber) || toNumber < 0) {
        // teamScore.textContent = '00';
    }
    else if (teamInput.value == '') {
        window.localStorage.setItem(teamId, teamScore.textContent);
    }
    else {
        let score = updateScore(Number(teamInput.value), teamScore);
        window.localStorage.setItem(teamId, score);
    }
    teamInput.value = '';
}

function resetScore(teamInput, teamScore) {
    teamInput.value = '';
    let teamId = teamScore.getAttribute("id");
    let score = updateScore(0, teamScore);
    window.localStorage.setItem(teamId, score);
    // teamScore.textContent = '00';
}

function updateBothTeamScores() {
    updateScoreByInput(homeTeamInput, homeTeamScore);
    updateScoreByInput(awayTeamInput, awayTeamScore);
}

function resetBothTeamScores() {
    resetScore(homeTeamInput, homeTeamScore);
    resetScore(awayTeamInput, awayTeamScore);
}

/**
 * Update Jam Number when 'Update Jam Number' button is clicked
 * @param {string} newJam: new jam number to be updated
 * @param {element} jamNumber: element that contains jam number
 * @returns {to be updated}
 */
function updateJam(newJam, jamNumber) {
    if (newJam.toString().length > 2) {}
    else {
        jamNumber.textContent = newJam;
    }
    // window.localStorage.setItem(teamScore.getAttribute("id"), teamScore.textContent);
    
    return jamNumber.textContent;
}

/**
 * Add or Subtract from Jam Number
 * @param {element} jamNumber: element that contains jam number 
 * @param {string} increment: amount to be added or subtracted from jam number
 */
function addToJam(jamNumber, increment) {
    const currentJam = Number(jamNumber.textContent);
    const newJam = currentJam + increment;
    if (newJam <= 0) {
        jamNumber.textContent = '0'
    }
    else updateJam(newJam, jamNumber);
}

/**
 * Update Jam Number by user input
 * @param {number} jamInput: number input by user
 * @param {element} jamNumber: element that contains team score
 */
function updateJamByInput(jamInput, jamNumber) {
    let toNumber = Number(jamInput.value);
    let jamId = jamNumber.getAttribute("id");
    if (Number.isNaN(toNumber) || toNumber < 0) {
        // teamScore.textContent = '00';
    }
    else if (jamInput.value == '') {
        window.localStorage.setItem(jamId, jamNumber.textContent);
    }
    else {
        let number = updateJam(Number(jamInput.value), jamNumber);
        window.localStorage.setItem(jamId, number);
    }
    jamInput.value = '';
}

function resetJam(jamInput, jamNumber) {
    jamInput.value = '';
    let jamId = jamNumber.getAttribute("id");
    let number = updateJam(0, jamNumber);
    window.localStorage.setItem(jamId, number);
    // teamScore.textContent = '00';
}


/**
 * function to toggle period number
 */
function togglePeriod() {
    const pOne = 'Period 1'.toUpperCase();
    const pTwo = 'Period 2'.toUpperCase();
    if (gameSegment.textContent == pOne) {
        gameSegment.textContent = pTwo;
    } else {
        gameSegment.textContent = pOne;
    }
}

/**
 * function to update textContent of an element
 */
function updateText(content, element) {
    element.textContent = content;
}

/**
 * function to send time out status
 */
function timeOutStatus(status) {
    if (status == 'true') {
        timeOut.style.visibility = 'visible';
    }
    else {
        timeOut.style.visibility = 'hidden';
    }
    // dataset
    timeOut.dataset.status = status;
}

/**
 * function to send time out status
 */
function updateTimeOut() {
    // localStorage
    window.localStorage.setItem('time-out', timeOut.dataset.status);
}

/**
 * function to send game segment update to localStorage
 */
function updateGameSegment() {
    window.localStorage.setItem('game-segment', gameSegment.textContent);
}

// +1 to Jam Number button
const addJamButton = document.getElementById('add-1-jam-number');
addJamButton.setAttribute('onclick', 'addToJam(jamNumber,1)');

// -1 to Jam Number button
const subtractJamButton = document.getElementById('subtract-1-jam-number');
subtractJamButton.setAttribute('onclick', 'addToJam(jamNumber,-1)');

// jam number update button
const updateJamNumber = document.getElementById('update-jam-number');
updateJamNumber.setAttribute('onclick', 'updateJamByInput(jamInput, jamNumber)');

// jam number reset button
const resetJamNumber = document.getElementById('reset-jam-number');
resetJamNumber.setAttribute('onclick', 'resetJam(jamInput, jamNumber)');


// 'period' - client sends period update
// onclick sends a string to element
// eventlistener sends textcontent

// Toggle Period button
const togglePeriodButton = document.getElementById('toggle-period-button');
togglePeriodButton.setAttribute('onclick', 'togglePeriod()');

/*
// End of Period 1 button
const endPeriodOne = document.getElementById('end-period-1-button');
endPeriodOne.setAttribute('onclick', 'updateText("END OF PERIOD 1", gameSegment)');
*/

// Halftime button
const halfTime = document.getElementById('halftime-button');
halfTime.setAttribute('onclick', 'updateText("HALF TIME", gameSegment)');

/*
// End of Period 2 Button
const endPeriodTwo = document.getElementById('end-period-2-button');
endPeriodTwo.setAttribute('onclick', 'updateText("END OF PERIOD 2", gameSegment)');
*/

// Display Final Score button
const finalScore = document.getElementById('final-score-button');
finalScore.setAttribute('onclick', 'updateText("FINAL SCORE", gameSegment)');

// Game Segment Update Button
const updateGameSegmentButton = document.getElementById('update-game-segment-button');
// updateGameSegmentButton.setAttribute('onclick', 'updateGameSegment()');
// already set in HTML file

// Clear Message button
// const clearUpdate = document.getElementById('clear-button');
// clearUpdate.setAttribute('onclick', 'updateText(" ", gameSegment)');
 
// 'gameClock' - client sends game clock update
// TBD

// Timeout button
const timeOutButton = document.getElementById('timeout-button');
timeOutButton.setAttribute('onclick', 'timeOutStatus("true")');

const clearTimeOutButton = document.getElementById('clear-timeout-button');
clearTimeOutButton.setAttribute('onclick', 'timeOutStatus("false")');

const updateTimeOutButton = document.getElementById('update-timeout-button');
// already set in HTML file
// updateTimeOutButton.setAttribute('onclick', 'updateTimeOut()');

// need to create a countdown timer TBD