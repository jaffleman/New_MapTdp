import React, {useState} from 'react'
import {connect} from 'react-redux'
import { fetcher } from '../functions/fetcher';
import $ from "jquery";
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
function Modal(props){
    const {
        rep,
        cd,
        regletteNbr,
        regletteType
    } = props.modalData,
    [salle, setSalle] = useState(''),
    [rco, setRco] = useState(''),
    [ferme, setFerme] = useState(''),
    [level, setLevel] = useState(''),
    [opt, setOpt] = useState(''),
    salleChange = e => setSalle(e.target.value),
    rcoChange = e => setRco(e.target.value),
    colonneChange = e => setFerme(e.target.value),
    positionChange = e => setLevel(e),
    OptionChange = e => setOpt(e),
    closeModal = () => $(() => window.$('#laModal').modal('hide'));

    function option(params) {
        if (params === ''| null) return ''
        if (params === "I") return "Inversé"
        if (params === "TNI") return "Tete Non Isolable"
    }
    function valideModal() {
        if (salle===''|| rco ==='' || ferme==='' || level==='') return alert('Vous devez renseigner tous les champs.')
        const tdp = [{
            rep,
            salle,
            rco,
            ferme,
            level,
            option: opt,
            cd,
            regletteType,
            regletteNbr,
            tdpId: rep.concat(regletteType, regletteNbr)
        }],
        callback = ({data}) => {
            if (data.length === 0) fetcher("create", "POST", tdp, ()=>{
                $(() => window.$('#laModal').modal('hide'))
                alert('Position enregistrée avec succes! Merci de votre contribution.')
            })
            else {
                const confirmation = window.confirm('Cette position est déjà occupée par ' + data[0].regletteType + data[0].regletteNbr + '\n Voulez-vous la remplacer?')
                if (confirmation) {
                    const tdpUpdate = [{ ...tdp[0], _id:data[0]._id}]
                    fetcher("update", "PUT", tdpUpdate, ()=>{
                        $(() => window.$('#laModal').modal('hide'))
                        alert('Position enregistrée avec succes! Merci de votre contribution.')
                    })
                }
            }
        };

        fetcher("search", "POST", tdp, (retour) => {
            if (retour.data.length > 0) {
                $(() => window.$('#laModal').modal('hide'))
                return alert('Cette position existe déjà dans ce répartiteur.')
            }
            fetcher("searchBp", "POST", tdp, callback)
        })
    }
    const completRegletteName = ''+regletteType+regletteNbr
    return (
        <div className="modal fade" id="laModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-testid="tdp-modal">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                          <i className="fas fa-edit" style={{marginRight:'8px'}}></i>
                          Créer ou Modifier
                        </h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" data-testid="modal-close-btn">
                            <span aria-hidden="true" style={{color:'var(--text-secondary)'}}>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p style={{color:'var(--text-secondary)', fontSize:'0.85rem', marginBottom:'1rem'}}>
                          <i className="fas fa-info-circle" style={{marginRight:'6px', color:'var(--accent)'}}></i>
                          Renseignez les infos manquantes pour cette réglette:
                        </p>
                        <Form>
                            <InputGroup size="sm" className="mb-3">
                                <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroup-sizing-sm">REPARTITEUR</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" readOnly value={rep} data-testid="modal-rep-input"/>
                            </InputGroup>
                            <InputGroup size="sm" className="mb-3">
                                <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroup-sizing-sm">REGLETTE</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" readOnly value={completRegletteName} data-testid="modal-reglette-input"/>
                            </InputGroup>
                            <InputGroup size="sm" className="mb-3">
                                <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroup-sizing-sm">SALLE</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" type='number' value={salle} onChange={(e)=>{salleChange(e)}} data-testid="modal-salle-input"/>
                            </InputGroup>
                            <InputGroup size="sm" className="mb-3">
                                <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroup-sizing-sm">RCO</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" type='number' value={rco} onChange={(e)=>{rcoChange(e)}} data-testid="modal-rco-input"/>
                            </InputGroup>
                            <InputGroup size="sm" className="mb-3">
                                <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroup-sizing-sm">FERME</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" type='number' value={ferme} onChange={(e)=>{colonneChange(e)}} data-testid="modal-ferme-input"/>
                            </InputGroup>
                            <InputGroup className="sm-3 mb-3">
                                <DropdownButton
                                as={InputGroup.Prepend}
                                variant="outline-secondary"
                                title="Niveau"
                                id="input-group-dropdown-1"
                                data-testid="modal-level-dropdown"
                                >
                                    <Dropdown.Item value="1" onSelect={()=>{positionChange(1)}}>1</Dropdown.Item>
                                    <Dropdown.Item value="2" onClick={()=>{positionChange(2)}}>2</Dropdown.Item>
                                    <Dropdown.Item value="3" onClick={()=>{positionChange(3)}}>3</Dropdown.Item>
                                    <Dropdown.Item value="4" onClick={()=>{positionChange(4)}}>4</Dropdown.Item>
                                    <Dropdown.Item value="5" onClick={()=>{positionChange(5)}}>5</Dropdown.Item>
                                    <Dropdown.Item value="6" onClick={()=>{positionChange(6)}}>6</Dropdown.Item>
                                    <Dropdown.Item value="7" onClick={()=>{positionChange(7)}}>7</Dropdown.Item>
                                    <Dropdown.Item value="8" onClick={()=>{positionChange(8)}}>8</Dropdown.Item>
                                </DropdownButton>
                                <FormControl aria-describedby="basic-addon1" readOnly value={level} data-testid="modal-level-input"/>
                            </InputGroup>
                            <InputGroup className="sm-3">
                                <DropdownButton
                                as={InputGroup.Prepend}
                                variant="outline-secondary"
                                title="Option"
                                id="input-group-dropdown-2"
                                data-testid="modal-option-dropdown"
                                >
                                    <Dropdown.Item value="" onSelect={()=>{OptionChange("")}}>...</Dropdown.Item>
                                    <Dropdown.Item value="I" onClick={()=>{OptionChange("I")}}>Inversée</Dropdown.Item>
                                    <Dropdown.Item value="TNI" onClick={()=>{OptionChange("TNI")}}>Non isolable</Dropdown.Item>
                                </DropdownButton>
                                <FormControl aria-describedby="basic-addon1" readOnly value={option(opt)} data-testid="modal-option-input"/>
                            </InputGroup>
                        </Form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={()=>closeModal()} data-testid="modal-cancel-btn">
                          <i className="fas fa-times" style={{marginRight:'4px'}}></i>
                          Annuler
                        </button>
                        <button type="button" className="btn btn-primary" onClick={()=>valideModal()} data-testid="modal-save-btn">
                          <i className="fas fa-save" style={{marginRight:'4px'}}></i>
                          Sauvegarder
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = (state)=>{return {modalData:state.modalData}}
export default connect(mapStateToProps)(Modal);
