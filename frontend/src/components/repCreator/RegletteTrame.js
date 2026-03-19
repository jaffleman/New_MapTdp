import React from 'react'
import {connect} from 'react-redux';
import { tdpExist } from '../../functions/tdpExist';
import Button from 'react-bootstrap/Button'

class RegletteTrame extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            repName :'',
            theSession: undefined
        }
        this.headTrameRef = React.createRef()
        this.endTrameRef = React.createRef()
    }

    HeadHandleChange = (e) =>{
        if (!tdpExist(this.props.session, e.target.value, this.props.tabId)){
            const newSession = this.props.session.modifRegType(this.props.tabId, e.target.value)
            this.props.dispatch({
                type:'SET_SESSION_DATA',
                value: newSession
            })
        }
        this.headTrameRef.current.value="x"
    }
    EndHandleChange = (e) =>{
        const newSession = this.props.session.modifOption(this.props.tabId, e.target.value)
        this.props.dispatch({
            type:'SET_SESSION_DATA',
            value: newSession
        })
        this.endTrameRef.current.value="x"
    }
    deleteHandleClick(){
        const newSession = this.props.session.modifRegType(this.props.tabId, 'x')
        const newSession2 = newSession.modifRegNbr(this.props.tabId, '')
        const newSession3 = newSession2.modifOption(this.props.tabId, '')
        this.props.dispatch({
            type:'SET_SESSION_DATA',
            value: newSession3
        })
    }

    render(){

        return (
            <div className='RegletteConstructor' data-testid="reglette-trame">
                <div>
                    <h5 style={{margin:0}}>
                      <span className="badge badge-secondary" style={{fontSize:'0.7rem'}}>
                        <i className="fas fa-grip-lines" style={{marginRight:'3px'}}></i>
                        Trame
                      </span>
                    </h5>
                </div>
                
                <div>
                    <select id="headTrame" ref={this.headTrameRef} className="custom-select custom-select-sm" onChange={this.HeadHandleChange.bind(this)} data-testid="trame-type-select">
                        <option value="x" defaultValue></option>
                        <option value="L/INX">L/INX</option>
                        <option value="R/DEG">R/DEG</option>
                        <option value="T/LIF">T/LIF</option>
                        <option value="A/TEL">A/TEL</option>
                    </select>
                </div>
                <span style={{color:'var(--text-secondary)', fontFamily:'var(--font-mono)'}}>|===|</span>
                <div style={{width:'70px'}}>
                    <select id="endTrame" ref={this.endTrameRef} className="custom-select custom-select-sm" onChange={this.EndHandleChange.bind(this)} data-testid="trame-option-select">
                        <option value="x"></option>
                        <option value="null">Aucun</option>
                        <option value="I">Inversée</option>
                        <option value="TNI">Tête Non Isolable</option>
                    </select>
                </div> 
                <Button variant="danger" size="sm" onClick={this.deleteHandleClick.bind(this)} data-testid="trame-delete-btn">
                    <i className="fas fa-times"></i>
                </Button>              
            </div>
        )
    }
}
const mapStateToProps = (state)=>{return {
    session: state.session}
}
export default connect(mapStateToProps)(RegletteTrame)
