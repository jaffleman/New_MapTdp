import React, { useContext } from 'react';
import Loader from './Loader';
import { AuthContext } from './AuthContext';
import { ThemeContext } from './ThemeContext';

function MapTdpHeader(){
  const { user, logout } = useContext(AuthContext);
  const { isDark, toggle } = useContext(ThemeContext);
  
  return(
    <div className="fixed-top" data-testid="header-container">
      <div className='title'>
        <div style={{flex:1, display:'flex', alignItems:'center', paddingLeft:'0.75rem', gap:'0.5rem'}}>
          {user && (
            <span style={{
              fontSize:'0.72rem', 
              color:'var(--text-secondary)',
              fontFamily:'var(--font-mono)',
              whiteSpace:'nowrap',
              overflow:'hidden',
              textOverflow:'ellipsis',
              maxWidth:'110px',
            }} data-testid="user-display-name">
              <i className="fas fa-user-circle" style={{marginRight:'4px'}}></i>
              {user.username}
            </span>
          )}
        </div>
        <div style={{flex:3, textAlign:'center'}}>
          <h2 data-testid="app-title">MapTDP</h2>
        </div> 
        <div style={{flex:1, display:'flex', alignItems:'center', justifyContent:'flex-end', paddingRight:'0.75rem', gap:'0.5rem'}}>
          <Loader/>
          <button 
            onClick={toggle}
            className="theme-toggle"
            data-testid="theme-toggle-button"
            title={isDark ? 'Mode jour' : 'Mode nuit'}
          >
            <i className={isDark ? 'fas fa-sun' : 'fas fa-moon'}></i>
          </button>
          {user && (
            <button 
              onClick={logout}
              className="theme-toggle"
              style={{
                border:'1px solid rgba(229,80,80,0.2)',
                color:'var(--danger)',
              }}
              data-testid="logout-button"
              title="Déconnexion"
            >
              <i className="fas fa-sign-out-alt" style={{fontSize:'0.75rem'}}></i>
            </button>
          )}
        </div> 
      </div>
    </div>
  )
}
export default MapTdpHeader
