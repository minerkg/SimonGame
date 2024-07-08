
let gamePattern = [];
let buttonColors = ['red', 'blue', 'green', 'yellow'];
let level = 0; 
let userClickedPattern = [];

var gameIsStarted = false;



$(document).on("keydown", () => {
    if (!gameIsStarted) {
        nextSequence();
        gameIsStarted = true;
        $("h1").text("Level " + level);
    }
});


function nextSequence() {
    userClickedPattern = [];
    level++;  
    $("h1").text("Level " + level);

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
}


$("div.btn").on("click", (event) => {
        var target = event.target;
        var userChosenColour = target.id;
        userClickedPattern.push(userChosenColour);
 
        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length - 1);
});


function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
      $("#" + currentColour).removeClass('pressed');
    }, 100);
}



function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();}, 1000);
      }
    } else {
        console.log("wrong");
        playSound("wrong");
        $('body').addClass("game-over");
        setTimeout(() => {$('body').removeClass("game-over")}, 200);
        $('h1').text("Game Over, Press Any Key to Restar");
        startOver();
    }

  
}

function startOver() {
    level = 0;
    gamePattern = [];
    gameIsStarted = false;
}