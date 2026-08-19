import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'
import { EmptyState, ErrorState, LoadingState } from './CollectionState'

const activitiesEndpoint = import.meta.env.VITE_CODESPACE_NAME?.trim()
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/'

function Activities() {
  const [activities, setActivities] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })

  useEffect(() => {
    fetchCollection(activitiesEndpoint)
      .then((items) => {
        setActivities(items)
        setState({ loading: false, error: '' })
      })
      .catch((error) => setState({ loading: false, error: error.message }))
  }, [])

  return (
    <section className="resource-view">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Movement log</p>
          <h2>Recent activity</h2>
        </div>
        <span className="count-pill">{activities.length} entries</span>
      </div>
      {state.loading && <LoadingState />}
      {state.error && <ErrorState message={state.error} />}
      {!state.loading && !state.error && !activities.length && <EmptyState label="activities" />}
      <div className="activity-list">
        {activities.map((activity) => (
          <article className="activity-row" key={activity._id || activity.id}>
            <div className="activity-icon">{(activity.type || 'A').charAt(0)}</div>
            <div className="activity-main">
              <h3>{activity.type || 'Activity'}</h3>
              <p>{activity.durationMinutes || 0} minutes logged</p>
            </div>
            <strong>{activity.points || 0}<small> pts</small></strong>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Activities
