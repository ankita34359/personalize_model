"use client"

import { useUser } from "../context/UserContext"
import { mockLeaderboard } from "../data/mockData"
import LeaderboardTable from "../components/LeaderboardTable"
import { Link } from "react-router-dom"
import "./Leaderboard.css"

function Leaderboard() {
  const { user } = useUser()

  return (
    <div className="leaderboard-page">
      <div className="container">
        {/* Page Header */}
        <div className="leaderboard-header">
          <div className="header-content">
            <h1 className="page-title">Global Leaderboard</h1>
            <p className="page-subtitle">See how you rank against the best learners in Solo Leveling Academy</p>
          </div>
          {user.isAuthenticated && (
            <div className="header-actions">
              <Link to="/practice" className="btn btn-primary">
                Earn More XP
                <span className="btn-icon">⚡</span>
              </Link>
            </div>
          )}
        </div>

        {/* User's Current Rank (if authenticated) */}
        {user.isAuthenticated && (
          <div className="current-rank-card glass-card">
            <div className="rank-info">
              <div className="rank-details">
                <h3 className="rank-title">Your Current Standing</h3>
                <div className="rank-stats">
                  <div className="rank-stat">
                    <span className="stat-label">Level</span>
                    <span className="stat-value">Lv.{user.level}</span>
                  </div>
                  <div className="rank-stat">
                    <span className="stat-label">XP</span>
                    <span className="stat-value">{user.xp.toLocaleString()}</span>
                  </div>
                  <div className="rank-stat">
                    <span className="stat-label">Rank</span>
                    <span className="stat-value">
                      {mockLeaderboard.some((player) => player.name === user.name) ? "#???" : "Unranked"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="rank-motivation">
                <p className="motivation-text">
                  {user.xp < 100
                    ? "Keep practicing to climb the ranks!"
                    : user.xp < 500
                      ? "You're making great progress!"
                      : user.xp < 1000
                        ? "You're becoming a strong learner!"
                        : "You're among the elite learners!"}
                </p>
                <Link to="/practice" className="btn btn-secondary btn-sm">
                  Practice Now
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Leaderboard Table */}
        <LeaderboardTable leaderboardData={mockLeaderboard} />

        {/* Call to Action for Non-Authenticated Users */}
        {!user.isAuthenticated && (
          <div className="cta-section">
            <div className="cta-card glass-card">
              <div className="cta-content">
                <h3 className="cta-title">Ready to Join the Competition?</h3>
                <p className="cta-description">
                  Start your learning journey and see your name climb up the leaderboard. Every question answered gets
                  you closer to the top!
                </p>
                <div className="cta-actions">
                  <Link to="/login" className="btn btn-primary">
                    Start Learning
                  </Link>
                  <Link to="/" className="btn btn-secondary">
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Leaderboard Info */}
        <div className="leaderboard-info">
          <div className="info-grid">
            <div className="info-card glass-card">
              <div className="info-icon">🏆</div>
              <h4 className="info-title">Monthly Reset</h4>
              <p className="info-description">Leaderboard resets every month to give everyone a fresh start.</p>
            </div>
            <div className="info-card glass-card">
              <div className="info-icon">⚡</div>
              <h4 className="info-title">Earn XP</h4>
              <p className="info-description">Answer questions correctly and complete daily tasks to earn XP.</p>
            </div>
            <div className="info-card glass-card">
              <div className="info-icon">🎯</div>
              <h4 className="info-title">Fair Play</h4>
              <p className="info-description">
                All rankings are based on legitimate learning progress and achievements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Leaderboard
