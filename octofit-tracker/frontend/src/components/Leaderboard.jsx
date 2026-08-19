import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'
import { EmptyState, ErrorState, LoadingState } from './CollectionState'

function Leaderboard() {
  const [leaders, setLeaders] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })

  useEffect(() => {
    fetchCollection('leaderboard')
      .then((items) => {
        setLeaders(items)
        setState({ loading: false, error: '' })
      })
      .catch((error) => setState({ loading: false, error: error.message }))
  }, [])

  return (
    <section className="resource-view">
      <div className="section-heading">
        <div>
          <p className="eyebrow">The daily race</p>
          <h2>Leaderboard</h2>
        </div>
        <span className="count-pill">{leaders.length} ranked</span>
      </div>
      {state.loading && <LoadingState />}
      {state.error && <ErrorState message={state.error} />}
      {!state.loading && !state.error && !leaders.length && <EmptyState label="leaderboard entries" />}
      <div className="leaderboard-list">
        {leaders.map((entry, index) => {
          const user = typeof entry.userId === 'object' ? entry.userId : null
          return (
            <article className={`leader-row ${index === 0 ? 'leader-row--first' : ''}`} key={entry._id || entry.id || index}>
              <span className="rank">{String(index + 1).padStart(2, '0')}</span>
              <div className="leader-avatar">{(user?.name || entry.username || 'A').charAt(0)}</div>
              <div className="leader-name"><h3>{user?.name || entry.username || 'Athlete'}</h3><p>{user?.username ? `@${user.username}` : 'OctoFit member'}</p></div>
              <strong>{entry.points || 0}<small> pts</small></strong>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default Leaderboard
