"use client"

import { Link } from "react-router-dom"
import { useUser } from "../context/UserContext"
import "./Landing.css"

function Landing() {
  const { user } = useUser()

  return (
    <div className="landing-page">
      <div className="landing-hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title fade-in">
                {user.isAuthenticated ? (
                  <>
                    Hey {user.name} 👋<br />
                    <span className="title-accent">Ready for today's challenge?</span>
                  </>
                ) : (
                  <>
                    Level Up Your <span className="title-accent">Learning</span>
                  </>
                )}
              </h1>

              <p className="hero-description slide-up">
                {user.isAuthenticated
                  ? "Continue your journey to become the ultimate learner. Every question answered makes you stronger."
                  : "Join Solo Leveling Academy and transform your knowledge into power. Start your journey from E-Rank to S-Rank developer."}
              </p>

              <div className="hero-actions slide-up">
                {user.isAuthenticated ? (
                  <>
                    <Link to="/practice" className="btn btn-primary btn-large">
                      Quick Start
                      <span className="btn-icon">⚡</span>
                    </Link>
                    <Link to="/dashboard" className="btn btn-secondary btn-large">
                      View Dashboard
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="btn btn-primary btn-large">
                      Start Your Journey
                      <span className="btn-icon">🚀</span>
                    </Link>
                    <Link to="/leaderboard" className="btn btn-secondary btn-large">
                      View Leaderboard
                    </Link>
                  </>
                )}
              </div>

              {user.isAuthenticated && (
                <div className="hero-stats slide-up">
                  <div className="stat-item">
                    <span className="stat-value">Level {user.level}</span>
                    <span className="stat-label">Current Rank</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">{user.xp.toLocaleString()}</span>
                    <span className="stat-label">Total XP</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">{user.streak}</span>
                    <span className="stat-label">Day Streak</span>
                  </div>
                </div>
              )}
            </div>

            <div className="hero-visual">
              <div className="floating-elements">
                <div className="floating-card card-1">
                  <div className="card-icon">📚</div>
                  <div className="card-text">Learn</div>
                </div>
                <div className="floating-card card-2">
                  <div className="card-icon">⚡</div>
                  <div className="card-text">Level Up</div>
                </div>
                <div className="floating-card card-3">
                  <div className="card-icon">🏆</div>
                  <div className="card-text">Dominate</div>
                </div>
              </div>
              <div className="hero-glow"></div>
            </div>
          </div>
        </div>
      </div>

      {!user.isAuthenticated && (
        <div className="landing-features">
          <div className="container">
            <h2 className="features-title">Why Choose ConPro?</h2>
            <div className="features-grid">
              <div className="feature-card glass-card">
                <div className="feature-icon">🎯</div>
                <h3 className="feature-title">Personalized Learning</h3>
                <p className="feature-description">
                  AI-powered questions adapt to your skill level, ensuring optimal challenge and growth.
                </p>
              </div>
              <div className="feature-card glass-card">
                <div className="feature-icon">📈</div>
                <h3 className="feature-title">Track Progress</h3>
                <p className="feature-description">
                  Watch your XP grow and level up as you master new concepts and complete challenges.
                </p>
              </div>
              <div className="feature-card glass-card">
                <div className="feature-icon">🏅</div>
                <h3 className="feature-title">Compete & Excel</h3>
                <p className="feature-description">
                  Climb the leaderboard and prove you're the strongest learner in the academy.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Landing
