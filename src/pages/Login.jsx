"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useUser } from "../context/UserContext"
import "./Login.css"

function Login() {
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { setUser } = useUser()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim()) return

    setIsLoading(true)

    // Simulate a brief loading state for better UX
    setTimeout(() => {
      const userData = {
        name: name.trim(),
        xp: 0,
        level: 1,
        streak: 0,
        tasks: [
          { id: 1, text: "Complete your first quiz", xp: 50, done: false },
          { id: 2, text: "Reach level 2", xp: 100, done: false },
          { id: 3, text: "Answer 5 questions correctly", xp: 75, done: false },
        ],
      }

      setUser(userData)
      setIsLoading(false)
      navigate("/dashboard")
    }, 800)
  }

  return (
    <div className="login-page">
      <div className="container">
        <div className="login-container">
          <div className="login-card glass-card">
            <div className="login-header">
              <div className="login-icon">⚔️</div>
              <h1 className="login-title">Welcome to Solo Leveling Academy</h1>
              <p className="login-subtitle">Enter your name to begin your journey from E-Rank to S-Rank learner</p>
            </div>

            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name..."
                  className="input"
                  required
                  disabled={isLoading}
                  maxLength={50}
                />
              </div>

              <button
                type="submit"
                className={`btn btn-primary btn-large ${isLoading ? "loading" : ""}`}
                disabled={isLoading || !name.trim()}
              >
                {isLoading ? (
                  <>
                    <span className="spinner"></span>
                    Starting Journey...
                  </>
                ) : (
                  <>
                    Start Your Journey
                    <span className="btn-icon">🚀</span>
                  </>
                )}
              </button>
            </form>

            <div className="login-info">
              <h3 className="info-title">What you'll get:</h3>
              <ul className="info-list">
                <li className="info-item">
                  <span className="info-icon">📚</span>
                  <span className="info-text">Personalized learning experience</span>
                </li>
                <li className="info-item">
                  <span className="info-icon">⚡</span>
                  <span className="info-text">XP and leveling system</span>
                </li>
                <li className="info-item">
                  <span className="info-icon">🏆</span>
                  <span className="info-text">Compete on global leaderboard</span>
                </li>
                <li className="info-item">
                  <span className="info-icon">🎯</span>
                  <span className="info-text">Daily tasks and challenges</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="login-features">
            <div className="feature-item">
              <div className="feature-icon">🌟</div>
              <div className="feature-content">
                <h4 className="feature-title">Level Up System</h4>
                <p className="feature-description">
                  Earn XP by answering questions correctly and completing daily tasks
                </p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">🎮</div>
              <div className="feature-content">
                <h4 className="feature-title">Gamified Learning</h4>
                <p className="feature-description">Turn your education into an engaging RPG-like experience</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">📊</div>
              <div className="feature-content">
                <h4 className="feature-title">Track Progress</h4>
                <p className="feature-description">Monitor your learning journey with detailed statistics</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
