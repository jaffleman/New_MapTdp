
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
    searchList= ()=>{
        const items = this.getRep(this.localSto.getTdps());
        if (items.length === 0) {
            return <div style={{padding:'0.9rem', textAlign:'center', color:'var(--text-secondary)', fontSize:'0.82rem'}}>
                <i className="fas fa-inbox" style={{fontSize:'1.3rem', marginBottom:'0.4rem', display:'block', opacity:0.4}}></i>
                Aucune recherche récente
            </div>
        }
        return items.map((repTab, key)=> {
            return <Button 
                key={key} 
                variant="primary" 
                size="sm" 
                block 
                onClick={()=>this.handleClick(repTab[0])}
                data-testid={`last-search-item-${key}`}
                style={{textAlign:'left'}}>
                <i className="fas fa-chevron-right" style={{marginRight:'8px', fontSize:'0.7rem', opacity:0.6}}></i>
                {repTab[0]+' : '+repTab[1]+' tdp'}
            </Button>
        })
    }
    handleClick=(rep)=>{
        const list =[];
        this.localSto.getTdps().forEach((tdp)=>{if(tdp.rep===rep)list.push(tdp)});
        this.props.callback(list);
    }
    render(){
        return(
            <div data-testid="last-search-list"> 
                <this.searchList/>
            </div>
        )
    }
}
export default LastSearch;
