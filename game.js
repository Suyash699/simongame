var buttonColours = ["red","blue","green","yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var started = false;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function(){

  var userChosenColor = $(this).attr("id");

  userClickedPattern.push(userChosenColor);

  playaudio(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("win");
    if(userClickedPattern.length===gamePattern.length){

      setTimeout(function(){
        nextSequence();
      }, 1000);

    }

    }

  else{
    var newAudio = new Audio("sounds/wrong.mp3");
    newAudio.play();

    chgBG();

    $("#level-title").text("Game over. Press any key to restart");
    startOver();
  }
}


function nextSequence(){

  userClickedPattern = [];

  $("#level-title").text("level "+level);
  level++;

  var randomNumber = Math.floor(Math.random() * 4);

var randomChosenColour = buttonColours[randomNumber];


gamePattern.push(randomChosenColour);

$("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

playaudio(randomChosenColour);



}

function playaudio(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();

}

function animatePress(currentColor){

  var activeKey = $("."+currentColor);

    activeKey.addClass("pressed");

    setTimeout(function(){
      activeKey.removeClass("pressed");
    }, 100);

}

function chgBG(){
  var wrongAnswer = $("body");
  wrongAnswer.addClass("game-over");

  setTimeout(function(){
    wrongAnswer.removeClass("game-over");
  }, 100);
}

function startOver(){

    level = 0;
    gamePattern = [];
    started = false;
}
