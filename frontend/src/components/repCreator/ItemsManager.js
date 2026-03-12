import React from 'react'
import Tab from 'react-bootstrap/Tab';
import {Nav} from 'react-bootstrap';
import AddElement from './AddElement';
import DeleteElement from './DeleteElement';

class ItemsManager extends React.Component{
    render(){
        return <Tab.Container  defaultActiveKey="Ajouter" style={{backgroundColor:'white'}}>
            <Nav fill variant="pills" className="flex">
                <Nav.Item><Nav.Link style={{padding: ".30rem"}} key={"Ajouter"} eventKey={"Ajouter"}>Ajouter</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link style={{padding: ".30rem"}} key={"Supprimer"} eventKey={"Supprimer"}>Supprimer</Nav.Link></Nav.Item>
            </Nav>
            <Tab.Content>
                <Tab.Pane key={"Ajouter"} eventKey={"Ajouter"}><div style={{ marginTop:"10px"}}><AddElement function={this.props.function}/></div></Tab.Pane>
                <Tab.Pane key={"Supprimer"} eventKey={"Supprimer"}><div style={{ marginTop:"10px"}}><DeleteElement function={this.props.function}/></div></Tab.Pane>
            </Tab.Content>
        </Tab.Container>
    }
}
export default ItemsManager