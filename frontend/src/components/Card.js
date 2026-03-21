
import React, {useState} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


function Card(props) {
        const [formValue,setFormValue] = useState('')
        const title = props.data.title;
        const icon = props.data.icon;
        const type = props.data.type;
        const buttonName = props.data.bName;
        const route = props.data.route;
        const textValue = props.data.textValue;
        const handleClick = (buttonName)=>{
            if(buttonName === 'Go') props.dispatch({type: 'RESET_SESSION'})
            props.history.push(route)
        }

    const Content = () => {
        switch (type) {
            case 'textarea':
                return(
                        <textarea id="msg" type="text" className='cardArea'
                            name="tdp_list" rows="6"  
                            placeholder="Coller votre liste de TDP ici..." 
                            value={formValue} onChange={e=>textareaHandleChange(e)}
                            data-testid="card-textarea">
                        </textarea>
                )
            case 'text':
                return(
                    <div style={{padding:'1rem', fontSize:'0.9rem', textAlign:'left', color:'var(--text-secondary)', lineHeight:'1.6'}}>
                      {textValue}
                    </div>
                )      
            default:
                return null
        }
    }


    const textareaHandleChange=(e)=>{
        setFormValue(e.target.value)
    }

    return (
        <div className="MyCard" data-testid="info-card">
            <div className="Bando-Titre">
                {icon && <i className={`fas ${icon}`} style={{marginRight:'8px'}}></i>}
                <p>{title}</p>
            </div>
            <Content textValue={textValue}/>
            <div className="Bando-Valider">
                <button 
                  className="btn btn-sm btn-outline-dark" 
                  type="button" 
                  onClick={()=>handleClick(buttonName)}
                  data-testid="card-action-button">
                  <i className="fas fa-arrow-right" style={{marginRight:'6px'}}></i>
                  {buttonName}
                </button>                
            </div>
        </div>
    )
}
const mapStateToProps = (state)=>{return {formValue:state.formValue,getFetch:state.getFetch}}
export default withRouter(connect(mapStateToProps)(Card));
