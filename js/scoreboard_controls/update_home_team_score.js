// updateHomeTeamScore;
document.getElementById("home-team-score").textContent = window.localStorage.getItem("home-team-score"); 

function updateHomeTeamScore() {
    document.getElementById("home-team-score").textContent = 
        window.localStorage.getItem("home-team-score");
}

addEventListener("storage", updateHomeTeamScore);

/*
function updateTeamScore(team) {
    idName = team + "-team-score";
    document.getElementById(idName).innerHTML = 
        window.localStorage.getItem(idName);
}
*/
