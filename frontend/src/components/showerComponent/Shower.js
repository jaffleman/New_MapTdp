import React from 'react';
import NewRep from '../showerComponent/NewRep'
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import LaModal from '../ModalContent'
import loader from '../../functions/loaderManager'
import {fetcher} from '../../functions/fetcher'
import {compare} from '../../functions/compare'
import {expend} from '../../functions/expend'
import LocalStorageManager from '../../classes/LocalStorageManager';



class Shower extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            fetchedData : {},
        }
    }
    localSto = new LocalStorageManager()
    componentDidMount(){
        fetcher("search","POST", this.localSto.requestComparator(this.props.location.state.plotTab))
        .then((fetchedData)=>this.setState({ 
            fetchedData
        }))
        .then(()=>loader(false, this.props))
    }
    lister = ()=> {
        const expendTdp = expend(compare(this.props.location.state.plotTab,this.state.fetchedData.data))
        this.localSto.storageStock(expendTdp)
        const tabRep = []
        expendTdp.forEach(tdp => tabRep.findIndex(rep => rep === tdp.rep) === -1? tabRep.push(tdp.rep):null)
        return tabRep.map((rep, key )=> <NewRep key={key} name={rep} payload={expendTdp.filter((tdp)=>tdp.rep===rep)}/>)
    }
    render(){
        if ('data' in this.state.fetchedData) {
            return (
                <div data-testid="shower-container" style={{paddingTop:'70px'}}>
                    <LaModal/>
                    <div className='main'>
                        {this.lister()}
                    </div>
                </div>
            )       
        } else return <div data-testid="shower-loading" style={{paddingTop:'70px', textAlign:'center', color:'var(--text-secondary)'}}>
          <div className="spinner-border" role="status" style={{marginTop:'2rem'}}>
            <span className="sr-only">Chargement...</span>
          </div>
        </div>
    }
}
export default withRouter(connect()(Shower));
