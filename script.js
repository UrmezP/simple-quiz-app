window.addEventListener("load", () => {
  var quizData;
  var currentQuestion = 0;
  var savedAnswers = [];

  const questionContainer = document.getElementById("questionContainer");
  const option1 = questionContainer.querySelector("#a");
  const option2 = questionContainer.querySelector("#b");
  const option3 = questionContainer.querySelector("#c");
  const option4 = questionContainer.querySelector("#d");
  const nextButton = questionContainer.querySelector("input[type='submit'");

  const h1 = questionContainer.querySelector("h1");
  const h2 = questionContainer.querySelector("h2");
  const option1Label = questionContainer.querySelector("#a+label");
  const option2Label = questionContainer.querySelector("#b+label");
  const option3Label = questionContainer.querySelector("#c+label");
  const option4Label = questionContainer.querySelector("#d+label");

  const scoreContainer = document.querySelector("#scoreContainer");

  nextButton.addEventListener("click", (e) => {
    const answer = questionContainer.querySelector("input:checked");
    if (answer) {
      e.preventDefault();
      savedAnswers.push(answer.id);
      if (currentQuestion == quizData.length - 1) {
        alert("All questions finished!");
        result();
      } else if (currentQuestion == quizData.length - 2) {
        option1.checked = false;
        option2.checked = false;
        option3.checked = false;
        option4.checked = false;
        currentQuestion++;
        updateQuestion(true);
      } else {
        option1.checked = false;
        option2.checked = false;
        option3.checked = false;
        option4.checked = false;
        currentQuestion++;
        updateQuestion();
      }
    }
  });

  fetch("./data.json")
    .then((res) => res.json())
    .then((data) => {
      quizData = data;
      updateQuestion();
    });

  function updateQuestion(final) {
    h1.innerText = `Question ${quizData[currentQuestion].questionId}`;
    h2.innerText = quizData[currentQuestion].question;
    option1Label.innerText = quizData[currentQuestion].option1;
    option2Label.innerText = quizData[currentQuestion].option2;
    option3Label.innerText = quizData[currentQuestion].option3;
    option4Label.innerText = quizData[currentQuestion].option4;
    if (final) {
      nextButton.value = "Submit Quiz";
    }
  }

  // check score
  function result() {
    questionContainer.classList.add("hide");
    scoreContainer.classList.remove("hide");
    var score = 0;
    for (let i = 0; i < quizData.length; i++) {
      if (quizData[i].answer == savedAnswers[i]) {
        score++;
      }
    }
    scoreContainer.innerText = `Final Score : ${score}/${quizData.length}`;
  }
});
