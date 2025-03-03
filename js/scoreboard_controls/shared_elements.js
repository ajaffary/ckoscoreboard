// Elements shared between scoreboard source and target clients
// These elements have the same IDs in all client html files
// messages sent from source clients are mapped to the same ID in
// target clients

// home team input element
const homeTeamInput = document.getElementById("home-team-input");

// home team score element
const homeTeamScore = document.getElementById("home-team-score");

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

// Game Segment Element
const gameSegment = document.getElementById('game-segment');

function loadLogo(team, venue, format='text') {
    // team names
    teams = {
        'cbc': 'Comic Book Crushers',
        'hh': 'Horrific Haunters',
        'prp': 'Punk Rock Punishers',
        'rr': 'Retro Rumblers'
    }

    // element
    teamLogo = document.getElementById(venue + '-team-name');
    
    // cbc
    
        if (format == 'pic') {
            teamLogo.classList.remove(team);
            teamLogo.classList.add(`${team}-logo`);
            teamLogo.innerHTML = `<img src="../images/${team}.png" alt="${teams[team]}" class="logo-image">`;
        } else {
            teamLogo.classList.remove(`${team}-logo`);
            teamLogo.classList.add(team);
            teamLogo.textContent = teams[team];
        } 
    
    // hh

    // prp

    // rr

    return teamLogo;
}