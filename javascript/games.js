function jogoBandeiras() {
    window.location.href = "flag.html";
}


function loadHighScore() {
    let highScore = localStorage.getItem('highScore');
    console.log(highScore)
    if (highScore === null) {
        highScore = 0; // Se não houver pontuação máxima salva, inicie com 0
    }

    document.getElementById('highScore').innerText = highScore;
}

window.onload = loadHighScore();