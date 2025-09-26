"use client"

import { useUser } from "../context/UserContext"
import "./LeaderboardTable.css"

function LeaderboardTable({ leaderboardData }) {
  const { user } = useUser()

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return "🥇"
      case 2:
        return "🥈"
      case 3:
        return "🥉"
      default:
        return `#${rank}`
    }
  }

  const isCurrentUser = (playerName) => {
    return user.isAuthenticated && user.name === playerName
  }

  return (
    <div className="leaderboard-table-container">
      <div className="leaderboard-table glass-card">
        <div className="table-header">
          <h3 className="table-title">Global Leaderboard</h3>
          <p className="table-subtitle">Top learners this month</p>
        </div>

        <div className="table-content">
          <div className="table-headers">
            <div className="header-rank">Rank</div>
            <div className="header-player">Player</div>
            <div className="header-level">Level</div>
            <div className="header-xp">XP</div>
          </div>

          <div className="table-body">
            {leaderboardData.map((player, index) => {
              const rank = index + 1
              const isCurrentPlayer = isCurrentUser(player.name)

              return (
                <div
                  key={player.id}
                  className={`table-row ${isCurrentPlayer ? "current-user" : ""} ${rank <= 3 ? "top-three" : ""}`}
                >
                  <div className="cell-rank">
                    <span className="rank-display">{getRankIcon(rank)}</span>
                  </div>

                  <div className="cell-player">
                    <div className="player-info">
                      <div className="player-avatar">{player.name.charAt(0).toUpperCase()}</div>
                      <div className="player-details">
                        <span className="player-name">
                          {player.name}
                          {isCurrentPlayer && <span className="you-badge">You</span>}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="cell-level">
                    <span className="level-badge">Lv.{player.level}</span>
                  </div>

                  <div className="cell-xp">
                    <span className="xp-amount">{player.xp.toLocaleString()}</span>
                    <span className="xp-label">XP</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {user.isAuthenticated && !leaderboardData.some((player) => player.name === user.name) && (
          <div className="current-user-stats">
            <div className="stats-divider">
              <span className="divider-text">Your Stats</span>
            </div>
            <div className="table-row current-user">
              <div className="cell-rank">
                <span className="rank-display">#???</span>
              </div>
              <div className="cell-player">
                <div className="player-info">
                  <div className="player-avatar">{user.name.charAt(0).toUpperCase()}</div>
                  <div className="player-details">
                    <span className="player-name">
                      {user.name}
                      <span className="you-badge">You</span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="cell-level">
                <span className="level-badge">Lv.{user.level}</span>
              </div>
              <div className="cell-xp">
                <span className="xp-amount">{user.xp.toLocaleString()}</span>
                <span className="xp-label">XP</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default LeaderboardTable
