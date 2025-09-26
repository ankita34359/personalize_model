"use client"

import { useState, useEffect } from "react"
import { useUser } from "../context/UserContext"
import { sampleQuestions } from "../data/mockData"
import QuestionCard from "../components/QuestionCard"
import { Link } from "react-router-dom"
import LevelUpNotification from "../components/LevelUpNotification"
import "./Practice.css"

function Practice() {
  const { user, addXp, clearLevelUp } = useUser()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [sessionStats, setSessionStats] = useState({
    correct: 0,
    total: 0,
    xpEarned: 0,
  })
  const [showLevelUp, setShowLevelUp] = useState(false)

  const currentQuestion = sampleQuestions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === sampleQuestions.length - 1

  // Handle level up animation
  useEffect(() => {
    if (user.leveledUp) {
      setShowLevelUp(true)
      const timer = setTimeout(() => {
        setShowLevelUp(false)
        clearLevelUp()
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [user.leveledUp, clearLevelUp])

  const handleAnswer = (answerIndex) => {
    if (showResult) return

    setSelectedAnswer(answerIndex)
    const correct = answerIndex === currentQuestion.correctAnswer
    setIsCorrect(correct)
    setShowResult(true)

    // Update session stats
    const newStats = {
      correct: sessionStats.correct + (correct ? 1 : 0),
      total: sessionStats.total + 1,
      xpEarned: sessionStats.xpEarned + (correct ? currentQuestion.xp : 0),
    }
    setSessionStats(newStats)

    // Award XP if correct
    if (correct) {
      addXp(currentQuestion.xp)
    }
  }

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      // End of quiz - could redirect to results or dashboard
      return
    }

    setCurrentQuestionIndex(currentQuestionIndex + 1)
    setSelectedAnswer(null)
    setShowResult(false)
    setIsCorrect(false)
  }

  const handleRestart = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setIsCorrect(false)
    setSessionStats({
      correct: 0,
      total: 0,
      xpEarned: 0,
    })
  }

  if (!user.isAuthenticated) {
    return (
      <div className="practice-page">
        <div className="container">
          <div className="auth-required">
            <h2>Authentication Required</h2>
            <p>Please log in to start practicing.</p>
            <Link to="/login" className="btn btn-primary">
              Log In
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="practice-page">
      <div className="container">
        {/* Practice Header */}
        <div className="practice-header">
          <div className="progress-info">
            <h1 className="practice-title">Practice Session</h1>
            <div className="question-progress">
              Question {currentQuestionIndex + 1} of {sampleQuestions.length}
            </div>
          </div>
          <div className="session-stats">
            <div className="stat-item">
              <span className="stat-value">{sessionStats.correct}</span>
              <span className="stat-label">Correct</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{sessionStats.xpEarned}</span>
              <span className="stat-label">XP Earned</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="progress-container">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${((currentQuestionIndex + (showResult ? 1 : 0)) / sampleQuestions.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="question-container">
          <QuestionCard
            question={currentQuestion}
            onAnswer={handleAnswer}
            showResult={showResult}
            selectedAnswer={selectedAnswer}
            isCorrect={isCorrect}
          />
        </div>

        {/* Action Buttons */}
        <div className="practice-actions">
          {showResult ? (
            <div className="result-actions">
              {isLastQuestion ? (
                <div className="session-complete">
                  <div className="completion-stats">
                    <h3>Session Complete!</h3>
                    <p>
                      You got {sessionStats.correct} out of {sessionStats.total} questions correct and earned{" "}
                      {sessionStats.xpEarned} XP!
                    </p>
                  </div>
                  <div className="completion-actions">
                    <button onClick={handleRestart} className="btn btn-primary">
                      Practice Again
                    </button>
                    <Link to="/dashboard" className="btn btn-secondary">
                      Back to Dashboard
                    </Link>
                  </div>
                </div>
              ) : (
                <button onClick={handleNextQuestion} className="btn btn-primary btn-large">
                  Next Question
                  <span className="btn-icon">→</span>
                </button>
              )}
            </div>
          ) : (
            <div className="waiting-actions">
              <p className="instruction-text">Select an answer to continue</p>
            </div>
          )}
        </div>

        <LevelUpNotification
          show={showLevelUp}
          level={user.level}
          onComplete={() => {
            setShowLevelUp(false)
            clearLevelUp()
          }}
        />
      </div>
    </div>
  )
}

export default Practice
