
///////////// this Jquery effect hides chosen windows on pageload////
$('#trivia').hide();
$('#end').hide();

//+++++++++++++++++Click Events++++++++++++++++++++++
//===================================================

$(document).on('click', '#newGame', function(e) {
	game.reset();
});

$(document).on('click', '.start', function(e){
	game.questionStart();
	$('#screen1').hide();
	$('#trivia').show();
});

$(document).on('click', '#optionsRadios2', function(e) {
	game.clicked(e);
});


//+++++++++++++++++Global variables++++++++++++++++++
//===================================================

var panel = $('#quiz');
var userRes = $('#resLoad');
var countStart = 20;

//sounds

//+++++++++++++++++Trivia Variable.+++++++++++++++++
//=================================================== 
var questions = 
	[

		{
            question: "Which Album Was NOT Released In 1997?",
            answer: ['Matchbox Twenty Yourself or Someone Like You', 'Semisonic Feeling Strangely Fine', "Blink 182 Dude Ranch", 'Hanson Middle of Nowhere'],
            correctAnswer: 'Semisonic Feeling Strangely Fine'
		},
		{
			question: "Who sung the hit song I want it That Way?",
			answer: ["Nsync", "Backstreet Boys", "Spice Girls", "Oasis"],
			correctAnswer: "Backstreet Boys"
		},
		{
			question: "What one hit wonder made #38 on the charts in 1998 with the song Flagpole Sitta?",
			answer: ["Jimmy Ray", "Semisonic", "New Radicals", "Harvey Danger"],
			correctAnswer: "Harvey Danger"
		},
		{
			question: "What rapper's violent death was foreshadowed by his final video, I Ain't Mad At Cha?",
			answer: ["Eazy-E", "Tupac Shakur", "Notorious B.I.G.", "Fat Pat"],
			correctAnswer: "Tupac Shakur"
		},
		{
			question: "Which band released the song How Bizarre in 1997?",
			answer: ["INOJ", "Us3", "KLF", "OMC"],
			correctAnswer: "OMC"
		},
		{
			question: "Who sung the hit song Jump Around",
			answer: ["House of Pain", "Semisonic", "New Radicals", "Eminem"],
			correctAnswer: "House of Pain"
		},
		{
			question: "This artist was named artist of the decade by Rolling Stones Magazing",
			answer: ["Eddie Vedder (Pearl Jam)", "Bradley Nowell (sublime)", "Liam Gallagher (Oasis)","Kurt Cobain (Nirvana)"],
			correctAnswer: "Kurt Cobain (Nirvana)"
		},
		{
			question: "What song recieved the honor of being Rock Radio's most played song in 1997?",
			answer: ["Sister Hazel (All For You)", "Tonic (If You Could Only See)", "The Wallflowers (One Headlight)", "Third Eye Blind (Semi Charmed Life)"],
			correctAnswer: "Tonic (If You Could Only See)"
		},
		{
			question: "What artist was NOT featured on Puff Daddy and the Family's album No Way Out?",
			answer: ["Mace", "Notorious B.I.G.", "Jay-Z", "Nas"],
			correctAnswer: "Nas"
		},
		{
			question: "Who was NOT a member of The Spice Girls?",
			answer: ["Ginger", "Cinnamon", "Posh", "Scary"],
			correctAnswer: "Cinnamon"
		},
		{
			question: "When this song came out feminist groups were outraged and claimed the song was about abusing women.",
			answer: ["Nirvana (Rape Me)", "Prodigy (Smack My Bitch)", "Matchbox 20 (Push)", "Sublime (Wrong Way)"],
			correctAnswer: "Matchbox 20 (Push)"
		}

	];

//////////// audio////////////////
var audio = new Audio('assets/sounds/win.mp3');
var audio2 = new Audio('assets/sounds/correct.mp3');
var audio3 = new Audio('assets/sounds/incorrect.mp3');
var audio4 = new Audio('assets/sounds/timeup.mp3');


///////game object/////////
var game = {
	questions: questions,
	currentQuestion: 0,
	counter: countStart,
	correct: 0,
    incorrect: 0,
    
	


	countdown: function() {//This function decrases timer by 1 sec
		game.counter--;//this argument decreases the count.
		$('#timer').html(game.counter);//load the counter into the html tag.

		if (game.counter == 0) {//When the count hits 0... 
			game.timeOut();//...The time out function is called. 
		}
	},
	questionStart: function() {//This function loads the questions and sets timer
		timer = setInterval(game.countdown, 1000);//SetInterval Method used to specify 
		panel.html('<h2 class="text-center">' + questions[this.currentQuestion].question + '</h2>');//loads questions with a h2 tag into the html tag panel instance. 
		for (var i = 0; i < questions[this.currentQuestion].answer.length; i++) {//this loops through the questions.answer array and appends it to the panel instance.
			panel.append('<br><label><input type="radio" name="optionsRadios" id="optionsRadios2" value="option2"' + 'data-name="' + questions[this.currentQuestion].answer[i] + '">' + questions[this.currentQuestion].answer[i] + '</label>');
		}
	},
	nextQuestion: function() {//Here the counter resets and loads the next question.
		game.counter = countStart;//Create an instance for countStart.
		$('#timer').html(game.counter);//Load the counter into the html tag.
		game.currentQuestion++;//Adds 1 question every time this function runs.
		game.questionStart();//Callback to start new question.
	},
	timeOut: function() {//Function for when the clock runs out.
		clearInterval(timer);//This sets the timer count to 0.
		$('#timer').html(game.counter);//Load the counter into the html tag.

		panel.html('<h2>Sorry Time is Up Bro!!</h2>');//Load text into html tag
		panel.append('<h3>Here is The Correct Answer: ' + questions[this.currentQuestion].correctAnswer);//Load text into html tag and the correct answer.
		audio4.play();

		if (game.currentQuestion === questions.length - 1) {//Subtract one to question array if it exactly equal to current quesion.
			setTimeout(game.results, 9 * 1000);//Than we delay 4 seconds on the results.
		} else {
			setTimeout(game.nextQuestion, 9 * 1000);//Or delay 4 second to go to next question.
		}
	},
	results: function() {
		$('#trivia').hide();//Hide trivia window 
		$('#end').show();//show Results window
		clearInterval(timer);//this sets the timer count to 0.
		userRes.html('<h2>Great Job, Lets see your Skills</h2>');//Load text using .html method into window.
		userRes.append('<h3>Correct Answers: ' + game.correct + '</h3>');//Use the append method to load the correct answer.
		userRes.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');//Same
		userRes.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');//Same
		userRes.append('<br><button id="newGame">Try Again??</button>');//Create a button in and use the append method to load into page
        audio.play();
    
    },
	clicked: function(e) {//User click function.
		clearInterval(timer);//Set timer count to 0
		if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer) {//
			this.answeredCorrectly();
		} else {
			this.answeredIncorrectly();
		}
	},
	answeredCorrectly: function() {//Function created for when user answers correctly.
		clearInterval(timer);//Sets timer count to 0.
		game.correct++;//Add one count to the correct var.
		panel.html('<h2>Correct!</h2>');//Load text with .html method into window.
		audio2.play();

		if (game.currentQuestion === questions.length -1) {
			setTimeout(game.results, 7 * 1000);
		} else {
			setTimeout(game.nextQuestion, 7 * 1000);
		}
	},
	answeredIncorrectly: function() {//Function created for when user answers incorrectly.
		clearInterval(timer);//Sets time count to 0
		game.incorrect++;//Adds one count to the incorrect var.
		panel.html('<h2>Too Bad!</h2>');//Load text with .html method into window.
		panel.append('<h3>The Correct answer is: ' + questions[game.currentQuestion].correctAnswer + '</h3>');//Load text with .html method into window.
		audio3.play();

		if (game.currentQuestion === questions.length - 1) {//Subtract one to question array if it exactly equal to current quesion.
			setTimeout(game.results, 7 * 1000);//Than we delay 6 seconds ont he results.
		} else {
			setTimeout(game.nextQuestion, 7 * 1000);//Or delay 6 second to go to next question.
		}
	},
	reset: function() {//Function that resets game.
		$('#trivia').show();//Show trivia window.
		$('#end').hide();//Hide results window.
		this.currentQuestion = 0;//Sets question to 0.
		this.counter = countStart;//Sets counter to 0.
		this.correct = 0;//Sets correct var to 0.
		this.incorrect = 0;//Sets incorrect to 0.
		this.questionStart();//Calls questionStart function. 

	}
};
	

	
		
		
	



