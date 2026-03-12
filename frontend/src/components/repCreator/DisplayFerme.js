import React from 'react';
import {connect} from 'react-redux';
import Switcher from './Switcher';
import { withRouter } from 'react-router-dom';
import DisplayLevel from './DisplayLevel';

class DisplayFerme extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            increment : 0,
            repName:'',
            repartiteur:'',
            salle:0,
            rco:0,
            ferme:0,
            structure:[[[[['x'],['x'],['x'],['x'],['x'],['x'],['x'],['x']]]]],
            load:false,
            loadRepResult:''
        }
    }

    fermeUp = () => {
        let inc = this.state.increment
        if (this.props.data.ferme[inc].number <this.props.data.ferme[this.props.data.ferme.length-1].number) {
            this.setState({
                increment : inc+1
            })
        }else{
            const newSession = this.props.session.addFerme( this.props.salleNumb, this.props.rcoNumb, this.props.data.ferme[inc].number+1)
            this.props.dispatch({
                type:'SET_SESSION_DATA',
                value: newSession
            })
            this.setState({increment : inc+1})
        }
    }
    fermeBack = () => {
        let inc = this.state.increment
        if (this.props.data.ferme[inc].number > this.props.data.ferme[0].number) {
            this.setState({
                increment : inc-1
            })
       }
    }
    directFerme = (index)=>{
        this.setState({
            increment : index
        })
    }

    render(){
        
        const fermes = this.props.data.ferme
        const inc = this.state.increment
        const id = "salle"+this.props.salleNumb+"rco"+this.props.rcoNumb
         
        return (
            
            <>
                <div>
                    <Switcher 
                        number={fermes[inc].number} 
                        id={id}
                        fermes={fermes}
                        next={this.fermeUp} 
                        back={this.fermeBack} 
                        handleClick={this.directFerme}
                    />
                </div>
                <div>
                    <DisplayLevel key={fermes[inc].level} data={fermes[inc].level} validRef={this.props.validRef}/>
                </div>                
            </>
        )
    }
}
const mapStateToProps = (state)=>{return {
    session: state.session
}}
export default withRouter(connect(mapStateToProps)(DisplayFerme))