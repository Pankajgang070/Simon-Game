
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern =[];
var userClickedPattern =[];
var level = 0 ;


function playSound(name) {
    var sound = new Audio("sounds/"+name+".mp3");
    sound.play();
}

function animatePress(currentColour) {
    $('.'+currentColour).addClass('pressed')
    setTimeout(function() {
       $('.'+currentColour).removeClass('pressed'); 
    }, 100);
}


function nextSequence() {
    level++;
    userClickedPattern =[];
    $('h1').text("Level "+ level);

    randomNumber = Math.floor(Math.random()*4);
    console.log(randomNumber);
 
    randomChosenColour = buttonColours[randomNumber];
    gamePattern[level-1] = randomChosenColour;

    $("#"+randomChosenColour).fadeOut(60).fadeIn(60);
    playSound(randomChosenColour);
}



$(".btn").click(function(event) {
    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});



$(document).one('keypress',nextSequence);



function checkAnswer(currentLevel) {
    var log = '';
    if(gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
        if(currentLevel+1 == level) {
            log = 'success';
        }
    } else {
        log = 'wrong';
    }

    if (log == 'success') {
       setTimeout(nextSequence,1000);
    } else if(log == 'wrong') {
        var sound = new Audio("sounds/wrong.mp3");
            sound.play();
        
            $("body").addClass("game-over");
        setTimeout(function() {
            $('body').removeClass("game-over"); 
         }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        $(document).one('keypress',startOver);
    }
}



function startOver() {
    level = 0;
    gamePattern = [];
    nextSequence();
}