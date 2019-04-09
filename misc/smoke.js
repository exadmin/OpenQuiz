simpleQuiz.model.game.login('petr6.petrov@email.com');
simpleQuiz.model.game.addEventListener('LOGIN_SUCCESS',function(args){console.log(args)});

simpleQuiz.model.game.nextQuestion();
simpleQuiz.model.game.answerQuestion('аааа');

simpleQuiz.model.game.nextQuestion();
simpleQuiz.model.game.answerQuestion('аааа');

simpleQuiz.model.game.nextQuestion();
simpleQuiz.model.game.answerQuestion('аааа');

simpleQuiz.model.game.nextQuestion();
simpleQuiz.model.game.answerQuestion('аааа');

simpleQuiz.model.game.nextQuestion();
simpleQuiz.model.game.answerQuestion('аааа');

if(simpleQuiz.model.game.points=0){console.log("success")}
if(simpleQuiz.model.game.playerState="GAME_OVER"){console.log("success")}