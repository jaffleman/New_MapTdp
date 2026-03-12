import React from "react"
import ShowTdp from "./ShowTdp"

const NewRco = (props) => {
    const {name, payload} = props
    const next = () => payload.map((tdp, key) => <ShowTdp key={key} tdp={tdp}/>)
    return (
        <div className='main' >
            <h4 className="tdpHead rco">Rco: {name===undefined?"?":name}</h4>
            {next()}
        </div>
    ) 
}
export default NewRco
