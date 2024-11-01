import { useState } from "react";
import "./App.css";
import axios from "axios";
import shuffle from "./brain/shuffle";
import Answer from "./components/Answer";

function App() {
  const [trivia, setTrivia] = useState([]);
  const [gameIsOn, setGameIsOn] = useState(false);
  const [q, setQ] = useState(0);
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
  getTrivia(
    "https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple"
  );
  console.log("--------------");
  console.log(trivia);
  console.log("--------------");
  if (!gameIsOn) {
    return (
      <div>
        <h1>Hi</h1>
      </div>
    );
  } else
    return (
      <div className="App">
        <div className="all">
          <div className="game">
            <h1 key={q}>{trivia[q].myQuestion}</h1>
            <div className="allAnswers">
              {trivia[q].allAnswers.map((ans, ind) => (
                <Answer key={ind} answer={ans.answer} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
}

export default App;
