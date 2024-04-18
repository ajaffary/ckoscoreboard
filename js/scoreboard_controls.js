/* clean this up later? */

const homeTeamInput = document.getElementById("home-team-input");
const homeTeamScore = document.getElementById("home-team-score");

const awayTeamInput = document.getElementById("away-team-input");
const awayTeamScore = document.getElementById("away-team-score");

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

function addToScore(teamScore, increment) {
    currentScore = Number(teamScore.textContent);
    newScore = currentScore + increment;
    if (newScore <= 0) {
        teamScore.textContent = '00'
    }
    else updateScore(newScore, teamScore);
}

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
}

function resetScore(teamInput, teamScore) {
    teamInput.value = '';
    let teamId = teamScore.getAttribute("id");
    let score = updateScore(0, teamScore);
    window.localStorage.setItem(teamId, score);
    // teamScore.textContent = '00';
}