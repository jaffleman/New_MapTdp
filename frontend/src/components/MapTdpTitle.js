import React, { useContext } from 'react';
import Loader from './Loader';
import { AuthContext } from './AuthContext';

function MapTdpHeader(){
  const { user, logout } = useContext(AuthContext);
  
  return(
    <div className="fixed-top" data-testid="header-container">
      <div className='title'>
        <div style={{flex:1, display:'flex', alignItems:'center', paddingLeft:'1rem'}}>
          {user && (
            <span style={{
              fontSize:'0.75rem', 
              color:'var(--text-secondary)',
              fontFamily:'var(--font-mono)',
              whiteSpace:'nowrap',
              overflow:'hidden',
              textOverflow:'ellipsis',
              maxWidth:'120px',
            }} data-testid="user-display-name">
              <i className="fas fa-user-circle" style={{marginRight:'4px', color:'var(--accent)'}}></i>
              {user.username}
            </span>
          )}
        </div>
        <div style={{flex:3, textAlign:'center'}}>
          <h2 data-testid="app-title">
            <i className="fas fa-map-marked-alt" style={{marginRight:'8px', WebkitTextFillColor:'inherit'}}></i>
            MapTDP
          </h2>
        </div> 
        <div style={{flex:1, display:'flex', alignItems:'center', justifyContent:'flex-end', paddingRight:'1rem', gap:'0.75rem'}}>
          <Loader/>
          {user && (
            <button 
              onClick={logout}
              style={{
                background:'transparent',
                border:'1px solid rgba(255,59,48,0.3)',
                color:'#FF3B30',
                borderRadius:'6px',
                padding:'0.25rem 0.6rem',
                fontSize:'0.75rem',
                cursor:'pointer',
                transition:'all 0.3s',
                fontFamily:'Manrope, sans-serif',
                fontWeight:600,
                whiteSpace:'nowrap',
              }}
              onMouseEnter={(e) => {e.target.style.background='rgba(255,59,48,0.15)'; e.target.style.boxShadow='0 0 10px rgba(255,59,48,0.3)';}}
              onMouseLeave={(e) => {e.target.style.background='transparent'; e.target.style.boxShadow='none';}}
              data-testid="logout-button"
            >
              <i className="fas fa-sign-out-alt"></i>
            </button>
          )}
        </div> 
      </div>
    </div>
  )
}
export default MapTdpHeader
