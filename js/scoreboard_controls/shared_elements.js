// Elements shared between scoreboard source and target clients
// These elements have the same IDs in all client html files
// messages sent from source clients are mapped to the same ID in
// target clients

// home team name element
const homeTeamName = document.getElementById("home-team-name");

// home team input element
const homeTeamInput = document.getElementById("home-team-input");

// home team score element
const homeTeamScore = document.getElementById("home-team-score");

// away team name element
const awayTeamName = document.getElementById("away-team-name");

// away team input element
const awayTeamInput = document.getElementById("away-team-input");

// away team score element
const awayTeamScore = document.getElementById("away-team-score");   

// jam number manual input element
const jamInput = document.getElementById('jam-number-input');

// jam number display element
const jamNumber = document.getElementById('jam-number');

// time out display element
const timeOut = document.getElementById('timeout');

// game segment element
const gameSegment = document.getElementById('game-segment');

// game clock element
const gameClock = document.getElementById('game-clock');

// game clock element
const gameClockMinutes = document.getElementById('game-clock-minutes');

// game clock element
const gameClockSeconds = document.getElementById('game-clock-seconds');


function loadLogo(team, venue, format='text') {
    // team names
    const teams = {
        'cbc': 'Comic Book Crushers',
        'hh': 'Horrific Haunters',
        'prp': 'Punk Rock Punishers',
        'rr': 'Retro Rumblers'
    }
    const teamInfo = { 'team': team, 'venue': venue, 'format': format };

    // elementId
    const teamId = venue + '-team-name';
    
    // element
    const teamLogo = document.getElementById(teamId);

    if (format == 'pic') {
        teamLogo.classList.remove(team);
        teamLogo.classList.add(`${team}-logo`);
        teamLogo.innerHTML = `<img src="../images/${team}.png" alt="${teams[team]}" class="logo-image">`;
    } else {
        teamLogo.classList.remove(`${team}-logo`);
        teamLogo.classList.add(team);
        teamLogo.textContent = teams[team];
    } 
    window.localStorage.setItem(venue, JSON.stringify(teamInfo));
    return teamLogo;
}