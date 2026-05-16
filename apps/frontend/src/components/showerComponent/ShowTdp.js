import React from 'react';
import {connect} from 'react-redux'
import LongPress from './LongPress'
import $ from "jquery";
import DeteilView from './DeteilView'

class ShowTdp extends React.Component{
    state = {
        pressed: []
      };

    _toggleView(elem) {  
        const action = { type: "TOGGLE_FAVORITE", value: elem }
        this.props.dispatch(action)
    }
    styler(nd){
        if (this.props.ndToShow === nd) return "Letes2"        
        else{
            if (this.props.alreadyShow.indexOf(nd) === -1){
                return "Letes"
            }else{
                return "Letes3"
            }
        }
    }
    
    addToPressed = (tdp) =>{
        if (tdp.tdpId === this.props.ndToShow||!tdp.found){
            this.props.dispatch({type:'SHOW_MODAL', value:tdp})
            $(()=> window.$('#laModal').modal())
        }
    }

    removeFromPressed = index =>this.setState({pressed: this.state.pressed.filter(i => i !== index)});

  
    render(){
        console.log(this.props.tdp)
        const {tdpId, regletteType, regletteNbr, option, plot, found} = this.props.tdp

        const badgeElement= {
            badgeLabel:'',
            badgeColor:'',
            badgeIcon:''
        }
        if (option==='I') {
            badgeElement.badgeColor = "badge-warning";
            badgeElement.badgeLabel = "Inver"
            badgeElement.badgeIcon = "fa-exclamation-triangle"
        }else{
            if (option==='TNI'){
                badgeElement.badgeColor = "badge-danger";
                badgeElement.badgeLabel = "NoIso"
                badgeElement.badgeIcon = "fa-times-circle"
            }else{
                badgeElement.badgeColor = "badge-success";
                badgeElement.badgeLabel = "Ok!"
                badgeElement.badgeIcon = "fa-check-circle"
            }
        }
        if (found){
            return(
                <div data-testid={`tdp-item-${tdpId}`}>
                    <LongPress
                        key={tdpId}
                        time={500}
                        onLongPress={() => this.addToPressed(this.props.tdp)}
                        onPress={() => this.removeFromPressed(tdpId)}
                        > 
                        <div className={`tdp ${this.styler(tdpId)}`} onClick={()=>{this._toggleView(tdpId)}}>
                        <div style={{display:'flex', alignItems:'center'}}>
                            <p style={{flex:10, margin:0}} className="tdp2">{regletteType+regletteNbr}-{plot}</p>
                            <span className={`badge badge-pill ${badgeElement.badgeColor}`}>
                              <i className={`fas ${badgeElement.badgeIcon}`} style={{marginRight:'3px', fontSize:'0.6rem'}}></i>
                              {badgeElement.badgeLabel}
                            </span>
                        </div>
                        <DeteilView data={this.props.tdp}/>
                    </div> 
                    </LongPress>
                </div>
            )
        }else{
            return(
                <div data-testid={`tdp-item-notfound-${tdpId}`}>
                    <LongPress
                        key={tdpId}
                        time={500}
                        onLongPress={() => this.addToPressed(this.props.tdp)}
                        onPress={() => this.removeFromPressed(tdpId)}
                        > 
                        <div className="tdp Letes3" onClick={()=>{}}>
                            <div style={{display:'flex', alignItems:'center'}}>
                                <i className="fas fa-question-circle" style={{color:'var(--text-secondary)', marginRight:'8px'}}></i>
                                <p style={{flex:10, margin:0}} className="tdp2">{regletteType+regletteNbr}-{plot}</p>
                            </div>
                        </div>
                    </LongPress>
                </div>
            )
        }
    }
}


const mapStateToProps = (state)=>{return {
    ndToShow:state.ndToShow, 
    alreadyShow:state.alreadyShow,
}}
export default connect(mapStateToProps)(ShowTdp);
