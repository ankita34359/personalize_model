// src/components/QuestionCard.jsx
import React, { useState } from "react";
import "./QuestionCard.css"; // create small CSS file or adapt existing styles


/**
 * Props:
 *  - question: { id, question, options: [{id, text}], correctOptionId, explanation }
 *  - index: number (for display)
 *  - onAnswered: function({ questionId, correct, selectedOptionId, xpEarned })
 */
export default function QuestionCard({ question, index, onAnswered }) {
  const [selected, setSelected] = useState(null);
  const [locked, setLocked] = useState(false); // prevents changing after answer
  const [isCorrect, setIsCorrect] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleSelect = (optId) => {
    if (locked) return;
    setSelected(optId);
  };

  const submitAnswer = () => {
    if (locked || selected == null) return;
    const correct = String(selected) === String(question.correctOptionId);
    setIsCorrect(correct);
    setLocked(true);
    setShowExplanation(true);

    // decide XP (example: 25 for correct, 5 for incorrect)
    const xp = correct ? 25 : 5;

    if (typeof onAnswered === "function") {
      onAnswered({
        questionId: question.id,
        correct,
        selectedOptionId: selected,
        xpEarned: xp
      });
    }
  };

  const handleKey = (e, id) => {
    if (e.key === "Enter") handleSelect(id);
  };

  return (
    <div className="question-card" aria-live="polite">
      <div className="question-header">
        <div className="question-index">Q{index + 1}</div>
        <div className="question-text">{question.question}</div>
      </div>

      <div className="options">
        {question.options.map((opt) => {
          const active = selected === opt.id;
          const correctOpt = locked && String(opt.id) === String(question.correctOptionId);
          const wrongOpt = locked && active && !correctOpt;
          return (
            <div
              key={opt.id}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => handleKey(e, opt.id)}
              onClick={() => handleSelect(opt.id)}
              className={[
                "option",
                active ? "option-active" : "",
                correctOpt ? "option-correct" : "",
                wrongOpt ? "option-wrong" : ""
              ].join(" ")}
            >
              <label className="option-label">
                <span className="option-id">{opt.id}</span>
                <span className="option-text">{opt.text}</span>
              </label>
            </div>
          );
        })}
      </div>

      <div className="question-actions" style={{ marginTop: 12 }}>
        {!locked ? (
          <button className="btn" onClick={submitAnswer} disabled={selected == null}>
            Submit
          </button>
        ) : (
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <div style={{ color: isCorrect ? "#10b981" : "#f97373", fontWeight: 700 }}>
              {isCorrect ? "Correct! ✅" : "Incorrect ❌"}
            </div>
            <button
              className="btn"
              onClick={() => {
                setLocked(false);
                setSelected(null);
                setIsCorrect(null);
                setShowExplanation(false);
              }}
            >
              Retry
            </button>
          </div>
        )}
      </div>

      {showExplanation && question.explanation && (
        <div className="explanation" style={{ marginTop: 12 }}>
          <strong>Explanation:</strong> <span>{question.explanation}</span>
        </div>
      )}
    </div>
  );
}
