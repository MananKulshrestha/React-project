import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
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
  const navigate = useNavigate();

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

  const handleLogout = () => {
    setCookie('loggedInUser', '', -1); // Deletes the cookie by expiring it
    setUser('');
    navigate('/'); // Redirect to home using React Router
  };

  return (
    <div className="app-wrapper">
      <Navbar 
        theme={theme} 
        setTheme={setTheme} 
        user={user} 
        handleLogout={handleLogout} 
      />
      
      {/* main tag helps flexbox push the footer to the bottom */}
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/learn" element={<Learn />} />
          {/* URL Parameter for dynamic sport matching */}
          <Route path="/sport/:sportName" element={<SportDetail />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<Signup />} />
          {/* Catch-all fallback to redirect bad URLs to Home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;