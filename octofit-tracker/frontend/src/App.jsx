import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'

function App() {
  const navigation = [
    { label: 'Overview', path: '/' },
    { label: 'Activity', path: '/activities' },
    { label: 'Leaderboard', path: '/leaderboard' },
    { label: 'Teams', path: '/teams' },
    { label: 'Members', path: '/users' },
    { label: 'Workouts', path: '/workouts' },
  ]

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark">O</span><span>OctoFit</span></div>
        <p className="sidebar-label">Track your edge</p>
        <nav aria-label="Primary navigation">
          {navigation.map((item) => (
            <NavLink className="nav-link" end={item.path === '/'} key={item.path} to={item.path}>
              <span className="nav-dot" />{item.label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer"><span className="pulse" />API connected</div>
      </aside>
      <main className="main-content">
        <header className="topbar"><div><p className="eyebrow">Wednesday, August 19</p><h1>Keep showing up.</h1></div><div className="profile-chip"><span>HM</span><strong>Honjo</strong></div></header>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </main>
    </div>
  )
}

function Overview() {
  return <section className="overview"><div className="welcome-panel"><p className="eyebrow">Your weekly rhythm</p><h2>Small moves.<br /><em>Big momentum.</em></h2><p className="welcome-copy">Log a session, cheer on your team, and let consistency do its thing.</p><NavLink className="primary-action" to="/activities">Log activity <span aria-hidden="true">→</span></NavLink></div><div className="metric-strip"><article><span>Weekly points</span><strong>309</strong><small>+18% from last week</small></article><article><span>Active streak</span><strong>06 <small>days</small></strong><small>Keep it going</small></article><article><span>Team rank</span><strong>#04</strong><small>in Pulse Collective</small></article></div><div className="overview-links"><NavLink to="/leaderboard"><span>01</span>See the leaderboard <b>↗</b></NavLink><NavLink to="/workouts"><span>02</span>Find a new workout <b>↗</b></NavLink></div></section>
}

export default App
