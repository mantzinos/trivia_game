import { useState } from "react";
import "./App.css";
import axios from "axios";
import Answer from "./components/Answer";

function App() {
  const [trivia, setTrivia] = useState([]);
  const [triviaAnswers, setTriviaAnswers] = useState([]);
  async function getTrivia() {
    try {
      const response = await axios.get(
        "https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple"
      );
      let answers = [];
      for (let i = 0; i < response.data.results.length; i++) {
        answers.push([
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
        ]);
      }
      console.log(answers);
      console.log(response.data.results);
      setTrivia(response.data.results);
      setTriviaAnswers(answers);
    } catch (err) {
      console.log(err);
    }
  }
  getTrivia();
  return (
    <div className="App">
      {trivia.map((a, index) => (
        <div>
          <h1 key={index}>{a.question}</h1>
          <div className="allAnswers">
            {triviaAnswers[index].map((ans, ind) => (
              <Answer key={ind} answer={ans.answer} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
