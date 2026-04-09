import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

// --- Cookie Helper Function ---
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState(0);
  const [shake, setShake] = useState(false);
  const [preview, setPreview] = useState(null);

  // Calculate Password Strength
  useEffect(() => {
    let str = 0;
    if (password.length > 5) str += 33;
    if (password.match(/[A-Z]/) && password.match(/[0-9]/)) str += 33;
    if (password.match(/[^a-zA-Z0-9]/)) str += 34;
    setStrength(str);
  }, [password]);

  const handleFileDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (ev) => setPreview(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    // Save credentials to cookies
    setCookie('registeredUser', username, 7);
    setCookie('registeredPass', password, 7);
    
    alert('Account created successfully! Please login.');
    navigate('/login');
  };

  return (
    <div className="card" style={{ maxWidth: '450px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center' }}>Create Account</h1>
      <form onSubmit={handleSignup} className={shake ? 'shake' : ''}>
        
        <div className="drop-zone" onDragOver={e => e.preventDefault()} onDrop={handleFileDrop} onClick={() => document.getElementById('fileUpload').click()}>
          📁 Drag & Drop Profile Picture Here or Click to Upload
          <input id="fileUpload" type="file" hidden accept="image/*" onChange={handleFileDrop} />
          {preview && <img src={preview} style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', marginTop: '10px' }} />}
        </div>

        <label>Full Name:</label>
        <input type="text" required value={username} onChange={e => setUsername(e.target.value)} />

        <label>Email:</label>
        <input type="email" required value={email} onChange={e => setEmail(e.target.value)} />

        <label>Password:</label>
        <div className="password-container">
          <input type={showPassword ? "text" : "password"} required value={password} onChange={e => setPassword(e.target.value)} />
          <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>{showPassword ? '🙈' : '👁️'}</span>
        </div>
        
        <div className="strength-meter">
          <div className="strength-bar" style={{ width: `${strength}%`, backgroundColor: strength < 34 ? 'red' : strength < 67 ? 'orange' : 'green' }}></div>
        </div>

        <label>Confirm Password:</label>
        <div className="password-container">
          <input type={showPassword ? "text" : "password"} required value={confirm} onChange={e => setConfirm(e.target.value)} />
        </div>
        {confirm && (
           <p style={{ fontSize: '12px', marginTop: '-10px', color: password === confirm ? 'green' : 'red' }}>
             {password === confirm ? '✅ Passwords match' : '❌ Passwords do not match'}
           </p>
        )}

        <button type="submit" className="submit-btn" style={{ width: '100%' }}>Sign Up</button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '20px' }}>
        Already have an account? <Link to="/login" className="link">Login here</Link>
      </p>
    </div>
  );
}