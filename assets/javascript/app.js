$(document).ready(function () {

var Questions; 
var wins = 0;
var losses = 0;
var unanswered = 0;
var userGuess;
var timeLeft = 30;
var timerId;

resetToBeginning();

function resetToBeginning() {

Questions = [
      {
        question:"What is Rachel's surname?",
        choices: 
            {
                a: "Brown", 
                b: "Green",
                c: "Buffay",
                d: "Bing" 
            },
        answer: "b"            
    },

    {
        question:"What is Monica's job?",
        choices: 
            {
                a: "Chef", 
                b: "Doctor",
                c: "Scientist",
                d: "Actor" 
            },
        answer: "a"            
    },

    {
        question:"How many babies did Phoebe carry for her brother?",
        choices: 
            {
                a: "1", 
                b: "2",
                c: "3",
                d: "4" 
            },
        answer: "c"            
    },

    {
        question:"Who does Ross marry in Las Vegas?",
        choices: 
            {
                a: "Phoebe", 
                b: "Rachel",
                c: "Emily",
                d: "Janice" 
            },
        answer: "b"            
    },

    {
        question:"How many season of the show were made?",
        choices: 
            {
                a: "11", 
                b: "10",
                c: "12",
                d: "9" 
            },
        answer: "b"            
    },


];

    $("#start").show();
    $("#submit").hide();
    $("#playAgain").hide();
    $("#Results").empty();

    wins = 0;
    losses = 0;
    unanswered = 0;
};

function countdown() {
   
    if (timeLeft == 0) {
        clearInterval(timerId);
        timeLeft = 30;
        alert("Your time is up!");     
        displayScore();

    } else  {
    $("#timeRemaining").text(timeLeft + " seconds remaining");
    timeLeft--;
    }
}

function displayScore(){

    for(var i = 0; i < Questions.length; i++){
        userGuess = $(`input[name=${i}]:checked`).val();
        console.log(userGuess);
   
        if(userGuess === Questions[i].answer ){
           wins++;
        }
        else if (typeof userGues === 'undefined' ) {
            unanswered++;
        } 
        else{
            losses++;
        }
   
    }

    $("#timeRemaining").hide();
    $("#QuizGame").empty();
    $("#submit").hide();
    
    var correct = $("<div> Correct : " + wins + "</div>");
    var incorrect = $("<div> Incorrect : " + losses + "</div>");
    var didntAnswer = $("<div> Unanswered : " + unanswered + "</div>");

    $("#Results").append(correct,incorrect,didntAnswer);
    $("#Results").show();
    $("#playAgain").show();

}

$(".startButton").on("click", function(){

    $("#timeRemaining").hide();
    timerId = setInterval(countdown, 1000);

   //hide button
    $(this).hide();

    //show submit button
    $("#submit").show();

    $("#timeRemaining").show();

    //display questions
    for(var i = 0; i < Questions.length; i++)
    
    {
        console.log(Questions[i].question);
        console.log(Questions[i].choices[0]);
        var newQuestionDiv = $("<div>").addClass("seperateQuestions");
        var newAnswerDiv = $("<div>").addClass("seperateAnswers");
        var newQuestion = (i + 1) + ": " + Questions[i].question + '</br>';
        var listOfAnswers = [];

        newQuestionDiv.attr("name", i );
        
        
        for(letter in Questions[i].choices){
            listOfAnswers.push( `<label> <input type="radio" name="${i}" value="${letter}">  ${Questions[i].choices[letter]}</label>`);
 
        }
        newQuestionDiv.html(newQuestion);
        newAnswerDiv.html(listOfAnswers);
        $("#QuizGame").append(newQuestionDiv,newAnswerDiv );
    }

});

$("#submit").on("click", function(){

    clearInterval(timerId);
    displayScore();
});

$('#playAgain').on('click', function(){
    resetToBeginning();
    $("#Results").hide();
	$(this).hide();
	
});


});
