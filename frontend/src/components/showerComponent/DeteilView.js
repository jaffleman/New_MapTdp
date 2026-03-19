import React from 'react';
import {connect} from 'react-redux'
import  {mPc} from '../../functions/magicPositionConverter'

class DeteilView extends React.Component{

    render(){
        let  {rep, salle, rco, ferme, level, tdpId, plot} = this.props.data;
        const mp = mPc(plot)
        if (this.props.ndToShow === tdpId) {
            return <div style={{
              marginTop:'0.5rem', 
              padding:'0.5rem 0.75rem', 
              background:'rgba(0,240,255,0.05)', 
              borderRadius:'6px',
              fontSize:'0.85rem',
              fontFamily:'var(--font-mono)',
              animation:'fadeIn 0.3s ease'
            }} data-testid={`detail-view-${tdpId}`}>
                <p style={{margin:0, color:'var(--text-secondary)'}}>
                  COORDONNEES: [<span style={{fontWeight:'bold', color:'var(--accent)'}}>{`${ferme}`}</span>-<span style={{fontWeight:'bold', color:'var(--accent)'}}>{`${level}`}</span>][<span style={{fontWeight:'bold', color:'var(--accent)'}}>{mp}</span>]
                </p>
                <p style={{margin:0, color:'var(--text-secondary)'}}>
                  [<span style={{fontWeight:'bold', color:'var(--accent)'}}>{`${rep}`}</span>] Salle:[<span style={{fontWeight:'bold', color:'var(--warning)'}}>{`${salle}`}</span>] rco:[<span style={{fontWeight:'bold', color:'var(--success)'}}>{`${rco}`}</span>]
                </p>
            </div>         
        }else return null        
    }
}
const mapStateToProps = (state)=>{return {ndToShow:state.ndToShow}}
export default connect(mapStateToProps)(DeteilView);
