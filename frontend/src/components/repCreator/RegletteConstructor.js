import React from 'react'
import {connect} from 'react-redux';
import Button from 'react-bootstrap/Button'
import { tdpExist } from '../../functions/tdpExist';

class RegletteConstructor extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            nd: this.props.nd,
            val: this.props.val,
        }
    }
    HeadHandleChange = (e) => {
        if (!tdpExist(this.props.session, e.target.value, this.props.val.tdp.regletteNbr)) {
            const newSession = this.props.session.modifRegType([this.props.val.tdp._id], e.target.value)
            this.props.dispatch({
                type: 'SET_SESSION_DATA',
                value: newSession
            })
        }
    }
    EndHandleChange = (e) => {
        const newSession = this.props.session.modifOption([this.props.val.tdp._id], e.target.value)
        this.props.dispatch({
            type: 'SET_SESSION_DATA',
            value: newSession
        })
    }
    BodyHandleChange(e) {
        if (!tdpExist(this.props.session, this.props.val.tdp.regletteType, e.target.value)) {
            const newSession = this.props.session.modifRegNbr([this.props.val.tdp._id], e.target.value)
            this.props.dispatch({
                type: 'SET_SESSION_DATA',
                value: newSession
            })
            if (e.target.value.length === 2) this.props.nextFocus(parseInt(this.props.nd))
        }
    }
    deleteHandleClick() {
            const newSession = this.props.session.modifRegType([this.props.val.tdp._id], 'x')
            const newSession2 = newSession.modifRegNbr([this.props.val.tdp._id], '')
            const newSession3 = newSession2.modifOption([this.props.val.tdp._id], '')
            this.props.dispatch({
                type: 'SET_SESSION_DATA',
                value: newSession3
            })
    }
    render(){
        //console.log(this.props.session)
        return (
            <div className='RegletteConstructor'>
                <div>
                    <h5><span className="badge badge-secondary">Niveau {this.props.nd}</span></h5>
                </div>
                
                <div style={{marginLeft:'15px'}}>
                    <select className="custom-select custom-select-sm" value={this.props.val.tdp.regletteType}  id={`select1:${this.props.val.tdp._id}${this.props.keyOrigin}`} style={{textAlign:"right"}} onChange={this.HeadHandleChange.bind(this)}>
                        <option value="x" defaultValue>-----</option>
                        <option value="L/INX">L/INX</option>
                        <option value="R/DEG">R/DEG</option>
                        <option value="T/LIF">T/LIF</option>
                        <option value="A/TEL">A/TEL</option>
                    </select>
                </div>
                
                <input 
                    id={`input:${this.props.val.tdp._id}${this.props.keyOrigin}`}
                    ref= {this.props.laRef}
                    type="text" 
                    maxLength="2" 
                    style={{width:"46px"}} 
                    className="form-control form-control-sm"
                    value={this.props.val.tdp.regletteNbr}
                    onChange = {this.BodyHandleChange.bind(this)} 
                    onBlur={()=>{}}
                />
                
                <div style={{marginLeft:'10px', width:'70px'}}>
                    <select className="custom-select custom-select-sm" value={this.props.val.tdp.option===null?'...':this.props.val.tdp.option} id={`${this.props.val.tdp._id}option${this.props.keyOrigin}`} onChange={this.EndHandleChange.bind(this)} style={{}}>
                        <option value="null">...</option>
                        <option value="I">Inversée</option>
                        <option value="TNI">Tête Non Isolable</option>
                    </select>
                </div>  
                <Button variant="danger" style={{marginLeft:'15px'}} size="sm" onClick={this.deleteHandleClick.bind(this)}>
                    x
                </Button>            
            </div>
        )
    }
}
const mapStateToProps = (state)=>{ return {session: state.session}}

export default connect(mapStateToProps)(RegletteConstructor)