/* 
clean this up later? 

This file contains functions that are used to update the score of the home 
and away teams.
*/

const homeTeamInput = document.getElementById("home-team-input");
const homeTeamScore = document.getElementById("home-team-score");

const awayTeamInput = document.getElementById("away-team-input");
const awayTeamScore = document.getElementById("away-team-score");

/**
 * Update Team Score when 'Update Score' button is clicked
 * @param {string} newScore: new score to be updated
 * @param {element} teamScore: element that contains team score
 * @returns 
 */
function updateScore(newScore, teamScore) {
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
    currentScore = Number(teamScore.textContent);
    newScore = currentScore + increment;
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
        score = updateScore(Number(teamInput.value), teamScore);
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
        number = updateJam(Number(jamInput.value), jamNumber);
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

// jam number manual input element
const jamInput = document.getElementById('jam-number-input');

// jam number display element
const jamNumber = document.getElementById('jam-number');

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


// 'gameClock' - client sends game clock update
// TBD

// timeout
// need to create a countdown timer TBD


// 'period' - client sends period update
// onclick sends a string to element
// eventlistener sends textcontent

// Game Segment Element

const gameSegment = document.getElementById('game-segment');

/**
 * function to toggle period number
 */
function togglePeriod() {
    if (gameSegment.textContent == 'Period 1') {
        gameSegment.textContent = 'Period 2';
    } else {
        gameSegment.textContent = 'Period 1';
    }
}

/**
 * function to update period number element
 */
function updateText(content, element) {
    element.textContent = content;
}

// Toggle Period button
const togglePeriodButton = document.getElementById('toggle-period-button');
togglePeriodButton.setAttribute('onclick', 'togglePeriod()');

// End of Period 1 button
const endPeriodOne = document.getElementById('end-period-1-button');
endPeriodOne.setAttribute('onclick', 'updateText("End of Period 1", gameSegment)');

// Halftime button
const halfTime = document.getElementById('halftime-button');
halfTime.setAttribute('onclick', 'updateText("Halftime", gameSegment)');

// End of Period 2 Button
const endPeriodTwo = document.getElementById('end-period-2-button');
endPeriodTwo.setAttribute('onclick', 'updateText("End of Period 2", gameSegment)');

// Display Final Score button
const finalScore = document.getElementById('final-score-button');
finalScore.setAttribute('onclick', 'updateText("Final Score", gameSegment)');

// Game Segment Update Button
// const messageAlert = document.getElementById('update-message-alert');
const updateGameSegment = document.getElementById('update-game-segment-button');
// sendUpdateToScoreboard.setAttribute('onclick', 'updateText("Sent to Scoreboard", messageAlert)');

// Clear Message button
const clearUpdate = document.getElementById('clear-button');
clearUpdate.setAttribute('onclick', 'updateText(" ", gameSegment)');