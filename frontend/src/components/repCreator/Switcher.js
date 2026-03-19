import React from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


class Switcher extends React.Component{
  
    render(){
        const {number, back, next, fermes, handleClick,id} = this.props 
        const nextOrPlus = this.props.number === this.props.total? " + " : ">"
        return (
            <div style={{marginTop:'0.5rem'}} data-testid="ferme-switcher">
                <Container fluid>
                    <Row style={{padding:"0px", marginLeft:'0px',marginRight:'0px', alignItems:'center'}}>
                        <Button size="sm" onClick={back} data-testid="ferme-prev-btn" style={{minWidth:'32px'}}>
                          <i className="fas fa-chevron-left"></i>
                        </Button>
                        <Col style={{padding:"0px", marginLeft:'0px',marginRight:'0px', display:'flex', flexWrap:'wrap', justifyContent:'center'}}>{
                            fermes.map((elem)=>{
                                const num = elem.number>9?elem.number:`0${elem.number}`
                                const isActive = number===elem.number
                                const style = isActive
                                  ? {backgroundColor:"rgba(0,240,255,0.2)", color:"var(--accent)", borderColor:"var(--accent)"}
                                  : {backgroundColor:"rgba(0,0,0,0.3)", color:"var(--text-secondary)", borderColor:"var(--border-color)"}
                                return <Button 
                                  size="sm" 
                                  key={`${id}ferme${elem.number}`} 
                                  className={`buttonFerme ${elem.number}`} 
                                  style={style} 
                                  type="button" 
                                  onClick={()=>handleClick(elem.index)}
                                  data-testid={`ferme-btn-${elem.number}`}>
                                  {num}
                                </Button>
                            }) 
                        }</Col>
                        <Button size="sm" onClick={next} data-testid="ferme-next-btn" style={{minWidth:'32px'}}>
                          <i className="fas fa-chevron-right"></i>
                        </Button>
                    </Row>
                </Container>
            </div>
        )
    }

}
export default Switcher
