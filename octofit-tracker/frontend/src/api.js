const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export function normalizeCollection(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload.results)) return payload.results
  if (Array.isArray(payload.data)) return payload.data
  if (Array.isArray(payload.items)) return payload.items
  return []
}

export async function fetchCollection(path) {
  const response = await fetch(path.startsWith('http') ? path : `${API_BASE_URL}${path}`)
  if (!response.ok) {
    throw new Error(`Unable to load ${path} (${response.status})`)
  }

  return normalizeCollection(await response.json())
}
