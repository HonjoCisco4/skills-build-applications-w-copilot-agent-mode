import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'
import { EmptyState, ErrorState, LoadingState } from './CollectionState'

function Users() {
  const [users, setUsers] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })

  useEffect(() => {
    fetchCollection('/api/users/')
      .then((items) => {
        setUsers(items)
        setState({ loading: false, error: '' })
      })
      .catch((error) => setState({ loading: false, error: error.message }))
  }, [])

  return (
    <section className="resource-view">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Community</p>
          <h2>Members</h2>
        </div>
        <span className="count-pill">{users.length} total</span>
      </div>
      {state.loading && <LoadingState />}
      {state.error && <ErrorState message={state.error} />}
      {!state.loading && !state.error && !users.length && <EmptyState label="members" />}
      <div className="member-grid">
        {users.map((user) => (
          <article className="member-card" key={user._id || user.id || user.username}>
            <div className="avatar">{(user.name || user.username || '?').charAt(0)}</div>
            <div>
              <h3>{user.name || user.username}</h3>
              <p>{user.email || 'No email listed'}</p>
              <small>@{user.username || 'member'}</small>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Users
