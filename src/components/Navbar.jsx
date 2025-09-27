"use client"

import { Link, useLocation } from "react-router-dom"
import { useUser } from "../context/UserContext"
import "./Navbar.css"

function Navbar() {
  const { user } = useUser()
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        {/* Brand */}
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">⚔️</span>
          <span className="brand-text">ConPro</span>
        </Link>

        {/* Navigation Links - Hidden on mobile, shown in dropdown */}
        <div className="navbar-links">
          <Link to="/dashboard" className={`nav-link ${isActive("/dashboard") ? "active" : ""}`}>
            Dashboard
          </Link>
          <Link to="/practice" className={`nav-link ${isActive("/practice") ? "active" : ""}`}>
            Practice
          </Link>
          <Link to="/leaderboard" className={`nav-link ${isActive("/leaderboard") ? "active" : ""}`}>
            Leaderboard
          </Link>
        </div>

        {/* User Info & Quick Actions */}
        <div className="navbar-actions">
          {user.isAuthenticated ? (
            <>
              <div className="user-info">
                <span className="user-level">Lv.{user.level}</span>
                <span className="user-xp">{user.xp} XP</span>
              </div>
              <Link to="/practice" className="btn btn-primary btn-sm quick-start-btn">
                Quick Start
              </Link>
              <Link to="/profile" className="profile-link">
                <div className="profile-avatar">{user.name.charAt(0).toUpperCase()}</div>
              </Link>
            </>
          ) : (
            <Link to="/login" className="btn btn-primary btn-sm">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
