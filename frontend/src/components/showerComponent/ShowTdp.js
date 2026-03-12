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
            //this.setState({pressed: [tdp.tdpId]})
            this.props.dispatch({type:'SHOW_MODAL', value:tdp})
            $(()=> window.$('#laModal').modal())
        }
    }

    removeFromPressed = index =>this.setState({pressed: this.state.pressed.filter(i => i !== index)});
    //tdpCaller = (found)=>found?<FoundedTdp tdp = {this.props.tdp} />:<NotFoundedTdp tdp = {this.props.tdp} />

  
    render(){
        console.log(this.props.tdp)
        const {tdpId, regletteType, regletteNbr,  option, plot, found} = this.props.tdp

        const badgeElement= {
            badgeLabel:'',
            badgeColor:''
        }
        if (option==='I') {
            badgeElement.badgeColor = "badge-warning";
            badgeElement.badgeLabel = "Inver"
        }else{
            if (option==='TNI'){
                badgeElement.badgeColor = "badge-danger";
                badgeElement.badgeLabel = "NoIso"
            }else{
                badgeElement.badgeColor = "badge-success";
                badgeElement.badgeLabel = "Ok!"                   
            }
        }
        if (found){
            return(
                <div>
                    <LongPress
                        key={tdpId}
                        time={500}
                        onLongPress={() => this.addToPressed(this.props.tdp)}
                        onPress={() => this.removeFromPressed(tdpId)}
                        > 
                        <div className = {`tdp ${this.styler(tdpId)}`} onClick = {()=>{this._toggleView(tdpId)}}>
                        <div style={{display:'flex' }}>
                            <p style={{margin:'0'}}>{}</p>
                            <p style={{flex:10}} className = "tdp2"> {regletteType+regletteNbr}-{plot}</p>
                            <span className ={`badge badge-pill ${badgeElement.badgeColor}`}>{badgeElement.badgeLabel}</span>
                        </div>
                        <DeteilView data = {this.props.tdp}/>
                    </div> 
                    </LongPress>
                </div>
            )
        }else{
             
            return(
                <div>
                    <LongPress
                        key={tdpId}
                        time={500}
                        onLongPress={() => this.addToPressed(this.props.tdp)}
                        onPress={() => this.removeFromPressed(tdpId)}
                        > 
                        <div className ="tdp Letes3" onClick = {()=>{}}>
                            <div style={{display:'flex' }}>
                                <p style={{margin:'0'}}>{"what!"}</p>
                                <p style={{flex:10}} className = "tdp2"> {regletteType+regletteNbr}-{plot}</p>
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