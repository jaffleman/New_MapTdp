import React, { createRef } from 'react';
import RegletteConst from './RegletteConstructor';
import RegletteTrame from './RegletteTrame';

class DisplayLevel extends React.Component {
        constructor(props) {
            super(props)
            this.refL1 = createRef()
            this.refL2 = createRef()
            this.refL3 = createRef()
            this.refL4 = createRef()
            this.refL5 = createRef()
            this.refL6 = createRef()
            this.refL7 = createRef()
            this.refL8 = createRef()
            this.refTab = [this.refL1, this.refL2, this.refL3, this.refL4, this.refL5, this.refL6, this.refL7, this.refL8]
        }
        nextFocus = (nd) => {
            if (nd === 8) this.props.validRef.current.focus()
            else this.refTab[nd].current.focus()
        }
        reglette(data) {
                return data.map(elem => < RegletteConst tdpRegNbrChange = {
                        this.props.tdpRegNbrChange
                    }
                    nd = {elem.number}
                    key = {elem.number}
                    keyOrigin = {`level${elem.number}`}
                    val = {elem}
                    laRef = {this.refTab[elem.number - 1]}
                    nextFocus = {this.nextFocus}
                />)
            }
    render(){
        const tabId = this.props.data.map(elem=>elem.tdp._id)
        return <div >
            <RegletteTrame tabId = {tabId}/>
            {this.reglette(this.props.data)}
        </div>
    }
}
export default DisplayLevel