import { useState, useEffect } from 'react';
import './App.css';

// Components
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Learn from './pages/Learn';
import SportDetail from './pages/SportDetail';
import Assessment from './pages/Assessment';
import Feedback from './pages/Feedback';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  // State for manual routing (React Conditionals)
  const [route, setRoute] = useState('home');
  const [activeSport, setActiveSport] = useState(null);

  // State for Authentication and Theme (React Hooks)
  const [user, setUser] = useState(localStorage.getItem('loggedInUser') || '');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  // React Effects: Sync theme with the DOM body
  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Handle routing logic safely
  const navigate = (path, context = null) => {
    if (context) setActiveSport(context);
    setRoute(path);
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setUser('');
    setRoute('home');
  };

  return (
    <>
      <Navbar 
        route={route} 
        navigate={navigate} 
        theme={theme} 
        setTheme={setTheme} 
        user={user} 
        handleLogout={handleLogout} 
      />
      
      {/* Conditional Rendering equivalent to separate HTML files */}
      <div className="container">
        {route === 'home' && <Home />}
        {route === 'register' && <Register />}
        {route === 'learn' && <Learn navigate={navigate} />}
        {route === 'sport' && <SportDetail sport={activeSport} navigate={navigate} />}
        {route === 'assessment' && <Assessment />}
        {route === 'feedback' && <Feedback />}
        {route === 'login' && <Login navigate={navigate} setUser={setUser} />}
        {route === 'signup' && <Signup navigate={navigate} />}
      </div>
    </>
  );
}

export default App;