import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'
import { EmptyState, ErrorState, LoadingState } from './CollectionState'

function Teams() {
  const [teams, setTeams] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })

  useEffect(() => {
    fetchCollection('/api/teams/')
      .then((items) => {
        setTeams(items)
        setState({ loading: false, error: '' })
      })
      .catch((error) => setState({ loading: false, error: error.message }))
  }, [])

  return (
    <section className="resource-view">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Find your people</p>
          <h2>Teams</h2>
        </div>
        <span className="count-pill">{teams.length} squads</span>
      </div>
      {state.loading && <LoadingState />}
      {state.error && <ErrorState message={state.error} />}
      {!state.loading && !state.error && !teams.length && <EmptyState label="teams" />}
      <div className="team-grid">
        {teams.map((team) => (
          <article className="team-card" key={team._id || team.id || team.name}>
            <div className="team-card__top"><span className="team-mark">+</span><span>{team.members?.length || 0} members</span></div>
            <h3>{team.name || 'Unnamed team'}</h3>
            <p>Build momentum together and keep each other moving.</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Teams
