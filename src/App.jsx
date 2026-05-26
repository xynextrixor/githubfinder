import { useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar'
import UserProfile from './components/UserProfile'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const searchUser = async (username) => {
    if (!username.trim()) {
      setError('Please enter a username')
      return
    }

    setLoading(true)
    setError('')
    setUser(null)

    try {
      const userResponse = await fetch(`https://api.github.com/users/${username}`)
      if (!userResponse.ok) {
        throw new Error('User not found')
      }
      const userData = await userResponse.json()
      setUser(userData)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-logo">
          <svg height="32" viewBox="0 0 16 16" width="32"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>
          GitHub Finder
        </div>
        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#">Features</a>
          <a href="#">How it works</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </div>
        <div className="nav-actions">
          <div className="theme-toggle">☀️</div>
        </div>
      </nav>

      <div className="bento-grid">
        <div className="sidebar-grid">
          <div className="card search-card">
            <SearchBar onSearch={searchUser} loading={loading} />
          </div>

          <div className="card stat-card-side">
            <div className="stat-header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <span className="stat-value" style={{fontSize: '2rem', fontWeight: 800}}>80M+</span>
              <div className="stat-icon-wrapper" style={{background: '#f8e192', padding: '8px', borderRadius: '12px'}}>👥</div>
            </div>
            <p style={{fontWeight: 700, margin: '15px 0 5px'}}>Developers</p>
            <p style={{color: '#666', fontSize: '0.85rem'}}>Building the future on GitHub.</p>
            <div className="mini-graph" style={{marginTop: '20px', height: '40px', borderBottom: '2px solid #ff6b35', borderRadius: '0 0 10px 10px', opacity: 0.3}}></div>
          </div>

          <div className="card lang-card">
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
              <h4 style={{margin: 0}}>Popular Languages</h4>
              <div style={{fontSize: '1.2rem', background: '#eee', padding: '4px', borderRadius: '8px'}}>{'</>'}</div>
            </div>
            <div className="lang-list">
              <LangItem name="JavaScript" percent={61.3} color="#f1e05a" />
              <LangItem name="Python" percent={25.4} color="#3572A5" />
              <LangItem name="Java" percent={7.6} color="#b07219" />
              <LangItem name="TypeScript" percent={2.1} color="#3178c6" />
            </div>
          </div>
        </div>

        <div className="main-content">
          {error && <div className="card" style={{color: '#b91c1c', background: '#fef2f2', border: '1px solid #fee2e2'}}>{error}</div>}
          {loading && <div className="card" style={{textAlign: 'center', padding: '100px'}}>Searching GitHub...</div>}
          
          {user ? (
            <UserProfile user={user} />
          ) : !loading && (
            <div className="card empty-state" style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '500px'}}>
              <div style={{fontSize: '5rem', marginBottom: '20px'}}>✨</div>
              <h3 style={{fontSize: '2rem', margin: '0 0 10px'}}>Find any developer</h3>
              <p style={{color: '#666', maxWidth: '300px', textAlign: 'center'}}>Enter a username in the search bar to explore their beautiful profile.</p>
            </div>
          )}
        </div>

        <div className="bottom-stats">
          <BottomStat label="Users" value="100M+" color="#ff6b35" />
          <BottomStat label="Repositories" value="420M+" color="#ff6b35" />
          <BottomStat label="Organizations" value="28M+" color="#ff6b35" />
          <BottomStat label="Contributors" value="90M+" color="#ff6b35" />
        </div>
      </div>
    </div>
  )
}

function LangItem({ name, percent, color }) {
  return (
    <div className="lang-item">
      <span className="lang-name">{name}</span>
      <div className="lang-bar-bg">
        <div className="lang-bar" style={{ width: `${percent}%`, backgroundColor: color }}></div>
      </div>
      <span className="lang-percent">{percent}%</span>
    </div>
  )
}

function BottomStat({ label, value, color }) {
  return (
    <div className="stat-card-small">
      <div style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px'}}>
        <span style={{color: color, fontSize: '0.8rem'}}>◆</span>
        <h3 style={{margin: 0, fontSize: '1.4rem'}}>{value}</h3>
      </div>
      <p style={{margin: 0, color: '#666', fontWeight: 500, fontSize: '0.85rem'}}>{label}</p>
    </div>
  )
}

export default App

