"use client"

import { useUser } from "../context/UserContext"
import { Link } from "react-router-dom"
import ProgressBar from "../components/ProgressBar"
import "./Profile.css"

function Profile() {
  const { user, resetUser } = useUser()

  if (!user.isAuthenticated) {
    return (
      <div className="profile-page">
        <div className="container">
          <div className="auth-required">
            <h2>Authentication Required</h2>
            <p>Please log in to view your profile.</p>
            <Link to="/login" className="btn btn-primary">
              Log In
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const currentLevelXp = user.xp % 100
  const nextLevelXp = 100
  const completedTasks = user.tasks.filter((task) => task.done).length
  const totalTasks = user.tasks.length

  const handleResetDemo = () => {
    if (window.confirm("Are you sure you want to reset your progress? This action cannot be undone.")) {
      resetUser()
    }
  }

  const getProgressMessage = () => {
    if (user.level >= 20) return "You're a master learner! 🏆"
    if (user.level >= 15) return "You're becoming an expert! 🌟"
    if (user.level >= 10) return "Great progress! Keep it up! 🚀"
    if (user.level >= 5) return "You're on the right track! 📈"
    return "Just getting started! 🌱"
  }

  const getNextMilestone = () => {
    if (user.level < 5) return { level: 5, reward: "Unlock advanced questions" }
    if (user.level < 10) return { level: 10, reward: "Earn special badge" }
    if (user.level < 15) return { level: 15, reward: "Join expert leaderboard" }
    if (user.level < 20) return { level: 20, reward: "Become a master learner" }
    return { level: 25, reward: "Achieve legendary status" }
  }

  const nextMilestone = getNextMilestone()

  return (
    <div className="profile-page">
      <div className="container">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-avatar-large">{user.name.charAt(0).toUpperCase()}</div>
          <div className="profile-info">
            <h1 className="profile-name">{user.name}</h1>
            <p className="profile-title">Level {user.level} Learner</p>
            <p className="profile-message">{getProgressMessage()}</p>
          </div>
          <div className="profile-actions">
            <Link to="/practice" className="btn btn-primary">
              Continue Learning
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-section">
          <h2 className="section-title">Your Statistics</h2>
          <div className="stats-grid">
            <div className="stat-card glass-card">
              <div className="stat-header">
                <h3 className="stat-title">Current Level</h3>
                <div className="stat-icon">🏆</div>
              </div>
              <div className="stat-content">
                <div className="stat-value">Level {user.level}</div>
                <ProgressBar current={currentLevelXp} max={nextLevelXp} label="Progress to next level" animated />
                <div className="stat-description">
                  {nextLevelXp - currentLevelXp} XP needed for Level {user.level + 1}
                </div>
              </div>
            </div>

            <div className="stat-card glass-card">
              <div className="stat-header">
                <h3 className="stat-title">Total Experience</h3>
                <div className="stat-icon">⭐</div>
              </div>
              <div className="stat-content">
                <div className="stat-value">{user.xp.toLocaleString()} XP</div>
                <div className="stat-description">Earned through learning and practice</div>
              </div>
            </div>

            <div className="stat-card glass-card">
              <div className="stat-header">
                <h3 className="stat-title">Learning Streak</h3>
                <div className="stat-icon">🔥</div>
              </div>
              <div className="stat-content">
                <div className="stat-value">{user.streak} Days</div>
                <div className="stat-description">
                  {user.streak === 0 ? "Start your streak today!" : "Keep the momentum going!"}
                </div>
              </div>
            </div>

            <div className="stat-card glass-card">
              <div className="stat-header">
                <h3 className="stat-title">Task Progress</h3>
                <div className="stat-icon">✅</div>
              </div>
              <div className="stat-content">
                <div className="stat-value">
                  {completedTasks}/{totalTasks}
                </div>
                <ProgressBar current={completedTasks} max={totalTasks} showNumbers={false} color="success" />
                <div className="stat-description">Daily tasks completed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Milestone */}
        <div className="milestone-section">
          <h2 className="section-title">Next Milestone</h2>
          <div className="milestone-card glass-card">
            <div className="milestone-content">
              <div className="milestone-info">
                <h3 className="milestone-title">Level {nextMilestone.level}</h3>
                <p className="milestone-reward">{nextMilestone.reward}</p>
                <div className="milestone-progress">
                  <ProgressBar
                    current={user.level}
                    max={nextMilestone.level}
                    label={`Progress to Level ${nextMilestone.level}`}
                    animated
                    color="warning"
                  />
                </div>
              </div>
              <div className="milestone-icon">🎯</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="actions-section">
          <h2 className="section-title">Quick Actions</h2>
          <div className="actions-grid">
            <Link to="/practice" className="action-card glass-card">
              <div className="action-icon">📚</div>
              <div className="action-content">
                <h3 className="action-title">Practice Questions</h3>
                <p className="action-description">Continue your learning journey</p>
              </div>
              <div className="action-arrow">→</div>
            </Link>

            <Link to="/dashboard" className="action-card glass-card">
              <div className="action-icon">📊</div>
              <div className="action-content">
                <h3 className="action-title">View Dashboard</h3>
                <p className="action-description">Check your daily tasks</p>
              </div>
              <div className="action-arrow">→</div>
            </Link>

            <Link to="/leaderboard" className="action-card glass-card">
              <div className="action-icon">🏅</div>
              <div className="action-content">
                <h3 className="action-title">Leaderboard</h3>
                <p className="action-description">See your ranking</p>
              </div>
              <div className="action-arrow">→</div>
            </Link>
          </div>
        </div>

        {/* Demo Reset */}
        <div className="demo-section">
          <div className="demo-card glass-card">
            <div className="demo-content">
              <h3 className="demo-title">Demo Reset</h3>
              <p className="demo-description">
                This is a demo version. You can reset your progress to start over and test the application.
              </p>
              <button onClick={handleResetDemo} className="btn btn-danger">
                Reset Demo Progress
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
