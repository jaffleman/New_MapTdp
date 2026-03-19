import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';

function AuthPage() {
  const { login, register } = useContext(AuthContext);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#050505',
      padding: '1rem',
    }}>
      <div style={{
        background: 'rgba(10, 10, 10, 0.7)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '16px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.37)',
        padding: '2rem',
        width: '100%',
        maxWidth: '400px',
        animation: 'fadeSlideUp 0.5s ease forwards',
      }} data-testid="auth-card">
        
        <div style={{textAlign:'center', marginBottom:'2rem'}}>
          <h1 style={{
            fontSize:'1.8rem',
            fontWeight:700,
            background:'linear-gradient(135deg, #00F0FF, #00c4cc)',
            WebkitBackgroundClip:'text',
            WebkitTextFillColor:'transparent',
            backgroundClip:'text',
            margin:0,
            letterSpacing:'2px',
          }}>
            <i className="fas fa-map-marked-alt" style={{marginRight:'8px', WebkitTextFillColor:'inherit'}}></i>
            MapTDP
          </h1>
          <p style={{color:'#A0A0A0', fontSize:'0.85rem', marginTop:'0.5rem'}}>
            {isLogin ? 'Connectez-vous pour continuer' : 'Créez votre compte'}
          </p>
        </div>

        {/* Tabs */}
        <div style={{
          display:'flex', 
          marginBottom:'1.5rem', 
          borderBottom:'1px solid rgba(255,255,255,0.1)',
        }}>
          <button
            onClick={() => {setIsLogin(true); setError('');}}
            style={{
              flex:1, 
              padding:'0.6rem',
              background:'transparent',
              border:'none',
              borderBottom: isLogin ? '2px solid #00F0FF' : '2px solid transparent',
              color: isLogin ? '#00F0FF' : '#A0A0A0',
              fontWeight:600,
              fontSize:'0.9rem',
              cursor:'pointer',
              transition:'all 0.3s',
              fontFamily:'Manrope, sans-serif',
            }}
            data-testid="auth-tab-login"
          >
            <i className="fas fa-sign-in-alt" style={{marginRight:'6px'}}></i>
            Connexion
          </button>
          <button
            onClick={() => {setIsLogin(false); setError('');}}
            style={{
              flex:1,
              padding:'0.6rem',
              background:'transparent',
              border:'none',
              borderBottom: !isLogin ? '2px solid #00F0FF' : '2px solid transparent',
              color: !isLogin ? '#00F0FF' : '#A0A0A0',
              fontWeight:600,
              fontSize:'0.9rem',
              cursor:'pointer',
              transition:'all 0.3s',
              fontFamily:'Manrope, sans-serif',
            }}
            data-testid="auth-tab-register"
          >
            <i className="fas fa-user-plus" style={{marginRight:'6px'}}></i>
            Inscription
          </button>
        </div>

        {error && (
          <div style={{
            padding:'0.6rem 1rem',
            background:'rgba(255,59,48,0.1)',
            border:'1px solid rgba(255,59,48,0.3)',
            borderRadius:'8px',
            color:'#FF3B30',
            fontSize:'0.85rem',
            marginBottom:'1rem',
            textAlign:'center',
          }} data-testid="auth-error">
            <i className="fas fa-exclamation-circle" style={{marginRight:'6px'}}></i>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div style={{marginBottom:'1rem'}}>
              <label style={{color:'#A0A0A0', fontSize:'0.8rem', fontWeight:600, marginBottom:'0.3rem', display:'block', textTransform:'uppercase', letterSpacing:'1px'}}>
                Nom
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Votre nom"
                required={!isLogin}
                style={{
                  width:'100%',
                  padding:'0.75rem 1rem',
                  background:'rgba(0,0,0,0.3)',
                  border:'1px solid rgba(255,255,255,0.1)',
                  borderRadius:'8px',
                  color:'#fff',
                  fontSize:'0.9rem',
                  fontFamily:'JetBrains Mono, monospace',
                  outline:'none',
                  transition:'border-color 0.3s, box-shadow 0.3s',
                  boxSizing:'border-box',
                }}
                onFocus={(e) => {e.target.style.borderColor='#00F0FF'; e.target.style.boxShadow='0 0 0 2px rgba(0,240,255,0.2)';}}
                onBlur={(e) => {e.target.style.borderColor='rgba(255,255,255,0.1)'; e.target.style.boxShadow='none';}}
                data-testid="auth-username-input"
              />
            </div>
          )}

          <div style={{marginBottom:'1rem'}}>
            <label style={{color:'#A0A0A0', fontSize:'0.8rem', fontWeight:600, marginBottom:'0.3rem', display:'block', textTransform:'uppercase', letterSpacing:'1px'}}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              required
              style={{
                width:'100%',
                padding:'0.75rem 1rem',
                background:'rgba(0,0,0,0.3)',
                border:'1px solid rgba(255,255,255,0.1)',
                borderRadius:'8px',
                color:'#fff',
                fontSize:'0.9rem',
                fontFamily:'JetBrains Mono, monospace',
                outline:'none',
                transition:'border-color 0.3s, box-shadow 0.3s',
                boxSizing:'border-box',
              }}
              onFocus={(e) => {e.target.style.borderColor='#00F0FF'; e.target.style.boxShadow='0 0 0 2px rgba(0,240,255,0.2)';}}
              onBlur={(e) => {e.target.style.borderColor='rgba(255,255,255,0.1)'; e.target.style.boxShadow='none';}}
              data-testid="auth-email-input"
            />
          </div>

          <div style={{marginBottom:'1.5rem'}}>
            <label style={{color:'#A0A0A0', fontSize:'0.8rem', fontWeight:600, marginBottom:'0.3rem', display:'block', textTransform:'uppercase', letterSpacing:'1px'}}>
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 6 caractères"
              required
              minLength={6}
              style={{
                width:'100%',
                padding:'0.75rem 1rem',
                background:'rgba(0,0,0,0.3)',
                border:'1px solid rgba(255,255,255,0.1)',
                borderRadius:'8px',
                color:'#fff',
                fontSize:'0.9rem',
                fontFamily:'JetBrains Mono, monospace',
                outline:'none',
                transition:'border-color 0.3s, box-shadow 0.3s',
                boxSizing:'border-box',
              }}
              onFocus={(e) => {e.target.style.borderColor='#00F0FF'; e.target.style.boxShadow='0 0 0 2px rgba(0,240,255,0.2)';}}
              onBlur={(e) => {e.target.style.borderColor='rgba(255,255,255,0.1)'; e.target.style.boxShadow='none';}}
              data-testid="auth-password-input"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width:'100%',
              padding:'0.75rem',
              background: loading ? 'rgba(0,240,255,0.05)' : 'rgba(0,240,255,0.15)',
              border:'1px solid #00F0FF',
              borderRadius:'8px',
              color:'#00F0FF',
              fontSize:'0.9rem',
              fontWeight:700,
              textTransform:'uppercase',
              letterSpacing:'1px',
              cursor: loading ? 'wait' : 'pointer',
              transition:'all 0.3s',
              fontFamily:'Manrope, sans-serif',
            }}
            onMouseEnter={(e) => {if(!loading){e.target.style.background='rgba(0,240,255,0.25)'; e.target.style.boxShadow='0 0 15px rgba(0,240,255,0.3)'; e.target.style.color='#fff';}}}
            onMouseLeave={(e) => {e.target.style.background='rgba(0,240,255,0.15)'; e.target.style.boxShadow='none'; e.target.style.color='#00F0FF';}}
            data-testid="auth-submit-button"
          >
            {loading ? (
              <span><i className="fas fa-spinner fa-spin" style={{marginRight:'6px'}}></i>Chargement...</span>
            ) : isLogin ? (
              <span><i className="fas fa-sign-in-alt" style={{marginRight:'6px'}}></i>Se connecter</span>
            ) : (
              <span><i className="fas fa-user-plus" style={{marginRight:'6px'}}></i>S'inscrire</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AuthPage;
