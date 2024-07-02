function jogoBandeiras() {
    window.location.href = "flag.html";
}
function jogoGuess() {
    window.location.href = "guess.html";
}


function loadHighScore() {
    let highScore = localStorage.getItem('highScore');
    let highScore2 = localStorage.getItem('highScoreGuess');
    if (highScore === null) {
        highScore = 0; // Se não houver pontuação máxima salva, inicie com 0
    }
    if (highScore2 === null) {
        highScore2 = 0; // Se não houver pontuação máxima salva, inicie com 0
    }
    document.getElementById('highScore').innerText = highScore;
    document.getElementById('highScore2').innerText = highScore2;
}

window.onload = loadHighScore();