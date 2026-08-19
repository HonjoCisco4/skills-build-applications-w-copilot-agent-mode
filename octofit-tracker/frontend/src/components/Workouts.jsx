import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'
import { EmptyState, ErrorState, LoadingState } from './CollectionState'

const workoutsEndpoint = import.meta.env.VITE_CODESPACE_NAME?.trim()
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })

  useEffect(() => {
    fetchCollection(workoutsEndpoint)
      .then((items) => {
        setWorkouts(items)
        setState({ loading: false, error: '' })
      })
      .catch((error) => setState({ loading: false, error: error.message }))
  }, [])

  return (
    <section className="resource-view">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Your next challenge</p>
          <h2>Workouts</h2>
        </div>
        <span className="count-pill">{workouts.length} plans</span>
      </div>
      {state.loading && <LoadingState />}
      {state.error && <ErrorState message={state.error} />}
      {!state.loading && !state.error && !workouts.length && <EmptyState label="workouts" />}
      <div className="workout-grid">
        {workouts.map((workout) => (
          <article className="workout-card" key={workout._id || workout.id || workout.name}>
            <span className={`difficulty difficulty--${workout.difficulty || 'beginner'}`}>{workout.difficulty || 'beginner'}</span>
            <h3>{workout.name || 'Workout plan'}</h3>
            <p>{workout.description || 'A focused session to keep your momentum going.'}</p>
            <footer><span>{workout.durationMinutes || 0} min</span><span aria-hidden="true">→</span></footer>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Workouts
