"use client"

import { useState } from "react"
import { useUser } from "../context/UserContext"
import "./TaskCard.css"

function TaskCard({ task }) {
  const { completeTask } = useUser()
  const [isCompleting, setIsCompleting] = useState(false)

  const handleComplete = async () => {
    if (task.done || isCompleting) return

    setIsCompleting(true)

    // Add a small delay for better UX
    setTimeout(() => {
      completeTask(task.id)
      setIsCompleting(false)
    }, 300)
  }

  return (
    <div className={`task-card ${task.done ? "completed" : ""}`}>
      <div className="task-content">
        <div className="task-info">
          <h4 className="task-title">{task.text}</h4>
          <div className="task-reward">
            <span className="xp-badge">+{task.xp} XP</span>
          </div>
        </div>

        <div className="task-action">
          {task.done ? (
            <div className="task-status completed">
              <span className="checkmark">✓</span>
              <span>Completed</span>
            </div>
          ) : (
            <button
              className={`btn btn-primary task-complete-btn ${isCompleting ? "loading" : ""}`}
              onClick={handleComplete}
              disabled={isCompleting}
            >
              {isCompleting ? (
                <>
                  <span className="spinner"></span>
                  Completing...
                </>
              ) : (
                "Complete"
              )}
            </button>
          )}
        </div>
      </div>

      {task.done && <div className="task-completed-overlay"></div>}
    </div>
  )
}

export default TaskCard
