export default function Navbar({ route, navigate, theme, setTheme, user, handleLogout }) {
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <div className="navbar">
      <span className={route === 'home' ? 'active' : ''} onClick={() => navigate('home')}>Home</span>
      <span className={route === 'register' ? 'active' : ''} onClick={() => navigate('register')}>Course Registration</span>
      <span className={route === 'learn' ? 'active' : ''} onClick={() => navigate('learn')}>Course Learning</span>
      <span className={route === 'assessment' ? 'active' : ''} onClick={() => navigate('assessment')}>Assessment</span>
      <span className={route === 'feedback' ? 'active' : ''} onClick={() => navigate('feedback')}>Feedback</span>
      
      {!user && (
        <span className={route === 'login' ? 'active' : ''} onClick={() => navigate('login')}>Login</span>
      )}

      <div className="nav-right-controls">
        <button onClick={toggleTheme} className="theme-btn" title="Toggle Light/Dark Mode">
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
        
        {user && (
          <>
            <span className="welcome-msg">Welcome, {user}!</span>
            <span onClick={handleLogout}>Logout</span>
          </>
        )}
      </div>
    </div>
  );
}