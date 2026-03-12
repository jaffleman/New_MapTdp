import React from 'react'
import {connect} from 'react-redux';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

class AddElement extends React.Component{
    addSalle(){
        const newSession = this.props.session.addSalle()
        this.props.dispatch({
            type:'SET_SESSION_DATA',
            value: newSession
        })
    }

    addRco(){
        const newSession = this.props.session.addRco()
        this.props.dispatch({
            type:'SET_SESSION_DATA',
            value: newSession
        })
    }
    addFerme(){
        const newSession = this.props.session.addFerme()
        this.props.dispatch({
            type:'SET_SESSION_DATA',
            value: newSession
        })
    }
    render(){
        return <>
            <DropdownButton variant='success' id="dropdown-basic-button" title="Que voulez-vous ajouter ?">
                <Dropdown.Item onClick={()=>this.addSalle()}>Salle</Dropdown.Item>
                <Dropdown.Item onClick={()=>this.addRco()}>RCO</Dropdown.Item>
                <Dropdown.Item onClick={()=>this.addFerme()}>Ferme</Dropdown.Item>
            </DropdownButton>
        </>
    }
}
const mapStateToProps = (state)=>{return {
    session: state.session
}}
export default connect(mapStateToProps)(AddElement)