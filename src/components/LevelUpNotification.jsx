"use client"

import { useEffect, useState } from "react"
import "./LevelUpNotification.css"

function LevelUpNotification({ show, level, onComplete }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (show) {
      setIsVisible(true)
      const timer = setTimeout(() => {
        setIsVisible(false)
        if (onComplete) {
          setTimeout(onComplete, 300) // Wait for fade out
        }
      }, 2500)
      return () => clearTimeout(timer)
    }
  }, [show, onComplete])

  if (!show && !isVisible) return null

  return (
    <>
      {/* Confetti Background */}
      <div className={`confetti-container ${isVisible ? "active" : ""}`}>
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="confetti-piece"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              backgroundColor: Math.random() > 0.5 ? "#8b5cf6" : "#06b6d4",
            }}
          />
        ))}
      </div>

      {/* Level Up Modal */}
      <div className={`level-up-overlay ${isVisible ? "show" : ""}`}>
        <div className="level-up-modal">
          <div className="level-up-glow"></div>
          <div className="level-up-content">
            <div className="level-up-icon">🎉</div>
            <h2 className="level-up-title">LEVEL UP!</h2>
            <div className="level-up-level">Level {level}</div>
            <p className="level-up-message">You're getting stronger!</p>
            <div className="level-up-effects">
              <div className="effect-ring ring-1"></div>
              <div className="effect-ring ring-2"></div>
              <div className="effect-ring ring-3"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LevelUpNotification
