import '../styles/UserRepos.css'

function UserRepos({ repos }) {
  return (
    <div className="repos-section">
      <h3>Top Repositories</h3>
      <div className="repos-grid">
        {repos.map((repo) => (
          <a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="repo-card"
          >
            <h4>{repo.name}</h4>
            <p>{repo.description || 'No description provided'}</p>
            <div className="repo-meta">
              <span>⭐ {repo.stargazers_count}</span>
              <span>🍴 {repo.forks_count}</span>
              {repo.language && <span className="repo-lang">{repo.language}</span>}
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

export default UserRepos

