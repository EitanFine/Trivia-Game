$(document).ready(function() {
// Create a function that creates the start button and initial screen

function initialScreen() {
	startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
	$(".mainArea").html(startScreen);
}

initialScreen();

//Create a function, generateHTML(), that is triggered by the start button, and generates the HTML seen on the project video...

$("body").on("click", ".start-button", function(event){
	event.preventDefault();  // added line to test issue on GitHub Viewer
	clickSound.play();
	generateHTML();

	timerWrapper();

}); // Closes start-button click

$("body").on("click", ".answer", function(event){
	//answeredQuestion = true;
	clickSound.play();
	selectedAnswer = $(this).text();
	if(selectedAnswer === correctAnswers[questionCounter]) {
		//alert("correct");

		clearInterval(theClock);
		generateWin();
	}
	else {
		//alert("wrong answer!");
		clearInterval(theClock);
		generateLoss();
	}
}); // Close .answer click

$("body").on("click", ".reset-button", function(event){
	clickSound.play();
	resetGame();
}); // Closes reset-button click

});  //  Closes jQuery wrapper

function generateLossDueToTimeOut() {
	unansweredTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000);  //  change to 4000 or other amount
}

function generateWin() {
	correctTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000);  //  change to 4000 or other amount
}

function generateLoss() {
	incorrectTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000); //  change to 4000 or other amount
}

function generateHTML() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
	$(".mainArea").html(gameHTML);
}

function wait() {
	if (questionCounter < 7) {
	questionCounter++;
	generateHTML();
	counter = 30;
	timerWrapper();
	}
	else {
		finalScreen();
	}
}

function timerWrapper() {
	theClock = setInterval(thirtySeconds, 1000);
	function thirtySeconds() {
		if (counter === 0) {
			clearInterval(theClock);
			generateLossDueToTimeOut();
		}
		if (counter > 0) {
			counter--;
		}
		$(".timer").html(counter);
	}
}

function finalScreen() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
	$(".mainArea").html(gameHTML);
}

function resetGame() {
	questionCounter = 0;
	correctTally = 0;
	incorrectTally = 0;
	unansweredTally = 0;
	counter = 30;
	generateHTML();
	timerWrapper();
}

var startScreen;
var gameHTML;
var counter = 30;
var questionArray = ["Rutgers’ founders picked New Brunswick over which other location?", "Which of these cartoon characters is a Rutgers alumnus?", "Founded in 1766, Rutgers was originally named Queen’s College. After which queen was the school named?", "Rutgers student Darrell Butler created the Fat Darrell sandwich in 1997. Which of these IS NOT in it??", "The family of Col. Henry Rutgers owned what kind of successful New York business?", "Everyone knows Rutgers and Princeton played the first college football game in 1869, but do you know the final score?", "What was the first residence hall built on Rutgers’ campus?", "Rutgers alumnus Garret Hobart was Vice President under which U.S. President?"];
var answerArray = [["Hackensack", "Morristown", "Paterson", "Somerset"], ["Archie","Mr. Magoo","Thelma","Gil Thorpe"], ["Queen Adelaide", "Queen Caroline", "Queen Charlotte", "Queen Elizabeth"], ["Chicken Fingers","French Fries","Marinara Sauce","Meatballs"], ["Brewery", "Haberdashery", "Shipyard", "Stockyard"], ["Rutgers won, 6-4","Rutgers won, 10-7","Princeton won, 9-6","Princeton won, 14-12"], ["Kings Cottage", "New Jersey Hall", "Milledoler Hall", "Winants Hall"], ["Cleveland","Harrison","McKinley","Teddy Roosevelt"]];
var imageArray = ["<img class='center-block img-right' src='img/hackensack.jpg'>", "<img class='center-block img-right' src='img/mrMagoo.png'>", "<img class='center-block img-right' src='img/queenCharlotte.jpg'>", "<img class='center-block img-right' src='img/meatballs.png'>", "<img class='center-block img-right' src='img/brewery.png'>", "<img class='center-block img-right' src='img/rutgersVSprinceton.jpg'>", "<img class='center-block img-right' src='img/winantsHall.jpg'>", "<img class='center-block img-right' src='img/mckinley.png'>"];
var correctAnswers = ["A. Hackensack", "B. Mr. Magoo", "C. Queen Charlotte", "D. Meatballs", "A. Brewery", "A. Rutgers won, 6-4", "D. Winants Hall", "C. McKinley"];
var questionCounter = 0;
var selecterAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;
var clickSound = new Audio("sound/button-click.mp3");
