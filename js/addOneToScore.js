// add 1 to specified team score
function addOneToScore(teamScore) {
    currentScore = Number(teamScore.textContent);
    newScore = currentScore + 1;
    updateScore(newScore, teamScore);
}
// subtract 1 from specified team score
// do not subtract when score reaches zero
function subtractOneFromScore(teamScore) {
    currentScore = Number(teamScore.textContent);
    newScore = currentScore - 1;
    if (currentScore <= 0) {
        teamScore.textContent = '00';
    }
    else updateScore(newScore, teamScore);
}
