export function LoadingState() {
  return <p className="status-message">Loading your tracker data...</p>
}

export function ErrorState({ message }) {
  return <p className="status-message status-message--error">{message}</p>
}

export function EmptyState({ label }) {
  return <p className="status-message">No {label} have been recorded yet.</p>
}
