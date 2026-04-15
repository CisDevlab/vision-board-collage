import { useState } from 'react';
import { Sparkles, LogIn, Eye, EyeOff } from 'lucide-react';

const VALID_PASSWORD = '168168168';

export default function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);

  const usernameValid = username.length >= 8;
  const passwordValid = password.length >= 5;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!usernameValid) {
      setError('Username must be at least 8 characters');
      triggerShake();
      return;
    }
    if (!passwordValid) {
      setError('Password must be at least 5 characters');
      triggerShake();
      return;
    }
    if (password !== VALID_PASSWORD) {
      setError('Invalid credentials');
      triggerShake();
      return;
    }

    localStorage.setItem('vb-auth', 'true');
    onLogin();
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  return (
    <div className="login-backdrop">
      <form className={`login-card ${shake ? 'shake' : ''}`} onSubmit={handleSubmit}>
        <div className="login-header">
          <Sparkles size={28} className="login-icon" />
          <h1 className="login-title">Vision Board</h1>
          <p className="login-subtitle">Sign in to create your board</p>
        </div>

        <div className="login-field">
          <label className="login-label">Username</label>
          <input
            type="text"
            className="login-input"
            value={username}
            onChange={(e) => { setUsername(e.target.value); setError(''); }}
            placeholder="Enter username"
            autoComplete="username"
          />
          {username.length > 0 && !usernameValid && (
            <span className="login-hint">Minimum 8 characters</span>
          )}
        </div>

        <div className="login-field">
          <label className="login-label">Password</label>
          <div className="login-password-wrap">
            <input
              type={showPassword ? 'text' : 'password'}
              className="login-input"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              placeholder="Enter password"
              autoComplete="current-password"
            />
            <button
              type="button"
              className="login-eye"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {password.length > 0 && !passwordValid && (
            <span className="login-hint">Minimum 5 characters</span>
          )}
        </div>

        {error && <p className="login-error">{error}</p>}

        <button
          type="submit"
          className="login-submit"
          disabled={!usernameValid || !passwordValid}
        >
          <LogIn size={16} />
          <span>Sign In</span>
        </button>
      </form>
    </div>
  );
}
