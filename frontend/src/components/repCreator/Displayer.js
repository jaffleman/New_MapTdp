import React from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import DisplaySalle from './DisplaySalle';

import ExtraSession from '../../classes/newExtraSession'

import VerifRepName from '../../functions/VerifRepName';
import tabSorter from '../../functions/valider'
import {fetcher} from '../../functions/fetcher'
import loader from '../../functions/loaderManager';


class Displayer extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            repName: '',
            theSession: undefined
        }
        this.buttonOK = React.createRef()
        this.validButton = React.createRef()
    }

    handleRepChange = e => this.setState({repName: e.target.value.toLowerCase()})

    handle_valideClick = () => {
        if (this.props.mySession.brutdata.length === 0) return alert("Aucun rep a valider !")
        let {
            tCreatedElem,
            tEditedElem,
            tDeletedElem
        } = tabSorter(this.props.myBrutData, this.props.mySession.brutdata)
        if (tCreatedElem.length === 0 && tEditedElem.length === 0 && tDeletedElem.length === 0) return alert("Tu n'as apporter aucune modif à ce rep...")
        if (window.confirm("Tu es sur le point de modifier definitivement la base de donnée. Es-tu sur de vouloir continuer?")) {
            loader(true, this.props)
            tCreatedElem.forEach(elem => Reflect.deleteProperty(elem, '_id'))
            const newHandleClick = this.handleClick
            fetcher("create", "POST", tCreatedElem, function () {
                fetcher("update", "PUT", tEditedElem, function () {
                    fetcher("delete", "DELETE", tDeletedElem, function () {
                        alert("sauvegardé avec succes")
                        newHandleClick()
                    })
                })
            })
        }
    }
    handleClick = () => {
        if(this.state.repName.length===0) return 
        loader(true, this.props)
        const callback = (result, repName) => {
            if ('err' in result) {
                loader(false, this.props)
                alert('une erreur c\'est produite...')
            }
            if (result.data) {
                const mySession = new ExtraSession(result.data, repName)
                if (mySession.rep.length === 0) {
                    if (window.confirm("Le rep n'existe pas, voulez-vous le créer?")) {
                        this.props.dispatch({
                            type: 'SET_SESSION_DATA',
                            value: mySession.creatNewRep(repName)
                        })
                    }
                } else {
                    this.props.dispatch({
                        type: 'SET_BASE_DATA',
                        value: [...mySession.brutdata]
                    })
                    this.props.dispatch({
                        type: 'SET_SESSION_DATA',
                        value: mySession
                    })
                }
                loader(false, this.props)
            }
        }
        this.props.dispatch({
            type: "RESET_SESSION"
        })
        VerifRepName(this.state.repName, callback)
    }

    SalleDisplayer = ({data, vButton,vRef}) =>{
        return data.rep?< DisplaySalle data={data.rep[0]} vButton={vButton} vRef={vRef}/>: null
    }

    handleKeyPress = e => {
        if (e.key === 'Enter') {
            this.handleClick()
            this.buttonOK.current.focus()
        }
    }

    render(){
        return (
            <div>
                <Container>
                    <div className="input-group mb-3 bandoRepSearch">
                        <input 
                            type="text" 
                            className="form-control" 
                            onChange={this.handleRepChange} 
                            onKeyPress={e=>this.handleKeyPress(e)} 
                            placeholder="Rep à créer/modifier ex:cho94" 
                            aria-label="ex:cho94" 
                            aria-describedby="button-addon2"
                        />
                        <div className="input-group-append">
                            <button 
                                className="btn btn-primary" 
                                ref={this.buttonOK}
                                type="button" id="button-addon2"
                                onClick={this.handleClick}>OK
                            </button>
                        </div>
                    </div>
                    <this.SalleDisplayer data={this.props.mySession} vButton={this.handle_valideClick} vRef={this.validButton}/>
                </Container>
            </div>
        )
    }
}
const mapStateToProps = (state)=>{return {
    loaderSatus: state.mustLoad,
    mySession: state.session,
    myBrutData: state.baseBrutData
}}
export default withRouter(connect(mapStateToProps)(Displayer))