import React from "react"
import NewRco from './NewRco'
const NewSalle = (props) => {
    const {name, payload} = props
    const tabRco = []
    payload.forEach(tdp => tabRco.findIndex(rco => rco === tdp.rco) === -1? tabRco.push(tdp.rco):null)
    const next = () => tabRco.map((rco, key) => <NewRco key={key} name={rco} payload={payload.filter((tdp)=>tdp.rco===rco)}/>)
    return <div className='main' style={{color:'yellow'}}>
            <h4 className="tdpHead salle">Salle: {name===undefined?"?":name}</h4>
            <div className='main salleContent'>
                {next()}
            </div>
        </div>
}
export default NewSalle