"use client"

import { createContext, useContext, useReducer, useEffect } from "react"

const UserContext = createContext()

// Initial state
const initialState = {
  name: "",
  xp: 0,
  level: 1,
  streak: 0,
  tasks: [
    { id: 1, text: "Complete your first quiz", xp: 50, done: false },
    { id: 2, text: "Reach level 2", xp: 100, done: false },
    { id: 3, text: "Answer 5 questions correctly", xp: 75, done: false },
  ],
  isAuthenticated: false,
}

// Reducer function
function userReducer(state, action) {
  switch (action.type) {
    case "SET_USER":
      return { ...state, ...action.payload, isAuthenticated: true }

    case "ADD_XP":
      const newXp = state.xp + action.payload
      const newLevel = Math.floor(newXp / 100) + 1
      const leveledUp = newLevel > state.level

      return {
        ...state,
        xp: newXp,
        level: newLevel,
        leveledUp, // Flag for level up animation
      }

    case "COMPLETE_TASK":
      const updatedTasks = state.tasks.map((task) => (task.id === action.payload ? { ...task, done: true } : task))
      return { ...state, tasks: updatedTasks }

    case "RESET_USER":
      return { ...initialState, isAuthenticated: false }

    case "CLEAR_LEVEL_UP":
      return { ...state, leveledUp: false }

    default:
      return state
  }
}

export function UserProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, initialState)

  // Load user data from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("soloLevelingUser")
    if (savedUser) {
      const userData = JSON.parse(savedUser)
      dispatch({ type: "SET_USER", payload: userData })
    }
  }, [])

  // Save user data to localStorage whenever state changes
  useEffect(() => {
    if (state.isAuthenticated) {
      const userDataToSave = {
        name: state.name,
        xp: state.xp,
        level: state.level,
        streak: state.streak,
        tasks: state.tasks,
      }
      localStorage.setItem("soloLevelingUser", JSON.stringify(userDataToSave))
    }
  }, [state])

  // Action creators
  const setUser = (userData) => {
    dispatch({ type: "SET_USER", payload: userData })
  }

  const addXp = (amount) => {
    dispatch({ type: "ADD_XP", payload: amount })
  }

  const completeTask = (taskId) => {
    const task = state.tasks.find((t) => t.id === taskId)
    if (task && !task.done) {
      dispatch({ type: "COMPLETE_TASK", payload: taskId })
      addXp(task.xp)
    }
  }

  const resetUser = () => {
    localStorage.removeItem("soloLevelingUser")
    dispatch({ type: "RESET_USER" })
  }

  const clearLevelUp = () => {
    dispatch({ type: "CLEAR_LEVEL_UP" })
  }

  const value = {
    user: state,
    setUser,
    addXp,
    completeTask,
    resetUser,
    clearLevelUp,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
