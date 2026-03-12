
import Button from 'react-bootstrap/Button'
import React from "react";
import LocalStorageManager from '../../classes/LocalStorageManager';
class LastSearch extends React.Component{
    localSto = new LocalStorageManager()
    getRep=(data)=>{
        const tab2rep = []
        data.forEach(tdp => tab2rep.findIndex(elem => elem === tdp.rep)===-1? tab2rep.push(tdp.rep):null)
        return tab2rep.map((rep)=>{
            const matchTdp = []
            data.forEach(tdp => (tdp.rep === rep)? matchTdp.push(tdp):null)
            return [rep, matchTdp.length]
        })
    }
    searchList= ()=>{return this.getRep(this.localSto.getTdps()).map((repTab, key)=>{ return <Button key={key} variant="primary" size="sm" block onClick={()=>this.handleClick(repTab[0])}>{repTab[0]+' : '+repTab[1]+'tdp'}</Button>})}
    handleClick=(rep)=>{
        const list =[];
        this.localSto.getTdps().forEach((tdp)=>{if(tdp.rep===rep)list.push(tdp)});
        this.props.callback(list);
    }
    render(){
        return(
            <> 
                <this.searchList/>
            </>
        )
    }
}
export default LastSearch;