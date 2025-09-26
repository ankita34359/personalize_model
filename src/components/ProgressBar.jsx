"use client"

import { useEffect, useState } from "react"
import "./ProgressBar.css"

function ProgressBar({ current, max, label, showNumbers = true, animated = true, color = "primary" }) {
  const [displayValue, setDisplayValue] = useState(0)
  const percentage = Math.min((current / max) * 100, 100)

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setDisplayValue(current)
      }, 100)
      return () => clearTimeout(timer)
    } else {
      setDisplayValue(current)
    }
  }, [current, animated])

  const displayPercentage = Math.min((displayValue / max) * 100, 100)

  return (
    <div className="progress-container">
      {label && (
        <div className="progress-header">
          <span className="progress-label">{label}</span>
          {showNumbers && (
            <span className="progress-numbers">
              {displayValue.toLocaleString()} / {max.toLocaleString()}
            </span>
          )}
        </div>
      )}
      <div className="progress-bar-wrapper">
        <div className="progress-bar-track">
          <div
            className={`progress-bar-fill progress-bar-${color} ${animated ? "animated" : ""}`}
            style={{ width: `${displayPercentage}%` }}
          >
            <div className="progress-bar-glow"></div>
          </div>
        </div>
        {!label && showNumbers && <span className="progress-percentage">{Math.round(displayPercentage)}%</span>}
      </div>
    </div>
  )
}

export default ProgressBar
