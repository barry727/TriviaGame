
//Questions
$(document).ready(function () {
    var options = [
        {
            question: "Why did Curly retire in 1946?", 
            choice: ["His fellow Stooges forced him out", "He was burned out", "He was in poor health due to suffering a stroke", "He wanted more money"],
            answer: 2,
            photo: "https://media.giphy.com/media/DV9PZxqB8tJm0/giphy.gif"
         },
         {
            question: "Who was the oldest Stooge?", 
            choice: ["Larry", "Shemp", "Curly", "Moe"],
            answer: 1,
            photo: "https://media.giphy.com/media/TqzlzuagBJucU/giphy.gif"}, 
         {
            question: "Curly was very fond of what animal?", 
            choice: ["dogs", "cats", "birds", "horses" ],
            answer: 0,
            photo: "https://media.giphy.com/media/LfCt1sR1VweBy/giphy.gif"
        }, 
        {
            question: "Moe Howard was his stage name. What was his real name?", 
            choice: ["Harry Howland", "Harry Howenberg", "Harry Horberg", "Harry Horwitz" ],
            answer: 3,
            photo: "https://media.giphy.com/media/QA9Zr9yYB0ELK/giphy.gif"
        }, 
        {
            question: "Who was the youngest of the Three Stooges?", 
            choice: ["Curly", "Moe", "Larry", "Shemp" ],
            answer: 0,
            photo: "https://media.giphy.com/media/13lU87TkZIAJ7q/giphy.gif"
        }, 
        {
            question: "What year did the three stooges debut?", 
            choice: ["1925", "1923", "1931", "1935" ],
            answer: 0,
            photo: "https://media.giphy.com/media/l4FGm4EoWOc5MZ16g/giphy.gif"
        }, 
        {
            question: "Which of these Three Stooges members was not a sibling of the others?", 
            choice: ["Moe", "Larry", "Curley", "Shemp" ],
            answer: 1,
            photo: "https://media.giphy.com/media/5yekR9LVVsIes/giphy.gif"
        }, 
        {
            question: "What type of comedy was the Three Stooges?", 
            choice: ["parady", "satire", "slapstick"],
            answer: 2,
            photo: "https://media.giphy.com/media/uviDuO6lhHY1W/giphy.gif"
        }];
    
    var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var timer = 15;
    var intervalId;
    var userGuess ="";
    var running = false;
    var qCount = options.length;
    var pick;
    var index;
    var newArray = [];
    var holder = [];
    document.getElementById("sound").loop = true;
    
    
    
    $("#reset").hide();
    //click start button to start game
    $("#start").on("click", function () {
            $("#start").hide();
            displayQuestion();
            runTimer();
            for(var i = 0; i < options.length; i++) {
        holder.push(options[i]);
        sound.play();
    }
        })
    //timer start
    function runTimer(){
        if (!running) {
        intervalId = setInterval(decrement, 2000); 
        running = true;
        }
    }
    //timer countdown
    function decrement() {
        $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
        timer --;
    
        //stop timer if reach 0
        if (timer === 0) {
            unanswerCount++;
            stop();
            $("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }	
    }
    
    //timer stop
    function stop() {
        running = false;
        clearInterval(intervalId);
    }
    //randomly pick question in array if not already shown
    //display question and loop though and display possible answers
    function displayQuestion() {
        //generate random index in array
        index = Math.floor(Math.random()*options.length);
        pick = options[index];

        
            //iterate through answer array and display
            $("#questionblock").html("<h2>" + pick.question + "</h2>");
            for(var i = 0; i < pick.choice.length; i++) {
                var userChoice = $("<div>");
                userChoice.addClass("answerchoice");
                userChoice.html(pick.choice[i]);
                //assign array position to it so can check answer
                userChoice.attr("data-guessvalue", i);
                $("#answerblock").append(userChoice);
    //		}
    }
    
    
    
    //click function to select answer and outcomes
    $(".answerchoice").on("click", function () {
        //grab array position from userGuess
        userGuess = parseInt($(this).attr("data-guessvalue"));
    
        //correct guess or wrong guess outcomes
        if (userGuess === pick.answer) {
            stop();
            correctCount++;
            userGuess="";
            $("#answerblock").html("<p>Correct!</p>");
            hidepicture();
    
        } else {
            stop();
            wrongCount++;
            userGuess="";
            $("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }
    })
    }
    
    
    function hidepicture () {
        $("#answerblock").append("<img src=" + pick.photo + ">");
        newArray.push(pick);
        options.splice(index,1);
    
        var hidpic = setTimeout(function() {
            $("#answerblock").empty();
            timer= 15;
    
        //run the score screen if all questions answered
        if ((wrongCount + correctCount + unanswerCount) === qCount) {
            $("#questionblock").empty();
            $("#questionblock").html("<h3>Game Over!  Here's how you did: </h3>");
            $("#answerblock").append("<h4> Correct: " + correctCount + "</h4>" );
            $("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>" );
            $("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
            $("#reset").show();
            correctCount = 0;
            wrongCount = 0;
            unanswerCount = 0;
    
        } else {
            runTimer();
            displayQuestion();
    
        }
        }, 3000);
    
    
    }
    
    $("#reset").on("click", function() {
        $("#reset").hide();
        $("#answerblock").empty();
        $("#questionblock").empty();
        for(var i = 0; i < holder.length; i++) {
            options.push(holder[i]);
        }
        runTimer();
        displayQuestion();
    
    })
    
})