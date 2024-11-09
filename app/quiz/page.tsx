"use client";

import { useState } from "react";
import { quiz } from "../data";

function QuizPage() {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [checked, setChecked] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(
    null
  );
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({
    score: 0,
    correctAnswer: 0,
    wrongAnswer: 0,
  });

  const { questions } = quiz;
  const { question, answers, correctAnswer } = questions[activeQuestion];

  interface AnswerSelection {
    answer: string;
    index: number;
  }

  const onAnswerSelected = ({ answer, index }: AnswerSelection) => {
    setChecked(true);
    setSelectedAnswerIndex(index);
    if (answer === correctAnswer) {
      setSelectedAnswer(true);
      console.log(true);
    } else {
      setSelectedAnswer(false);
      console.log(false);
    }
  };

  const nextQuestion = () => {
    setSelectedAnswerIndex(null);
    setResult((prev) =>
      selectedAnswer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswer: prev.correctAnswer + 1,
          }
        : {
            ...prev,
            wrongAnswer: prev.wrongAnswer + 1,
          }
    );

    if (activeQuestion < questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
    setChecked(false);
  };

  return (
    <div>
      <div>
        <h1>Quiz Page</h1>
        <h2>
          Question: {activeQuestion + 1}
          <span>/{questions.length}</span>
        </h2>
      </div>
      <div>
        {!showResult ? (
          <div>
            <h3>{questions[activeQuestion].question}</h3>
            {answers.map((answer, i) => (
              <button
                key={i}
                onClick={() => onAnswerSelected({ answer, index: i })}
                className={selectedAnswerIndex === i ? "bg-red-700" : ""}
              >
                <span>{answer}</span>
              </button>
            ))}
            {checked ? (
              <button onClick={nextQuestion}>
                {activeQuestion === questions.length - 1 ? "finish" : "next"}{" "}
              </button>
            ) : (
              <button onClick={nextQuestion} disabled>
                {activeQuestion === questions.length - 1 ? "finish" : "next"}
              </button>
            )}
          </div>
        ) : (
          <div>
            <div>result</div>
            <div>Score: {result.score}</div>
            <div>Wrong: {result.wrongAnswer}</div>
            <div>Corect: {result.correctAnswer}</div>
            <button onClick={() => window.location.reload()}>restart</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuizPage;
