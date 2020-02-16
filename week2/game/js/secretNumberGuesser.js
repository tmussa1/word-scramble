window.onload = function () {
    let guessButton = document.getElementById('guessButton');
    var secret = Math.floor(Math.random() * 1000) + 1;
    var clickCount = 0;

    guessButton.onclick = function () {

        let guessValue = document.getElementById('guessInput').value;
        let resultSpan = document.getElementById('resultSpan');
        let lowerHigher = document.getElementById('lowerHigher');
        let secretFound = document.getElementById('secretFound');

        resultSpan.innerHTML = guessValue;

        if (parseInt(guessValue) > secret) {
            lowerHigher.innerHTML = " greater ";
            numNotRight.style.display = 'block';
            secretFound.style.display = 'none';
        } else if (parseInt(guessValue) < secret) {
            lowerHigher.innerHTML = " lower ";
            numNotRight.style.display = 'block';
            secretFound.style.display = 'none';
        } else {
            secretFound.innerHTML = "Congratulations, you have found the secret number! ";
            numNotRight.style.display = 'none';
            secretFound.style.display = 'block';
        }

        clickCount++;

        if (clickCount >= 3) {
            guessButton.disabled = true;
            numNotRight.style.display = 'none';
            secretFound.innerHTML = "Oops, too many attempts! ";
            secretFound.style.display = 'block';
        }
    }

}