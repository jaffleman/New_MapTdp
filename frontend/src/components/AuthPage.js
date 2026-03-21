import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { ThemeContext } from './ThemeContext';

function AuthPage() {
  const { login, register } = useContext(AuthContext);
  const { isDark, toggle } = useContext(ThemeContext);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        if (!username.trim()) { setError('Le nom est requis'); setLoading(false); return; }
        await register(email, password, username);
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const inputStyle = {
    width:'100%',
    padding:'0.7rem 0.9rem',
    background:'var(--input-bg)',
    border:'1px solid var(--input-border)',
    borderRadius:'8px',
    color:'var(--text-primary)',
    fontSize:'0.88rem',
    fontFamily:'JetBrains Mono, monospace',
    outline:'none',
    transition:'border-color 0.25s, box-shadow 0.25s',
    boxSizing:'border-box',
  };

  const labelStyle = {
    color:'var(--text-secondary)', 
    fontSize:'0.72rem', 
    fontWeight:600, 
    marginBottom:'0.3rem', 
    display:'block', 
    textTransform:'uppercase', 
    letterSpacing:'1.5px',
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      background: 'var(--bg)',
      padding: '1rem',
      transition: 'background 0.4s ease',
    }}>
      {/* Theme toggle */}
      <button 
        onClick={toggle}
        className="theme-toggle"
        style={{position:'absolute', top:'1rem', right:'1rem'}}
        data-testid="auth-theme-toggle"
        title={isDark ? 'Mode jour' : 'Mode nuit'}
      >
        <i className={isDark ? 'fas fa-sun' : 'fas fa-moon'}></i>
      </button>

      <div style={{
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: 'var(--glass-border)',
        borderRadius: '14px',
        boxShadow: 'var(--glass-shadow)',
        padding: '2rem',
        width: '100%',
        maxWidth: '380px',
        animation: 'fadeSlideUp 0.5s ease forwards',
        transition: 'background 0.4s ease, box-shadow 0.4s ease',
      }} data-testid="auth-card">
        
        <div style={{textAlign:'center', marginBottom:'1.75rem'}}>
          <h1 style={{
            fontSize:'1.6rem',
            fontWeight:700,
            color:'var(--text-primary)',
            margin:0,
            letterSpacing:'3px',
            fontFamily:'Manrope, sans-serif',
          }}>
            MapTDP
          </h1>
          <p style={{color:'var(--text-secondary)', fontSize:'0.8rem', marginTop:'0.4rem', letterSpacing:'0.5px'}}>
            {isLogin ? 'Connectez-vous pour continuer' : 'Créez votre compte'}
          </p>
        </div>

        {/* Tabs */}
        <div style={{
          display:'flex', 
          marginBottom:'1.25rem', 
          borderBottom:'1px solid var(--border-color)',
        }}>
          <button
            onClick={() => {setIsLogin(true); setError('');}}
            style={{
              flex:1, 
              padding:'0.55rem',
              background:'transparent',
              border:'none',
              borderBottom: isLogin ? '2px solid var(--accent)' : '2px solid transparent',
              color: isLogin ? 'var(--text-primary)' : 'var(--text-secondary)',
              fontWeight:600,
              fontSize:'0.82rem',
              cursor:'pointer',
              transition:'all 0.25s',
              fontFamily:'Manrope, sans-serif',
              letterSpacing:'0.5px',
            }}
            data-testid="auth-tab-login"
          >
            <i className="fas fa-sign-in-alt" style={{marginRight:'5px', fontSize:'0.75rem'}}></i>
            Connexion
          </button>
          <button
            onClick={() => {setIsLogin(false); setError('');}}
            style={{
              flex:1,
              padding:'0.55rem',
              background:'transparent',
              border:'none',
              borderBottom: !isLogin ? '2px solid var(--accent)' : '2px solid transparent',
              color: !isLogin ? 'var(--text-primary)' : 'var(--text-secondary)',
              fontWeight:600,
              fontSize:'0.82rem',
              cursor:'pointer',
              transition:'all 0.25s',
              fontFamily:'Manrope, sans-serif',
              letterSpacing:'0.5px',
            }}
            data-testid="auth-tab-register"
          >
            <i className="fas fa-user-plus" style={{marginRight:'5px', fontSize:'0.75rem'}}></i>
            Inscription
          </button>
        </div>

        {error && (
          <div style={{
            padding:'0.5rem 0.9rem',
            background:'rgba(229,80,80,0.08)',
            border:'1px solid rgba(229,80,80,0.2)',
            borderRadius:'8px',
            color:'var(--danger)',
            fontSize:'0.82rem',
            marginBottom:'0.9rem',
            textAlign:'center',
          }} data-testid="auth-error">
            <i className="fas fa-exclamation-circle" style={{marginRight:'5px'}}></i>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div style={{marginBottom:'0.9rem'}}>
              <label style={labelStyle}>Nom</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Votre nom"
                required={!isLogin}
                style={inputStyle}
                onFocus={(e) => {e.target.style.borderColor='var(--input-focus-border)'; e.target.style.boxShadow='var(--input-focus-shadow)';}}
                onBlur={(e) => {e.target.style.borderColor='var(--input-border)'; e.target.style.boxShadow='none';}}
                data-testid="auth-username-input"
              />
            </div>
          )}

          <div style={{marginBottom:'0.9rem'}}>
            <label style={labelStyle}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              required
              style={inputStyle}
              onFocus={(e) => {e.target.style.borderColor='var(--input-focus-border)'; e.target.style.boxShadow='var(--input-focus-shadow)';}}
              onBlur={(e) => {e.target.style.borderColor='var(--input-border)'; e.target.style.boxShadow='none';}}
              data-testid="auth-email-input"
            />
          </div>

          <div style={{marginBottom:'1.25rem'}}>
            <label style={labelStyle}>Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 6 caractères"
              required
              minLength={6}
              style={inputStyle}
              onFocus={(e) => {e.target.style.borderColor='var(--input-focus-border)'; e.target.style.boxShadow='var(--input-focus-shadow)';}}
              onBlur={(e) => {e.target.style.borderColor='var(--input-border)'; e.target.style.boxShadow='none';}}
              data-testid="auth-password-input"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width:'100%',
              padding:'0.7rem',
              background: loading ? 'var(--accent-subtle)' : 'var(--accent-subtle)',
              border:'1px solid var(--btn-border)',
              borderRadius:'8px',
              color:'var(--text-primary)',
              fontSize:'0.85rem',
              fontWeight:700,
              textTransform:'uppercase',
              letterSpacing:'1px',
              cursor: loading ? 'wait' : 'pointer',
              transition:'all 0.25s',
              fontFamily:'Manrope, sans-serif',
            }}
            onMouseEnter={(e) => {if(!loading){e.target.style.background='var(--btn-hover-bg)'; e.target.style.boxShadow='var(--accent-glow)';}}}
            onMouseLeave={(e) => {e.target.style.background='var(--accent-subtle)'; e.target.style.boxShadow='none';}}
            data-testid="auth-submit-button"
          >
            {loading ? (
              <span><i className="fas fa-spinner fa-spin" style={{marginRight:'5px'}}></i>Chargement...</span>
            ) : isLogin ? (
              <span><i className="fas fa-sign-in-alt" style={{marginRight:'5px'}}></i>Se connecter</span>
            ) : (
              <span><i className="fas fa-user-plus" style={{marginRight:'5px'}}></i>S'inscrire</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AuthPage;
