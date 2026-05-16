import React from "react"
import ShowTdp from "./ShowTdp"

const NewRco = (props) => {
    const {name, payload} = props
    const next = () => payload.map((tdp, key) => <ShowTdp key={key} tdp={tdp}/>)
    return (
        <div className='main' data-testid={`rco-section-${name}`}>
            <h4 className="tdpHead rco">
              <i className="fas fa-plug" style={{marginRight:'6px'}}></i>
              Rco: {name===undefined?"?":name}
            </h4>
            {next()}
        </div>
    ) 
}
export default NewRco
