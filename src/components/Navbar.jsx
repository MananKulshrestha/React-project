import { NavLink } from 'react-router-dom';

export default function Navbar({ theme, setTheme, user, handleLogout }) {
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <div className="navbar">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/register">Course Registration</NavLink>
      <NavLink to="/learn">Course Learning</NavLink>
      <NavLink to="/assessment">Assessment</NavLink>
      <NavLink to="/feedback">Feedback</NavLink>
      
      {!user && (
        <NavLink to="/login">Login</NavLink>
      )}

      <div className="nav-right-controls">
        <button onClick={toggleTheme} className="theme-btn" title="Toggle Light/Dark Mode">
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
        
        {user && (
          <>
            <span className="welcome-msg">Welcome, {user}!</span>
            {/* Kept as a span because it triggers an action, not a navigation route */}
            <span onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</span>
          </>
        )}
      </div>
    </div>
  );
}