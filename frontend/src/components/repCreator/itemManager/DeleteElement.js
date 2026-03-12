import React from 'react'
import {connect} from 'react-redux';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

class DeleteElement extends React.Component{
    deleteSalle(){
        const newSession = this.props.session.deleteSalle()
        if (newSession){
        this.props.dispatch({
            type:'SET_SESSION_DATA',
            value: newSession
        })}
    }

    deleteRco(){
        const newSession = this.props.session.deleteRco()
        this.props.dispatch({
            type:'SET_SESSION_DATA',
            value: newSession
        })
    }
    deleteFerme(){
        const newSession = this.props.session.deleteFerme()
        this.props.dispatch({
            type:'SET_SESSION_DATA',
            value: newSession
        })
    }
    render(){
        return <>
            <DropdownButton variant='danger' id="dropdown-basic-button" title="Que voulez-vous supprimer?">
                <Dropdown.Item onClick={()=>this.deleteSalle()}>Salle</Dropdown.Item>
                <Dropdown.Item onClick={()=>this.deleteRco()}>RCO</Dropdown.Item>
                <Dropdown.Item onClick={()=>this.deleteFerme()}>Ferme</Dropdown.Item>
            </DropdownButton>
        </>
    }
}
const mapStateToProps = (state)=>{return {
    session: state.session
}}
export default connect(mapStateToProps)(DeleteElement)