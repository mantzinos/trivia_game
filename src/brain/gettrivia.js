import axios from "axios";
import shuffle from "./shuffle";

export default async function getTrivia(link) {
  try {
    const response = await axios.get(link);
    // console.log(response.data.results);
    let answers = [];
    for (let i = 0; i < response.data.results.length; i++) {
      answers.push({
        question: response.data.results[i].question,
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
    //   setTrivia(response.data.results);
    for (let i = 0; i < answers.length; i++) {
      shuffle(answers[i].allAnswers);
    } //
    // console.log(answers);
    return answers;
    //   setTriviaAnswers(answers);
  } catch (err) {
    console.log(err);
  }
}
