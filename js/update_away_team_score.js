// updateAwayTeamScore;
document.getElementById("away-team-score").textContent = window.localStorage.getItem("away-team-score");

function updateAwayTeamScore() {
    document.getElementById("away-team-score").textContent = 
        window.localStorage.getItem("away-team-score");
}

addEventListener("storage", updateAwayTeamScore);