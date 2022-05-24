  let questions = [
      new Question(
          "In which decade was the American Institute of Electrical Engineers (AIEE) founded?",
          ["1850", "1880","1930","1950"],
          "1880"
      ),
      new Question(
          "What is part of a database that holds only one type of information?",
          ["Report", "Field", "Record", "File"],
          "Field"
      ),
      new Question(
          "'OS' computer abbreviation usually means",
          ["Order of Significance", "Open Software", "Operating System", "Optical Sensor"],
          "Operating System"
      ),
      new Question(
          "In which decade with the first transatlantic radio broadcast occur?",
          ["1850s", "1860s", "1870s", "1900s"],
          "1900s"
      ),
      new Question(
          "'.MOV' extension refers usually to what kind of file?",
          ["Image file", "Animation/movie file", "Audio file", "MS Office document"],
          "Animation/movie file"
      ),
      new Question(
          "In which decade was the SPICE simulator introduced?",
          ["1950s", "1960s", "1970s", "1980s"],
          "1970s"
      ),
      new Question(
          "Most modern TV's draw power even if turned off. The circuit the power is used in does what function?",
          ["Sound", "Remote control", "Color balance", "High voltage"],
          "Remote control"
      ),
      new Question(
          "Which is a type of Electrically-Erasable Programmable Read-Only Memory?",
          ["flash", "flange", "fury", "FRAM"],
          "Flash"
      ),
  ];

  function Quiz(questions) {
      this.score = 0;
      this.questions = questions;
      this.index = 0;
  }

  Quiz.prototype.getQuestionByIndex = function () {
      return this.questions[this.index];
  };

  Quiz.prototype.checkForCorrectAnswer = function (answer) {
      //Question -> this.getQuestionByIndex() -> question2
      if (this.getQuestionByIndex().isCorrectAnswer(answer)) {
          this.score++;
      }
      this.index++;
  };

  Quiz.prototype.isEnded = function () {
      return this.index === this.questions.length;
  };

  function Question(questionText, choices, answer) {
      this.text = questionText;
      this.choices = choices;
      this.answer = answer;
  }

  Question.prototype.isCorrectAnswer = function (choice) {
      return this.answer === choice;
  };

  function loadQuestions() {
      if (quiz.isEnded()) {
          showFinalScores();
      } else {
          let currentQuestion = quiz.getQuestionByIndex();

          let element = document.getElementById("question"); // <p id="question"></p>
          element.innerHTML = currentQuestion.text;

          let choices = currentQuestion.choices;
          for (let i = 0; i < choices.length; i++) {
              let eachChoiceElement = document.getElementById("choice" + i); //<span id="choice0"></span>
              eachChoiceElement.innerHTML = choices[i];

              let eachButtonElement = document.getElementById("btn" + i);
              eachButtonElement.onclick = function () {
                  quiz.checkForCorrectAnswer(choices[i]);
                  loadQuestions();
              };
          }
          showProgress();
      }
  }
  let quiz = new Quiz(questions);
  loadQuestions();

  function showFinalScores() {
      let resultPercentage = (quiz.score / questions.length) * 100;
      let completeHTML = `<h1> Result </h1>
       <h2 id='score'> Your Scores : ${quiz.score} </h2>
       <h3>And mark percentage is : ${resultPercentage}%  </h3>  
      `;
      let quizCanavs = document.getElementById("quiz");
      quizCanavs.innerHTML = completeHTML;
  }

  function showProgress() {
      let questNo = quiz.index + 1;
      let element = document.getElementById("progress");
      element.innerHTML = `Question ${questNo} of  ${quiz.questions.length}`;
  }