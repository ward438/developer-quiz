$(document).ready(function() {
    var currentQuestion = null;
    var currentScore = getScore();
    var timeLeft;
    var timer;
    var timerDisplay = document.getElementById("timerDisplay");

    var loserModal = new bootstrap.Modal(document.getElementById('loserModal'), {
        keyboard: true
    });
    var winnerModal = new bootstrap.Modal(document.getElementById('winnerModal'), {
        keyboard: true
    });

    function setScore(newScore) {
        localStorage.setItem("brainBusterScores", newScore);
        displayScore(newScore);
    }

    function getScore() {
        var score = localStorage.getItem("brainBusterScores");
        if (score === null) {
            score = 0;
        }
        score = parseInt(score);
        displayScore(score);
        return score;
    }

    function displayScore(score) {

        $('#score').text(score);


    }

    function getAnswer() {
        var answer = $('input[name="answer"]:checked').val();
        if (answer == currentQuestion.answer) {
            return questionCorrect();
        }
        return questionWrong();
    }

    function questionCorrect() {
        currentScore += 50;
        $('#incorrect').hide();
        for (var i = 0; i < QUESTIONS.length; i++) {
            if (QUESTIONS[i].display) {
                // hide current question

                QUESTIONS[i].display = false;
                // display next question
                if ((i + 1) > QUESTIONS.length - 1) {
                    completeGameSuccessfully();
                    return;
                } else {
                    $("#question").html(QUESTIONS[i + 1].questionHTML);
                    QUESTIONS[i + 1].display = true;
                    currentQuestion = QUESTIONS[i + 1];

                    break;
                }

            }
        }
    }


    function questionWrong() {
        $('#incorrect').show();

        timeLeft -= 4000;
        currentScore -= 10;
        $("#incorrect").empty().append(WRONG);

    }

    function completeGameSuccessfully() {
        clearInterval(timer);
        $('#game').hide();
        winnerModal.show();
        setScore(currentScore);
        $('#startButton').show();
    }

    function convertQuestionToHTML(questionObject) {
        var answers = "";
        for (var i = 0; i < questionObject.options.length; i++) {
            var option = questionObject.options[i];
            answers += `<input type="radio" name="answer" value=${i}><label for=${i}>${option}</label><br>`;
        }

        return `<div id="${questionObject.id}"><h2><strong>${questionObject.question}</strong></h2>${answers}</div>`;

    }

    function resetTimer() {
        timerDisplay.textContent = SECONDS;
        return SECONDS * 1000;
    }

    function gameOver() {
        loserModal.show();
    }

    // function listOptions() {
    //     return QUESTIONS.options[0, 1, 2, 3];
    // }
    // created a css id -Rock, to be 
    $("#startButton").click(function() {
        for (var i = 0; i < QUESTIONS.length; i++) {
            QUESTIONS[i].questionHTML = convertQuestionToHTML(QUESTIONS[i]);
        }
        currentQuestion = QUESTIONS[0];
        $("#question").html(currentQuestion.questionHTML);
        $('#game').show();



        timeLeft = resetTimer();
        if (timer !== undefined) {
            clearInterval(timer);
        }
        $(this).hide();
        timer = setInterval(function() {
            timeLeft -= 1000;
            timerDisplay.textContent = timeLeft / 1000;
            if (timeLeft <= 0) {
                $("#startButton").show();
                gameOver();
                clearInterval(timer);
            }
        }, 1000)

    });



    $('#content-container').click(function() {
        return false;
    });

    $('#submitButton').click(function() {
        getAnswer();

    });

});