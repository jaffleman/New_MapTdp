import React from "react"
import NewRco from './NewRco'
const NewSalle = (props) => {
    const {name, payload} = props
    const tabRco = []
    payload.forEach(tdp => tabRco.findIndex(rco => rco === tdp.rco) === -1? tabRco.push(tdp.rco):null)
    const next = () => tabRco.map((rco, key) => <NewRco key={key} name={rco} payload={payload.filter((tdp)=>tdp.rco===rco)}/>)
    return <div className='main' data-testid={`salle-section-${name}`}>
            <h4 className="tdpHead salle">
              <i className="fas fa-door-open" style={{marginRight:'6px'}}></i>
              Salle: {name===undefined?"?":name}
            </h4>
            <div className='salleContent'>
                {next()}
            </div>
        </div>
}
export default NewSalle
