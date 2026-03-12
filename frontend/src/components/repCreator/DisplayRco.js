import React from 'react'
import Tab from 'react-bootstrap/Tab';
import {Nav} from 'react-bootstrap';
import DisplayFerme from './DisplayFerme';


class DisplayRco extends React.Component{
    render(){
        return (
            <Tab.Container  key={'Tab.Container'+this.props.data.number} id="left-tabs-example" defaultActiveKey="rco1" style={{backgroundColor:'white'}}>
                <Nav fill variant="pills" className="flex">{
                    this.props.data.map((elem)=>{
                        return <Nav.Item key={`Nav.Item rco${elem.number}`}>
                            <Nav.Link 
                                style={{padding: ".30rem"}} 
                                key={`rco${elem.number}`} 
                                eventKey={`rco${elem.number}`}>
                                {`rco${elem.number}`}
                            </Nav.Link>
                        </Nav.Item>
                    })
                }</Nav>
                <Tab.Content>{
                    this.props.data.map((elem)=>{
                        return <Tab.Pane 
                            key={`tabPanse${this.props.salleNumb}${elem.number}`} 
                            eventKey={`rco${elem.number}`}>
                            <DisplayFerme 
                                key={`displayFerme${this.props.salleNumb}${elem.number}`} 
                                data={elem} 
                                salleNumb={this.props.salleNumb} 
                                rcoNumb={elem.number}
                                validRef={this.props.validRef}/>
                        </Tab.Pane>
                    })
                }</Tab.Content>
            </Tab.Container>
        )
    }
}
export default DisplayRco