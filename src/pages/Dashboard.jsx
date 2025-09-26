"use client"

import { useUser } from "../context/UserContext"
import { Link } from "react-router-dom"
import ProgressBar from "../components/ProgressBar"
import TaskCard from "../components/TaskCard"
import "./Dashboard.css"

function Dashboard() {
  const { user } = useUser()

  if (!user.isAuthenticated) {
    return (
      <div className="dashboard-page">
        <div className="container">
          <div className="auth-required">
            <h2>Authentication Required</h2>
            <p>Please log in to view your dashboard.</p>
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

  return (
    <div className="dashboard-page">
      <div className="container">
        {/* Welcome Header */}
        <div className="dashboard-header">
          <div className="welcome-section">
            <h1 className="dashboard-title">Welcome back, {user.name}!</h1>
            <p className="dashboard-subtitle">Ready to level up your skills today?</p>
          </div>
          <div className="quick-actions">
            <Link to="/practice" className="btn btn-primary">
              Start Practice
              <span className="btn-icon">⚡</span>
            </Link>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="stats-grid">
          <div className="stat-card glass-card">
            <div className="stat-header">
              <h3 className="stat-title">Current Level</h3>
              <div className="stat-icon">🏆</div>
            </div>
            <div className="stat-content">
              <div className="stat-value">Level {user.level}</div>
              <ProgressBar current={currentLevelXp} max={nextLevelXp} label="Progress to next level" animated />
            </div>
          </div>

          <div className="stat-card glass-card">
            <div className="stat-header">
              <h3 className="stat-title">Total Experience</h3>
              <div className="stat-icon">⭐</div>
            </div>
            <div className="stat-content">
              <div className="stat-value">{user.xp.toLocaleString()} XP</div>
              <div className="stat-description">Keep learning to earn more!</div>
            </div>
          </div>

          <div className="stat-card glass-card">
            <div className="stat-header">
              <h3 className="stat-title">Daily Streak</h3>
              <div className="stat-icon">🔥</div>
            </div>
            <div className="stat-content">
              <div className="stat-value">{user.streak} Days</div>
              <div className="stat-description">
                {user.streak === 0 ? "Start your streak today!" : "Keep it going!"}
              </div>
            </div>
          </div>

          <div className="stat-card glass-card">
            <div className="stat-header">
              <h3 className="stat-title">Tasks Completed</h3>
              <div className="stat-icon">✅</div>
            </div>
            <div className="stat-content">
              <div className="stat-value">
                {completedTasks}/{totalTasks}
              </div>
              <ProgressBar current={completedTasks} max={totalTasks} showNumbers={false} color="success" />
            </div>
          </div>
        </div>

        {/* Daily Tasks Section */}
        <div className="tasks-section">
          <div className="section-header">
            <h2 className="section-title">Daily Tasks</h2>
            <p className="section-subtitle">Complete these tasks to earn XP and level up faster</p>
          </div>

          <div className="tasks-grid">
            {user.tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>

          {completedTasks === totalTasks && (
            <div className="all-tasks-completed">
              <div className="completion-message">
                <div className="completion-icon">🎉</div>
                <h3>All Tasks Completed!</h3>
                <p>Great job! You've completed all your daily tasks. Check back tomorrow for new challenges.</p>
                <Link to="/practice" className="btn btn-primary">
                  Continue Practicing
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div className="quick-links-section">
          <h2 className="section-title">Quick Actions</h2>
          <div className="quick-links-grid">
            <Link to="/practice" className="quick-link-card glass-card">
              <div className="quick-link-icon">📚</div>
              <div className="quick-link-content">
                <h3 className="quick-link-title">Practice Questions</h3>
                <p className="quick-link-description">Test your knowledge and earn XP</p>
              </div>
              <div className="quick-link-arrow">→</div>
            </Link>

            <Link to="/leaderboard" className="quick-link-card glass-card">
              <div className="quick-link-icon">🏅</div>
              <div className="quick-link-content">
                <h3 className="quick-link-title">Leaderboard</h3>
                <p className="quick-link-description">See how you rank against others</p>
              </div>
              <div className="quick-link-arrow">→</div>
            </Link>

            <Link to="/profile" className="quick-link-card glass-card">
              <div className="quick-link-icon">👤</div>
              <div className="quick-link-content">
                <h3 className="quick-link-title">Profile</h3>
                <p className="quick-link-description">View and manage your account</p>
              </div>
              <div className="quick-link-arrow">→</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
