import React from 'react';
import NewSalle from './NewSalle';
const NewRep = (props) => {
    const {name, payload} = props
    console.log(payload)
    const tabSalle = []
    payload.forEach(tdp => tabSalle.findIndex(salle => salle === tdp.salle) === -1? tabSalle.push(tdp.salle):null)
    const next= ()=>tabSalle.map((salle, key) => <NewSalle key={key} name={salle} payload={payload.filter((tdp)=>tdp.salle===salle)}/>)
    return <div className='main' style={{color:'white'}}>
                <h3 className="tdpHead rep">REPARTITEUR DE {name}</h3>
                {next()}
            </div>
}
export default NewRep