import { useState } from "react";
import "./App.css";
import axios from "axios";
import shuffle from "./brain/shuffle";
import Answer from "./components/Answer";
import choosequestions from "./brain/choosequestions";
import Choose from "./components/Choose";

function App() {
  const [trivia, setTrivia] = useState([]);
  const [gameIsOn, setGameIsOn] = useState(false);
  const [q, setQ] = useState(0);
  const [score, setScore] = useState(0);
  async function getTrivia(link) {
    try {
      const response = await axios.get(link);
      let answers = [];
      for (let i = 0; i < response.data.results.length; i++) {
        answers.push({
          myQuestion: response.data.results[i].question,
          allAnswers: [
            {
              answer: response.data.results[i].correct_answer,
              correct: true
            },
            {
              answer: response.data.results[i].incorrect_answers[0],
              correct: false
            },
            {
              answer: response.data.results[i].incorrect_answers[1],
              correct: false
            },
            {
              answer: response.data.results[i].incorrect_answers[2],
              correct: false
            }
          ]
        });
      }
      for (let i = 0; i < answers.length; i++) {
        shuffle(answers[i].allAnswers);
      } //
      setTrivia(answers);
      setGameIsOn(true);
    } catch (err) {
      console.log(err);
    }
  }
  // getTrivia("https://opentdb.com/api.php?amount=10&category=26&type=multiple");
  function startGame(cat) {
    getTrivia(
      `https://opentdb.com/api.php?amount=10&category=${cat}&type=multiple`
    );
  }
  function playGame(correct) {
    if (correct) {
      setScore(score + 1);
    }
    setQ(q + 1);
  }
  if (!gameIsOn) {
    return (
      <div className="App">
        <div className="all">
          <div className="game2">
            <h1>Choose type of questions</h1>
            <div className="allAnswers">
              {choosequestions.map((cItem, ind) => (
                <Answer
                  key={ind}
                  id={cItem.category}
                  answer={cItem.type}
                  clickMe={startGame}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  } else if (gameIsOn) {
    while (q < 10) {
      return (
        <div className="App">
          <div className="all">
            <div className="game">
              <h1 key={q}>{`Question ${q + 1}: ${
                trivia[q].myQuestion
              } \nScore: ${score}`}</h1>
              <div className="allAnswers">
                {trivia[q].allAnswers.map((ans, ind) => (
                  <Choose
                    key={ind}
                    answer={ans.answer}
                    correct={ans.correct}
                    clickMe={playGame}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }
    setQ(0);
    setScore(0);
    setTrivia([]);
    setGameIsOn(false);
  } else if (q === 10) {
    setQ(0);
    setScore(0);
    setTrivia([]);
    setGameIsOn(false);
    return (
      <div className="App">
        <div className="all">
          <div className="game">
            <h1>Choose type of questions</h1>
            <div className="allAnswers">
              {choosequestions.map((cItem, ind) => (
                <Answer
                  key={ind}
                  id={cItem.category}
                  answer={cItem.type}
                  clickMe={startGame}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
