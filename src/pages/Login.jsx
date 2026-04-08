import { useState } from 'react';

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

export default function Login({ navigate, setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const storedUser = getCookie('registeredUser');
    const storedPass = getCookie('registeredPass');

    if (username === storedUser && password === storedPass && storedUser !== "") {
      setCookie('loggedInUser', username, 7); // Save session for 7 days
      setUser(username);
      navigate('home');
    } else {
      setError('Invalid username or password!');
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="card" style={{ maxWidth: '450px', margin: '0 auto' }}>
      <div className="row-container">
        <div className="text-side">
          <h1 style={{ marginTop: 0 }}>Login</h1>
          <form onSubmit={handleLogin} className={shake ? 'shake' : ''}>
            <label>Username:</label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} required placeholder="Enter username" />
            
            <label>Password:</label>
            <div className="password-container">
              <input type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} required placeholder="Enter password" />
              <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? '🙈' : '👁️'}
              </span>
            </div>
            
            <p style={{ color: 'red', fontSize: '14px', textAlign: 'center', marginTop: '-10px', minHeight: '20px' }}>{error}</p>
            <button type="submit" className="submit-btn" style={{ width: '100%' }}>Login</button>
          </form>
          <p style={{ textAlign: 'center', marginTop: '20px' }}>
            Don't have an account? <span className="link" onClick={() => navigate('signup')}>Sign Up here</span>
          </p>
        </div>
        <div className="image-side">
          <img src="/login.png" alt="Login" />
        </div>
      </div>
    </div>
  );
}