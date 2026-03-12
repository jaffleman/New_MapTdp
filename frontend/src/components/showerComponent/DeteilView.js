import React from 'react';
import {connect} from 'react-redux'
import  {mPc} from '../../functions/magicPositionConverter'

class DeteilView extends React.Component{

    render(){
        let  {rep, salle, rco, ferme, level, tdpId, plot} = this.props.data;
        const mp = mPc(plot)
        if (this.props.ndToShow === tdpId) {
            return <div>
                <p style={{margin:0}}>{"COORDONNEES: ["}<span style={{fontWeight: 'bold'}}>{`${ferme}`}</span>{"-"}<span style={{fontWeight: 'bold'}}>{`${level}`}</span>{"]["}<span style={{fontWeight: 'bold'}}>{mp}</span>{"]"}</p>
                <p style={{margin:0}}>{"["}<span style={{fontWeight: 'bold'}}>{`${rep}`}</span>{"]  Salle:["}<span style={{fontWeight: 'bold'}}>{`${salle}`}</span>{"]  rco:["}<span style={{fontWeight: 'bold'}}>{`${rco}`}</span>{"]"}</p>
            </div>         
        }else return null        
    }


}
const mapStateToProps = (state)=>{return {ndToShow:state.ndToShow}}
export default connect(mapStateToProps)(DeteilView);