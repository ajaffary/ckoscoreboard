const scoreboard = {
    teams: ['home', 'away'],
    increments: [1, 2, 3, 4]
}

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

// old version
// create paragraph container for a pair of +/- increment buttons
function createButtonContainer(team, increment) {
    let prefixName = prefix(increment); 
    let idName = prefixName + String(increment) + '-' + team + '-' + 'buttons';
    let paragraph = document.createElement('p');
    paragraph.setAttribute('id', idName);
    return paragraph;
}

/**
 * 
 * @returns array of paragraph containers for each pair of +/- increment buttons
 */
function generateButtonContainers() {
    let paragraphs = [];
    for (const team of scoreboard.teams) {
        for (const increment of scoreboard.increments) {
            paragraphs.push(createButtonContainer(team, increment));
        }
    }
    return paragraphs;
}

/**
 * Create a button and set attributes to increment the Team Score
 * @param {string} team - name of team to generate id's
 * @param {number} increment - amount by which to increment the team score
 * @returns 
 */
function createIncrementButton(team, increment) {
    const prefixName = prefix(increment); 
    const idName = prefixName + String(increment) + '-' + team + '-' + 'score';
    const teamScore = team + 'TeamScore';
    const button = document.createElement('button');
    button.innerHTML = minusSymbol(increment);
    button.setAttribute('style', 'margin: 2px');
    button.setAttribute('type', 'button');
    button.setAttribute('id', idName);
    button.setAttribute('onclick',  
        'addToScore(' + teamScore + ', ' + String(increment) + ')');
    return button;
}

/**
 * Generate a pair of button elements that add and subtract the same increment
 * @returns a pair of buttons 
 */
function generateButtons() {
    let buttons = [];
    for (const team of scoreboard.teams) {
        for (const increment of scoreboard.increments) {
            buttons.push(createIncrementButton(team, increment));
            buttons.push(createIncrementButton(team, (-1)*increment));
        }
    }
    return buttons;
}

/**
 * 
 */
function generateScoreButtons() {
    for (const team of scoreboard.teams) {
        for (const increment of scoreboard.increments) {
            let paragraph = createButtonContainer(team, increment);
            document.body.appendChild(paragraph);
            let plusButton = createIncrementButton(team, increment);
            let minusButton = createIncrementButton(team, (-1)*increment);
            paragraph.appendChild(plusButton);
            paragraph.appendChild(minusButton);
        }
    }
}


// const plus_two_home = createIncrementButton('home', 2);
// const minus_two_home = createIncrementButton('home', -2);

const buttonsArray = generateButtons();
const buttonContainersArray = generateButtonContainers();
const scoreButtons = generateScoreButtons();

console.log(buttonContainersArray);
console.log(buttonsArray);
console.log(scoreButtons);

// buttonContainersArray[0].appendChild(buttonsArray[0])