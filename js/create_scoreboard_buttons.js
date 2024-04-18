/* 

already declared in create_scoreboard_elements.js

const scoreboard = {
    teams: ['home', 'away'],
    increments: [1, 2, 3, 4]
}

*/

/* Button property functions */

// attach add or subtract prefix for positive or negative increment
function prefix(increment) {
    if (Number(increment) > 0) {
        return 'add' + '-' 
    } 
    else return 'subtract';
} 

// replace - character with HTML minus sign for button label
function minusSymbol(increment) {
    if (Number(increment) > 0) {
        return '+' + String(increment);
    }
    else return increment.toString().replace('-', '&minus;');
}


/* 
Idea:
- create container for set of eight buttons
- insert container before input container
- create buttons for each +/- increment
- append buttons in +/- pairs to container
*/


/* Button Container functions */

// create a container for all +/- increment buttons
// should return <p id="*-team-score-buttons"></p>
function createButtonContainer(team) {
    const container = document.createElement('p');
    container.setAttribute('id', team + '-team-score-buttons');
    return container;
}

/*
append these containers after *-team-score container
and before *-team-input-container
use Element.insertAdjacentElement(position, element)
Element = old element already there
element = new element TO BE inserted

<!-- beforebegin -->
<p>
  <!-- afterbegin -->
  foo
  <!-- beforeend -->
</p>
<!-- afterend -->
*/

/**
 * Create and insert containers for each set of +/- increment buttons
 */
function generateButtonContainers(teamArray) {
    // only need this for each team:
    for (const team of teamArray) {
        let container = createButtonContainer(team);
        let target = document.getElementById(team + '-team-score');
        target.insertAdjacentElement("afterend", container);
    }
}


/* Button Creation Functions */

/**
 * Create a button to increment the team score and set its attributes
 * @param {string} team: name of team to generate ids
 * @param {number} increment: amount by which to increment the team score
 * @returns button
 */
function createIncrementButton(team, increment) {
    let prefixName = prefix(increment); 
    let idName = prefixName + String(increment) + '-' + team + '-' + 'score';
    let teamScore = team + 'TeamScore';
    let button = document.createElement('button');
    button.innerHTML = minusSymbol(increment);
    // button.setAttribute('style', 'margin: 2px');
    button.setAttribute('type', 'button');
    button.setAttribute('id', idName);
    button.setAttribute('onclick',  
        'addToScore(' + teamScore + ', ' + String(increment) + ')');
    return button;
}

/**
 * Create a pair of +/- buttons for a set of increments
 * Append buttons to corresponding container (each team)
 */
function generateScoreButtons(teamArray, incrementArray) {
    for (const team of teamArray) {
        let container = document.getElementById(team + '-team-score-buttons');
        for (const increment of incrementArray) {
            let plusButton = createIncrementButton(team, increment);
            let minusButton = createIncrementButton(team, (-1)*increment);
            container.appendChild(plusButton);
            container.appendChild(minusButton);
        }
    }
}

generateButtonContainers(scoreboard.teams);
generateScoreButtons(scoreboard.teams, scoreboard.increments);
