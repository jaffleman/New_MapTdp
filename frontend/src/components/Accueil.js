import React, {useRef, useState} from 'react';
import Switch from "react-switch";
import {connect} from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Card from './Card';
import LastSearch from './showerComponent/LastSearch'

import getClipboardContent from '../functions/getClipboard'
import loader from '../functions/loaderManager'
import extraireLesDonnees from '../functions/extraireLesDonnees'
import LocalStorageManager from '../classes/LocalStorageManager'


const Accueil = (props) => {
  const localSto = new LocalStorageManager()
  const url = !(localSto.getIsActive() && 'credentials' in navigator)
  const textAreaRef = useRef()
  const history = useHistory()
  const [formValue,setFormValue] = useState('')
  const [checked, setChecked] = useState(localSto.getAutoPast())

  const textareaHandleChange=(e)=> setFormValue(e.target.value)

  const clearTdpList = ()=>{
    localSto.clearTdpList()
    history.go(0)
  }

  const handleSwitchChange = (e)=>{
    setChecked(e)  
    localSto.setAutoPast(e)
    if (!e) setFormValue('')
  }

  const handle_click = ()=>{
    if (checked) getClipboardContent((clipContent)=>{
        if (clipContent.length>0){ 
          textAreaRef.current.value=clipContent
          setFormValue(clipContent)
        }
    })
  }

  const textareaHandleClick = () =>{
    const extractData = extraireLesDonnees(formValue)
    if (extractData.length > 0){
      loader(true, props)
      history.push('/Shower', {'plotTab':extractData}) 
    }else{
      alert('Aucun TDP dans la demande...')
      loader(false, props)
    }
  }

  return (
    <Container data-testid="accueil-container">
      <div className='main'>
        <div className='row'>
          <div className='col-lg' style={{marginTop:'20px'}}>
            <div className="MyCard" data-testid="search-card">
              <div className="Bando-Titre">
                <i className="fas fa-search" style={{marginRight:'8px'}}></i>
                <p>TDP Search</p>
              </div>
              <form>
                <textarea 
                  ref={textAreaRef}
                  id="msg" 
                  type="text" 
                  className='cardArea'
                  name="tdp_list" rows="6"  
                  placeholder="Coller votre liste de TDP ici ou taper la position recherchée: ex: cho94 linx19127..." 
                  value={formValue} onClick={()=>handle_click()} onChange={e=>textareaHandleChange(e)}
                  data-testid="search-textarea">
                </textarea>
              </form>
              <div className="Bando-Valider">
                <Container>
                  <Row className="align-items-center">
                    <Col xs="auto">
                      <Switch 
                        onChange={e=>handleSwitchChange(e)} 
                        checked={checked} 
                        disabled={url}
                        onColor="#00F0FF"
                        offColor="#333"
                        handleDiameter={20}
                        height={24}
                        width={48}
                        data-testid="auto-paste-switch"
                      />
                    </Col>
                    <Col>
                      <button 
                        className="btn btn-sm btn-outline-dark" 
                        type="button" 
                        onClick={()=>textareaHandleClick()}
                        data-testid="search-submit-button">
                        <i className="fas fa-bolt" style={{marginRight:'6px'}}></i>
                        Lancer la recherche
                      </button>
                    </Col>
                  </Row>
                </Container>                            
              </div>
            </div>
          </div>

          <div className='col-lg' style={{marginTop:'20px'}}>
            <div className="MyCard" data-testid="last-search-card">
              <div className="Bando-Titre">
                <i className="fas fa-history" style={{marginRight:'8px'}}></i>
                <p>Dernières recherches</p>
              </div>
              <div style={{padding:'0.75rem'}}>
                <LastSearch callback={(extractData)=>{history.push('/Shower',{'plotTab':extractData})}}/> 
              </div>
              <div className="Bando-Valider">
                <button 
                  className="btn btn-sm btn-outline-dark" 
                  type="button" 
                  onClick={()=>clearTdpList()}
                  data-testid="clear-history-button">
                  <i className="fas fa-trash-alt" style={{marginRight:'6px'}}></i>
                  Effacer l'historique
                </button>                
              </div>
            </div>
          </div>

          <div className='col-lg' style={{marginTop:'20px'}}>
            <Card data={{
              title:'Création de répartiteur',
              icon:'fa-plus-circle',
              type:'text',
              textValue:'Le mode "création de rep" te permets d\'intégrer ton répartiteur. Une fois créé, il sera accessible par tout les utilisateurs de MapTDP. Il est important de prendre le temps d\'intégrer les répartiteurs afin de peupler la base de MapTDP et ainsi faciliter la recherche des futurs TDP.',
              bName:'Go',
              route:'/Displayer'}}/> 
          </div>
        </div>
      </div>
    </Container>
  )
}   
const mapStateToProps = (state)=>{return {mustLoad:state.mustLoad}}
export default connect(mapStateToProps)(Accueil);
