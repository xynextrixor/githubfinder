import { useState } from 'react'
import '../styles/SearchBar.css'

function SearchBar({ onSearch, loading }) {
  const [input, setInput] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim()) {
      onSearch(input)
    }
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="search-input-wrapper">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter GitHub username..."
          disabled={loading}
          className="search-input"
        />
        <button
          type="submit"
          disabled={loading}
          className="search-button"
          aria-label="Search"
        >
        </button>
      </div>
    </form>
  )
}

export default SearchBar
