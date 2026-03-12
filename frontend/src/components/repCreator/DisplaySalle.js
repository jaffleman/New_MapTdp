import React from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import DisplayRco from './DisplayRco';
import ItemsManager from './itemManager/ItemsManager';
import Button from 'react-bootstrap/Button'


class DisplaySalle extends React.Component{
    
    render(){
        const {data, vButton, vRef} = this.props
        const {name,salle} = data
        return(
            <div className="MyCard" style={{ marginBottom: '5px'}}>
                <div className="Bando-Titre2 rounded" style={{marginBottom:"1px", }}>
                    Repartiteur de <span style={{color:'red', textTransform:'lowerCase'}}>{name}</span>
                </div>
                <Tabs justify defaultActiveKey="salle1" id="uncontrolled-tab-example" unmountOnExit={true}>
                    {salle.map(elem=><Tab key={"Salle"+elem.number} eventKey={`salle${elem.number}`} title={`salle${elem.number}`}>
                        <DisplayRco key={"rco"+elem.number} data={elem.rco} salleNumb={elem.number} validRef={vRef}/>
                    </Tab>)}
                    <Tab key={'0'} eventKey={'+'} title={'+/-'}>
                        <ItemsManager function={this.props.function}/>
                    </Tab>
                </Tabs>
                <div className="Bando-Titre2 rounded" style={{marginTop:"5px", }}>
                <Button 
                    type="button" 
                    className="btn btn-primary" 
                    onClick={vButton}
                    ref={vRef} 
                    size="sm">Valider en base</Button>
                </div>
            </div>
        ) 

    }
}
export default DisplaySalle