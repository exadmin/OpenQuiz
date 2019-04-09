simpleQuiz.model = (function () {
//---------------- BEGIN MODULE SCOPE VARIABLES --------------
    var EVENTS = {
        ACTION_PERFORMED: "ACTION_PERFORMED",
        LOGIN_SUCCESS: "LOGIN_SUCCESS",
        LOGIN_FAILURE: "LOGIN_FAILURE",
        NEXT_QUESTION_SUCCESS: "NEXT_QUESTION_SUCCESS",
        NEXT_QUESTION_FAILURE: "NEXT_QUESTION_FAILURE",
        ANSWER_QUESTION_SUCCESS: "ANSWER_QUESTION_SUCCESS",
        ANSWER_QUESTION_FAILURE: "ANSWER_QUESTION_FAILURE",
        CHECK_STATUS_SUCCESS: "CHECK_STATUS_SUCCESS",
        CHECK_STATUS_FAILURE: "CHECK_STATUS_FAILURE"
    }
    var PLAYER_STATE = {
        BEFORE_GAME: "BEFORE_GAME",
        IN_GAME: "IN_GAME",
        BETWEEN_QUESTIONS: "BETWEEN_QUESTIONS",
        GAME_OVER: "GAME_OVER"
    }
    var game = {
        isLoggedIn: Cookies.get("token"),
        playerName: "",
        playerState: "BEFORE_GAME",
        questionId: -1,
        question: "",
        questionsLeft: -1,
        timeLeft: -1,
        points: -1,
        errorCode: "",
        error: "",
        //events functionality
        events: {},

        addEventListener: function (eventName, handler) {
            if (!(eventName in this.events))
                this.events[eventName] = [];

            this.events[eventName].push(handler);
        },

        raiseEvent: function (eventName, args) {
            var currentEvents = this.events[eventName];
            if (!currentEvents) return;

            for (var i = 0; i < currentEvents.length; i++) {
                if (typeof currentEvents[i] == 'function') {
                    currentEvents[i](args);
                }
            }
        },
        //util methods
        updateGame: function (game, newGame) {
            if (newGame.playerName) {
                game.playerName = newGame.playerName;
            }
            if (newGame.playerState) {
                game.playerState = newGame.playerState;
            }
            if (newGame.questionId >= 0) {
                game.questionId = newGame.questionId;
            }
            if (newGame.question) {
                game.question = newGame.question;
            }
            if (newGame.questionNumber >= 0) {
                game.questionNumber = newGame.questionNumber;
            }
            if (newGame.questionsLeft >= 0) {
                game.questionsLeft = newGame.questionsLeft;
            }
            if (newGame.timeLeft >= 0) {
                game.timeLeft = newGame.timeLeft;
            }
            if (newGame.points >= 0) {
                game.points = newGame.points;
            }
            if (newGame.errorCode) {
                game.errorCode = newGame.errorCode;
            }
            if (newGame.error) {
                game.error = newGame.error;
            }
        },
        //
        login: function (email) {
            Cookies.remove("token");
            var nameSurname = email;
            if (nameSurname) {
                var token = btoa(nameSurname.toLowerCase() + ':1');
                $.ajax({
                    url: 'rest/play',
                    contentType: "application/json",
                    dataType: "json",
                    headers: {
                        "Authorization": 'Basic ' + token
                    },
                    type: "POST",
                    data: JSON.stringify({}),
                    success: function (data) {
                        Cookies.set("token", token);
                        game.isLoggedIn = Cookies.get("token");
                        game.raiseEvent(EVENTS.LOGIN_SUCCESS, game);
                        game.raiseEvent(EVENTS.ACTION_PERFORMED, game);
                    },
                    error: function (error) {
                        var errorText;
                        if (error.status == 401 || error.status == 403) {
                            errorText = "Ошибка! Проверьте написание вашей рабочей почты!";
                        }
                        else {
                            errorText = "Что-то пошло не так!";
                        }
                        game.error = errorText;
                        game.raiseEvent(EVENTS.LOGIN_FAILURE, game);
                        game.raiseEvent(EVENTS.ACTION_PERFORMED, game);
                    },
                    complete: function () {
                    }
                });
            }
            else {
                throw "No name is provided!";
            }
        },

        nextQuestion: function () {
            token = Cookies.get("token");
            var headers = {}
            if (token) {
                headers = {"Authorization": "Basic " + token}
            } else {
                throw "Unauthorized!";
            }
            $.ajax({
                url: 'rest/play',
                contentType: "application/json",
                dataType: "json",
                headers: headers,
                type: "POST",
                data: JSON.stringify({"command": "NEXT_QUESTION"}),
                success: function (data) {
                    game.updateGame(game, data);
                    game.raiseEvent(EVENTS.NEXT_QUESTION_SUCCESS, game);
                    game.raiseEvent(EVENTS.ACTION_PERFORMED, game);
                },
                error: function (error) {
                    game.updateGame(game, error.responseJSON);
                    game.raiseEvent(EVENTS.NEXT_QUESTION_FAILURE, game);
                    game.raiseEvent(EVENTS.ACTION_PERFORMED, game);
                },
                complete: function () {
                }
            });
        },
        answerQuestion: function (answer) {
            token = Cookies.get("token");
            var headers = {}
            if (token) {
                headers = {"Authorization": "Basic " + token}
            } else {
                throw "Unauthorized!";
            }
            if (game.questionId == -1) {
                throw "Invalid question id!";
            }
            $.ajax({
                url: 'rest/play',
                contentType: "application/json",
                dataType: "json",
                headers: headers,
                type: "POST",
                data: JSON.stringify({"answer": answer, "questionId": game.questionId, "command": "ANSWER"}),
                success: function (data) {
                    game.updateGame(game, data);
                    game.raiseEvent(EVENTS.ANSWER_QUESTION_SUCCESS, game);
                    game.raiseEvent(EVENTS.ACTION_PERFORMED, game);
                },
                error: function (error) {
                    game.updateGame(game, error.responseJSON);
                    game.raiseEvent(EVENTS.ANSWER_QUESTION_FAILURE, game);
                    game.raiseEvent(EVENTS.ACTION_PERFORMED, game);
                },
                complete: function () {
                }
            });
        },
        checkStatus: function () {
            token = Cookies.get("token");
            var headers = {}
            if (token) {
                headers = {"Authorization": "Basic " + token}
            } else {
                throw "Unauthorized!";
            }
            $.ajax({
                url: 'rest/play',
                contentType: "application/json",
                dataType: "json",
                headers: headers,
                type: "POST",
                data: JSON.stringify({}),
                success: function (data) {
                    game.updateGame(game, data);
                    game.raiseEvent(EVENTS.CHECK_STATUS_SUCCESS, game);
                    game.raiseEvent(EVENTS.ACTION_PERFORMED, game);

                },
                error: function (error) {
                    game.updateGame(game, error.responseJSON);
                    game.raiseEvent(EVENTS.CHECK_STATUS_FAILURE, game);
                    game.raiseEvent(EVENTS.ACTION_PERFORMED, game);
                },
                complete: function () {
                }
            });
        }
    };
    return {game: game, events: EVENTS, playerState: PLAYER_STATE}
})();