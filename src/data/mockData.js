// Sample questions for practice mode
export const sampleQuestions = [
  {
    id: 1,
  question: "What is the SI unit of Force?",
  options: ["Newton", "Joule", "Pascal", "Watt"],
  correctAnswer: 0,
  xp: 25,
  explanation: "Force is measured in Newton (N), defined as kg·m/s²."
  },
  {
   id: 2,
  question: "Which of the following is a scalar quantity?",
  options: ["Velocity", "Force", "Work", "Acceleration"],
  correctAnswer: 2,
  xp: 25,
  explanation: "Work has only magnitude, making it a scalar quantity.",
  },
  {
    id: 3,
  question: "If velocity-time graph is a straight line, the motion is?",
  options: ["Uniform acceleration", "Non-uniform acceleration", "Rest", "Uniform motion"],
  correctAnswer: 0,
  xp: 25,
  explanation: "A straight line in v-t graph indicates constant acceleration."
  },
  {
    id: 4,
  question: "Moment of inertia depends on?",
  options: ["Mass distribution", "Force applied", "Time", "Velocity"],
  correctAnswer: 0,
  xp: 25,
  explanation: "Moment of inertia is proportional to the distribution of mass about the axis of rotation."
  },
  {
   id: 5,
  question: "The slope of displacement-time graph gives?",
  options: ["Acceleration", "Velocity", "Force", "Momentum"],
  correctAnswer: 1,
  xp: 25,
  explanation: "The slope of displacement-time graph gives velocity."
  },
]

// Mock leaderboard data
export const mockLeaderboard = [
  { id: 1, name: "Shadow Monarch", xp: 2450, level: 25 },
  { id: 2, name: "Iron Warrior", xp: 1890, level: 19 },
  { id: 3, name: "Code Hunter", xp: 1650, level: 17 },
  { id: 4, name: "Bug Slayer", xp: 1420, level: 15 },
  { id: 5, name: "Logic Master", xp: 1200, level: 13 },
  { id: 6, name: "Syntax Sage", xp: 980, level: 10 },
  { id: 7, name: "Debug Demon", xp: 750, level: 8 },
  { id: 8, name: "Code Crusader", xp: 650, level: 7 },
  { id: 9, name: "Pixel Pioneer", xp: 520, level: 6 },
  { id: 10, name: "Data Diver", xp: 380, level: 4 },
]

// API placeholder functions - replace with real endpoints later
export const apiService = {
  // Personalization endpoint - will use AI to customize learning path
  async getPersonalizedContent(userId, currentLevel) {
    // TODO: Replace with actual API call to /api/personalize
    console.log("API Call: /api/personalize", { userId, currentLevel })

    // Mock response for now
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          recommendedTopics: ["React Hooks", "CSS Grid", "JavaScript ES6"],
          difficulty: "intermediate",
          nextQuestions: sampleQuestions.slice(0, 3),
        })
      }, 500)
    })
  },

  // Quiz endpoint - will generate AI-powered questions
  async getQuizQuestions(topic, difficulty, count = 5) {
    // TODO: Replace with actual API call to /api/quiz
    console.log("API Call: /api/quiz", { topic, difficulty, count })

    // Mock response for now
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          questions: sampleQuestions.slice(0, count),
          sessionId: Date.now().toString(),
        })
      }, 300)
    })
  },

  // Score submission endpoint - will track progress and update leaderboard
  async submitScore(userId, sessionId, score, answers) {
    // TODO: Replace with actual API call to /api/score
    console.log("API Call: /api/score", { userId, sessionId, score, answers })

    // Mock response for now
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          xpAwarded: score * 5,
          newRank: Math.floor(Math.random() * 100) + 1,
          achievements: [],
        })
      }, 400)
    })
  },
}
