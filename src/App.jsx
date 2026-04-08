import { useState, useEffect } from 'react';
import './App.css';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Register from './pages/Register';
import Learn from './pages/learn';
import SportDetail from './pages/SportDetail';
import Assessment from './pages/Assessment';
import Feedback from './pages/Feedback';
import Login from './pages/Login';
import Signup from './pages/signup';

// --- Cookie Helper Functions ---
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
  const cookieName = name + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(';');
  for(let i = 0; i < cookieArray.length; i++) {
    let c = cookieArray[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(cookieName) === 0) {
      return c.substring(cookieName.length, c.length);
    }
  }
  return "";
}

function App() {
  // State for manual routing (React Conditionals)
  const [route, setRoute] = useState('home');
  const [activeSport, setActiveSport] = useState(null);

  // State for Authentication and Theme using Cookies
  const [user, setUser] = useState(getCookie('loggedInUser') || '');
  const [theme, setTheme] = useState(getCookie('theme') || 'dark');

  // React Effects: Sync theme with the DOM body and update cookie
  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
    setCookie('theme', theme, 365);
  }, [theme]);

  // Handle routing logic safely
  const navigate = (path, context = null) => {
    if (context) setActiveSport(context);
    setRoute(path);
  };

  const handleLogout = () => {
    setCookie('loggedInUser', '', -1); // Deletes the cookie by expiring it
    setUser('');
    setRoute('home');
  };

  return (
    <div className="app-wrapper">
      <Navbar 
        route={route} 
        navigate={navigate} 
        theme={theme} 
        setTheme={setTheme} 
        user={user} 
        handleLogout={handleLogout} 
      />
      
      {/* main tag helps flexbox push the footer to the bottom */}
      <main className="container">
        {route === 'home' && <Home />}
        {route === 'register' && <Register />}
        {route === 'learn' && <Learn navigate={navigate} />}
        {route === 'sport' && <SportDetail sport={activeSport} navigate={navigate} />}
        {route === 'assessment' && <Assessment />}
        {route === 'feedback' && <Feedback />}
        {route === 'login' && <Login navigate={navigate} setUser={setUser} />}
        {route === 'signup' && <Signup navigate={navigate} />}
      </main>

      <Footer />
    </div>
  );
}

export default App;