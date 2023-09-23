//GAME VARIABLES

var level = 1;

var color_list = ['green', 'red', 'yellow', 'blue'];

var game_on = false;

var cpuButtons = [];
var userButtons = [];

var num = Math.floor(Math.random()*4);

var color = color_list[num];


//ADD EVENT LISTENER TO EACH COLOR

$(".blue").click(function(){

    handleClick("blue");

});

$(".red").click(function(){

    handleClick("red");
});

$(".yellow").click(function(){

    handleClick("yellow")
});


$(".green").click(function(){

    handleClick("green");
});


//PLAY SOUND SHORTCUT
function playSound(color){

    var audio = new Audio("./sounds/"+color+".mp3");
    audio.play();

};

//THIS FUNCTION ACTIVATES WHEN A PLAYER LOSES, AND RESETS THE GAME
function wrong_answer(){
    $("body").css("backgroundColor", "red");
    setTimeout(function (){
        $("body").css("backgroundColor", "#011F3F");
    },200);

    const wrongAudio = new Audio("./sounds/wrong.mp3");
    wrongAudio.play();
    
    $("body").off("keydown");

    $("#title").html("<h1 id='title'>Game Over, Press Any<br /> Key to Restart</h1>");


};

//START GAME (first Load)
$("html").keydown(function(){
    $("."+color).stop().animate({ opacity: 0 },100, function() {
        $(this).animate({ opacity: 1 },100);

        cpuButtons.push(color);

        $("#title").html("<h1 id=title>Level " + level + "</h1>")
        playSound(color);
        
        addKeyPressFeature();

        $("html").off("keydown");
        

        });
});

//FUNTION THAT ADDS ONE COLOR TO THE EXISTING SERIES(with animation)
function newRound(cpuButtons){

    level++;
    $("#title").html("<h1 id=title>Level " + level + "</h1>")

    userButtons = [];

    num = Math.floor(Math.random()*4);
    color = color_list[num];
    cpuButtons.push(color)

    playSound(color);

    $("."+color).stop().animate({ opacity: 0 },100, function() {
        $(this).animate({ opacity: 1 },100);
    });

};

//equal array
function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  };
//equal arrays


//after each click check if player made a mistake, and react accordingly
function check(){

    if (arraysEqual(cpuButtons.slice(0,userButtons.length), userButtons)){
        
        if (cpuButtons.length === userButtons.length){
            setTimeout(function(){
                newRound(cpuButtons)
            },400);
        
        }
        }else{
        wrong_answer();
        setTimeout(function(){
            resetGame()},1);//THIS FIXES A BUG WHERE THE ROUNDS COLLIDE WHEN A PLAYER LOSES USING BUTTONS
    }
    };


function addKeyPressFeature(){

    $("body").keydown(function(event){

        switch(event.key){

            case "b":
                handleClick("blue");
                break;

            case "r":
                handleClick("red");
                break;

            case "y":
                handleClick("yellow");
                break;


            case "g":
                handleClick("green");
                break;
    };
});

};

function handleClick(color){
    $("."+color).addClass("pressed");
    setTimeout(function(){
        $("."+color).removeClass("pressed")
    },100);
    playSound(color);
    userButtons.push(color);
    check();
};

function resetGame(){

    $("html").keydown(function(){
        num = Math.floor(Math.random()*4);
        color = color_list[num];

        $("."+color).stop().animate({ opacity: 0 },100, function() {
            $(this).animate({ opacity: 1 },100);
            
            level = 1;
            userButtons = [];
            cpuButtons = [];
            cpuButtons.push(color);
            playSound(color);

    
            $("#title").html("<h1 id=title>Level " + level +"</h1>")
            addKeyPressFeature();
            
            $("html").off("keydown");

            
        });
    });
};






    

    
    

