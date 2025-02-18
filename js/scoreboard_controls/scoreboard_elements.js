/*
This file contains the functions that are used to create the scoreboard elements.

Idea:
generate:
- home team div
- home team Name p
- home team score P
- home team buttons container p
- increment buttons
- input controls container p
- input field for score updates
- update button
- reset button

- hr element

- repeat above for away team
*/

const scoreboard = {
    teams: ["home", "away"],
    increments: [1, 2, 3, 4],
}

// capitalize first letter function taken from:
// https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript?page=1&tab=scoredesc#tab-top
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// create team elements container
function createTeamContainer(team) {
    let teamContainer = document.createElement("div");
    teamContainer.setAttribute("id", team + "-team");
    document.body.appendChild(teamContainer);
    return teamContainer;
}

// create team name element and append to team container
function createTeamName(team, teamContainer) {
    let teamName = document.createElement("p");
    teamName.setAttribute("id", team + "-team-name");
    teamName.textContent = capitalizeFirstLetter(team) + " Team";
    teamContainer.appendChild(teamName);
    return teamName;    
}

// create team score element and appened to team container
function createTeamScore(team, teamContainer) {
    let teamScore = document.createElement("p");
    teamScore.setAttribute("id", team + "-team-score");
    teamScore.textContent = "00";
    teamContainer.appendChild(teamScore);
    return teamScore;    
}

// create score input elements container and append to team container
function createInputContainer(team, teamContainer) {
    let teamInputContainer = document.createElement("p");
    teamInputContainer.setAttribute("id", team + "-team-input-controls");
    teamContainer.appendChild(teamInputContainer);
    return teamInputContainer;
}

// create score input field and append to input container
function createTeamInput(team, teamInputContainer) {
    let teamInput = document.createElement("input");
    teamInput.setAttribute("type", "number");
    teamInput.setAttribute("id", team + "-team-input");
    teamInput.setAttribute("name", team + "-team-input");
    teamInput.setAttribute("class", "score");
    teamInput.setAttribute("max", "999");
    teamInput.setAttribute("max-length", "3em");
    teamInput.setAttribute("placeholder", "000");
    teamInput.setAttribute("aria-label", capitalizeFirstLetter(team) + " Team Score Input");
    teamInputContainer.appendChild(teamInput);
    return teamInputContainer;    
}

// create update score button and append to input container
function createUpdateButton(team, teamInputContainer) {
    let updateScoreButton = document.createElement("button");
    updateScoreButton.setAttribute("id", team + "-team-update-score-button");
    updateScoreButton.setAttribute("onclick", 
        "updateScoreByInput(" + team + "TeamInput, " + team + "TeamScore)");
    updateScoreButton.textContent = `Update ${team.toUpperCase()} Score`;
    teamInputContainer.appendChild(updateScoreButton);
    return updateScoreButton;
}

// create reset score button and append to input container
function createResetButton(team, teamInputContainer) {
    let resetButton = document.createElement("button");
    resetButton.setAttribute("id", team + "-team-reset-button");
    resetButton.setAttribute("onclick", 
        "resetScore(" + team + "TeamInput, " + team + "TeamScore)");
    resetButton.textContent = `Reset ${team.toUpperCase()} Score`;
    teamInputContainer.appendChild(resetButton);
    return resetButton;    
}

// create all team score elements for single team
function generateTeamControls(team) {
    let teamContainer = createTeamContainer(team);
    createTeamName(team, teamContainer);
    createTeamScore(team, teamContainer);
    let teamInputContainer = createInputContainer(team, teamContainer);
    createTeamInput(team, teamInputContainer);
    createUpdateButton(team, teamInputContainer);
    createResetButton(team, teamInputContainer);    
}

// generate team scoreboard elements for a set of teams
function generateScoreboardElements(teamArray) {
    for (team of teamArray) {
        generateTeamControls(team);
        document.body.appendChild(document.createElement("hr"));
    }    
}

function updateBothTeamElements(team) {
    const teamContainer = createTeamContainer(team);
    const updateContainer = document.createElement("p");
    const resetContainer = document.createElement("p");
    const updateButton = createUpdateButton(team, updateContainer);
    updateButton.setAttribute("onclick", "updateBothTeamScores()");
    const resetButton = createResetButton(team, resetContainer);
    resetButton.setAttribute("onclick", "resetBothTeamScores()");
    teamContainer.appendChild(updateContainer);
    teamContainer.appendChild(resetContainer);
}

generateScoreboardElements(scoreboard.teams);

updateBothTeamElements("both");

/* 
const homeTeam = generateTeamControls("home");
const hr = document.body.appendChild(document.createElement("hr"));
const awayTeam = generateTeamControls("away");
*/

/*
const homeTeamContainer = createTeamContainer("home");
const homeTeamName = createTeamName("home", homeTeamContainer);
const homeTeamScore = createTeamScore("home", homeTeamContainer);
const homeTeamInputContainer = createInputContainer("home", homeTeamContainer);
const homeTeamInput = createTeamInput("home", homeTeamInputContainer);
const homeTeamUpdateButton = createUpdateButton("home", homeTeamInputContainer);
const homeTeamResetButton = createResetButton("home", homeTeamInputContainer);
*/


