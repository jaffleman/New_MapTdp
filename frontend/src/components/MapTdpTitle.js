import React from 'react';
import Loader from './Loader';

function MapTdpHeader(){
  return(
    <div className="fixed-top" data-testid="header-container">
      <div className='title'>
        <div style={{flex:1}}/>
        <div style={{flex:5}}>
          <h2 data-testid="app-title">
            <i className="fas fa-map-marked-alt" style={{marginRight:'8px', WebkitTextFillColor:'inherit'}}></i>
            MapTDP
          </h2>
        </div> 
        <div style={{flex:1}}>
          <Loader/>
        </div> 
      </div>
    </div>
  )
}
export default MapTdpHeader
