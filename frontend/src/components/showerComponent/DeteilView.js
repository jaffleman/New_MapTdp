import React from 'react';
import {connect} from 'react-redux'
import  {mPc} from '../../functions/magicPositionConverter'

class DeteilView extends React.Component{

    render(){
        let  {rep, salle, rco, ferme, level, tdpId, plot} = this.props.data;
        const mp = mPc(plot)
        if (this.props.ndToShow === tdpId) {
            return <div style={{
              marginTop:'0.4rem', 
              padding:'0.45rem 0.7rem', 
              background:'var(--accent-subtle)', 
              borderRadius:'6px',
              fontSize:'0.82rem',
              fontFamily:'var(--font-mono)',
              animation:'fadeIn 0.3s ease'
            }} data-testid={`detail-view-${tdpId}`}>
                <p style={{margin:0, color:'var(--text-secondary)'}}>
                  COORD: [<span style={{fontWeight:'bold', color:'var(--text-primary)'}}>{`${ferme}`}</span>-<span style={{fontWeight:'bold', color:'var(--text-primary)'}}>{`${level}`}</span>][<span style={{fontWeight:'bold', color:'var(--text-primary)'}}>{mp}</span>]
                </p>
                <p style={{margin:0, color:'var(--text-secondary)'}}>
                  [<span style={{fontWeight:'bold', color:'var(--text-primary)'}}>{`${rep}`}</span>] Salle:[<span style={{fontWeight:'bold', color:'var(--warning)'}}>{`${salle}`}</span>] rco:[<span style={{fontWeight:'bold', color:'var(--success)'}}>{`${rco}`}</span>]
                </p>
            </div>         
        }else return null        
    }
}
const mapStateToProps = (state)=>{return {ndToShow:state.ndToShow}}
export default connect(mapStateToProps)(DeteilView);
