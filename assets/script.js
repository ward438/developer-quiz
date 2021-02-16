const SECONDS = 100;
const QUESTIONS = [
    {
        id: "question1",
        question: "What is JQuery?",
        questionHTML: null,
        options: [
            "A method of specialized styling.",
            "A JavaScript library.",
            "A unique &lt;div&gt; tag."
        ],
        answer: 1,
        display: true
    },
    {
        id: "question2",
        question: "Which one of these is a JavaScript package manager?",
        questionHTML: null,
        options: [
            "Node.js",
            "TypeScript",
            "npm"

        ],

        answer: 2,
        display: false
    },
    {
        id: "question3",
        question: "Which tool can you use to ensure code quality?",
        questionHTML: null,
        options: [
            "Angular",
            "jQuery",
            "RequireJS",
            "ESLint"
        ],

        answer: 3,
        display: false
    }
];
var currentQuestion = null;
var currentScore = getScore();

function setScore(newScore) {
    localStorage.setItem("brainBusterScores", newScore);
    displayScore(score);
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
    $('#score').html(score)
}

function getAnswer() {
    var answer = $('input[name="answer"]:checked').val();
    // todo get the correct answer by checking it on the object.
    //  get the object by idetnifying the current active question.  
    if (answer == currentQuestion.answer) {
        return questionCorrect();
    }
    return questionWrong();
}

function questionCorrect() {
    currentScore += 50;
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
    // todo - reduce time
    // todo - either popup or some red text below the buttons 
    currentScore -= 10;
}

function completeGameSuccessfully() {
    $('#game').hide();
    setScore(currentScore);
    // todo - show some winning thing and have ability to start new game
}

function convertQuestionToHTML(questionObject) {
    var answers = "";
    for (var i = 0; i < questionObject.options.length; i++) {
        var option = questionObject.options[i];
        answers += `<input type="radio" name="answer" value=${i}><label for=${i}>${option}</label><br>`;
    }

    return `<div id="${questionObject.id}"><h2><strong>${questionObject.question}</strong></h2>${answers}</div>`;

}


var timeLeft;
var timer;
var wordInput = document.getElementById("output");
var timerDisplay = document.getElementById("timerDisplay");
var modal = document.getElementById("myModal");


function resetTimer() {

    timerDisplay.textContent = SECONDS;
    return SECONDS * 1000;
}

// <span> element that closes the modal
var modalClose = document.getElementsByClassName("close")[0];
modalClose.onclick = function () {
    modal.style.display = "none";
}


function gameOver() {
    var colors = ["red", "green", "orange"]
    var randomColor = colors[Math.floor(Math.random() * colors.length)];
    modal.style.cssText = `display: block; color: red; background-color: ${randomColor}`;
    // $('#game').hide();  only displays gameover screen when you press start button
}


function listOptions() {
    return QUESTIONS.options[0, 1, 2];
}

$(document).ready(function () {

    // created a css id -Rock, to be 
    $("#startButton").click(function () {
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
        timer = setInterval(function () {
            timeLeft -= 1000;
            timerDisplay.textContent = timeLeft / 1000;
            if (timeLeft <= 0) {
                $("#startButton").show();
                gameOver();
                clearInterval(timer);
            }
        }, 1000)

    });



    $('#content-container').click(function () {
        return false;
    });

    $('#submitButton').click(function () {
        getAnswer();
    });

});
