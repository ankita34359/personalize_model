"use client"

import { useState } from "react"
import "./QuestionCard.css"

function QuestionCard({ question, onAnswer, showResult = false, selectedAnswer = null, isCorrect = null }) {
  const [localSelectedAnswer, setLocalSelectedAnswer] = useState(selectedAnswer)

  const handleOptionClick = (optionIndex) => {
    if (showResult) return // Don't allow changes after showing result

    setLocalSelectedAnswer(optionIndex)
    if (onAnswer) {
      onAnswer(optionIndex)
    }
  }

  const getOptionClass = (optionIndex) => {
    let classes = "question-option"

    if (showResult) {
      if (optionIndex === question.correctAnswer) {
        classes += " correct"
      } else if (optionIndex === localSelectedAnswer && optionIndex !== question.correctAnswer) {
        classes += " incorrect"
      } else {
        classes += " disabled"
      }
    } else if (localSelectedAnswer === optionIndex) {
      classes += " selected"
    }

    return classes
  }

  return (
    <div className="question-card glass-card">
      <div className="question-header">
        <h3 className="question-text">{question.question}</h3>
        {question.xp && (
          <div className="question-reward">
            <span className="xp-badge">+{question.xp} XP</span>
          </div>
        )}
      </div>

      <div className="question-options">
        {question.options.map((option, index) => (
          <button
            key={index}
            className={getOptionClass(index)}
            onClick={() => handleOptionClick(index)}
            disabled={showResult}
          >
            <span className="option-letter">{String.fromCharCode(65 + index)}</span>
            <span className="option-text">{option}</span>
            {showResult && index === question.correctAnswer && <span className="option-icon correct-icon">✓</span>}
            {showResult && index === localSelectedAnswer && index !== question.correctAnswer && (
              <span className="option-icon incorrect-icon">✗</span>
            )}
          </button>
        ))}
      </div>

      {showResult && question.explanation && (
        <div className="question-explanation">
          <h4 className="explanation-title">Explanation</h4>
          <p className="explanation-text">{question.explanation}</p>
        </div>
      )}

      {showResult && (
        <div className={`question-result ${isCorrect ? "correct" : "incorrect"}`}>
          <div className="result-icon">{isCorrect ? "🎉" : "💪"}</div>
          <div className="result-text">
            {isCorrect ? (
              <>
                <strong>Correct!</strong> You earned {question.xp} XP
              </>
            ) : (
              <>
                <strong>Not quite right.</strong> Keep practicing to level up!
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default QuestionCard
